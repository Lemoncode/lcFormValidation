import { connect } from 'react-redux';
import { SampleSignupForm } from './sampleSignupForm';
import { SignupEntity } from '../../entity/signupEntity';
import { signupRequestStart } from '../../actions/signupRequestStart';
import { signupUIOnInteractionStart } from '../../actions/signupUIOnInteractionStart';
import { ValidationEventsFilter } from 'lc-form-validation';

const mapStateToProps = (state) => {
  return {
    signup: state.signup.signup, // ViewModel
    errors: state.signup.signupErrors
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fireValidationField: (viewModel, fieldName, value, filter) => {
      return dispatch(signupUIOnInteractionStart(viewModel, fieldName, value, filter));
    },
    performSignup: (signup) => {
      return dispatch(signupRequestStart(signup));
    }
  }
};

export const SampleSignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleSignupForm);
