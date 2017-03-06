import { FieldValidationResult } from 'lc-form-validation';
import { signupUIOnInteractionCompleted } from './signupUIOnInteractionCompleted';
import { signupFormValidation } from '../components/sampleSignupForm/validations/signupFormValidation';

export function signupUIOnInteractionStart(viewModel: any, fieldName: string, value: any, event?: any) {
  return (dispatcher) => {
    signupFormValidation.validateField(viewModel, fieldName, value, event).then(
      function (fieldValidationResult: FieldValidationResult) {
        dispatcher(signupUIOnInteractionCompleted(fieldName, value, fieldValidationResult));
      }
    );
  }
}
