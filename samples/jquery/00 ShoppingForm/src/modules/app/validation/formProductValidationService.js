import {
  FieldValidationResult,
  Validators,
  createFormValidation,
} from 'lc-form-validation';
import { nifValidator } from './rules/nifValidator';

const DISCOUNT_REGEXP = /^[A-Z\d]{3}\-[A-Z\d]{4}[A-Z\d]{3}$/;

const validationConstraints = {
  fields: {
    product: [
      {
        validator: Validators.required,
      },
    ],
    version: [
      {
        validator: Validators.required,
      },
    ],
    discountCode: [
      {
        validator: Validators.pattern,
        customParams: { pattern: DISCOUNT_REGEXP },
      }
    ],
    nif: [
      {
        validator: Validators.required,
      },
      {
        validator: nifValidator,
      }
    ]
  }
};

export const productsFormValidation = createFormValidation(validationConstraints);
