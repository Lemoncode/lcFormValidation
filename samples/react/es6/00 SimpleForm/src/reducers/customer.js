import { } from 'core-js';
import { FormValidationResult, FieldValidationResult } from 'lc-form-validation';
import { actionsDef } from '../actions/actionsDef';
import { CustomerEntity } from '../entity/customerEntity';
import { ICustomerUIInputCompletedAction } from '../actions/customerUInputCompleted';
import { ICustomerSaveCompletedAction } from '../actions/customerSaveCompleted';

export class CustomerState {
  constructor() {
    this.customer = new CustomerEntity();
    this.customerErrors = {};
  }
}

export const customerReducer = (state = new CustomerState(), action) => {
  switch (action.type) {
    case actionsDef.customer.CUSTOMER_PROCESS_UI_INPUT_COMPLETED:
      return customerProcessUIInputCompleted(state, action);

    case actionsDef.customer.CUSTOMER_SAVE_COMPLETED:
      return customerSaveCompleted(state, action);

    default:
      return state;
  }
}

function customerProcessUIInputCompleted(state, action) {
  const newCustomer = Object.assign(new CustomerEntity(), state.customer, {
    [action.fieldName]: action.value
  });

  const newCustomerErrors = {
    ...state.customerErrors,
    [action.fieldName]: action.fieldValidationResult
  };

  return {
    ...state,
    customer: newCustomer,
    customerErrors: newCustomerErrors
  };
}

function customerSaveCompleted(state, action) {
  return {
    ...state,
    customerErrors: {
      ...state.customerErrors,
      ...action.formValidationResult.fieldErrors,
    },
  };
}
