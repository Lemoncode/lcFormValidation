import { FieldValidation, FieldValidationResult } from './entities';

export class EntitiesMapper {
  public ExtractArrayValidationFnFromFieldValidationArray(validationsPerField: Array<FieldValidation>)
    : Array<(vm, value) => Promise<FieldValidationResult>> {
    return validationsPerField.map(value => value.validationFn);
  }
}

export const entitiesMapper = new EntitiesMapper();
