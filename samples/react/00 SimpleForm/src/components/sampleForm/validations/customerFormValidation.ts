import { FieldValidationResult, createFormValidation } from 'lc-form-validation';

// TODO: Implement Issue #17
// TODO: Implement Issue #6
const customerFormValidation = createFormValidation(null);
customerFormValidation.addFieldValidation('fullname', (value, vm): FieldValidationResult => {
  let isFieldInformed: boolean = (value && value.length > 0);
  let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

  const validationResult: FieldValidationResult = new FieldValidationResult();
  validationResult.type = "REQUIRED";
  validationResult.succeeded = isFieldInformed;
  validationResult.errorMessage = errorInfo;

  return validationResult;
});

export {
  customerFormValidation
};
