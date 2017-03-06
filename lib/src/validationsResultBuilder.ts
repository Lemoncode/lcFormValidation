import { FieldValidationResult, FormValidationResult } from './entities';
import { consts } from './consts';

export class ValidationsResultBuilder {
  buildFormValidationsResult(fieldValidationResults: Array<FieldValidationResult>): FormValidationResult {
    let formValidationResult = new FormValidationResult();

    if (fieldValidationResults && fieldValidationResults.length > 0) {
      let filteredFieldValidationResults = this.removeUndefinedValidationResults(fieldValidationResults);
      this.setGlobalKeyToEmptyKeys(filteredFieldValidationResults);

      formValidationResult.succeeded = filteredFieldValidationResults.every(fvr => fvr.succeeded);
      formValidationResult.fieldErrors = filteredFieldValidationResults.filter(fvr => fvr.key !== consts.globalFormValidationId);
      formValidationResult.formGlobalErrors = filteredFieldValidationResults.filter(fvr => fvr.key === consts.globalFormValidationId);
    }

    return formValidationResult;
  }

  private removeUndefinedValidationResults(fieldValidationResults: Array<FieldValidationResult>): Array<FieldValidationResult> {
    return fieldValidationResults.filter(
      fvr => fvr !== undefined &&
        fvr !== null
    );
  }

  private setGlobalKeyToEmptyKeys(fieldValidationResults: Array<FieldValidationResult>) {
    fieldValidationResults.forEach(fieldValidationResult => {
      if (!fieldValidationResult.key) {
        fieldValidationResult.key = consts.globalFormValidationId;
      }
    });
  }
}

let validationsResultBuilder = new ValidationsResultBuilder();

export {
  validationsResultBuilder
}
