import {
  FieldValidation,
  FieldValidationResult,
  AsyncFieldValidationFunction,
} from './entities';

export class EntitiesMapper {
  public ExtractArrayValidationFnFromFieldValidationArray(validationsPerField: FieldValidation[])
    : AsyncFieldValidationFunction[] {
    return validationsPerField.map(validation => validation.validationFn);
  }
}

export const entitiesMapper = new EntitiesMapper();
