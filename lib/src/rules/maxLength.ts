import { FieldValidationResult, FieldValidationFunction } from '../entities';
import {
  LengthParams,
  parseLengthParams,
  isLengthValid,
} from './length';

const DEFAULT_PARAMS = { length: undefined };
const BAD_PARAMETER = 'FieldValidationError: Parameter "length" for maxLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.';

export function maxLength(value: string, vm, customParams: LengthParams = DEFAULT_PARAMS) {
  const length = parseLengthParams(customParams, BAD_PARAMETER);
  const isValid = isLengthValid(value, length, isStringLengthValid);
  const validationResult = new FieldValidationResult();

  validationResult.succeeded = isValid;
  validationResult.type = 'MAX_LENGTH';
  validationResult.errorMessage = isValid ? '' : `The value provided is too long. Length must not exceed ${length} characters.`;
  return validationResult;
}

function isStringLengthValid(value: string, length: number): boolean {
  return isNaN(length) ?
    false :
    value.length <= length;
}
