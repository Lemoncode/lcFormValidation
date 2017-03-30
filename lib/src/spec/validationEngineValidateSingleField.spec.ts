import { ValidationEngine } from '../validationEngine';
import { FieldValidationResult } from '../entities';

describe('lcFormValidation simple form', () => {
  it('should return isValidationInProgress true if validations are inProgress', (done) => {
    // Arrange
    const formValidationBase: ValidationEngine = new ValidationEngine();
    const viewModel = { id: '1', fullname: 'john' };

    // Act
    formValidationBase.addFieldValidation('fullname',
      (value, vm): Promise<FieldValidationResult> => {
        // Required field
        // in this case no async stuff
        // we can directly resolve the promise
        let isFieldInformed: boolean = (value && value.length > 0);
        // We could use string ID's if multilanguage is required
        let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

        const validationResult: FieldValidationResult = new FieldValidationResult();
        validationResult.type = "REQUIRED";
        validationResult.succeeded = isFieldInformed;
        validationResult.errorMessage = errorInfo;

        return Promise.resolve(validationResult);
      }
    );

    formValidationBase
      .validateField(viewModel, 'fullname', 'newContent')
      .then((errors) => {
        // Assert
        expect(formValidationBase.isValidationInProgress()).to.be.false;
        done();
      });


    // Assert
    expect(formValidationBase.isValidationInProgress()).to.be.true;
  });

  it('should return a validation error array with one item (field required) for the name field',
    (done) => {
      // Arrange
      const formValidationBase: ValidationEngine = new ValidationEngine();
      const viewModel = { id: '1', fullname: 'john' };

      // Act
      formValidationBase.addFieldValidation('fullname',
        (value, vm): Promise<FieldValidationResult> => {
          // Required field
          // in this case no async stuff
          // we can directly resolve the promise
          let isFieldInformed: boolean = (value != null && value.length > 0);
          // We could use string ID's if multilanguage is required
          let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        }
      );

      formValidationBase
        .validateField(viewModel, 'fullname', '')
        .then((fieldValidationResult: FieldValidationResult) => {
          // Assert
          expect(fieldValidationResult.key).to.be.equal('fullname');
          expect(fieldValidationResult.type).to.equal('REQUIRED');
          expect(fieldValidationResult.succeeded).to.be.false;
          expect(fieldValidationResult.errorMessage).to.equal("Mandatory field");
          done();
        });
    });

  it('should return an empty validation array (field required) for the name field',
    (done) => {
      // Arrange
      const formValidationBase: ValidationEngine = new ValidationEngine();
      const viewModel = { id: '1', fullname: 'john' };

      // Act
      formValidationBase.addFieldValidation('fullname',
        (value, vm): Promise<FieldValidationResult> => {
          // Required field
          // in this case no async stuff
          // we can directly resolve the promise
          let isFieldInformed: boolean = (value != null && value.length > 0);
          // We could use string ID's if multilanguage is required
          let errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

          const validationResult: FieldValidationResult = new FieldValidationResult();
          validationResult.type = "REQUIRED";
          validationResult.succeeded = isFieldInformed;
          validationResult.errorMessage = errorInfo;

          return Promise.resolve(validationResult);
        }
      );

      formValidationBase
        .validateField(viewModel, 'fullname', 'john')
        .then((fieldValidationResult: FieldValidationResult) => {

          // Assert
          expect(fieldValidationResult.key).to.be.equal('fullname');
          expect(fieldValidationResult.type).to.equal('REQUIRED');
          expect(fieldValidationResult.succeeded).to.be.true;
          expect(fieldValidationResult.errorMessage).to.be.empty;
          done();
        });
    });

  it('should return a promise reject error (validation throws unexpected error)', (done) => {
    // Arrange
    const formValidationBase: ValidationEngine = new ValidationEngine();
    const viewModel = { id: '1', fullname: 'john' };
    const thrownErrorMessage = "Intentionally uncontrolled error, single field validation testing trigger field validations";

    // Act
    formValidationBase.addFieldValidation('fullname',
      (value, vm): Promise<FieldValidationResult> => {
        throw new Error(thrownErrorMessage);
      }
    );

    const promise = formValidationBase.validateField(viewModel, 'fullname', '');

    //Assert
    expect(promise).to.eventually.be.rejected.and.notify(done);
  });

});
