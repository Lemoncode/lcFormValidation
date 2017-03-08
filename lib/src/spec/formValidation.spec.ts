import { } from 'mocha';
import { expect } from 'chai';
import { } from 'core-js';
import { createFormValidation } from '../formValidation';

describe('createFormValidation', () => {
  describe('definition', () => {
    it('should return an object', () => {
      // Arrange
      const validationConstraints = {};

      // Act
      const formValidation = createFormValidation(validationConstraints);

      // Assert
      expect(formValidation).to.be.an('object');
    });
  });
});