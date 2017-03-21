import { actionsDef } from './actionsDef';
import { FormValidationResult } from 'lc-form-validation';

interface ISignupRequestCompletedAction {
  type: string;
  formValidationResult: FormValidationResult;
}

const signupRequestCompleted = (formValidationResult: FormValidationResult): ISignupRequestCompletedAction => {
  return {
    type: actionsDef.signup.SIGNUP_REQUEST_COMPLETED,
    formValidationResult
  }
}

export {
  ISignupRequestCompletedAction,
  signupRequestCompleted
}
