import { FieldValidation } from '../entities';
import { fieldValidationEventFilter } from '../fieldValidationEventFilter'

describe('FieldValidationEventFilter ', () => {

  describe('when calling filter ', () => {
    it('should returns new Array<FieldValidation> having only one element matching the eventsFilter {onChange: true} ' +
      'when passing a list of validations containg only one Element and having onChange true for that element', () => {
        //Arrange
        const allValidations: FieldValidation[] = [
          {
            validationFn: (vm, value) => { return null },
            eventsFilter: { onChange: true },
            customParams: {}
          }
        ];

        const eventFilter = { onChange: true };

        //Act
        const result = fieldValidationEventFilter.filter(allValidations, eventFilter);

        //Assert
        expect(result.length).to.be.equal(1);
        expect(result[0].eventsFilter).to.have.property('onChange').that.is.true;
      });

  });

  describe('when calling filter ', () => {
    it('should returns new Array<FieldValidation> having zero elements matching the eventsFilter {onBlur: true} ' +
      'when passing a list of validations containg only one Element and having onChange true for that element', () => {
        //Arrange
        const allValidations: Array<FieldValidation> = [
          {
            validationFn: (vm, value) => { return null },
            eventsFilter: { onChange: true },
            customParams: {}
          }
        ];

        const eventsFilter = { onBlur: true };

        //Act
        const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

        //Assert
        expect(result.length).to.be.equal(0);
      });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having only one element matching the eventsFilter {onChange: true} ' +
        'when passing a list of validations containg two elements, one onChange the other onBlur', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onChange: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onBlur: true },
              customParams: {}
            }
          ];

          const eventsFilter = { onChange: true };

          //Act
          const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

          //Assert
          expect(result.length).to.be.equal(1);
          expect(result[0].eventsFilter).to.have.property('onChange').that.is.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having two  elements matching the eventsFilter {onChange: true} ' +
        'when passing a list of validations containg three elements, two onChange the other onBlur', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onChange: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onBlur: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onChange: true },
              customParams: {}
            }
          ];

          const eventsFilter = { onChange: true };

          //Act
          const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

          //Assert
          expect(result.length).to.be.equal(2);
          expect(result[0].eventsFilter).to.have.property('onChange').that.is.true;
          expect(result[1].eventsFilter).to.have.property('onChange').that.is.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having two  elements matching the eventsFilter {onChange: true, onBlur: true} (OR) ' +
        'when passing a list of validations containg three elements, one onChange the other onBlur, the other OnWhatever', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onChange: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onBlur: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnWhatever: true },
              customParams: {}
            }
          ];

          const eventsFilter = { onChange: true, onBlur: true };

          //Act
          const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

          //Assert
          expect(result.length).to.be.equal(2);
          expect(result[0].eventsFilter).to.have.property('onChange').that.is.true;
          expect(result[1].eventsFilter).to.have.property('onBlur').that.is.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having three  elements matching the eventsFilter null ' +
        'when passing a list of validations containg three elements, one onChange the other onBlur, the other OnWhatever', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onChange: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { onBlur: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnWhatever: true },
              customParams: {}
            }
          ];

          const eventsFilter = null;

          //Act
          const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

          //Assert
          expect(result.length).to.be.equal(3);
          expect(result[0].eventsFilter).to.have.property('onChange').that.is.true;
          expect(result[1].eventsFilter).to.have.property('onBlur').that.is.true;
          expect(result[2].eventsFilter).to.have.property('OnWhatever').that.is.true;
        });
    });
  });
});
