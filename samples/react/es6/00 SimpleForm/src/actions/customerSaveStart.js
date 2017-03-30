import { customerSaveCompleted } from './customerSaveCompleted';
import { customerFormValidation } from '../components/sampleForm/validations/customerFormValidation';

export function customerSaveStart(viewModel) {

  return (dispatcher) => {
    customerFormValidation.validateForm(viewModel).then(
      (formValidationResult) => {
        if (formValidationResult.succeeded) {
          // Call here the async call to save
          // additional logic or actions to be added on a real case
          console.log("Save Completed");
        }
        dispatcher(customerSaveCompleted(formValidationResult));
      }
    );
  }
}
