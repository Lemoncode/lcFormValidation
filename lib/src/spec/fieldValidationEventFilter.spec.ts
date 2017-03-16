import { FieldValidation } from '../entities';
import { fieldValidationEventFilter } from '../fieldValidationEventFilter'

describe('FieldValidationEventFilter ', () => {

  describe('when calling filter ', () => {
    it('should returns new Array<FieldValidation> having only one elmenent matching the eventsFilter {OnChange: true} ' +
      'when passing a list of validations containg only one Element and having OnChange true for that element', () => {
        //Arrange
        const allValidations: FieldValidation[] = [
          {
            validationFn: (vm, value) => { return null },
            eventsFilter: { OnChange: true },
            customParams: {}
          }
        ];

        const eventFilter = { OnChange: true };

        //Act
        const result = fieldValidationEventFilter.filter(allValidations, eventFilter);

        //Assert
        expect(result.length).to.be.equal(1);
        expect(result[0].eventsFilter.OnChange).to.be.true;
      });

  });

  describe('when calling filter ', () => {
    it('should returns new Array<FieldValidation> having zero elmenent matching the eventsFilter {OnBlur: true} ' +
      'when passing a list of validations containg only one Element and having OnChange true for that element', () => {
        //Arrange
        const allValidations: Array<FieldValidation> = [
          {
            validationFn: (vm, value) => { return null },
            eventsFilter: { OnChange: true },
            customParams: {}
          }
        ];

        const eventsFilter = { OnBlur: true };

        //Act
        const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

        //Assert
        expect(result.length).to.be.equal(0);
      });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having only one elmenent matching the eventsFilter {OnChange: true} ' +
        'when passing a list of validations containg two elements, one OnChange the other OnBlur', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnChange: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnBlur: true },
              customParams: {}
            }
          ];

          const eventsFilter = { OnChange: true };

          //Act
          const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

          //Assert
          expect(result.length).to.be.equal(1);
          expect(result[0].eventsFilter.OnChange).to.be.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having two  elements matching the eventsFilter {OnChange: true} ' +
        'when passing a list of validations containg three elements, two OnChange the other OnBlur', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnChange: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnBlur: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnChange: true },
              customParams: {}
            }
          ];

          const eventsFilter = { OnChange: true };

          //Act
          const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

          //Assert
          expect(result.length).to.be.equal(2);
          expect(result[0].eventsFilter.OnChange).to.be.true;
          expect(result[1].eventsFilter.OnChange).to.be.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having two  elements matching the eventsFilter {OnChange: true, OnBlur: true} (OR) ' +
        'when passing a list of validations containg three elements, one OnChange the other OnBlur, the other OnWhatever', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnChange: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnBlur: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnWhatever: true },
              customParams: {}
            }
          ];

          const eventsFilter = { OnChange: true, OnBlur: true };

          //Act
          const result = fieldValidationEventFilter.filter(allValidations, eventsFilter);

          //Assert
          expect(result.length).to.be.equal(2);
          expect(result[0].eventsFilter.OnChange).to.be.true;
          expect(result[1].eventsFilter.OnBlur).to.be.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having three  elements matching the eventsFilter null ' +
        'when passing a list of validations containg three elements, one OnChange the other OnBlur, the other OnWhatever', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnChange: true },
              customParams: {}
            },
            {
              validationFn: (vm, value) => { return null },
              eventsFilter: { OnBlur: true },
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
          expect(result[0].eventsFilter.OnChange).to.be.true;
          expect(result[1].eventsFilter.OnBlur).to.be.true;
          expect(result[2].eventsFilter.OnWhatever).to.be.true;
        });
    });
  });
});
