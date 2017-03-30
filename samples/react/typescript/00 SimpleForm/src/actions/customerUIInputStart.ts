import { actionsDef } from './actionsDef';
import { FieldValidationResult } from 'lc-form-validation';
import { customerUIInputCompleted } from './customerUInputCompleted';
import { customerFormValidation } from '../components/sampleForm/validations/customerFormValidation';

export function customerUIInputStart(viewModel: any, fieldName: string, value: any) {
  return (dispatcher) => {
    customerFormValidation.validateField(viewModel, fieldName, value).then(
      (fieldValidationResult: FieldValidationResult) => {
        dispatcher(customerUIInputCompleted(fieldName, value, fieldValidationResult));
      }
    );
  };
}
