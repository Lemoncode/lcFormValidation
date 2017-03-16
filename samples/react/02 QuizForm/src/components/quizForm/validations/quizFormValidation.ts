import { FieldValidationResult, createFormValidation } from 'lc-form-validation';
import { QuizEntity, Question } from '../../../entity/quizEntity';

function isAnyQuestionSelected(quiz: QuizEntity) {
  return Object.keys(quiz).some(question => (quiz[question] as Question).isSelected);
}

function quizValidation(quiz: QuizEntity) {
  const isQuizPassed = isAnyQuestionSelected(quiz);
  const errorInfo = (isQuizPassed) ? '' : 'Failed';
  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
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

const quizFormValidation = createFormValidation(quizValidationConstraints);

export {
  quizFormValidation
}
