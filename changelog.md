vNext Features ("0.2.0)
=======================

- Added chain pattern to validationEngine.addFeildValidation when adding validations,
  by doing this it would be less verbose to add new field validations.

```javascript
this._validationEngine
       .addFieldValidation('fullname', requiredValidationHandler)
       .addFieldValidation('email', requiredValidationHandler)
       .addFieldValidation('email', emailValidationHandler);
```
