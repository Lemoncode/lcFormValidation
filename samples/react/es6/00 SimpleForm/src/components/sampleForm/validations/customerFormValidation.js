import { Validators, createFormValidation } from 'lc-form-validation';

const customerValidationConstraints = {
  fields: {
    fullname: [
      { validator: Validators.required }
    ],
    password: [
      { validator: Validators.required }
    ],
  }
};

export const customerFormValidation = createFormValidation(customerValidationConstraints);
