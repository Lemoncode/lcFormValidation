import {
  createFormValidation,
  FieldValidationResult,
  Validators,
} from 'lc-form-validation';
import { gitHub } from '../../../api/gitHub';

function passwordAndConfirmPasswordValidationHandler(value, vm) {
  const passwordAndConfirmPasswordAreEqual = vm.password === value;
  const errorInfo = (passwordAndConfirmPasswordAreEqual) ? '' : 'Passwords do not match';

  const fieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'PASSWORD_MATCH';
  fieldValidationResult.succeeded = passwordAndConfirmPasswordAreEqual;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
}

function loginExistOnGitHubValidationHandler(value) {
  return gitHub.doesLoginExists(value)
    .then((loginExists) => resolveLoginExists(loginExists))
    .catch(error => console.log('ERROR', error));
}

function resolveLoginExists(loginExists) {
  const fieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'USER_GITHUB';
  fieldValidationResult.succeeded = !loginExists;
  fieldValidationResult.errorMessage = (loginExists) ? 'This user exists on GitHub' : '';
  return Promise.resolve(fieldValidationResult);
}

const signupValidationConstraints = {
  fields: {
    password: [
      { validator: Validators.required },
      {
        validator: Validators.minLength,
        customParams: { length: 4 },
      },
    ],
    confirmPassword: [
      { validator: Validators.required },
      { validator: passwordAndConfirmPasswordValidationHandler },
    ],
    login: [
      {
        validator: Validators.required,
        eventsFilter: { OnChange: true, OnBlur: true },
      },
      {
        validator: loginExistOnGitHubValidationHandler,
        eventsFilter: { OnBlur: true }
      },
    ]
  }
};

export const signupFormValidation = createFormValidation(signupValidationConstraints);
