import React, {Component} from 'react';

import IconQuestion from '../CommonComponents/IconQuestion';
import JRSpace from '../CommonComponents/JRSpace';
import JRParentToast from '../CommonComponents/JRParentToast';

import '../../css/style.css';
import '../../css/expensesRecord.css';

export default class ERFirstSection extends Component {

  render() {
    return (
      <div className="er_section">
        <div className="container">
          <div className="row">
            {/* <div className="er_first_col1">
              <p style={{marginLeft: 30}}>消费编号</p>
            </div> */}
            <div className="er_first_col1 d-flex flex-row align-items-center">
              <p style={{marginLeft: 30}}>交易编号</p>
              <JRSpace className="cm_space_5"/>
              <IconQuestion click={()=>{
                JRParentToast.showModal("修改活动时间/奖品信息时，根据修改信息另生成奖品。")
              }}/>
            </div>
            <div className="er_first_col2 d-flex flex-row align-items-center">
              锁定金额
              <JRSpace className="cm_space_5"/>
              <IconQuestion click={()=>{
                JRParentToast.showModal("锁定金额包括奖品费用和消息费用，其中消息费用=奖品数量X0.05元。")
              }}/>
            </div>
            <div className="er_first_col3 d-flex flex-row align-items-center">
              锁定时间
              <JRSpace className="cm_space_5"/>
              <IconQuestion click={()=>{
                JRParentToast.showModal("锁定时间为活动上线并实际购买奖品时间。")
              }}/>
            </div>
            <div className="er_first_col4 d-flex flex-row align-items-center">
              消费金额
              <JRSpace className="cm_space_5"/>
              <IconQuestion click={()=>{
                JRParentToast.showModal("消费金额表示截止当前查询时间所消费的金额（包括奖品费用和消息费用，其中消息费用=奖品数量X0.05元），最终消费金额以活动结束后，实际结算时为主。")
              }}/>
            </div>
            <div className="col d-flex flex-row align-items-center">
              可释放金额
              <JRSpace className="cm_space_5"/>
              <IconQuestion click={()=>{
                JRParentToast.showModal("可释放金额表示截止当前查询时剩余金额，最终释放金额以活动结束后，实际结算时为主。")
              }}/>
            </div>
            {/* <div className="col d-flex flex-row align-items-center">
              释放时间
              <JRSpace className="cm_space_5"/>
              <IconQuestion click={()=>{
                JRParentToast.showModal("释放时间为活动结束时间+3天或活动信息修改时间+3天")
              }}/>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
