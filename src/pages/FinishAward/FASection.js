import React, {Component} from 'react';

import '../../css/style.css';
import '../../css/fa.css';

export default class FASection extends Component {

  render() {
    return (
      <div className="fa_section_container">
        <div className="container">
          <div className="row">
            <div className="col-7">
              奖品名称
            </div>
            <div className="col">
              <div className="container">
                <div className="row">
                  <div className="col">
                    奖品面额
                  </div>
                  <div className="col" style={{paddingLeft: 70}}>
                    购买数量
                  </div>
                  <div className="col" style={{paddingLeft: 70}}>
                    奖品费用
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
