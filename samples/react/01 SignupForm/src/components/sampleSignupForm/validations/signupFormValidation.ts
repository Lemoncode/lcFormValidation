import { } from 'core-js';
import {
  createFormValidation,
  FieldValidationResult,
  ValidationConstraints,
  Validators,
} from 'lc-form-validation';
import { gitHub } from '../../../api/gitHub';

function passwordAndConfirmPasswordValidationHandler(value: any, vm: any): FieldValidationResult {
  const passwordAndConfirmPasswordAreEqual = vm.password === value;
  const errorInfo = (passwordAndConfirmPasswordAreEqual) ? '' : 'Passwords do not match';

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'PASSWORD_MATCH';
  fieldValidationResult.succeeded = passwordAndConfirmPasswordAreEqual;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
}

function loginExistOnGitHubValidationHandler(value: any, vm: any): Promise<FieldValidationResult> {
  return gitHub.doesLoginExists(value)
    .then((loginExists) => resolveLoginExists(loginExists))
    .catch(error => console.log('ERROR', error));
}

function resolveLoginExists(loginExists: boolean): Promise<FieldValidationResult> {
  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'USER_GITHUB';
  fieldValidationResult.succeeded = !loginExists;
  fieldValidationResult.errorMessage = (loginExists) ? 'This user exists on GitHub' : '';
  return Promise.resolve(fieldValidationResult);
}

const signupValidationConstraints: ValidationConstraints = {
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
        eventFilters: { OnChange: true, OnBlur: true },
      },
      {
        validator: loginExistOnGitHubValidationHandler,
        eventFilters: { OnBlur: true }
      },
    ]
  }
};

const signupFormValidation = createFormValidation(signupValidationConstraints);

export {
  signupFormValidation
}
