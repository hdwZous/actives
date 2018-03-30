import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../css/empty.css';

export default class JREmpty extends Component {
    static propTypes = {
        emptyValue:PropTypes.string,
    }
  render() {
    let {
        emptyValue,
    } = this.props;
    return (
      <div className={`cm_empty d-flex justify-content-center align-items-center`}>
          <div className="">
                <img src={require("../../img/ic_empty.png")}/>
                <p className="text-center">{emptyValue}</p>
          </div>
      </div>
    )
  }
}
