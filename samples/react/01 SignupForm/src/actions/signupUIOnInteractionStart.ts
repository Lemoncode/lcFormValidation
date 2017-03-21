import { FieldValidationResult } from 'lc-form-validation';
import { signupUIOnInteractionCompleted } from './signupUIOnInteractionCompleted';
import { signupFormValidation } from '../components/sampleSignupForm/validations/signupFormValidation';
import { ValidationEventsFilter } from 'lc-form-validation';

export function signupUIOnInteractionStart(viewModel: any, fieldName: string, value: any, eventsFilter?: ValidationEventsFilter) {
  return (dispatcher) => {
    signupFormValidation.validateField(viewModel, fieldName, value, eventsFilter).then(
      function (fieldValidationResult: FieldValidationResult) {
        dispatcher(signupUIOnInteractionCompleted(fieldName, value, fieldValidationResult));
      }
    );
  }
}
