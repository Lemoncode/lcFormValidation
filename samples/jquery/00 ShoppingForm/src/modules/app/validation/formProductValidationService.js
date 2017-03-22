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
        eventsFilter: { onSubmit: true, onChange: true },
      },
    ],
    version: [
      {
        validator: Validators.required,
        eventsFilter: { onSubmit: true, onChange: true },
      },
    ],
    discountCode: [
      {
        validator: Validators.pattern,
        customParams: { pattern: DISCOUNT_REGEXP },
        eventsFilter: { onSubmit: true, onChange: true },
      }
    ],
    nif: [
      {
        validator: Validators.required,
        eventsFilter: { onSubmit: true, onChange: true },
      },
      {
        validator: nifValidator,
        eventsFilter: { onSubmit: true, onChange: true },
      }
    ]
  }
};

export const productsFormValidation = createFormValidation(validationConstraints);
