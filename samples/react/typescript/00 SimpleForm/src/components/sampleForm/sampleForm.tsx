import * as React from 'react';
import { Input } from '../common/input';
import { CustomerEntity } from '../../entity/customerEntity';
import { CustomerErrors } from '../../entity/customerErrors';

interface Props extends React.Props<SampleForm> {
  customer: CustomerEntity;
  errors: CustomerErrors;
  fireValidationFieldValueChanged: (viewModel: any, fieldName: string, value: any) => void;
  saveCustomer: (customer: CustomerEntity) => void;
}

export class SampleForm extends React.Component<Props, {}> {

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
    this.updateMemberFromUI = this.updateMemberFromUI.bind(this);
  }

  private updateMemberFromUI(event) {
    const field = event.target.name;
    const value = event.target.value;

    this.props.fireValidationFieldValueChanged(this.props.customer, field, value);
  }

  private onSave(event) {
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
