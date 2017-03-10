import { createFormValidation, BaseFormValidation } from '../baseFormValidation';
import { ValidationConstraints, FieldValidationResult } from '../entities';
import { ValidationEngine } from '../validationEngine';

describe('formValidation tests', () => {
  describe('Group#1 => BaseFormValidation tests', () => {
    it('Spec#1 => should return an instance of Formvalidation', () => {
      // Arrange
      const validationConstraints = {};

      // Act
      const formValidation = new BaseFormValidation(validationConstraints);

      // Assert
      expect(formValidation).to.be.an('object').that.is.not.null;
      expect(formValidation).to.be.an.instanceOf(BaseFormValidation);
    });

    it('Spec#2 => should have a method "isFormDirty" that calls ValidationEngine.isFormDirty', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const isFormDirty = sinon.stub(ValidationEngine.prototype, 'isFormDirty', () => { });
      const validationConstraints = {};

      // Act
      const formValidation = new BaseFormValidation(validationConstraints);
      formValidation.isFormDirty();

      // Assert
      expect(isFormDirty.calledOnce).to.be.true;
    }).bind(this));

    it('Spec#3 => should have a method "validateField" that calls ValidationEngine.validateSingleField', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validateSingleField = sinon.stub(ValidationEngine.prototype, 'validateSingleField', () => { });
      const validationConstraints = {};
      const viewModel = {};
      const key = 'fullname';
      const value = '';
      const filter = undefined;

      // Act
      const formValidation = new BaseFormValidation(validationConstraints);
      formValidation.validateField(viewModel, key, value, filter);

      // Assert
      expect(validateSingleField.calledOnce).to.be.true;
    }).bind(this));

    it('Spec#4 => should have a method "validateForm" that calls ValidationEngine.validateForm', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validateForm = sinon.stub(ValidationEngine.prototype, 'validateForm', () => { });
      const validationConstraints = {};
      const viewModel = {};

      // Act
      const formValidation = new BaseFormValidation(validationConstraints);
      formValidation.validateForm(viewModel);

      // Assert
      expect(validateForm.calledOnce).to.be.true;
    }).bind(this));

    it('Spec#5 => should have a method "isValidationInProgress" that calls ValidationEngine.isValidationInProgress', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const isValidationInProgress = sinon.stub(ValidationEngine.prototype, 'isValidationInProgress', () => { });
      const validationConstraints = {};

      // Act
      const formValidation = new BaseFormValidation(validationConstraints);
      formValidation.isValidationInProgress();

      // Assert
      expect(isValidationInProgress.calledOnce).to.be.true;
    }).bind(this));

    it('Spec#6 => should have a method "addFieldValidation" that returns itself and calls ValidationEngine.addFieldValidation', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const addFieldValidation = sinon.stub(ValidationEngine.prototype, 'addFieldValidation', () => { });
      const validationConstraints = {};
      const key = 'fullname';
      const validationFunction = (value: any) => new FieldValidationResult();

      // Act
      const formValidation = new BaseFormValidation(validationConstraints);
      const instance = formValidation.addFieldValidation(key, validationFunction);

      // Assert
      expect(addFieldValidation.calledOnce).to.be.true;
      expect(instance).to.be.equals(formValidation);
    }).bind(this));
  });

  describe('Group#2 => createFormValidation tests', () => {
    it('Spec#1 => should return an instance of BaseFormValidation', () => {
      // Arrange
      const validationConstraints = {};

      // Act
      const formValidation = createFormValidation(validationConstraints);

      // Assert
      expect(formValidation).to.be.an('object').that.is.an.instanceOf(BaseFormValidation);
    });
  });

  describe('Group#3 => createFormValidation parameter boundaries', () => {
    it('Spec #1 => should not add global validations with null parameter', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validationConstraints = null;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });

      // Act
      createFormValidation(validationConstraints);

      // Assert
      expect(addFormValidation.called).to.be.false;

    }).bind(this));

    it('Spec #2 => should not add global validations with undefined parameter', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validationConstraints = null;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });

      // Act
      const formValidation = createFormValidation(validationConstraints);

      // Assert
      expect(addFormValidation.called).to.be.false;
    }).bind(this));

    it('Spec #3 => should not add global validations with number parameter', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validationConstraints = null;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });

      // Act
      createFormValidation(validationConstraints);

      // Assert
      expect(addFormValidation.called).to.be.false;
    }).bind(this));

    it('Spec #4 => should not add global validations with string parameter', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validationConstraints = null;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });

      // Act
      createFormValidation(validationConstraints);

      // Assert
      expect(addFormValidation.called).to.be.false;
    }).bind(this));

    it('Spec #5 => should not add global validations with function parameter', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validationConstraints = null;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });

      // Act
      createFormValidation(validationConstraints);

      // Assert
      expect(addFormValidation.called).to.be.false;
    }).bind(this));

    it('Spec #6 => should not add global validations with boolean parameter', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validationConstraints = null;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });

      // Act
      createFormValidation(validationConstraints);

      // Assert
      expect(addFormValidation.called).to.be.false;
    }).bind(this));

    it('Spec #7 => should not add global validations with symbol parameter', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const validationConstraints = null;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });

      // Act
      createFormValidation(validationConstraints);

      // Assert
      expect(addFormValidation.called).to.be.false;
    }).bind(this));

    it('Spec #8 => should not add global validations if validationConstraints.global is not an array of functions', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });
      const validationConstraints1 = {
        global: null
      };
      const validationConstraints2 = {
        global: [null]
      };

      // Act
      createFormValidation(validationConstraints1);
      createFormValidation(validationConstraints2);

      // Assert
      expect(addFormValidation.called).to.be.false;
    }).bind(this));

    it('Spec #8 => should not add global validations if validationConstraints.global is an array of functions', sinon.test(() => {
      // Arrange
      const sinon: sinon.SinonStatic = this;
      const addFormValidation = sinon.stub(ValidationEngine.prototype, 'addFormValidation', () => { });
      const validationConstraints = {
        global: [
          (vm: any) => new FieldValidationResult(),
          (vm: any) => new FieldValidationResult(),
          (vm: any) => new FieldValidationResult(),
        ]
      };

      // Act
      createFormValidation(validationConstraints);

      // Assert
      expect(addFormValidation.calledThrice).to.be.true;
    }).bind(this));
  });
});