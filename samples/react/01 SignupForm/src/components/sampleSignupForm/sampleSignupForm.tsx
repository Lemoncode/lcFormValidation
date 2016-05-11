import * as React from 'react';
import {Input} from '../common/input';
import {SignupEntity} from '../../entity/signupEntity';
import { SignupErrors } from '../../entity/signupErrors';

interface Props extends React.Props<any> {
  signup : SignupEntity;
  errors : SignupErrors;
  fireValidationField : (viewModel : any, fieldName : string, value : string, filter? : any) => void;
  performSignup : (signup : SignupEntity) => void;
}

export class SampleSignupForm extends React.Component<Props, {}> {
  private applyFieldValidation(event, filter : any = undefined) {
    const field = event.target.name;
    const value = event.target.value;

    this.props.fireValidationField(this.props.signup, field, value, filter);
  }

  private onSave(event) {
    event.preventDefault();
    this.props.performSignup(this.props.signup);
  }

  public render() {
    return (
      <form>
        <h1>Signup Form</h1>
        <Input
          name="login"
          label="login"
          value={this.props.signup.login}
          onChange={(event) => {
            this.applyFieldValidation(event);
          }}
          onBlur={(event) =>{
            this.applyFieldValidation(event, { OnBlur : true });
          }}
          error={(this.props.errors.login) ? this.props.errors.login.errorMessage : ''}/>

        <Input
          name="password"
          label="password"
          value={this.props.signup.password}
          onChange={(event) => {
            this.applyFieldValidation(event);
          }}
          error={(this.props.errors.password) ? this.props.errors.password.errorMessage : ''}/>

        <Input
          name="confirmPassword"
          label="confirm password"
          value={this.props.signup.confirmPassword}
          onChange={(event) => {
            this.applyFieldValidation(event);
          }}
          error={(this.props.errors.confirmPassword) ? this.props.errors.confirmPassword.errorMessage : ''}/>
        <input type="submit" value="Save" className="btn btn-default"
          onClick={(event) => {this.onSave(event)}}/>
      </form>
    );
  }
}
