import { FieldValidationResult, FieldValidationFunction } from '../entities';
import {
  LengthParams,
  parseLengthParams,
  isLengthValid,
} from './length';

const DEFAULT_PARAMS = { length: undefined };
const BAD_PARAMETER = 'FieldValidationError: Parameter "length" for minLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.';

export const minLength: FieldValidationFunction = (value: string, vm, customParams: LengthParams = DEFAULT_PARAMS) => {
  const length = parseLengthParams(customParams, BAD_PARAMETER);
  const isValid = isLengthValid(value, length, isStringLengthValid);
  const validationResult = new FieldValidationResult();

  validationResult.errorMessage = isValid ? '' : `The value provided must have at least ${length} characters.`;
  validationResult.succeeded = isValid;
  validationResult.type = 'MIN_LENGTH';
  return validationResult;
}

function isStringLengthValid(value: string, length: number): boolean {
  return value.length >= length;
}
