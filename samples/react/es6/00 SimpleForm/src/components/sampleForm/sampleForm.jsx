import * as React from 'react';
import { Input } from '../common/input';
import { CustomerEntity } from '../../entity/customerEntity';
import { FieldValidationResult } from 'lc-form-validation';

export class SampleForm extends React.Component {
  static propTypes = {
    fireValidationFieldValueChanged: React.PropTypes.func.isRequired,
    saveCustomer: React.PropTypes.func.isRequired,
    customer: React.PropTypes.instanceOf(CustomerEntity).isRequired,
    errors: React.PropTypes.shape({
      fullname: React.PropTypes.instanceOf(FieldValidationResult),
      password: React.PropTypes.instanceOf(FieldValidationResult),
    }),
  };

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
    this.updateMemberFromUI = this.updateMemberFromUI.bind(this);
  }

  updateMemberFromUI(event) {
    const field = event.target.name;
    const value = event.target.value;

    this.props.fireValidationFieldValueChanged(this.props.customer, field, value);
  }

  onSave(event) {
    event.preventDefault();
    this.props.saveCustomer(this.props.customer);
  }

  render() {
    return (
      <form>
        <h1>Customer Form</h1>

        <Input
          name="fullname"
          label="full name"
          value={this.props.customer.fullname}
          onChange={this.updateMemberFromUI}
          error={(!this.props.errors.fullname) ? '' : this.props.errors.fullname.errorMessage} />

        <Input
          name="password"
          label="password"
          type="password"
          value={this.props.customer.password}
          onChange={this.updateMemberFromUI}
          error={(!this.props.errors.password) ? '' : this.props.errors.password.errorMessage} />

        <input type="submit" value="Save" className="btn btn-default"
          onClick={this.onSave} />
      </form>
    );
  }
}
