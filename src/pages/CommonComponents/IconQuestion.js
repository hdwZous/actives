import React, {Component} from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

import '../../css/style.css';
import '../../css/risStyle.css';

export default class IconQuestion extends Component {

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

    let {
      className: pClassName,
      ...other
    } = this.props

    return (
      <a onClick={this.click}><div className={classNames('cm_question', pClassName)} aria-hidden="true" style={{width: 14, height: 14}} {...other}></div></a>
    )
  }
}
