import React, {Component} from 'react';

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class ACThirdSection extends Component {

  render() {
    return (
      <div className="ac_section ac_font_12">
        <div className="container">
          <div className="row">
            <div className="ac_third_col1">
              <p style={{marginLeft: 30}}>京东PIN</p>
            </div>
            <div className="ac_third_col2">
              姓名
            </div>
            <div className="ac_third_col3">
              手机号
            </div>
            <div className="ac_third_col4">
              互动组件名称
            </div>
            <div className="ac_third_col5">
              活动日期
            </div>
            <div className="ac_third_col6">
              奖品
            </div>
            <div className="ac_third_col7">
              面额
            </div>
            <div className="ac_third_col8">
              用户状态
            </div>
            <div className="ac_third_col9">
              奖品发放时间
            </div>
            <div className="col">
              收货地址
            </div>
          </div>
        </div>
      </div>
    )
  }
}
