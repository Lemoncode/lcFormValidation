import Vue, {ComponentOptions} from 'vue';
import {RecipeEntity, RecipeError} from '../../../model';
import {recipeAPI} from '../../../api/recipe';
import {editFormValidation} from './validations/editFormValidation';
import {EditRecipePage} from './page';

interface EditRecipeContainerOptions extends Vue {
  recipe: RecipeEntity;
  recipeError: RecipeError;
  updateRecipe: (name) => void;
  addIngredient: (ingredient) => void;
  removeIngredient: (ingredient) => void;
  validateRecipeField: (field, value) => void;
  updateRecipeError: (field, result) => void;
  save: () => void;
}

export const EditRecipeContainer = Vue.extend({
  render: function(h) {
    return (
      <EditRecipePage
        recipe={this.recipe}
        recipeError={this.recipeError}
        updateRecipe={this.updateRecipe}
        addIngredient={this.addIngredient}
        removeIngredient={this.removeIngredient}
        save={this.save}
      />
    );
  },
  props: [
    'id'
  ],
  data: function() {
    return {
      recipe: new RecipeEntity(),
      recipeError: new RecipeError(),
    };
  },
  beforeMount: function() {
    const id = Number(this["id"]) || 0;
    recipeAPI.fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = recipe;
      });
  },
  methods: {
    updateRecipe: function(name) {
      this.recipe = {
        ...this.recipe,
        name,
      };

      this.validateRecipeField('name', name);
    },
    addIngredient: function(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      };

      this.validateRecipeField('ingredients', this.recipe.ingredients);
    },
    removeIngredient: function(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((i) => {
          return i !== ingredient;
        }),
      };

      this.validateRecipeField('ingredients', this.recipe.ingredients);
    },
    validateRecipeField: function(field, value) {
      editFormValidation.validateField(this.recipe, field, value)
        .then((result) => this.updateRecipeError(field, result));
    },
    updateRecipeError: function(field, result) {
      this.recipeError = {
        ...this.recipeError,
        [field]: result,
      };
    },
    save: function() {
      editFormValidation.validateForm(this.recipe)
        .then((result) => {
          result.fieldErrors
            .map((error) => this.updateRecipeError(error.key, error));

          if(result.succeeded) {
            console.log('Save recipe');
          }
        });
    },
  }
} as ComponentOptions<EditRecipeContainerOptions>);

