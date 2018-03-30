import React, {Component} from 'react';
import classNames from 'classnames'

export default class IconAngleRight extends Component {
  click = ()=> {
  }

  render() {

    let { className: pClassName } = this.props

    return (
      <a onClick={this.click}><i className={classNames("fa fa-angle-right", pClassName)} aria-hidden="true"/></a>
    )
  }

}
