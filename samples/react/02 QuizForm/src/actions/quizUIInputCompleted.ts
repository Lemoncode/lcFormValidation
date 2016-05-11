import { actionsDef } from './actionsDef';

interface IQuizUIInputCompletedAction {
  type: string;
  questionId : string;
  value : any;
}

let quizUIInputCompleted = (questionId : string, value : any) : IQuizUIInputCompletedAction => {
  return {
    type: actionsDef.quiz.UI_INPUT_CHANGE,
    questionId,
    value
  };
}

export {
  IQuizUIInputCompletedAction,
  quizUIInputCompleted
}
