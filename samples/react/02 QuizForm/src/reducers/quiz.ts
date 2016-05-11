import objectAssign = require('object-assign');
import { QuizEntity } from '../entity/quizEntity';
import { Question } from '../entity/quizEntity';
import { FormValidationResult, FieldValidationResult } from 'lc-form-validation';
import { actionsDef } from '../actions/actionsDef';
import { IQuizUIInputCompletedAction } from '../actions/quizUIInputCompleted';
import { IQuizResolveCompletedAction } from '../actions/quizResolveCompleted';
import { IQuizResetQuizResolveCompletedAction } from '../actions/resetQuizResolveCompleted';


export class QuizState {
  quiz : QuizEntity;
  quizResult : FieldValidationResult;
  quizResolveCompleted : boolean;

  constructor() {
    this.quiz = new QuizEntity();
    this.quizResult = new FieldValidationResult();
    this.quizResolveCompleted = false;
  }
}

export let quizReducer = (state : QuizState = new QuizState(), action : any) : QuizState => {
  switch (action.type) {
    case actionsDef.quiz.UI_INPUT_CHANGE :
      return quizProcessUIInputCompleted(state, action);

    case actionsDef.quiz.QUIZ_RESOLVE_COMPLETED :
      return quizResolveCompleted(state, action);

    case actionsDef.quiz.RESET_QUIZ_RESOLVE_COMPLETED:
      return objectAssign({}, state, { quizResolveCompleted : false });

    default :
      return state;
  }
}

function quizProcessUIInputCompleted (state : QuizState, action : IQuizUIInputCompletedAction) : QuizState {
  let newQuiz : QuizEntity = objectAssign({}, state.quiz, {
    [action.questionId] : new Question(action.value)
  });
  return objectAssign({}, state, {
    quiz: newQuiz
  });
}

function quizResolveCompleted (state : QuizState, action : IQuizResolveCompletedAction) : QuizState {
  let newFieldValidationResult : FieldValidationResult;

  if (action.formValidationResult.formGlobalErrors.length > 0) {
    newFieldValidationResult = action.formValidationResult.formGlobalErrors[0];
  }

  return objectAssign({}, state, {
    quizResult: newFieldValidationResult,
    quizResolveCompleted: true
  });
}
