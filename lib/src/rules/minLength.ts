import { FieldValidationResult, FieldValidationFunction } from '../entities';

export interface MinLengthParams {
  length: number;
}

const defaultParams = { length: undefined };
export const minLength: FieldValidationFunction = (value: string, vm, customParams: MinLengthParams = defaultParams) => {
  const length = parseCustomParams(customParams);
  const isValid = isLengthValid(value, length);
  const validationResult = new FieldValidationResult();
  validationResult.errorMessage = isValid ? '' : `The value provided must have at least ${length} characters.`;
  validationResult.succeeded = isValid;
  validationResult.key = 'MIN_LENGTH';
  return validationResult;
}

function parseCustomParams(customParams: MinLengthParams) {
  const length = customParams.length === null ? NaN : Number(customParams.length);
  if (isNaN(length)) {
    throw new Error('FieldValidationError: Parameter "length" for minLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.');
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
  return value.length >= length;
}
