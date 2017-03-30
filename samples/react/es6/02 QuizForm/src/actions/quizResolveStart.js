import { actionsDef } from './actionsDef';
import { quizFormValidation } from '../components/quizForm/validations/quizFormValidation';
import { quizResolveCompleted } from './quizResolveCompleted';

export function quizResolveStart(viewModel) {
  return (dispatcher) => {
    quizFormValidation.validateForm(viewModel).then(
      (formValidationResult) => {
        dispatcher(quizResolveCompleted(formValidationResult));
      }
    );
  }
}
