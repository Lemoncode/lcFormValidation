import { actionsDef } from './actionsDef';

export const quizResolveCompleted = (formValidationResult) => {
  return {
    type: actionsDef.quiz.QUIZ_RESOLVE_COMPLETED,
    formValidationResult
  };
};
