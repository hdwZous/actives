import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Line from './Line';

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class JRHeader extends Component {

  static propTypes = {
      title: PropTypes.string.isRequired,
      des: PropTypes.string,
      line: PropTypes.bool,
  }

  static defaultProps = {
      title: '',
      des: '',
  }

  render() {

    let {
      title,
      des,
      line
    } = this.props

    return (
      <div className="ac_header">
        <p>{title}<span>{des}</span></p>
        {line ? <Line className="cm_slim_line bottom"/> : undefined}
      </div>
    )
  }
}
