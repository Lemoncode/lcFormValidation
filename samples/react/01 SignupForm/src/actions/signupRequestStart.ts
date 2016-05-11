import {Promise} from 'es6-promise';
import {FormValidationResult} from 'lc-form-validation';
import {signupRequestCompleted} from './signupRequestCompleted';
import {signupFormValidation} from '../components/sampleSignupForm/validations/signupFormValidation';

export function signupRequestStart(viewModel : any) {
  return ( dispatcher) => {
    signupFormValidation.validateForm(viewModel).then(
      function(formValidationResult : FormValidationResult) {
        if (formValidationResult.succeeded) {
          console.log("Sign up completed");
        }
        dispatcher(signupRequestCompleted(formValidationResult));
      }
    );
  }
}
