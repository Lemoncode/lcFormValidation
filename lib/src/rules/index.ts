import { required } from './required';
import { minLength } from './minLength';
import { maxLength } from './maxLength';
import { email } from './email';
import { pattern } from './pattern';
import { FieldValidationFunction } from '../entities';


interface ValidatorFunctions {
  required: FieldValidationFunction;
  minLength: FieldValidationFunction;
  maxLength: FieldValidationFunction;
  email: FieldValidationFunction;
  pattern: FieldValidationFunction;
}

export const Validators: ValidatorFunctions = {
  required,
  minLength,
  maxLength,
  email,
  pattern,
};
