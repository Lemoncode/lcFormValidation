import React from 'react';

export class Input extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    error: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
  };

  constructor(props) {
    super(props);
  }

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
