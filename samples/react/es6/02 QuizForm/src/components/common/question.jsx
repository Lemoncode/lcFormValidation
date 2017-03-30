import React from 'react';

export class Question extends React.Component {

  static propTypes = {
    text: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="checkbox">
        <label htmlFor={this.props.name}>
          <input
            id={this.props.name}
            name={this.props.name}
            type="checkbox"
            checked={this.props.isSelected}
            onChange={this.props.onChange} />
          <span>{this.props.text}</span>
        </label>
      </div>
    );
  }
}
