import React, {Component} from 'react';

import '../../css/style.css';
import '../../css/ad.css';

export default class ADSection extends Component {

  render() {
    return (
      <div className="ad_section_container">
        <div className="container">
          <div className="row">
            <div className="col">
              购买日期
            </div>
            <div className="col">
              奖品名称
            </div>
            <div className="col-5">
              <div className="container">
                <div className="row">
                  <div className="col">
                    奖品金额（元）
                  </div>
                  <div className="col">
                    购买数量（个）
                  </div>
                  <div className="col">
                    奖品状态
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              操作
            </div>
          </div>
        </div>
      </div>
    )
  }
}
