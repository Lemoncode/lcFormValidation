import { } from 'core-js';
import { CustomerEntity } from '../entity/customerEntity';
import { CustomerErrors } from '../entity/customerErrors';
import { FormValidationResult, FieldValidationResult } from 'lc-form-validation';
import { actionsDef } from '../actions/actionsDef';
import { ICustomerUIInputCompletedAction } from '../actions/customerUInputCompleted';
import { ICustomerSaveCompletedAction } from '../actions/customerSaveCompleted';

export class CustomerState {
  customer: CustomerEntity;
  customerErrors: CustomerErrors;

  constructor() {
    this.customer = new CustomerEntity();
    this.customerErrors = new CustomerErrors();
  }
}

export const customerReducer = (state: CustomerState = new CustomerState(), action): CustomerState => {
  switch (action.type) {
    case actionsDef.customer.CUSTOMER_PROCESS_UI_INPUT_COMPLETED:
      return customerProcessUIInputCompleted(state, action);

    case actionsDef.customer.CUSTOMER_SAVE_COMPLETED:
      return customerSaveCompleted(state, action);

    default:
      return state;
  }
};

function customerProcessUIInputCompleted(state: CustomerState, action: ICustomerUIInputCompletedAction): CustomerState {
  const newCustomer: CustomerEntity = {
    ...state.customer,
    [action.fieldName]: action.value
  };

  const newCustomerErrors: CustomerErrors = {
    ...state.customerErrors,
    [action.fieldName]: action.fieldValidationResult
  };

  return {
    ...state,
    customer: newCustomer,
    customerErrors: newCustomerErrors
  };
}

function customerSaveCompleted(state: CustomerState, action: ICustomerSaveCompletedAction): CustomerState {
  const newCustomerErrors: CustomerErrors = Object.assign({}, state.customerErrors);

  action.formValidationResult.fieldErrors.forEach(fieldValidationResult => {
    newCustomerErrors[fieldValidationResult.key] = fieldValidationResult;
  });

  return {
    ...state,
    customerErrors: newCustomerErrors
  };
}
