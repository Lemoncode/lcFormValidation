import { FieldValidation } from './entities';

class FieldValidationEventFilter {

  public filter(fieldValidations: Array<FieldValidation>, filter: any): Array<FieldValidation> {
    let result = new Array<FieldValidation>();

    if (filter) {
      result = fieldValidations.filter((element) => {
        return this.matchFilterOr(element, filter)
      });
    } else {
      result = fieldValidations;
    }

    return result;
  }

  private matchFilterOr(itemFilter, globalFilter) {
    let result: boolean = false;

    for (var property in globalFilter) {
      if (this.propertyMatched(itemFilter, property, globalFilter)) {
        result = true;
        break;
      }
    }

    return result;
  }

  private propertyMatched(item: any, property: any, globalFilter: any): boolean {
    return (globalFilter.hasOwnProperty(property) &&
      globalFilter[property] == item.filter[property]);
  }
}

export const fieldValidationEventFilter = new FieldValidationEventFilter();
