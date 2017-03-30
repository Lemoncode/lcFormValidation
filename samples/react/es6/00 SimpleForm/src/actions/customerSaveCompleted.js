import { actionsDef } from './actionsDef';

export const customerSaveCompleted = (formValidationResult) => {
  return {
    type: actionsDef.customer.CUSTOMER_SAVE_COMPLETED,
    formValidationResult
  }
};
