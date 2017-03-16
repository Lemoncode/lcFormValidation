import { connect } from 'react-redux';
import { SampleSignupForm } from './sampleSignupForm';
import { SignupEntity } from '../../entity/signupEntity';
import { signupRequestStart } from '../../actions/signupRequestStart';
import { signupUIOnInteractionStart } from '../../actions/signupUIOnInteractionStart';
import { ValidationFilters } from 'lc-form-validation';

let mapStateToProps = (state) => {
  return {
    signup: state.signup.signup, // ViewModel
    errors: state.signup.signupErrors
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    fireValidationField: (viewModel: any, fieldName: string, value: any, filter?: ValidationFilters) => {
      return dispatch(signupUIOnInteractionStart(viewModel, fieldName, value, filter));
    },
    performSignup: (signup: SignupEntity) => {
      return dispatch(signupRequestStart(signup));
    }
  }
}

export let SampleSignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleSignupForm);
