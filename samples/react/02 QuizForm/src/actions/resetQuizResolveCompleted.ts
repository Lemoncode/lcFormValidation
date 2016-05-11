import { actionsDef } from './actionsDef';

interface IQuizResetQuizResolveCompletedAction {
  type: string;
}

let resetQuizResolveCompleted = () : IQuizResetQuizResolveCompletedAction  => {
  return {
    type: actionsDef.quiz.RESET_QUIZ_RESOLVE_COMPLETED
  }
}

export {
  IQuizResetQuizResolveCompletedAction,
  resetQuizResolveCompleted
}
