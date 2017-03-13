import { FieldValidationResult } from 'lc-form-validation';
import { signupUIOnInteractionCompleted } from './signupUIOnInteractionCompleted';
import { signupFormValidation } from '../components/sampleSignupForm/validations/signupFormValidation';

export function signupUIOnInteractionStart(viewModel: any, fieldName: string, value: any, filter?: any) {
  return (dispatcher) => {
    signupFormValidation.validateField(viewModel, fieldName, value, filter).then(
      function (fieldValidationResult: FieldValidationResult) {
        dispatcher(signupUIOnInteractionCompleted(fieldName, value, fieldValidationResult));
      }
    );
  }
}
