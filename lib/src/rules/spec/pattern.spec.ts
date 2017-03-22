import { pattern, PatternParams } from '../pattern';
import { FieldValidationResult } from '../../entities';

describe('[pattern] validation rule tests =>', () => {
  describe('Pattern option boundaries =>', () => {
    it('should throw an error if pattern is null', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: PatternParams = { pattern: null };
      const thrownErrrorMessage = 'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /\d+/ }.';

      // Act
      // Assert
      expect(pattern.bind(null, value, vm, customParams)).to.throw(Error, thrownErrrorMessage);
    });

    it('should throw an error if pattern is boolean', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: PatternParams = { pattern: (false as any) };
      const thrownErrrorMessage = 'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /\d+/ }.';

      // Act
      // Assert
      expect(pattern.bind(null, value, vm, customParams)).to.throw(Error, thrownErrrorMessage);
    });
  });

  describe('Given a string as RegExp in pattern option', () => {
    it('should not use the entire pattern as a complete pattern', () => {
      // Arrange
      const value = 'Some tests needed';
      const vm = undefined;
      const customParams: PatternParams = { pattern: 'tests' };

      // Act
      const validationResult = pattern(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('PATTERN');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true for a value that matches pattern', () => {
      // Arrange
      const value = 'test';
      const vm = undefined;
      const customParams: PatternParams = { pattern: 'test' };

      // Act
      const validationResult = pattern(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('PATTERN');
      expect(validationResult.errorMessage).to.be.empty;
    });
  });

  describe('Given a RegExp object in pattern option', () => {
    it('should return true if field value matches the given pattern', () => {
      // Arrange
      const value = 'Some tests needed';
      const vm = undefined;
      const customParams: PatternParams = { pattern: /tests/ };

      // Act
      const validationResult = pattern(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('PATTERN');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return false if field value does not match the given pattern', () => {
      // Arrange
      const value = 'Some tests needed';
      const vm = undefined;
      const customParams: PatternParams = { pattern: /^tests/ };

      // Act
      const validationResult = pattern(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.false;
      expect(validationResult.type).to.be.equals('PATTERN');
      expect(validationResult.errorMessage).to.be.equals('Please provide a valid format.');
    });
  });

  describe('Given an empty value', () => {
    it('should return true for null value', () => {
      // Arrange
      const value = null;
      const vm = undefined;
      const customParams: PatternParams = { pattern: 'test' };

      // Act
      const validationResult = pattern(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('PATTERN');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true for undefined value', () => {
      // Arrange
      const value = undefined;
      const vm = undefined;
      const customParams: PatternParams = { pattern: 'test' };

      // Act
      const validationResult = pattern(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('PATTERN');
      expect(validationResult.errorMessage).to.be.empty;
    });

    it('should return true for an empty value', () => {
      // Arrange
      const value = '';
      const vm = undefined;
      const customParams: PatternParams = { pattern: 'test' };

      // Act
      const validationResult = pattern(value, vm, customParams) as FieldValidationResult;

      // Assert
      expect(validationResult.succeeded).to.be.true;
      expect(validationResult.type).to.be.equals('PATTERN');
      expect(validationResult.errorMessage).to.be.empty;
    });
  });
});
