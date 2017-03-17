import { FieldValidationResult, FieldValidationFunction } from '../entities';
export interface RequiredParams {
  trim: boolean;
}

const DEFAULT_PARAMS: RequiredParams = { trim: true };

export const required: FieldValidationFunction = (value, vm, customParams: RequiredParams = DEFAULT_PARAMS) => {
  const validationResult = new FieldValidationResult();
  const isValid = isValidField(value, Boolean(customParams.trim));
  if (!isValid) {
    validationResult.errorMessage = 'Please fill in this mandatory field.';
  }
  validationResult.succeeded = isValid;
  validationResult.type = 'REQUIRED';
  return validationResult;
}

function isValidField(value, trim: boolean): boolean {
  if (typeof value === 'string') {
    return isStringValid(value, trim);
  }

  // Allow only 'true'
  return value !== null && value !== undefined && value !== false;
}

function isStringValid(value: string, trim: boolean): boolean {
  return trim ? value.trim().length > 0 : value.length > 0;
}
