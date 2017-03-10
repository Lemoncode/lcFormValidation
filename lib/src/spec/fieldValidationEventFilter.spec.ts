import { FieldValidation } from '../entities';
import { fieldValidationEventFilter } from '../fieldValidationEventFilter'

describe('FieldValidationEventFilter ', () => {

  describe('when calling filter ', () => {
    it('should returns new Array<FieldValidation> having only one elmenent matching the filter {OnChange: true} ' +
      'when passing a list of validations containg only one Element and having OnChange true for that element', () => {
        //Arrange
        const allValidations: Array<FieldValidation> = [
          {
            validationFn: (vm, value) => { return null },
            filter: { OnChange: true }
          }
        ];

        const filter = { OnChange: true };

        //Act
        let result = fieldValidationEventFilter.filter(allValidations, filter);


        //Assert
        expect(result.length).to.be.equal(1);
        expect(result[0].filter.OnChange).to.be.true;
      });

  });

  describe('when calling filter ', () => {
    it('should returns new Array<FieldValidation> having zero elmenent matching the filter {OnBlur: true} ' +
      'when passing a list of validations containg only one Element and having OnChange true for that element', () => {
        //Arrange
        const allValidations: Array<FieldValidation> = [
          {
            validationFn: (vm, value) => { return null },
            filter: { OnChange: true }
          }
        ];

        const filter = { OnBlur: true };

        //Act
        let result = fieldValidationEventFilter.filter(allValidations, filter);


        //Assert
        expect(result.length).to.be.equal(0);
      });

  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having only one elmenent matching the filter {OnChange: true} ' +
        'when passing a list of validations containg two elements, one OnChange the other OnBlur', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              filter: { OnChange: true }
            },
            {
              validationFn: (vm, value) => { return null },
              filter: { OnBlur: true }
            }
          ];

          const filter = { OnChange: true };

          //Act
          let result = fieldValidationEventFilter.filter(allValidations, filter);

          //Assert
          expect(result.length).to.be.equal(1);
          expect(result[0].filter.OnChange).to.be.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having two  elements matching the filter {OnChange: true} ' +
        'when passing a list of validations containg three elements, two OnChange the other OnBlur', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              filter: { OnChange: true }
            },
            {
              validationFn: (vm, value) => { return null },
              filter: { OnBlur: true }
            },
            {
              validationFn: (vm, value) => { return null },
              filter: { OnChange: true }
            }
          ];

          const filter = { OnChange: true };

          //Act
          let result = fieldValidationEventFilter.filter(allValidations, filter);

          //Assert
          expect(result.length).to.be.equal(2);
          expect(result[0].filter.OnChange).to.be.true;
          expect(result[1].filter.OnChange).to.be.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having two  elements matching the filter {OnChange: true, OnBlur: true} (OR) ' +
        'when passing a list of validations containg three elements, one OnChange the other OnBlur, the other OnWhatever', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              filter: { OnChange: true }
            },
            {
              validationFn: (vm, value) => { return null },
              filter: { OnBlur: true }
            },
            {
              validationFn: (vm, value) => { return null },
              filter: { OnWhatever: true }
            }
          ];

          const filter = { OnChange: true, OnBlur: true };

          //Act
          let result = fieldValidationEventFilter.filter(allValidations, filter);

          //Assert
          expect(result.length).to.be.equal(2);
          expect(result[0].filter.OnChange).to.be.true;
          expect(result[1].filter.OnBlur).to.be.true;
        });
    });
  });

  describe('FieldValidationEventFilter ', () => {
    describe('when calling filter ', () => {
      it('should returns new Array<FieldValidation> having three  elements matching the filter null ' +
        'when passing a list of validations containg three elements, one OnChange the other OnBlur, the other OnWhatever', () => {
          //Arrange
          const allValidations: Array<FieldValidation> = [
            {
              validationFn: (vm, value) => { return null },
              filter: { OnChange: true }
            },
            {
              validationFn: (vm, value) => { return null },
              filter: { OnBlur: true }
            },
            {
              validationFn: (vm, value) => { return null },
              filter: { OnWhatever: true }
            }
          ];

          const filter = null;

          //Act
          let result = fieldValidationEventFilter.filter(allValidations, filter);

          //Assert
          expect(result.length).to.be.equal(3);
          expect(result[0].filter.OnChange).to.be.true;
          expect(result[1].filter.OnBlur).to.be.true;
          expect(result[2].filter.OnWhatever).to.be.true;
        });
    });
  });
});
