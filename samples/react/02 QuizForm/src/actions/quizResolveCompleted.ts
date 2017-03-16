import { actionsDef } from './actionsDef';
import { FormValidationResult } from 'lc-form-validation';

export interface IQuizResolveCompletedAction {
  type: string;
  formValidationResult: FormValidationResult;
}

export const quizResolveCompleted = (formValidationResult: FormValidationResult): IQuizResolveCompletedAction => {
  return {
    type: actionsDef.quiz.QUIZ_RESOLVE_COMPLETED,
    formValidationResult
  };
}
