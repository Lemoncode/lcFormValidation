import { email } from '../email';
import { FieldValidationResult } from '../../entities';

describe('[email] validation rule tests =>', () => {
  describe('When validating a non string value', () => {
    it('should return true if value is null', () => {
      // Arrange
      const value = null;
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = email(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('EMAIL');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true if value is undefined', () => {
      // Arrange
      const value = undefined;
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = email(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('EMAIL');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return false if value is number', () => {
      // Arrange
      const value = Math.PI;
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = email(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('EMAIL');
      expect(validationResult.errorMessage).to.be.equals('Please enter a valid email address.');
    });

    it('should return false if value is an object', () => {
      // Arrange
      const value = {};
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = email(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('EMAIL');
      expect(validationResult.errorMessage).to.be.equals('Please enter a valid email address.');
    });

    it('should return false if value is an array', () => {
      // Arrange
      const value = ['a', '@', 'b', '.', 'c', 'o', 'm'];
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = email(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('EMAIL');
      expect(validationResult.errorMessage).to.be.equals('Please enter a valid email address.');
    });

    it('should return false if value is a function', () => {
      // Arrange
      const value = () => { };
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = email(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('EMAIL');
      expect(validationResult.errorMessage).to.be.equals('Please enter a valid email address.');
    });
  });
  describe('When validating a string value', () => {
    it('should return false for invalid email address', () => {
      // Arrange
      const value = 'some text';
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = email(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('EMAIL');
      expect(validationResult.errorMessage).to.be.equals('Please enter a valid email address.');
    });
    it('should return true for a valid email address', () => {
      // Arrange
      const value = 'a@b.com';
      const vm = undefined;
      const customParams = undefined;

      // Act
      const validationResult = email(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('EMAIL');
      expect(validationResult.errorMessage).to.be.empty;
    });
  });
});
