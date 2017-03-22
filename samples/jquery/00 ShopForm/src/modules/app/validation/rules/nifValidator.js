import { FieldValidationResult } from 'lc-form-validation';

export function nifValidator(value) {
  const isValid = isNifValid(value);
  const validationResult = new FieldValidationResult();

  validationResult.succeeded = isValid;
  validationResult.errorMessage = isValid ? '' : 'The given value is not a valid NIF/NIE';
  validationResult.type = 'NIF';
  return validationResult;
}

function isNifValid(value) {
  return (typeof value === 'string' && value.length > 0) ?
    validateNif(value) :
    true;
}

function validateNif(value) {
  let isValid = false;
  const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  const valueToUpper = value.toUpperCase();

  if (isValidPattern(valueToUpper, validChars)) {
    const nie = valueToUpper
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');
    const letter = valueToUpper.substr(-1);
    const charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) {
      isValid = true;
    }
  }

  return isValid;
}

function isValidPattern(value, validChars) {
  const nifRegExp = new RegExp(`^[0-9]{8}[${validChars}]{1}$`, 'i');
  const nieRegExp = new RegExp(`^[XYZ]{1}[0-9]{7}[${validChars}]{1}$`, 'i');

  return nifRegExp.test(value) || nieRegExp.test(value);
}
