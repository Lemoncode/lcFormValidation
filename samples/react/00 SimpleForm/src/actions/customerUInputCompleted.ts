import {actionsDef} from "./actionsDef";
import {FieldValidationResult} from 'lc-form-validation';

interface ICustomerUIInputCompletedAction {
    type: string;
    fieldName: string;
    value: any;
    fieldValidationResult: FieldValidationResult;
}

let customerUIInputCompleted = (fieldName : string, value: any, fieldValidationResult : FieldValidationResult) : ICustomerUIInputCompletedAction => {

   return {
     type: actionsDef.customer.CUSTOMER_PROCESS_UI_INPUT_COMPLETED,
     fieldName,
     value,
     fieldValidationResult
   }
}

export {
    ICustomerUIInputCompletedAction,
    customerUIInputCompleted
}
