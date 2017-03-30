import { QuizEntity, Question } from '../entity/quizEntity';
import { FieldValidationResult } from 'lc-form-validation';
import { actionsDef } from '../actions/actionsDef';


export class QuizState {
  constructor() {
    this.quiz = new QuizEntity();
    this.quizResult = new FieldValidationResult();
    this.quizResolveCompleted = false;
  }
}

export const quizReducer = (state = new QuizState(), action) => {
  switch (action.type) {
    case actionsDef.quiz.UI_INPUT_CHANGE:
      return quizProcessUIInputCompleted(state, action);

    case actionsDef.quiz.QUIZ_RESOLVE_COMPLETED:
      return quizResolveCompleted(state, action);

    case actionsDef.quiz.RESET_QUIZ_RESOLVE_COMPLETED:
      return { ...state, quizResolveCompleted: false };

    default:
      return state;
  }
}

function quizProcessUIInputCompleted(state, action) {
  const newQuiz = Object.assign(new QuizEntity(), {
    [action.questionId]: new Question(action.value)
  });

  return {
    ...state,
    quiz: newQuiz
  };
}

function quizResolveCompleted(state, action) {
  let newFieldValidationResult;

  if (action.formValidationResult.formGlobalErrors.length > 0) {
    newFieldValidationResult = action.formValidationResult.formGlobalErrors[0];
  }

  return {
    ...state,
    quizResult: newFieldValidationResult,
    quizResolveCompleted: true
  };
}
