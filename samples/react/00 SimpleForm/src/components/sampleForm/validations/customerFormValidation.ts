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
const customerValidationConstraints: ValidationConstraints = {
  fields: {
    fullname: [
      { validator: requiredField }
    ]
  }
};
const customerFormValidation = createFormValidation(customerValidationConstraints);

export {
  customerFormValidation
};
