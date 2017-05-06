import Vue, {ComponentOptions} from 'vue';
import {IngredientRowComponent} from './ingredientRow';

interface Props extends Vue {
  ingredients: string[];
  removeIngredient: (ingredient) => void;
}

export const IngredientListComponent = Vue.extend({
  props: [
    'ingredients',
    'removeIngredient',
  ],
  render: function(h) {
    return (
      <div class="form-group panel panel-default">
        <div class="panel-body">
          {
            this.ingredients.map((ingredient, index) =>
              <IngredientRowComponent
                key={index}
                ingredient={ingredient}
                removeIngredient={this.removeIngredient}
              />
            )
          }
        </div>
      </div>
    );
  },
} as ComponentOptions<Props>);