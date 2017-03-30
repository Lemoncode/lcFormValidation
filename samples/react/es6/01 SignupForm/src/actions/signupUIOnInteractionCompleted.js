import { actionsDef } from './actionsDef';

export const signupUIOnInteractionCompleted = (fieldName, value, fieldValidationResult) => {
  return {
    type: actionsDef.signup.SIGNUP_PROCESS_UI_INTERACTION_COMPLETED,
    fieldName,
    value,
    fieldValidationResult
  }
};
