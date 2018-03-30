import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../css/style.css';

export default class JRSpace extends Component {

    render() {
        let {
            className: pClassName
        } = this.props;
        let cls = pClassName ? pClassName : "jr_space";
    return (
      <div className={cls}>
      </div>
    )
  }
}
