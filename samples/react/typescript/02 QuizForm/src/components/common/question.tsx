import * as React from 'react';

interface Props {
  text: string,
  name: string,
  isSelected: boolean,
  onChange(event): void;
}

export class Question extends React.Component<Props, {}>{
  constructor(props: Props) {
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
