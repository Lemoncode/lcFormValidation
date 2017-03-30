import {
  ValidationConstraints,
  Validators,
  createFormValidation,
  RequiredParams,
} from 'lc-form-validation';

const customerValidationConstraints: ValidationConstraints = {
  fields: {
    fullname: [
      { validator: Validators.required }
    ],
    password: [
      { validator: Validators.required }
    ],
  }
};
const customerFormValidation = createFormValidation(customerValidationConstraints);

export {
  customerFormValidation
};
