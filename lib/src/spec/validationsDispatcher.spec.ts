import { validationsDispatcher } from '../validationsDispatcher';
import { FieldValidationResult } from '../entities';

describe('ValidationsDispatcher', () => {
  describe('Group #1 => When calling fireSingleFieldValidations', () => {
    it('Spec #1 => should return undefined FieldValidationResult ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals undefined', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationsPerField = undefined;

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;
            done();
          });
      });

    it('Spec #2 => should return undefined FieldValidationResult ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals null', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationsPerField = null;

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;
            done();
          });
      });

    it('Spec #3 => should return undefined FieldValidationResult ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals []', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationsPerField = [];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;
            done();
          });
      });

    it('Spec #4 => should return succeeded FieldValidationResult and calls to successful validation function' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals successful validation function', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy = sinon.spy(validationFn);
        let validationsPerField = [validationFnSpy];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.true;
            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value)).to.be.true;
            done();
          });
      });

    it('Spec #5 => should return failed FieldValidationResult and calls to failed validation function' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals successful validation function', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy = sinon.spy(validationFn);
        let validationsPerField = [validationFnSpy];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;
            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value)).to.be.true;
            done();
          });
      });

    it('Spec #6 => should return failed FieldValidationResult and calls only to first validation function' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items' +
      'first equals failed validation function' +
      'second equals failed validation function', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };
        let validationFn2 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy1 = sinon.spy(validationFn1);
        let validationFnSpy2 = sinon.spy(validationFn2);
        let validationsPerField = [validationFnSpy1, validationFnSpy2];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value)).to.be.false;
            done();
          });
      });

    it('Spec #7 => should return failed FieldValidationResult and calls only to first validation function' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items' +
      'first equals failed validation function' +
      'second equals successful validation function', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };
        let validationFn2 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy1 = sinon.spy(validationFn1);
        let validationFnSpy2 = sinon.spy(validationFn2);
        let validationsPerField = [validationFnSpy1, validationFnSpy2];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value)).to.be.false;
            done();
          });
      });

    it('Spec #8 => should return failed FieldValidationResult and calls to first and second validation functions' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items' +
      'first equals successful validation function' +
      'second equals failed validation function', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          return Promise.resolve(fieldValidationResult);
        };
        let validationFn2 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy1 = sinon.spy(validationFn1);
        let validationFnSpy2 = sinon.spy(validationFn2);
        let validationsPerField = [validationFnSpy1, validationFnSpy2];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.true;
            expect(validationFnSpy2.calledWith(vm, value)).to.be.true;
            done();
          });
      });

    it('Spec #9 => should return succeeded and key equals "test2" FieldValidationResult and calls to first and second validation functions' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items' +
      'first equals successful validation function' +
      'second equals successful validation function', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          fieldValidationResult.key = "test1"
          return Promise.resolve(fieldValidationResult);
        };
        let validationFn2 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          fieldValidationResult.key = "test2";
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy1 = sinon.spy(validationFn1);
        let validationFnSpy2 = sinon.spy(validationFn2);
        let validationsPerField = [validationFnSpy1, validationFnSpy2];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.true;
            expect(fieldValidationResult.key).to.be.equal("test2");

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.true;
            expect(validationFnSpy2.calledWith(vm, value)).to.be.true;
            done();
          });
      });

    it('Spec #10 => should return undefined FieldValidationResult and calls to validation functions ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals validation function resolving a fieldValidationResult equals undefined', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn = (vm, value) => {
          let fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy = sinon.spy(validationFn);
        let validationsPerField = [validationFnSpy];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;

            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value)).to.be.true;
            done();
          });
      });

    it('Spec #11 => should return null FieldValidationResult and calls to validation functions ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals validation function resolving a fieldValidationResult equals null', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn = (vm, value) => {
          let fieldValidationResult = null;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy = sinon.spy(validationFn);
        let validationsPerField = [validationFnSpy];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.null;

            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value)).to.be.true;
            done();
          });
      });

    it('Spec #11 => should return empty FieldValidationResult and calls to validation functions ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals validation function resolving a fieldValidationResult equals ""', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn = (vm, value) => {
          let fieldValidationResult = '';
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy = sinon.spy(validationFn);
        let validationsPerField = [validationFnSpy];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.empty;

            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value)).to.be.true;
            done();
          });
      });

    it('Spec #12 => should return undefined FieldValidationResult and calls to first validation function ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items ' +
      'first equals validation function resolving a fieldValidationResult equals undefined' +
      'second equals successful validation function', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };
        let validationFn2 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          fieldValidationResult.key = "test2";
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy1 = sinon.spy(validationFn1);
        let validationFnSpy2 = sinon.spy(validationFn2);
        let validationsPerField = [validationFnSpy1, validationFnSpy2];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value)).to.be.false;
            done();
          });
      });

    it('Spec #13 => should return undefined FieldValidationResult and calls to first validation function ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items ' +
      'first equals validation function resolving a fieldValidationResult equals undefined' +
      'second equals failed validation function', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };
        let validationFn2 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          fieldValidationResult.key = "test2";
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy1 = sinon.spy(validationFn1);
        let validationFnSpy2 = sinon.spy(validationFn2);
        let validationsPerField = [validationFnSpy1, validationFnSpy2];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value)).to.be.false;
            done();
          });
      });

    it('Spec #14 => should return failed and key equals "test1" FieldValidationResult and calls to first validation function ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items ' +
      'first equals failed validation function' +
      'second equals validation function resolving a fieldValidationResult equals undefined', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          fieldValidationResult.key = "test1";
          return Promise.resolve(fieldValidationResult);
        };
        let validationFn2 = (vm, value) => {
          let fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy1 = sinon.spy(validationFn1);
        let validationFnSpy2 = sinon.spy(validationFn2);
        let validationsPerField = [validationFnSpy1, validationFnSpy2];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;
            expect(fieldValidationResult.key).to.be.equal('test1');

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value)).to.be.false;
            done();
          });
      });

    it('Spec #15 => should return undefined FieldValidationResult and calls to first and second validation functions ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items ' +
      'first equals successful validation function' +
      'second equals validation function resolving a fieldValidationResult equals undefined', (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          fieldValidationResult.key = "test1";
          return Promise.resolve(fieldValidationResult);
        };
        let validationFn2 = (vm, value) => {
          let fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };

        let validationFnSpy1 = sinon.spy(validationFn1);
        let validationFnSpy2 = sinon.spy(validationFn2);
        let validationsPerField = [validationFnSpy1, validationFnSpy2];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.true;
            expect(validationFnSpy2.calledWith(vm, value)).to.be.true;
            done();
          });
      });
  });

  describe('Group #2 => When calling fireAllFieldsValidations', () => {
    it('Spec #1 => should return empty array' +
      'When passing vm equals undefined and validationFn equals undefined', () => {
        // Arrange
        let vm = undefined;
        let validationFn = undefined;

        // Act
        let fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, validationFn);

        // Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #2 => should return empty array' +
      'When passing vm equals null and validationFn equals undefined', () => {
        //Arrange
        let vm = null;
        let validationFn = undefined;

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #3 => should return empty array' +
      'When passing vm equals "" and validationFn equals undefined', () => {
        //Arrange
        let vm = "";
        let validationFn = undefined;

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #4 => should return empty array' +
      'When passing vm equals { } and validationFn equals undefined', () => {
        //Arrange
        let vm = {};
        let validationFn = undefined;

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #5 => should return empty array and it does not call to validationFn' +
      'When passing vm equals { } and validationFn equals function', () => {
        //Arrange
        let vm = {};
        let validationFnSpy = sinon.spy();

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, validationFnSpy);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
        expect(validationFnSpy.called).to.be.false;
      });

    it('Spec #6 => should return array with one item and it calls to validationFn' +
      'When passing vm equals { testVmProperty: "test" } and validationFn equals function', () => {
        //Arrange
        let vm = {
          testVmProperty: 'test'
        };
        let validationFnSpy = sinon.spy();

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, validationFnSpy);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.called).to.be.true;
      });
  });

  describe('Group #3 => When calling fireGlobalFormValidations', () => {
    it('Spec #1 => should return empty array ' +
      'When passing vm equals undefined, validations equals undefined', () => {
        //Arrange
        let vm = undefined;
        let validations = undefined;

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #2 => should return empty array ' +
      'When passing vm equals undefined, validations equals null', () => {
        //Arrange
        let vm = undefined;
        let validations = null;

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #3 => should return empty array ' +
      'When passing vm equals undefined, validations equals []', () => {
        //Arrange
        let vm = undefined;
        let validations = [];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #4 => should return array with one item and it calls to validationFn' +
      'When passing vm equals undefined, validations equals array with one validationFn', () => {
        //Arrange
        let vm = undefined;
        let validationFnSpy = sinon.spy();
        let validations = [validationFnSpy];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #5 => should return array with one item and it calls to validationFn' +
      'When passing vm equals null, validations equals array with one validationFn', () => {
        //Arrange
        let vm = null;
        let validationFnSpy = sinon.spy();
        let validations = [validationFnSpy];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #6 => should return array with one item and it calls to validationFn' +
      'When passing vm equals "", validations equals array with one validationFn', () => {
        //Arrange
        let vm = '';
        let validationFnSpy = sinon.spy();
        let validations = [validationFnSpy];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #7 => should return array with one item and it calls to validationFn' +
      'When passing vm equals "test", validations equals array with one validationFn', () => {
        //Arrange
        let vm = 'test';
        let validationFnSpy = sinon.spy();
        let validations = [validationFnSpy];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #8 => should return array with one item and it calls to validationFn' +
      'When passing vm equals 1, validations equals array with one validationFn', () => {
        //Arrange
        let vm = 1;
        let validationFnSpy = sinon.spy();
        let validations = [validationFnSpy];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #9 => should return array with one item and it calls to validationFn' +
      'When passing vm equals function, validations equals array with one validationFn', () => {
        //Arrange
        let vm = function () {
          return "this is a function";
        };
        let validationFnSpy = sinon.spy();
        let validations = [validationFnSpy];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #10 => should return array with one item and it calls to validationFn' +
      'When passing vm equals array, validations equals array with one validationFn', () => {
        //Arrange
        let vm = Array<any>();
        let validationFnSpy = sinon.spy();
        let validations = [validationFnSpy];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #11 => should return array with one item and it calls to validationFn' +
      'When passing vm equals object, validations equals array with one validationFn', () => {
        //Arrange
        let vm = {
          testProperty: "testValue"
        };
        let validationFnSpy = sinon.spy();
        let validations = [validationFnSpy];

        //Act
        let fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #12 => should return rejected promise' +
      'When passing a validation function that throws an error ' +
      'and error management is set to default behavior for that validation fn'
      , (done) => {
        //Arrange
        let vm = undefined;
        let value = undefined;
        let validationFn1 = (vm, value) => {
          let fieldValidationResult = new FieldValidationResult();
          // throw an error
          let shouldThrowError = true;
          if (shouldThrowError == true) {
            throw "Error !!";
          }

          return Promise.resolve(fieldValidationResult);
        };

        let validationsPerField = [validationFn1];

        //Act
        var fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        expect(fieldValidationResultPromise).to.eventually.be.rejected.notify(done);
      });

  });
});
