import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Line from '../CommonComponents/Line';
import '../../css/style.css';

export default class JRBottomBar extends Component {

  render() {

    let { children } = this.props

    return (
      <div className="ca-bottomBar bottom d-flex justify-content-end align-items-center">
        <Line className="top"/>
        {

            React.Children.map(children, (value, idx) => {
                return (
                  <div index={idx} key={idx}>
                    {value}
                  </div>
                )
            })
        }
      </div>
    )
  }
}
