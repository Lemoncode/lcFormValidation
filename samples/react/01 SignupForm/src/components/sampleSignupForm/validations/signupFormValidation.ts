import { } from 'core-js';
import { createFormValidation, FieldValidationResult, ValidationConstraints } from 'lc-form-validation';
import { gitHub } from '../../../api/gitHub';

function requiredValidationHandler(value: string): FieldValidationResult {
  const isFieldInformed = (value && value.trim().length > 0);
  const errorInfo = (isFieldInformed) ? '' : 'Mandatory field';

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'REQUIRED';
  fieldValidationResult.succeeded = isFieldInformed;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
}

function passwordAndConfirmPasswordValidationHandler(value: any, vm: any): FieldValidationResult {
  const passwordAndConfirmPasswordAreEqual: boolean = vm.password === value;
  const errorInfo: string = (passwordAndConfirmPasswordAreEqual) ? '' : 'Passwords do not match';

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
    password: [{
      validator: requiredValidationHandler,
    }],
    confirmPassword: [
      { validator: requiredValidationHandler },
      { validator: passwordAndConfirmPasswordValidationHandler },
    ],
    login: [
      {
        validator: requiredValidationHandler,
        trigger: { OnChange: true, OnBlur: true }
      },
      {
        validator: loginExistOnGitHubValidationHandler,
        trigger: { OnBlur: true }
      },
    ]
  }
};

const signupFormValidation = createFormValidation(signupValidationConstraints);

export {
  signupFormValidation
}
