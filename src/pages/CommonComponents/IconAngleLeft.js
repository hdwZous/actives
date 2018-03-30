import React, {Component} from 'react';
import classNames from 'classnames'

export default class IconAngleLeft extends Component {
  click = ()=> {
  }

  render() {

    let { className: pClassName } = this.props

    return (
      <i className={classNames("fa fa-angle-left", pClassName)} aria-hidden="true"></i>
    )
  }

}
