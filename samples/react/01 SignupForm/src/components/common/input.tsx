import * as React from 'react';

interface Props {
  name: string;
  label: string;
  onChange: any;
  onBlur?: any;
  placeholder?: string;
  value: string;
  error: string;
  type: string;
}

export class Input extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let wrapperClass: string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass = '${wrapperClass} has-error';
    }
    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input
            id={this.props.name}
            type={this.props.type}
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur} />
          <div className="help-block">{this.props.error}</div>
        </div>
      </div>
    );
  }
}
