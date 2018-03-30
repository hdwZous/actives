import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import Line from './Line';

import '../../css/style.css';

export default class Header extends Component {

  static propTypes = {
      title: PropTypes.string,
  }

  render() {
   
    let {title, children,className: pClassName} = this.props;

    return (
      <div className={classNames("cm_header d-flex align-items-center", pClassName)}>
        {title ? <p>{title}</p> : undefined}
        {children}
      </div>
    )
  }
}
