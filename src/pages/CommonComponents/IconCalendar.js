import React, {Component} from 'react';
import classNames from 'classnames'

import '../../css/style.css';
import '../../css/risStyle.css';

export default class IconSearch extends Component {

  click = ()=> {
  }

  render() {

    let { className: pClassName } = this.props

    return (
      <a onClick={this.click}><i className={classNames("fa fa-calendar-o fa-grey ris-col3", pClassName)} aria-hidden="true"></i></a>
    )
  }
}
