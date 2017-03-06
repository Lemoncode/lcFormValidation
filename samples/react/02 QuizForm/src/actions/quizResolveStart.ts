import { actionsDef } from './actionsDef';
import { FormValidationResult } from 'lc-form-validation';
import { quizFormValidation } from '../components/quizForm/validations/quizFormValidation';
import { quizResolveCompleted } from './quizResolveCompleted';

export function quizResolveStart(viewModel: any) {
  return (dispatcher) => {
    quizFormValidation.validateForm(viewModel).then(
      function (formValidationResult: FormValidationResult) {
        dispatcher(quizResolveCompleted(formValidationResult));
      }
    );
  }
}
