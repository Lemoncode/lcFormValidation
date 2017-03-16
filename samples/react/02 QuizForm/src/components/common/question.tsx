import * as React from 'react';

interface Props {
  text: string,
  name: string,
  isSelected: boolean,
  onChange: any
}

export class Question extends React.Component<Props, {}>{
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div className="checkbox">
        <label>
          <input
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
