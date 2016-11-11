import {} from 'core-js';
import { BaseFormValidation, FieldValidationResult } from 'lc-form-validation';
import { gitHub } from '../../../api/gitHub';

class SignupFormValidation extends BaseFormValidation {
  public constructor() {
    super();

    this._validationEngine.initialize([
      {formFieldName: 'password', vmFieldName:'password'},
      {formFieldName:'confirmPassword', vmFieldName:'confirmPassword'},
      {formFieldName: 'login', vmFieldName: 'login'}
    ]);

    this._validationEngine.addFieldValidation('password',
    (vm, value) : FieldValidationResult => {
      return this.requiredValidationHandler(vm, value);
    });

    this._validationEngine.addFieldValidation('confirmPassword',
    (vm, value) : FieldValidationResult => {
      return this.passwordAndConfirmPasswordValidationHandler(vm, value);
    });

    this._validationEngine.addFieldValidation('confirmPassword',
    (vm, value) : FieldValidationResult => {
      return this.requiredValidationHandler(vm, value);
    });

    this._validationEngine.addFieldValidationAsync('login',
    (vm, value) : Promise<FieldValidationResult> => {
      return this.loginExistOnGitHubValidationHandler(vm, value);
    },{ OnBlur : true });

    this._validationEngine.addFieldValidation('login',
    (vm, value) : FieldValidationResult => {
      return this.requiredValidationHandler(vm, value);
    },{ OnChange: true, OnBlur : true });
  }

  requiredValidationHandler(vm : any, value: any) : FieldValidationResult {
    const isFieldInformed : boolean = (value != null && value.length > 0);
    const errorInfo : string = (isFieldInformed) ? '' : 'Mandatory field';

    const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
    fieldValidationResult.type = 'REQUIRED';
    fieldValidationResult.succeeded = isFieldInformed;
    fieldValidationResult.errorMessage = errorInfo;

    return fieldValidationResult;
  }

  passwordAndConfirmPasswordValidationHandler(vm : any, value: any) : FieldValidationResult {
    const passwordAndConfirmPasswordAreEqual : boolean = vm.password === value;
    const errorInfo : string = (passwordAndConfirmPasswordAreEqual) ? '' : 'Passwords do not match';

    const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
    fieldValidationResult.type = 'PASSWORD_MATCH';
    fieldValidationResult.succeeded = passwordAndConfirmPasswordAreEqual;
    fieldValidationResult.errorMessage = errorInfo;

    return fieldValidationResult;
  }

  loginExistOnGitHubValidationHandler (vm : any, value: any) : Promise<FieldValidationResult> {
    return gitHub.doesLoginExists(value)
    .then((loginExists) => this.resolveLoginExists(loginExists));
  }

  resolveLoginExists(loginExists : boolean) : Promise<FieldValidationResult> {
    const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
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
