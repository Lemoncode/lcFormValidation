import { } from 'core-js';
import { BaseFormValidation, FieldValidationResult } from 'lc-form-validation';
import { gitHub } from '../../../api/gitHub';

class SignupFormValidation extends BaseFormValidation {
  public constructor() {
    super();

    this._validationEngine
      .addFieldValidation('password',
      (value, vm): FieldValidationResult => {
        return this.requiredValidationHandler(value, vm);
      })
      .addFieldValidation('confirmPassword',
      (value, vm): FieldValidationResult => {
        return this.passwordAndConfirmPasswordValidationHandler(value, vm);
      })
      .addFieldValidation('confirmPassword',
      (value, vm): FieldValidationResult => {
        return this.requiredValidationHandler(value, vm);
      })
      .addFieldValidationAsync('login',
      (value, vm): Promise<FieldValidationResult> => {
        return this.loginExistOnGitHubValidationHandler(value, vm);
      }, { OnBlur: true })
      .addFieldValidation('login',
      (value, vm): FieldValidationResult => {
        return this.requiredValidationHandler(value, vm);
      }, { OnChange: true, OnBlur: true });
  }

  requiredValidationHandler(value: any, vm: any): FieldValidationResult {
    const isFieldInformed: boolean = (value != null && value.length > 0);
    const errorInfo: string = (isFieldInformed) ? '' : 'Mandatory field';

    const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
    fieldValidationResult.type = 'REQUIRED';
    fieldValidationResult.succeeded = isFieldInformed;
    fieldValidationResult.errorMessage = errorInfo;

    return fieldValidationResult;
  }

  passwordAndConfirmPasswordValidationHandler(value: any, vm: any): FieldValidationResult {
    const passwordAndConfirmPasswordAreEqual: boolean = vm.password === value;
    const errorInfo: string = (passwordAndConfirmPasswordAreEqual) ? '' : 'Passwords do not match';

    const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
    fieldValidationResult.type = 'PASSWORD_MATCH';
    fieldValidationResult.succeeded = passwordAndConfirmPasswordAreEqual;
    fieldValidationResult.errorMessage = errorInfo;

    return fieldValidationResult;
  }

  loginExistOnGitHubValidationHandler(value: any, vm: any): Promise<FieldValidationResult> {
    return gitHub.doesLoginExists(value)
      .then((loginExists) => this.resolveLoginExists(loginExists));
  }

  resolveLoginExists(loginExists: boolean): Promise<FieldValidationResult> {
    const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
    fieldValidationResult.type = 'USER_GITHUB';
    fieldValidationResult.succeeded = !loginExists;
    fieldValidationResult.errorMessage = (loginExists) ? 'This user exists on GitHub' : '';
    return Promise.resolve(fieldValidationResult);
  }
}

let signupFormValidation = new SignupFormValidation();

export {
  signupFormValidation
}
