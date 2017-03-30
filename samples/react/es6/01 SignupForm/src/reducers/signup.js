import { } from 'core-js';
import { SignupEntity } from '../entity/signupEntity';
import { FormValidationResult, FieldValidationResult } from 'lc-form-validation';
import { actionsDef } from '../actions/actionsDef';
import { ISignupRequestCompletedAction } from '../actions/signupRequestCompleted';
import { ISignupUIOnInteractionCompletedAction } from '../actions/signupUIOnInteractionCompleted';

class SignupState {
  constructor() {
    this.signup = new SignupEntity();
    this.signupErrors = {};
  }
}

export const signupReducer = (state = new SignupState(), action) => {
  switch (action.type) {
    case actionsDef.signup.SIGNUP_PROCESS_UI_INTERACTION_COMPLETED:
      return signupProcessCompleted(state, action);

    case actionsDef.signup.SIGNUP_REQUEST_COMPLETED:
      return performSignupCompleted(state, action);

    default:
      return state;
  }
}

function signupProcessCompleted(state, action) {
  const newSignup = Object.assign(new SignupEntity(), state.signup, {
    [action.fieldName]: action.value
  });

  const newSignupErrors = {
    ...state.signupErrors,
    [action.fieldName]: action.fieldValidationResult
  };

  return {
    ...state,
    signup: newSignup,
    signupErrors: newSignupErrors
  };
}

function performSignupCompleted(state, action) {
  const newSignupErrors = { ...state.signupErrors };

  action.formValidationResult.fieldErrors.forEach(fieldValidationResult => {
    newSignupErrors[fieldValidationResult.key] = fieldValidationResult;
  });

  return {
    ...state,
    signupErrors: newSignupErrors
  };
}
