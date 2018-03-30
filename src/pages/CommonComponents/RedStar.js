import React, {Component} from 'react';

export default class RedStar extends Component {

  render() {

    let {className: pClassName} = this.props;

    return (
      <span className={`${pClassName} cm_red_color`}>* </span>
    )
  }
}
