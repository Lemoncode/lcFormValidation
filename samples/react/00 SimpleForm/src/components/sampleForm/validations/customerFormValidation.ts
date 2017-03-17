import {
  ValidationConstraints,
  Validators,
  createFormValidation,
  RequiredParams,
} from 'lc-form-validation';

// TODO: Implement Issue #17
// TODO: Implement Issue #6
const customerValidationConstraints: ValidationConstraints = {
  fields: {
    fullname: [
      { validator: Validators.required }
    ]
  }
};
const customerFormValidation = createFormValidation(customerValidationConstraints);

export {
  customerFormValidation
};
