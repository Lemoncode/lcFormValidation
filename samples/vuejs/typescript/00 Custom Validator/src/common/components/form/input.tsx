import Vue, {ComponentOptions} from 'vue';

interface Props extends Vue {
  className: string;
  placeholder: string;
  type: string;
  value: any;
  inputHandler: (event) => void;
  label: string;
  name: string;
}

export const InputComponent = Vue.extend({
  props: [
    'className',
    'placeholder',
    'type',
    'value',
    'inputHandler',
    'label',
    'name',
  ],
  render: function(h) {
    return (
      <div class={`form-group ${this.className}`}>
        <label for={this.name}>
          {this.label}
        </label>
        <input
          class="form-control"
          name={this.name}
          placeholder={this.placeholder}
          type={this.type}
          value={this.value}
          onInput={this.inputHandler}
        />
      </div>
    );
  },
} as ComponentOptions<Props>);