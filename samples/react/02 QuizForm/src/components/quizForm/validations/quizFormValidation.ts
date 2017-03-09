import { FieldValidationResult, createFormValidation } from 'lc-form-validation';
import { QuizEntity, Question } from '../../../entity/quizEntity';

function isThereAnyQuestionSelected(quiz: QuizEntity) {
  return Object.keys(quiz).some(question => (quiz[question] as Question).isSelected);
}

function quizValidation(quiz: QuizEntity) {
  let isQuizPassed = isThereAnyQuestionSelected(quiz);
  let errorInfo = (isQuizPassed) ? '' : 'Failed';
  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'QUIZ_VALIDATION';
  fieldValidationResult.succeeded = isQuizPassed;
  fieldValidationResult.errorMessage = errorInfo;
  return fieldValidationResult;
}

const quizFormValidation = createFormValidation({
  global: [
    quizValidation
  ]
});

export {
  quizFormValidation
}
