import { actionsDef } from './actionsDef';

export const signupRequestCompleted = (formValidationResult) => {
  return {
    type: actionsDef.signup.SIGNUP_REQUEST_COMPLETED,
    formValidationResult
  }
};
