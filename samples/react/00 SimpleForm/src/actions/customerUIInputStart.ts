import {Promise} from 'es6-promise';
import {actionsDef} from './actionsDef';
import {FieldValidationResult} from 'lc-form-validation';
import {customerUIInputCompleted} from './customerUInputCompleted';
// IMPORTANT !! npm install will install the lcFormValidatin from local but not the d.ts
import {customerFormValidation} from '../components/sampleForm/validations/customerFormValidation';

export function customerUIInputStart(viewModel : any, fieldName : string, value: any) {

    return (dispatcher) => {
        customerFormValidation.validateField(viewModel, fieldName, value).then(
          function(fieldValidationResult: FieldValidationResult) {
             dispatcher(customerUIInputCompleted(fieldName, value, fieldValidationResult));
          }
        );
    }
}
