import { FieldValidationResult } from '../entities';

export interface PatternParams {
  pattern: string | RegExp;
}

const BAD_PARAMETER = 'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /\d+/ }.';
export function pattern(value: string, vm, customParams: PatternParams): FieldValidationResult {
  const pattern = parsePattern(customParams);
  const isValid = pattern.test(value);
  const validationResult = new FieldValidationResult();
  validationResult.succeeded = isValid;
  validationResult.type = 'PATTERN';
  validationResult.errorMessage = isValid ? '' : `Please provide a valid format.`;

  return validationResult;
}

function parsePattern({ pattern }: PatternParams): RegExp {
  if (pattern === undefined || pattern === null) {
    throw new Error(BAD_PARAMETER);
  }
  return getRegExp(pattern);
}

function getRegExp(pattern) {
  if (typeof pattern === 'string') {
    return new RegExp(`^${pattern}$`);
  }
  if (pattern instanceof RegExp) {
    return pattern;
  }
  return new RegExp(pattern);
}
