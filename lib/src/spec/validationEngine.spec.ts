import { ValidationEngine } from '../validationEngine';
import { FieldValidationResult } from '../entities';

describe('ValidationEngine tests', () => {
  it('should return isFormPristine true after initialization', () => {
    // Arrange
    const formValidationBase: ValidationEngine = new ValidationEngine();

    // Assert
    expect(formValidationBase.isFormPristine()).to.be.true;
  });

  it('should return isFormPristine false after initialization and set value field', (done) => {
    // Arrange
    const formValidationBase: ValidationEngine = new ValidationEngine();
    const viewModel = [{ formFieldName: 'nameId', vmFieldName: 'name' }];

    formValidationBase
      .validateField(viewModel, 'nameId', 'newContent')
      .then((errors) => {
        // Assert
        expect(formValidationBase.isFormPristine()).to.be.false;
        done();
      });
  });

  it('should return isFormDirty false after initiazalition', () => {
    // Arrange
    const formValidationBase: ValidationEngine = new ValidationEngine();

    // Assert
    expect(formValidationBase.isFormDirty()).to.be.false;
  });

  it('should return isFormDirty true after initialization and set value field', (done) => {
    // Arrange
    const formValidationBase: ValidationEngine = new ValidationEngine();
    const viewModel = [{ formFieldName: 'nameId', vmFieldName: 'name' }];

    formValidationBase
      .validateField(viewModel, 'nameId', 'newContent')
      .then((errors) => {
        // Assert
        expect(formValidationBase.isFormDirty()).to.be.true;
        done();
      });
  });

  it('should return isValidationInProgress false after initialization', () => {
    // Arrange
    const formValidationBase: ValidationEngine = new ValidationEngine();

    // Assert
    expect(formValidationBase.isValidationInProgress()).to.be.false;
  });

  it('should return isValidationInProgress false if no validations are defined', (done) => {
    // Arrange
    const formValidationBase: ValidationEngine = new ValidationEngine();
    const viewModel = [{ formFieldName: 'nameId', vmFieldName: 'name' }];

    // Act
    formValidationBase
      .validateField(viewModel, 'nameId', 'newContent')
      .then((errors) => {
        // Assert
        expect(formValidationBase.isValidationInProgress()).to.be.false;
        done();
      });

    // Assert
    expect(formValidationBase.isValidationInProgress()).to.be.false;
  });

  it('should returns isFieldKeyMappingDefined equals false ' +
    'when passing a key equals undefined and validationsPerField equals []', () => {
      //Arrange
      let key = undefined;
      let validationEngine = new ValidationEngine();

      //Act
      let result = validationEngine.isFieldKeyMappingDefined(key);

      //Assert
      expect(result).to.be.false;
    });

  it('should returns isFieldKeyMappingDefined equals false ' +
    'when passing a key equals null and validationsPerField equals []', () => {
      //Arrange
      let key = null;
      let validationEngine = new ValidationEngine();

      //Act
      let result = validationEngine.isFieldKeyMappingDefined(key);

      //Assert
      expect(result).to.be.false;
    });

  it('should returns isFieldKeyMappingDefined equals false ' +
    'when passing a key equals "test" and validationsPerField equals []', () => {
      //Arrange
      let key = "test";
      let validationEngine = new ValidationEngine();

      //Act
      let result = validationEngine.isFieldKeyMappingDefined(key);

      //Assert
      expect(result).to.be.false;
    });

  it('should returns isFieldKeyMappingDefined equals false ' +
    'when passing a key equals "test1" and validationsPerField equals ["test2": validationFn]', () => {
      //Arrange
      let key = "test1";
      let validationFn = (value, vm) => {
        let fieldValidationResult = new FieldValidationResult();
        return Promise.resolve(fieldValidationResult);
      };
      let validationEngine = new ValidationEngine();
      validationEngine.addFieldValidation("test2", validationFn);

      //Act
      let result = validationEngine.isFieldKeyMappingDefined(key);

      //Assert
      expect(result).to.be.false;
    });

  it('should returns isFieldKeyMappingDefined equals true ' +
    'when passing a key equals "test" and validationsPerField equals ["test": validationFn]', () => {
      //Arrange
      let key = "test";
      let validationFn = (value, vm) => {
        let fieldValidationResult = new FieldValidationResult();
        return Promise.resolve(fieldValidationResult);
      }
      let validationEngine = new ValidationEngine();
      validationEngine.addFieldValidation(key, validationFn);

      //Act
      let result = validationEngine.isFieldKeyMappingDefined(key);

      //Assert
      expect(result).to.be.true;
    });

  it('should return itself after adding a validation rule using addFieldValidation method', () => {
    // Arrange
    const key = 'test1';
    const validationFn = (value, vm) => {
      return new FieldValidationResult();
    };
    const validationEngine = new ValidationEngine();

    // Act
    const result = validationEngine.addFieldValidation(key, validationFn);

    // Assert
    expect(result).not.to.be.undefined;
    expect(result).to.be.an.instanceOf(ValidationEngine);
  });

  it('should return itself after adding a validation rule using addFieldValidation method', () => {
    // Arrange
    const key = 'test1';
    const validationFn = (value, vm) => {
      return Promise.resolve(new FieldValidationResult());
    };
    const validationEngine = new ValidationEngine();

    // Act
    const result = validationEngine.addFieldValidation(key, validationFn);

    // Assert
    expect(result).not.to.be.undefined;
    expect(result).to.be.an.instanceOf(ValidationEngine);
  });
});
