import { actionsDef } from './actionsDef';

export interface IQuizResetQuizResolveCompletedAction {
  type: string;
}

export const resetQuizResolveCompleted = (): IQuizResetQuizResolveCompletedAction => {
  return {
    type: actionsDef.quiz.RESET_QUIZ_RESOLVE_COMPLETED
  }
}
