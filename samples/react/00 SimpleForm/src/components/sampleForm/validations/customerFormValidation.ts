import { FieldValidationResult, createFormValidation, ValidationConstraints } from 'lc-form-validation';

// TODO: Implement Issue #17
// TODO: Implement Issue #6
function requiredField(value: string): FieldValidationResult {
  const succeeded = (value && value.trim().length > 0);
  const errorMessage = (succeeded) ? "" : "Mandatory field";

  return {
    type: 'REQUIRED',
    succeeded,
    errorMessage
  };
}
const validationConstraints: ValidationConstraints = {
  fields: {
    fullname: [
      { validator: requiredField }
    ]
  }
};
const customerFormValidation = createFormValidation(validationConstraints);

export {
  customerFormValidation
};
