import { Promise } from 'es6-promise';
import { FieldValidationResult, BaseFormValidation } from 'lc-form-validation';
import { QuizEntity, Question } from '../../../entity/quizEntity';

class QuizFormValidation extends BaseFormValidation {
  public constructor() {
    super();

    this._validationEngine.addValidationRuleToForm((vm) => {
      const _vm : QuizEntity = <QuizEntity>vm;
      let isQuizPassed : boolean = this.isThereAnyQuestionSelected(_vm);
      let errorInfo : string = (isQuizPassed) ? '' : 'Failed';
      const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
      fieldValidationResult.type = 'QUIZ_VALIDATION';
      fieldValidationResult.succeeded = isQuizPassed;
      fieldValidationResult.errorMessage = errorInfo;
      return Promise.resolve(fieldValidationResult);
    });
  }

  private isThereAnyQuestionSelected (quiz : QuizEntity) : boolean {
    let _anyQuestionSelected : boolean = false;
    for (let question in quiz) {
      let  _question = <Question>quiz[question];
      _anyQuestionSelected = _question.isSelected;
      if (_anyQuestionSelected) {
        break;
      }
    }
    return _anyQuestionSelected;
  }
}

let quizFormValidation = new QuizFormValidation();

export {
  quizFormValidation
}
