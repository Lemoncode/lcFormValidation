import { actionsDef } from './actionsDef';

export const quizUIInputCompleted = (questionId, value) => {
  return {
    type: actionsDef.quiz.UI_INPUT_CHANGE,
    questionId,
    value
  };
};
