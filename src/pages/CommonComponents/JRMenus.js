import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JRSpace from './JRSpace';

export default class JRMenus extends Component {
  render() {

    let { children } = this.props

    return (
      <div className="d-flex flex-row flex-wrap" {...this.props}>
        {

            React.Children.map(children, (value, idx) => {
                return (
                  <div className="d-flex flex-row" style={{marginBottom: 20}} index={idx} key={idx}>
                    {value}
                    <JRSpace/>
                  </div>
                )
            })
        }
      </div>
    )
  }
}
