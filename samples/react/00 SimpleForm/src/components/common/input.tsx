import * as React from 'react';

interface Props {
  name: string;
  label: string;
  onChange: any;
  placeholder?: string;
  value: string;
  error: string;
}

export class Input extends React.Component<Props, {}> {
  render() {
    let wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass = '${wrapperClass} has-error';
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type="text"
            id={this.props.name}
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
          <div className="help-block">{this.props.error}</div>
        </div>
      </div>
    );
  }
}
