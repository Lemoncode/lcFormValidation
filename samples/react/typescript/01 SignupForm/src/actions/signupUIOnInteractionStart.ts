import { FieldValidationResult, ValidationEventsFilter } from 'lc-form-validation';
import { signupUIOnInteractionCompleted } from './signupUIOnInteractionCompleted';
import { signupFormValidation } from '../components/sampleSignupForm/validations/signupFormValidation';

export function signupUIOnInteractionStart(viewModel: any, fieldName: string, value: any, eventsFilter?: ValidationEventsFilter) {
  return (dispatcher) => {
    signupFormValidation.validateField(viewModel, fieldName, value, eventsFilter).then(
      (fieldValidationResult: FieldValidationResult) => {
        dispatcher(signupUIOnInteractionCompleted(fieldName, value, fieldValidationResult));
      }
    );
  };
}
