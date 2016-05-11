import * as React from 'react';

interface Props {
  text : string,
  name : string,
  isSelected : boolean,
  onChange : any
}

export class Question extends React.Component<Props, {}>{
  constructor(props : Props) {
    super(props);
  }

  public  render() {
    return (
      <div>
      <input
        style={{marginRight: 20 + 'px'}}
        name={this.props.name}
        type="checkbox"
        checked={this.props.isSelected}
        onChange={this.props.onChange}/>
        <label>{this.props.text}</label>
      </div>
    );
  }
}
