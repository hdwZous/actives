import React, {Component} from 'react';

import Line from '../CommonComponents/Line';

import '../../css/style.css';
import '../../css/ad.css';

export default class ADCell extends Component {

  render() {
    return (
      <div className="ad_cell_container">
        <div className="container">
          <div className="row">
            <div className="col">
              2017-12-01 12:02:34
            </div>
            <div className="col">
              10元爱奇艺会员季卡代金券
            </div>
            <div className="col-5">
              <div className="container">
                <div className="row">
                  <div className="col ad_money_col text-center">
                    <p>￥10</p>
                  </div>
                  <div className="col ad_num_col text-center">
                    <p>30,000</p>
                  </div>
                  <div className="col ad_status_col text-center">
                    <p>未发放</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col ad_cell_btn_blue">
              <a className="ad_cell_btn ad_cell_btn_margin_10px" href="" onClick={()=>{}}>创建活动页</a>
              <a className="ad_cell_btn ad_margin_left_20" href="" onClick={()=>{}}>下载电子码</a>
            </div>
          </div>
        </div>
        <Line className="bottom ad_cell_line"/>
      </div>
    )
  }
}
