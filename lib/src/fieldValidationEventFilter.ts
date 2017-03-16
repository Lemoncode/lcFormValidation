import { FieldValidation, ValidationEventsFilter } from './entities';

class FieldValidationEventFilter {

  public filter(fieldValidations: FieldValidation[], eventsFilter: ValidationEventsFilter): FieldValidation[] {
    let result: FieldValidation[] = [];

    if (eventsFilter) {
      result = fieldValidations.filter((fieldValidation) =>
        this.hasAnyFilter(fieldValidation, eventsFilter)
      );
    } else {
      result = fieldValidations;
    }

    return result;
  }

  private hasAnyFilter(fieldValidation: FieldValidation, eventsFilter: ValidationEventsFilter) {
    return Object.keys(eventsFilter).some(filter =>
      eventsFilter[filter] === fieldValidation.eventsFilter[filter]
    );
  }
}

export const fieldValidationEventFilter = new FieldValidationEventFilter();
