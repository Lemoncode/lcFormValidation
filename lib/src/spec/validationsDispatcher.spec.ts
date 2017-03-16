import { validationsDispatcher } from '../validationsDispatcher';
import { FieldValidationResult, FieldValidation } from '../entities';

describe('ValidationsDispatcher', () => {
  describe('Group #1 => When calling fireSingleFieldValidations', () => {
    it('Spec #1 => should return undefined FieldValidationResult ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals undefined', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationsPerField = undefined;

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

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
        const vm = undefined;
        const value = undefined;
        const validationsPerField = null;

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

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
        const vm = undefined;
        const value = undefined;
        const validationsPerField = [];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

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
        const vm = undefined;
        const value = undefined;
        const validationFn = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy = sinon.spy(validationFn);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation: FieldValidation = {
          validationFn: validationFnSpy,
          eventsFilter,
          customParams
        };

        const validationsPerField = [fieldValidation];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.true;
            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value, customParams)).to.be.true;
            done();
          });
      });

    it('Spec #5 => should return failed FieldValidationResult and calls to failed validation function' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals successful validation function', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy = sinon.spy(validationFn);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation: FieldValidation = {
          validationFn: validationFnSpy,
          eventsFilter,
          customParams,
        };

        const validationsPerField = [fieldValidation];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;
            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value, customParams)).to.be.true;
            done();
          });
      });

    it('Spec #6 => should return failed FieldValidationResult and calls only to first validation function' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items' +
      'first equals failed validation function' +
      'second equals failed validation function', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn1 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFn2 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy1 = sinon.spy(validationFn1);
        const validationFnSpy2 = sinon.spy(validationFn2);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation1: FieldValidation = {
          validationFn: validationFnSpy1,
          eventsFilter,
          customParams,
        };
        const fieldValidation2: FieldValidation = {
          validationFn: validationFnSpy2,
          eventsFilter,
          customParams,
        };
        const validationsPerField = [fieldValidation1, fieldValidation2];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value, customParams)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value, customParams)).to.be.false;
            done();
          });
      });

    it('Spec #7 => should return failed FieldValidationResult and calls only to first validation function' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items' +
      'first equals failed validation function' +
      'second equals successful validation function', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn1 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFn2 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          return Promise.resolve(fieldValidationResult);
        };
        const eventsFilter = {};
        const customParams = {};
        const validationFnSpy1 = sinon.spy(validationFn1);
        const validationFnSpy2 = sinon.spy(validationFn2);

        const fieldValidation1: FieldValidation = {
          validationFn: validationFnSpy1,
          eventsFilter,
          customParams,
        };
        const fieldValidation2: FieldValidation = {
          validationFn: validationFnSpy2,
          eventsFilter,
          customParams,
        };
        const validationsPerField = [fieldValidation1, fieldValidation2];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value, customParams)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value, customParams)).to.be.false;
            done();
          });
      });

    it('Spec #8 => should return failed FieldValidationResult and calls to first and second validation functions' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items' +
      'first equals successful validation function' +
      'second equals failed validation function', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn1 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFn2 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy1 = sinon.spy(validationFn1);
        const validationFnSpy2 = sinon.spy(validationFn2);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation1: FieldValidation = {
          validationFn: validationFnSpy1,
          eventsFilter,
          customParams
        };
        const fieldValidation2: FieldValidation = {
          validationFn: validationFnSpy2,
          eventsFilter,
          customParams
        };
        const validationsPerField = [fieldValidation1, fieldValidation2];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value, customParams)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.true;
            expect(validationFnSpy2.calledWith(vm, value, customParams)).to.be.true;
            done();
          });
      });

    it('Spec #9 => should return succeeded and key equals "test2" FieldValidationResult and calls to first and second validation functions' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items' +
      'first equals successful validation function' +
      'second equals successful validation function', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn1 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          fieldValidationResult.key = "test1"
          return Promise.resolve(fieldValidationResult);
        };
        const validationFn2 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          fieldValidationResult.key = "test2";
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy1 = sinon.spy(validationFn1);
        const validationFnSpy2 = sinon.spy(validationFn2);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation1: FieldValidation = {
          validationFn: validationFnSpy1,
          eventsFilter,
          customParams
        };
        const fieldValidation2: FieldValidation = {
          validationFn: validationFnSpy2,
          eventsFilter,
          customParams
        };
        const validationsPerField = [fieldValidation1, fieldValidation2];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.true;
            expect(fieldValidationResult.key).to.be.equal("test2");

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value, customParams)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.true;
            expect(validationFnSpy2.calledWith(vm, value, customParams)).to.be.true;
            done();
          });
      });

    it('Spec #10 => should return undefined FieldValidationResult and calls to validation functions ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals validation function resolving a fieldValidationResult equals undefined', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn = (vm, value, customParams) => {
          const fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy = sinon.spy(validationFn);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation: FieldValidation = {
          validationFn: validationFnSpy,
          eventsFilter,
          customParams,
        };
        const validationsPerField = [fieldValidation];
        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;

            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value, customParams)).to.be.true;
            done();
          });
      });

    it('Spec #11 => should return null FieldValidationResult and calls to validation functions ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals validation function resolving a fieldValidationResult equals null', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn = (vm, value, customParams) => {
          const fieldValidationResult = null;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy = sinon.spy(validationFn);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation: FieldValidation = {
          validationFn: validationFnSpy,
          eventsFilter,
          customParams,
        };
        const validationsPerField = [fieldValidation];


        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.null;

            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value, customParams)).to.be.true;
            done();
          });
      });

    it('Spec #11 => should return empty FieldValidationResult and calls to validation functions ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item ' +
      'equals validation function resolving a fieldValidationResult equals ""', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn = (vm, value, customParams) => {
          const fieldValidationResult = '';
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy = sinon.spy(validationFn);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation: FieldValidation = {
          validationFn: validationFnSpy,
          eventsFilter,
          customParams,
        };
        const validationsPerField = [fieldValidation];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.empty;

            expect(validationFnSpy.calledOnce).to.be.true;
            expect(validationFnSpy.calledWith(vm, value, customParams)).to.be.true;
            done();
          });
      });

    it('Spec #12 => should return undefined FieldValidationResult and calls to first validation function ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items ' +
      'first equals validation function resolving a fieldValidationResult equals undefined' +
      'second equals successful validation function', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn1 = (vm, value, customParams) => {
          const fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFn2 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          fieldValidationResult.key = "test2";
          return Promise.resolve(fieldValidationResult);
        };

        const validationFnSpy1 = sinon.spy(validationFn1);
        const validationFnSpy2 = sinon.spy(validationFn2);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation1: FieldValidation = {
          validationFn: validationFnSpy1,
          eventsFilter,
          customParams,
        };
        const fieldValidation2: FieldValidation = {
          validationFn: validationFnSpy2,
          eventsFilter,
          customParams,
        };
        const validationsPerField = [fieldValidation1, fieldValidation2];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value, customParams)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value, customParams)).to.be.false;
            done();
          });
      });

    it('Spec #13 => should return undefined FieldValidationResult and calls to first validation function ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items ' +
      'first equals validation function resolving a fieldValidationResult equals undefined' +
      'second equals failed validation function', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn1 = (vm, value, customParams) => {
          const fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFn2 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          fieldValidationResult.key = "test2";
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy1 = sinon.spy(validationFn1);
        const validationFnSpy2 = sinon.spy(validationFn2);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation1: FieldValidation = {
          validationFn: validationFnSpy1,
          eventsFilter,
          customParams,
        };
        const fieldValidation2: FieldValidation = {
          validationFn: validationFnSpy2,
          eventsFilter,
          customParams,
        };
        const validationsPerField = [fieldValidation1, fieldValidation2];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value, customParams)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value, customParams)).to.be.false;
            done();
          });
      });

    it('Spec #14 => should return failed and key equals "test1" FieldValidationResult and calls to first validation function ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items ' +
      'first equals failed validation function' +
      'second equals validation function resolving a fieldValidationResult equals undefined', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn1 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = false;
          fieldValidationResult.key = "test1";
          return Promise.resolve(fieldValidationResult);
        };
        const validationFn2 = (vm, value, customParams) => {
          const fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy1 = sinon.spy(validationFn1);
        const validationFnSpy2 = sinon.spy(validationFn2);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation1: FieldValidation = {
          validationFn: validationFnSpy1,
          eventsFilter,
          customParams
        };
        const fieldValidation2: FieldValidation = {
          validationFn: validationFnSpy2,
          eventsFilter,
          customParams
        };

        const validationsPerField = [fieldValidation1, fieldValidation2];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult.succeeded).to.be.false;
            expect(fieldValidationResult.key).to.be.equal('test1');

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value, customParams)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.false;
            expect(validationFnSpy2.calledWith(vm, value, customParams)).to.be.false;
            done();
          });
      });

    it('Spec #15 => should return undefined FieldValidationResult and calls to first and second validation functions ' +
      'When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items ' +
      'first equals successful validation function' +
      'second equals validation function resolving a fieldValidationResult equals undefined', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn1 = (vm, value, customParams) => {
          const fieldValidationResult = new FieldValidationResult();
          fieldValidationResult.succeeded = true;
          fieldValidationResult.key = "test1";
          return Promise.resolve(fieldValidationResult);
        };
        const validationFn2 = (vm, value, customParams) => {
          const fieldValidationResult = undefined;
          return Promise.resolve(fieldValidationResult);
        };
        const validationFnSpy1 = sinon.spy(validationFn1);
        const validationFnSpy2 = sinon.spy(validationFn2);
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation1: FieldValidation = {
          validationFn: validationFnSpy1,
          eventsFilter,
          customParams,
        };
        const fieldValidation2: FieldValidation = {
          validationFn: validationFnSpy2,
          eventsFilter,
          customParams,
        };
        const validationsPerField = [fieldValidation1, fieldValidation2];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        fieldValidationResultPromise
          .then(fieldValidationResult => {
            expect(fieldValidationResult).to.be.undefined;

            expect(validationFnSpy1.calledOnce).to.be.true;
            expect(validationFnSpy1.calledWith(vm, value, customParams)).to.be.true;

            expect(validationFnSpy2.calledOnce).to.be.true;
            expect(validationFnSpy2.calledWith(vm, value, customParams)).to.be.true;
            done();
          });
      });

    it('should pass customParams to its proper validationFunction', (done) => {
      //Arrange
      const vm = undefined;
      const value = undefined;
      const validationFn1 = (vm, value, customParams) => {
        const fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.succeeded = true;
        fieldValidationResult.key = "test1";
        return Promise.resolve(fieldValidationResult);
      };
      const validationFn2 = (vm, value, customParams) => {
        const fieldValidationResult = undefined;
        return Promise.resolve(fieldValidationResult);
      };
      const validationFnSpy1 = sinon.spy(validationFn1);
      const validationFnSpy2 = sinon.spy(validationFn2);
      const eventsFilter = {};
      const customParams1 = { param1: 'param1' };
      const customParams2 = { param2: 'param2' };
      const fieldValidation1: FieldValidation = {
        validationFn: validationFnSpy1,
        eventsFilter,
        customParams: customParams1,
      };
      const fieldValidation2: FieldValidation = {
        validationFn: validationFnSpy2,
        eventsFilter,
        customParams: customParams2,
      };
      const validationsPerField = [fieldValidation1, fieldValidation2];

      //Act
      const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

      //Assert
      fieldValidationResultPromise
        .then(fieldValidationResult => {
          expect(fieldValidationResult).to.be.undefined;

          expect(validationFnSpy1.calledOnce).to.be.true;
          expect(validationFnSpy1.calledWith(vm, value, customParams1)).to.be.true;

          expect(validationFnSpy2.calledOnce).to.be.true;
          expect(validationFnSpy2.calledWith(vm, value, customParams2)).to.be.true;
          done();
        });
    });
  });

  describe('Group #2 => When calling fireAllFieldsValidations', () => {
    it('Spec #1 => should return empty array' +
      'When passing vm equals undefined, vmKeys equals undefined and validationFn equals undefined', () => {
        // Arrange
        const vm = undefined;
        const vmKeys = undefined;
        const validationFn = undefined;

        // Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFn);

        // Assert
        expect(fieldValidationResultPromises).to.have.lengthOf(0);
      });

    it('Spec #2 => should return empty array' +
      'When passing vm equals null, vmKeys equals null and validationFn equals undefined', () => {
        //Arrange
        const vm = null;
        const vmKeys = null;
        const validationFn = undefined;

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.lengthOf(0);
      });

    it('Spec #3 => should return empty array' +
      'When passing vm equals "", vmKeys equals [] and validationFn equals undefined', () => {
        //Arrange
        const vm = "";
        const vmKeys = [];
        const validationFn = undefined;

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.lengthOf(0);
      });

    it('Spec #4 => should return empty array' +
      'When passing vm equals { }, vmKeys as non empty array and validationFn equals undefined', () => {
        //Arrange
        const vm = {};
        const vmKeys = ['fullname']
        const validationFn = undefined;

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #5 => should return empty array when passing vm equals null, vmKeys as non empty array ' +
      'and validationFn equals undefined', () => {
        //Arrange
        const vm = null;
        const vmKeys = ['fullname']
        const validationFn = undefined;

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #6 => should return empty array when passing vm equals "", vmKeys as non empty array ' +
      'and validationFn equals undefined', () => {
        //Arrange
        const vm = "";
        const vmKeys = ['fullname']
        const validationFn = undefined;

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #7 => should return empty array when passing vm equals {}, vmKeys as non empty array ' +
      'and validationFn equals undefined', () => {
        //Arrange
        const vm = {};
        const vmKeys = ['fullname']
        const validationFn = undefined;

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFn);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #8 => should return empty array and it should not call to validationFn ' +
      'when passing vm equals { }, vmKeys as non empty array and validationFn equals function', () => {
        //Arrange
        const vm = {};
        const vmKeys = ['fullname']
        const validationFnSpy = sinon.spy();

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFnSpy);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
        expect(validationFnSpy.called).to.be.false;
      });

    it('Spec #9 => should return empty array and should not call to validationFn ' +
      'when passing vm equals { }, vmKeys as non empty array and validationFn equals function', () => {
        //Arrange
        const vm = {
          testVmProperty: ''
        };
        const vmKeys = ['otherProperty']
        const validationFnSpy = sinon.spy();

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFnSpy);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
        expect(validationFnSpy.called).to.be.false;
      });

    it('Spec #10 => should not return empty array with one item and it calls to validationFn ' +
      'when passing vm equals { testVmProperty: "test" }, vmKeys equals [] and validationFn equals function', () => {
        //Arrange
        const vm = {
          testVmProperty: 'test'
        };
        const vmKeys = ['testVmProperty'];
        const validationFnSpy = sinon.spy();

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireAllFieldsValidations(vm, vmKeys, validationFnSpy);

        //Ass
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.called).to.be.true;
      });
  });

  describe('Group #3 => When calling fireGlobalFormValidations', () => {
    it('Spec #1 => should return empty array ' +
      'When passing vm equals undefined, validations equals undefined', () => {
        //Arrange
        const vm = undefined;
        const validations = undefined;

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #2 => should return empty array ' +
      'When passing vm equals undefined, validations equals null', () => {
        //Arrange
        const vm = undefined;
        const validations = null;

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #3 => should return empty array ' +
      'When passing vm equals undefined, validations equals []', () => {
        //Arrange
        const vm = undefined;
        const validations = [];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(0);
      });

    it('Spec #4 => should return array with one item and it calls to validationFn' +
      'When passing vm equals undefined, validations equals array with one validationFn', () => {
        //Arrange
        const vm = undefined;
        const validationFnSpy = sinon.spy();
        const validations = [validationFnSpy];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #5 => should return array with one item and it calls to validationFn' +
      'When passing vm equals null, validations equals array with one validationFn', () => {
        //Arrange
        const vm = null;
        const validationFnSpy = sinon.spy();
        const validations = [validationFnSpy];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #6 => should return array with one item and it calls to validationFn' +
      'When passing vm equals "", validations equals array with one validationFn', () => {
        //Arrange
        const vm = '';
        const validationFnSpy = sinon.spy();
        const validations = [validationFnSpy];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #7 => should return array with one item and it calls to validationFn' +
      'When passing vm equals "test", validations equals array with one validationFn', () => {
        //Arrange
        const vm = 'test';
        const validationFnSpy = sinon.spy();
        const validations = [validationFnSpy];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #8 => should return array with one item and it calls to validationFn' +
      'When passing vm equals 1, validations equals array with one validationFn', () => {
        //Arrange
        const vm = 1;
        const validationFnSpy = sinon.spy();
        const validations = [validationFnSpy];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #9 => should return array with one item and it calls to validationFn' +
      'When passing vm equals function, validations equals array with one validationFn', () => {
        //Arrange
        const vm = function () {
          return "this is a function";
        };
        const validationFnSpy = sinon.spy();
        const validations = [validationFnSpy];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #10 => should return array with one item and it calls to validationFn' +
      'When passing vm equals array, validations equals array with one validationFn', () => {
        //Arrange
        const vm = Array<any>();
        const validationFnSpy = sinon.spy();
        const validations = [validationFnSpy];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #11 => should return array with one item and it calls to validationFn' +
      'When passing vm equals object, validations equals array with one validationFn', () => {
        //Arrange
        const vm = {
          testProperty: "testValue"
        };
        const validationFnSpy = sinon.spy();
        const validations = [validationFnSpy];

        //Act
        const fieldValidationResultPromises = validationsDispatcher.fireGlobalFormValidations(vm, validations);

        //Assert
        expect(fieldValidationResultPromises).to.have.length(1);
        expect(validationFnSpy.calledOnce).to.be.true;
        expect(validationFnSpy.calledWith(vm)).to.be.true;
      });

    it('Spec #12 => should return rejected promise' +
      'When passing a validation function that throws an error ' +
      'and error management is set to default behavior for that validation fn', (done) => {
        //Arrange
        const vm = undefined;
        const value = undefined;
        const validationFn = (vm, value, customParams) => {
          throw new Error('Intentionally uncontrolled error, single field validation testing fire single field validations');
        };
        const eventsFilter = {};
        const customParams = {};
        const fieldValidation: FieldValidation = {
          validationFn: validationFn,
          eventsFilter,
          customParams,
        };

        const validationsPerField = [fieldValidation];

        //Act
        const fieldValidationResultPromise = validationsDispatcher.fireSingleFieldValidations(vm, value, validationsPerField);

        //Assert
        expect(fieldValidationResultPromise).to.eventually.be.rejected.notify(done);
      });
  });
});
