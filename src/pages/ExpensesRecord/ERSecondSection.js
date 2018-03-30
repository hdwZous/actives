import React, {Component} from 'react';

import IconQuestion from '../CommonComponents/IconQuestion';
import JRSpace from '../CommonComponents/JRSpace';
import JRParentToast from '../CommonComponents/JRParentToast';

import '../../css/style.css';
import '../../css/expensesRecord.css';

export default class ERSecondSection extends Component {

  render() {
    return (
      <div className="er_section">
        <div className="container">
          <div className="row">
            <div className="er_second_col1">
              <p style={{marginLeft: 30}}>交易编号</p>
            </div>
            <div className="er_second_col2">
              奖品名称
            </div>
            <div className="er_second_col3 d-flex flex-row align-items-center">
              锁定时间
              <JRSpace className="cm_space_5"/>
              <IconQuestion click={()=>{
                JRParentToast.showModal("锁定时间为活动上线并实际购买奖品时间。")
              }}/>
            </div>
            <div className="er_second_col4">
              奖品面额
            </div>
            {/* <div className="er_second_col5">
              奖品数量
            </div> */}
            <div className="er_second_col5">
              消费数量
            </div>
            <div className="er_second_col6">
              可释放金额
            </div>
            <div className="col d-flex flex-row align-items-center">
              释放时间
              <JRSpace className="cm_space_5"/>
              <IconQuestion click={()=>{
                JRParentToast.showModal("释放时间为活动结束时间+5天或活动信息修改时间+5天。")
              }}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
