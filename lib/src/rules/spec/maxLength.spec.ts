import { maxLength } from '../maxLength';
import { LengthParams } from '../length';
import { FieldValidationResult } from '../../entities';

describe('[maxLength] validation rule tests =>', () => {
  describe('When validating a non string value', () => {
    it('should return true if value is undefined', () => {
      // Arrange
      const value = undefined;
      const vm = undefined;
      const customParams: LengthParams = { length: 4 };

      // Act
      const validationResult: FieldValidationResult = maxLength(value, vm, customParams);

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('MAX_LENGTH');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true if value is null', () => {
      // Arrange
      const value = null;
      const vm = undefined;
      const customParams: LengthParams = { length: 4 };

      // Act
      const validationResult: FieldValidationResult = maxLength(value, vm, customParams);

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('MAX_LENGTH');
      expect(validationResult.errorMessage).to.be.empty;
    });
  });

  describe('When validating a string value', () => {
    it('should return true if value length is lesser than length option', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: 6 };

      // Act
      const validationResult: FieldValidationResult = maxLength(value, vm, customParams);

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('MAX_LENGTH');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return false if value length is greater than length option', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: 2 };

      // Act
      const validationResult: FieldValidationResult = maxLength(value, vm, customParams);

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('MAX_LENGTH');
      expect(validationResult.errorMessage).to.be.equals('The value provided is too long. Length must not exceed 2 characters.');
    });

    it('should return true if value length is equal than length option', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: 4 };

      // Act
      const validationResult: FieldValidationResult = maxLength(value, vm, customParams);

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('MAX_LENGTH');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true if value length is 0 and length option is 0', () => {
      // Arrange
      const value = '';
      const vm = undefined;
      const customParams: LengthParams = { length: 0 };

      // Act
      const validationResult: FieldValidationResult = maxLength(value, vm, customParams);

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('MAX_LENGTH');
      expect(validationResult.errorMessage).to.be.empty;
    });
  });

  describe('CustomParams boundaries =>', () => {
    it('should throw an error if no length option is provided', () => {
      // Arrange
      const value = 't';
      const vm = undefined;
      const customParams: LengthParams = undefined;
      const thrownErrorMessage = 'FieldValidationError: Parameter "length" for maxLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.';

      // Act
      // Assert
      expect(maxLength.bind(null, value, vm, customParams)).to.throw(Error, thrownErrorMessage);
    });
    it('should return false if length is not a valid number', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: LengthParams = { length: null };
      const thrownErrorMessage = 'FieldValidationError: Parameter "length" for maxLength in customParams is mandatory and should be a valid number. Example: { length: 4 }.';

      // Act
      // Assert
      expect(maxLength.bind(null, value, vm, customParams)).to.throw(Error, thrownErrorMessage);
    });
  });
});
