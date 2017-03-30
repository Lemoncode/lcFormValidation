import { signupRequestCompleted } from './signupRequestCompleted';
import { signupFormValidation } from '../components/sampleSignupForm/validations/signupFormValidation';

export function signupRequestStart(viewModel) {
  return (dispatcher) => {
    signupFormValidation.validateForm(viewModel).then(
      (formValidationResult) => {
        if (formValidationResult.succeeded) {
          console.log("Sign up completed");
        }
        dispatcher(signupRequestCompleted(formValidationResult));
      }
    );
  }
}
