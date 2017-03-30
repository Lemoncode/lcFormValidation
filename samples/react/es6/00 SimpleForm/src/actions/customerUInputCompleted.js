import { actionsDef } from "./actionsDef";

export const customerUIInputCompleted = (fieldName, value, fieldValidationResult) => {
  return {
    type: actionsDef.customer.CUSTOMER_PROCESS_UI_INPUT_COMPLETED,
    fieldName,
    value,
    fieldValidationResult
  }
};
