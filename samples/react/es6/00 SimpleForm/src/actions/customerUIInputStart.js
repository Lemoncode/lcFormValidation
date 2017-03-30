import { customerUIInputCompleted } from './customerUInputCompleted';
import { customerFormValidation } from '../components/sampleForm/validations/customerFormValidation';

export function customerUIInputStart(viewModel, fieldName, value) {
  return (dispatcher) => {
    customerFormValidation.validateField(viewModel, fieldName, value).then(
      (fieldValidationResult) => {
        dispatcher(customerUIInputCompleted(fieldName, value, fieldValidationResult));
      }
    );
  }
}
