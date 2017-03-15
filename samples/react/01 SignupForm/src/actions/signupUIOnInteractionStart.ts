import { FieldValidationResult } from 'lc-form-validation';
import { signupUIOnInteractionCompleted } from './signupUIOnInteractionCompleted';
import { signupFormValidation } from '../components/sampleSignupForm/validations/signupFormValidation';
import { ValidationFilters } from 'lc-form-validation';

export function signupUIOnInteractionStart(viewModel: any, fieldName: string, value: any, filter?: ValidationFilters) {
  return (dispatcher) => {
    signupFormValidation.validateField(viewModel, fieldName, value, filter).then(
      function (fieldValidationResult: FieldValidationResult) {
        dispatcher(signupUIOnInteractionCompleted(fieldName, value, fieldValidationResult));
      }
    );
  }
}
