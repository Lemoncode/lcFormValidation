import $ from 'jquery';
import { productsService } from '../../services/productsService';
import { productsFormValidation } from './validation/formProductValidationService';

let storedProducts = [];
let $selBrands, $selProducts, $formProducts, $txtNif, $txtDiscount;

class App {
  constructor() {
    this.brands = [];

    this.onBrandSelect = this.onBrandSelect.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    $(this.init.bind(this));
  }

  init() {
    this.loadBrands();
    this.initializeSelectors();
    this.setEventHandlers();
  }

  initializeSelectors() {
    $selBrands = $('#selBrands');
    $selProducts = $('#selProducts');
    $txtNif = $('#txtNif');
    $txtDiscount = $('#txtDiscount');
    $formProducts = $('#formProducts');
  }

  loadBrands() {
    productsService.fetchProducts()
      .then(fetchedProducts => {
        this.brands = fetchedProducts;
        this.loadSelect($selBrands, this.brands);
      });
  }

  loadSelect($select, items = []) {
    $select.children().not(':first').remove();
    const options = items
      .map(item => `<option value="${item.id}">${item.description}</option>`)
      .reduce((opts, option) => {
        return `${opts}${option}`;
      }, '');
    $select.append(options);
  }

  setEventHandlers() {
    $selBrands.change(this.onBrandSelect);
    $txtNif.change(this.onFieldChange);
    $txtDiscount.change(this.onFieldChange);
    $txtDiscount.on('input', this.onDiscountType);
    $formProducts.submit(this.onSubmit);
  }

  onBrandSelect(event) {
    this.onFieldChange(event);
    const product = Number(event.currentTarget.value) || null;
    const isValidProduct = product !== null;
    if (!isValidProduct) {
      $selProducts.val('');
    }
    this.toggleAvailability($selProducts, isValidProduct);
    this.loadProductsByBrand(product);
  }

  toggleAvailability($element, isEnabled) {
    if (isEnabled) {
      $element.removeAttr('disabled');
    } else {
      $element.attr('disabled', 'disabled');
    }
  }

  loadProductsByBrand(id) {
    if (id !== null) {
      const osList = this.getProductsByBrand(id);
      this.loadSelect($selProducts, osList);
    }
  }

  getProductsByBrand(id) {
    const brand = this.brands.filter(product => product.id === id);
    return brand[0] && brand[0].products;
  }

  onSubmit(event) {
    event.preventDefault();
    const $form = $(event.currentTarget);
    const vm = this.getModel($form);
    productsFormValidation
      .validateForm(vm)
      .then(validationResult => {
        validationResult.fieldErrors.forEach(this.handleFieldValidationResult($form));
        if (validationResult.succeeded) {
          console.log('Form is sent');
        }
      })
      .catch(error => {
        console.log('Error validating form', error);
      });
  }

  getModel($form) {
    return $form
      .serializeArray()
      // from { name: <prop>, value: <val> } to [<prop>, <val>] }
      .map(field => ({ [field.name]: field.value }))
      // reduce all in an object
      .reduce((vm, field) => ({ ...vm, ...field }), {});
  };

  handleFieldValidationResult($form) {
    return (function (fieldValidationResult) {
      const field = $form.get(0)[fieldValidationResult.key];
      this.toggleErrorMessage(fieldValidationResult, $(field));
    }).bind(this);
  }

  onFieldChange(event) {
    const $field = $(event.currentTarget);
    productsFormValidation
      .validateField(null, $field.attr('name'), $field.val(), { onChange: true })
      .then((validationResult) => {
        this.toggleErrorMessage(validationResult, $field);
      })
      .catch(error => {
        console.log('Error validating field', error);
      });
  }

  toggleErrorMessage(validationResult, $element) {
    const $parent = $element.closest('div.form-group');
    if (validationResult.succeeded) {
      $parent.removeClass('has-error').find('span.help-block').html('');
    } else {
      $parent.addClass('has-error').find('span.help-block').html(validationResult.errorMessage);
    }
  }

  onDiscountType(event) {
    const $element = $(event.currentTarget);
    $element.val($element.val().toUpperCase());
  }
}

export {
  App,
};
