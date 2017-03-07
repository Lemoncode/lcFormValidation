import { FieldValidationResult, BaseFormValidation } from 'lc-form-validation';

class CustomerFormValidation extends BaseFormValidation {

  public constructor() {
    super();

    // TODO: Implement Issue #17
    // TODO: Implement Issue #6
    this._validationEngine.addFieldValidation('fullname',
      (value, vm): FieldValidationResult => {
        let isFieldInformed: boolean = (value && value.length > 0);
        let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

        const validationResult: FieldValidationResult = new FieldValidationResult();
        validationResult.type = "REQUIRED";
        validationResult.succeeded = isFieldInformed;
        validationResult.errorMessage = errorInfo;

        return validationResult;
      }
    )


  }
}

let customerFormValidation = new CustomerFormValidation();

export {
  customerFormValidation
};
