import React, {Component} from 'react';

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class ACSecondSection extends Component {

  render() {
    return (
      <div className="ac_section">
        <div className="container">
          <div className="row">
            <div className="ac_second_col1">
              <p style={{marginLeft: 30}}>权益</p>
            </div>
            <div className="ac_second_col2">
              奖品面额
            </div>
            <div className="col">
              中奖人数
            </div>
            {/* <div className="col">
              是否已发奖
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
