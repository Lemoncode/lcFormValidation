import { FieldValidation, ValidationFilters } from './entities';

class FieldValidationEventFilter {

  public filter(fieldValidations: FieldValidation[], filters: ValidationFilters): FieldValidation[] {
    let result: FieldValidation[] = [];

    if (filters) {
      result = fieldValidations.filter((fieldValidation) =>
        this.matchsAnyFilter(fieldValidation, filters)
      );
    } else {
      result = fieldValidations;
    }

    return result;
  }

  private matchsAnyFilter(fieldValidation: FieldValidation, filters: ValidationFilters) {
    return Object.keys(filters).some(filter =>
      filters[filter] === fieldValidation.filters[filter]
    );
  }
}

export const fieldValidationEventFilter = new FieldValidationEventFilter();
