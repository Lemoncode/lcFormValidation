import { FieldValidationResult, createFormValidation } from 'lc-form-validation';
import { QuizEntity, Question } from '../../../entity/quizEntity';

function isAnyQuestionSelected(quiz) {
  return Object.keys(quiz).some(question => quiz[question].isSelected);
}

function quizValidation(quiz) {
  const isQuizPassed = isAnyQuestionSelected(quiz);
  const errorInfo = (isQuizPassed) ? '' : 'Failed';
  const fieldValidationResult = new FieldValidationResult();

  fieldValidationResult.type = 'QUIZ_VALIDATION';
  fieldValidationResult.succeeded = isQuizPassed;
  fieldValidationResult.errorMessage = errorInfo;
  return fieldValidationResult;
}

const quizValidationConstraints = {
  global: [
    quizValidation
  ]
};

export const quizFormValidation = createFormValidation(quizValidationConstraints);
