import {
  ValidationConstraints, createFormValidation, Validators
} from 'lc-form-validation';
import {hasItems} from '../../../../common/validations/arrayValidation';

const constraints: ValidationConstraints = {
  fields: {
    name: [
      { validator: Validators.required }
    ],
    ingredients: [
      { validator: hasItems('Should have at least one ingredient')}
    ]
  }
};

export const editFormValidation = createFormValidation(constraints);