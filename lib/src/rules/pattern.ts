import { FieldValidationResult } from '../entities';

export interface PatternParams {
  pattern: string | RegExp;
}

const BAD_PARAMETER = 'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /\d+/ }.';

export function pattern(value: string, vm, customParams: PatternParams): FieldValidationResult {
  const pattern = parsePattern(customParams);
  const isValid = isValidPattern(value, pattern);
  const validationResult = new FieldValidationResult();

  validationResult.succeeded = isValid;
  validationResult.type = 'PATTERN';
  validationResult.errorMessage = isValid ? '' : `Please provide a valid format.`;

  return validationResult;
}

function parsePattern({ pattern }: PatternParams): RegExp {
  // Avoid RegExp like /true/ /false/ and /null/ without an explicit "true", "false" or "null"
  if (typeof pattern === 'boolean' || pattern === null) {
    throw new Error(BAD_PARAMETER);
  }
  return getRegExp(pattern);
}

function getRegExp(pattern): RegExp {
  return pattern instanceof RegExp ?
    pattern :
    new RegExp(pattern);
}

function isEmptyValue(value) {
  return value === null ||
    value === undefined ||
    value === '';
}

export function isValidPattern(value, pattern: RegExp): boolean {
  return isEmptyValue(value) ?
    true :
    pattern.test(value);
}
