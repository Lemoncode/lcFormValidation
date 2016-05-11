import { actionsDef } from './actionsDef';
import { FormValidationResult } from 'lc-form-validation';

interface IQuizResolveCompletedAction {
  type : string;
  formValidationResult : FormValidationResult;
}

let quizResolveCompleted = (formValidationResult : FormValidationResult) : IQuizResolveCompletedAction => {
  return {
    type : actionsDef.quiz.QUIZ_RESOLVE_COMPLETED,
    formValidationResult
  }
}

export {
  IQuizResolveCompletedAction,
  quizResolveCompleted
}
