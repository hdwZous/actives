import React, {Component} from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

import '../../css/style.css';

export default class IconMinus extends Component {
  static propTypes = {
      click: PropTypes.func,
  }

  click = ()=> {
    let {
      click
    } = this.props
    if (click) {
      click()
    }
  }

  render() {

    let { className: pClassName } = this.props

    return (
      <a onClick={this.click}><i className={classNames("fa fa-minus-square fa-red", pClassName)} aria-hidden="true"></i></a>
    )
  }

}
