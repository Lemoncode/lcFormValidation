import React from 'react';
import { Input } from '../common/input';
import { SignupEntity } from '../../entity/signupEntity';
import { ValidationEventsFilter, FieldValidationResult } from 'lc-form-validation';

export class SampleSignupForm extends React.Component {
  static propTypes = {
    signup: React.PropTypes.instanceOf(SignupEntity).isRequired,
    errors: React.PropTypes.shape({
      login: React.PropTypes.instanceOf(FieldValidationResult),
      password: React.PropTypes.instanceOf(FieldValidationResult),
      confirmPassword: React.PropTypes.instanceOf(FieldValidationResult),
    }).isRequired,
    fireValidationField: React.PropTypes.func.isRequired,
    performSignup: React.PropTypes.func.isRequired,
  };

  constructor() {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  applyFieldValidation(event, filter) {
    const { name, value } = event.target;
    this.props.fireValidationField(this.props.signup, name, value, filter);
  }

  onSave(event) {
    event.preventDefault();
    this.props.performSignup(this.props.signup);
  }

  render() {
    return (
      <form>
        <h1>Signup Form</h1>
        <Input
          type="text"
          name="login"
          label="login"
          value={this.props.signup.login}
          onChange={(event) => {
            this.applyFieldValidation(event);
          }}
          onBlur={(event) => {
            this.applyFieldValidation(event, { OnBlur: true });
          }}
          error={(this.props.errors.login) ? this.props.errors.login.errorMessage : ''} />

        <Input
          type="password"
          name="password"
          label="password"
          value={this.props.signup.password}
          onChange={(event) => {
            this.applyFieldValidation(event);
          }}
          error={(this.props.errors.password) ? this.props.errors.password.errorMessage : ''} />

        <Input
          type="password"
          name="confirmPassword"
          label="confirm password"
          value={this.props.signup.confirmPassword}
          onChange={(event) => {
            this.applyFieldValidation(event);
          }}
          error={(this.props.errors.confirmPassword) ? this.props.errors.confirmPassword.errorMessage : ''} />
        <input type="submit" value="Save" className="btn btn-default"
          onClick={this.onSave} />
      </form>
    );
  }
}
