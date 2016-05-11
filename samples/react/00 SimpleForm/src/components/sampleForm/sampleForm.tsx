import * as React from 'react';
import {Input} from '../common/input';
import {CustomerEntity} from '../../entity/customerEntity';
import { CustomerErrors } from '../../entity/customerErrors';

interface Props extends React.Props<SampleForm> {
  customer : CustomerEntity;
  errors : CustomerErrors;
  fireValidationFieldValueChanged  : (viewModel : any, fieldName : string, value : any) => void;
  saveCustomer: (customer : CustomerEntity) => void
}

export class SampleForm extends React.Component<Props, {}> {
  private updateMemberFromUI(event) {
    var field = event.target.name;
    var value = event.target.value;

    this.props.fireValidationFieldValueChanged(this.props.customer, field, value);
  }

  private OnSave(event) {
    event.preventDefault();
    this.props.saveCustomer(this.props.customer);
  }

  public render() {
     return (
       <form>
           <h1>Customer Form</h1>

           <Input
               name="fullname"
               label="full name"
               value={this.props.customer.fullname}
               onChange={this.updateMemberFromUI.bind(this)}
               error={(!this.props.errors.fullname) ? '' : this.props.errors.fullname.errorMessage} />

               <Input
                   name="password"
                   label="password"
                   value={this.props.customer.password}
                   onChange={this.updateMemberFromUI.bind(this)}
                   error={(!this.props.errors.password) ? '' : this.props.errors.password.errorMessage} />

                   <input type="submit" value="Save" className="btn btn-default"
                       onClick={this.OnSave.bind(this)} />
      </form>
     );
  }
}
