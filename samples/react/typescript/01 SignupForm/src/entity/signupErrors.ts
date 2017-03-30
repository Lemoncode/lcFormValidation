import { FieldValidationResult } from 'lc-form-validation';

export class SignupErrors {
  login: FieldValidationResult;
  password: FieldValidationResult;
  confirmPassword: FieldValidationResult;
}
