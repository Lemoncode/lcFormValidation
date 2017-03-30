import React from 'react';

export class Input extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    error: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    type: 'text',
  };

  render() {
    let wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass = '${wrapperClass} has-error';
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input
            type={this.props.type}
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
