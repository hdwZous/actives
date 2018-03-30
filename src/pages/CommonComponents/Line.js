import React, {Component} from 'react';
import '../../css/style.css';

export default class Line extends Component {

  render() {

    let {className: pClassName} = this.props;

    return (
      <div className={`line ${pClassName}`}>

      </div>
    )
  }
}
