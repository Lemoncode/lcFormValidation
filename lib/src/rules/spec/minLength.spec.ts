import { minLength } from '../minLength';
import { LengthParams } from '../length';
import { FieldValidationResult } from '../../entities';

describe('[minLength] validation rule tests =>', () => {
  describe('When validating a non string value', () => {
    it('should return true if value is undefined', () => {
      // Arrange
      const value = undefined;
      const vm = undefined;
      const customParams: LengthParams = { length: 4 };

      // Act
      const validationResult = minLength(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('MIN_LENGTH');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true if value is null', () => {
      // Arrange
      const value = null;
      const vm = undefined;
      const customParams: LengthParams = { length: 4 };

      // Act
      const validationResult = minLength(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('MIN_LENGTH');
      expect(validationResult.errorMessage).to.be.empty;
    });
  });

  describe('When validating a string value', () => {
    it('should return false for empty strings', () => {
      // Arrange
      const value = '';
      const vm = undefined;
      const customParams: LengthParams = { length: 3 };

      // Act
      const validationResult = minLength(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.errorMessage).to.be.equals('The value provided must have at least 3 characters.');
      expect(validationResult.type).to.be.equals('MIN_LENGTH');
    });

    it('should return true if value length is greater than length option', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: 2 };

      // Act
      const validationResult = minLength(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.errorMessage).to.be.empty;
      expect(validationResult.type).to.be.equals('MIN_LENGTH');
    });

    it('should return false if value length is lesser than length option', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: 6 };

      // Act
      const validationResult = minLength(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.errorMessage).to.be.equals('The value provided must have at least 6 characters.');
      expect(validationResult.type).to.be.equals('MIN_LENGTH');
    });

    it('should return true if value length is equal than length option', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: 4 };

      // Act
      const validationResult = minLength(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.errorMessage).to.be.empty;
      expect(validationResult.type).to.be.equals('MIN_LENGTH');
    });

    it('should return true if value has length greater than 0 and length option is 0', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: 0 };

      // Act
      const validationResult = minLength(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.errorMessage).to.be.empty;
      expect(validationResult.type).to.be.equals('MIN_LENGTH');
    });

    it('should return true if valuehas length of 0 and length option is 0', () => {
      // Arrange
      const value = '';
      const vm = undefined;
      const customParams: LengthParams = { length: 0 };

      // Act
      const validationResult = minLength(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.errorMessage).to.be.empty;
      expect(validationResult.type).to.be.equals('MIN_LENGTH');
    });
  });

  describe('CustomParams boundaries =>', () => {
    it('should throw an error if no length option is provided', () => {
      // Arrange
      const value = 't';
      const vm = undefined;
      const customParams: LengthParams = undefined;
      const thrownErrorMessage = 'FieldValidationError: Parameter "length" for minLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.';

      // Act

      // Assert
      expect(minLength.bind(null, value, vm, customParams)).to.throw(Error, thrownErrorMessage);
    });

    it('should return false if length option is null', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: null };
      const thrownErrorMessage = 'FieldValidationError: Parameter "length" for minLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.';

      // Act
      // Assert
      expect(minLength.bind(null, value, vm, customParams)).to.throw(Error, thrownErrorMessage);
    });
  });
});
