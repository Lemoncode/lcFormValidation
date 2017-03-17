import { FieldValidationResult, FieldValidationFunction } from '../entities';

export interface MaxLengthParams {
  length: number;
}

const defaultParams = { length: undefined };
export function maxLength(value: string, vm, customParams: MaxLengthParams = defaultParams) {
  const length = ParseCustomParams(customParams);
  const isValid = isLengthValid(value, length);
  const validationResult = new FieldValidationResult();

  validationResult.succeeded = isValid;
  validationResult.key = 'MAX_LENGTH';
  validationResult.errorMessage = isValid ? '' : `The value provided is too long. Length must not exceed ${length} characters.`;
  return validationResult;
}

function ParseCustomParams(customParams: MaxLengthParams) {
  const length = customParams.length === null ? NaN : Number(customParams.length);
  if (isNaN(length)) {
    throw new Error('FieldValidationError: Parameter "length" for maxLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.');
  }

  return length;
}

function isLengthValid(value, length: number): boolean {
  if (typeof value === 'string') {
    return isStringLengthValid(value, length);
  }

  // Don't validate non string values
  return true;
}

function isStringLengthValid(value: string, length: number) {
  return isNaN(length) ? false : value.length <= length;
}
