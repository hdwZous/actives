import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import Line from '../CommonComponents/Line';

import '../../css/style.css';
import '../../css/commonSection.css';

export default class CommonSection extends Component {

  static propTypes = {
      title: PropTypes.string,
  }

  render() {

    let {
      title,
      className: pClassName
    } = this.props

    return (
      <div className={classNames("cm_section", pClassName)}>
        <p>{title}</p>
        <Line className="cm_cell_line"/>
      </div>
    )
  }
}
