import Vue, { ComponentOptions } from 'vue';

interface Props extends Vue {
  hasError: boolean;
  errorMessage: string;
  className: string;
}

export const ValidationComponent = Vue.extend({
  props: [
    'hasError',
    'errorMessage',
    'className',
  ],
  render: function(h) {
    let wrapperClass = `${this.className}`;

    if (this.hasError) {
      wrapperClass = `${wrapperClass} has-error`
    }

    return (
      <div class={wrapperClass}>
        {this.$slots.default}
        <div class="help-block">
          {this.errorMessage}
        </div>
      </div>
    );
  },
} as ComponentOptions<Props>);
