import Vue, {ComponentOptions} from 'vue';

interface Props extends Vue {
  ingredient: string;
  removeIngredient: (ingredient) => void;
}

export const IngredientRowComponent = Vue.extend({
  props: [
    'ingredient',
    'removeIngredient',
  ],
  render: function(h) {
    return (
      <div class="col-sm-3">
        <label class="col-xs-8">
          {this.ingredient}
        </label>
        <span
          class="btn btn-default"
          onClick={() => this.removeIngredient(this.ingredient)}
        >
          <i class="glyphicon glyphicon-remove"></i>
        </span>
      </div>
    );
  },
} as ComponentOptions<Props>);