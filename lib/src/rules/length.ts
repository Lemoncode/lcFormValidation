export interface LengthParams {
  length: number;
}

export function parseLengthParams(customParams: LengthParams, errorMessage: string) {
  const length = customParams.length === null ? NaN : Number(customParams.length);
  if (isNaN(length)) {
    throw new Error(errorMessage);
  }

  return length;
}

interface LengthValidatorFunction {
  (value: string, length: number): boolean;
}

export function isLengthValid(
  value,
  length: number,
  validatorFn: (value: string, length: number) => boolean
): boolean {
  if (typeof value === 'string') {
    return validatorFn(value, length);
  }

  // Don't validate non string values
  return true;
}
