import React, {Component} from 'react';

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class ACFirstSection extends Component {

  render() {
    return (
      <div className="ac_section">
        <div className="container">
          <div className="row">
            <div className="ac_first_col1">
              <p style={{marginLeft: 30}}>奖品</p>
            </div>
            <div className="ac_first_col2">
              缩略图
            </div>
            <div className="ac_first_col3">
              奖品名称
            </div>
            <div className="ac_first_col4">
              奖品面额
            </div>
            <div className="ac_first_col5">
              购买数量（个）
            </div>
            <div className="ac_first_col6">
              奖品费用
            </div>
            <div className="ac_first_col7">
              中奖率
            </div>
            <div className="col">
              奖品展示名称
            </div>
          </div>
        </div>
      </div>
    )
  }
}
