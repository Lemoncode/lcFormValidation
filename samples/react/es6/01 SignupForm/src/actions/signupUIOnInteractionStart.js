import { signupUIOnInteractionCompleted } from './signupUIOnInteractionCompleted';
import { signupFormValidation } from '../components/sampleSignupForm/validations/signupFormValidation';

export function signupUIOnInteractionStart(viewModel, fieldName, value, eventsFilter) {
  return (dispatcher) => {
    signupFormValidation.validateField(viewModel, fieldName, value, eventsFilter).then(
      (fieldValidationResult) => {
        dispatcher(signupUIOnInteractionCompleted(fieldName, value, fieldValidationResult));
      }
    );
  }
}
