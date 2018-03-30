import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Line from '../CommonComponents/Line';

import Utils from '../../Utils'

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class ACThirdCell extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  render() {

    let {
      data
    } = this.props

    return (
      <div className="ac_cell">
        <div className="container ac_font_12 font_family_ArialMT">
          <div className="row">
            <div className="ac_third_col1">
              <p className="text-truncate" style={{marginLeft: 30}}>{data.pin}</p>
            </div>
            <div className="ac_third_col2 text-truncate">
              {data.userName}
            </div>
            <div className="ac_third_col3 text-truncate">
              {data.phone}
            </div>
            <div className="ac_third_col4 text-truncate">
              {data.actName}
            </div>
            <div className="ac_third_col5 d-flex align-items-center">
              <p style={{lineHeight: '15px'}}>
                {`${Utils.formatTime2Str(data.actBeginDate, 'yyyyMMdd hh:mm:ss')} - `}
                <br/>
                {`${Utils.formatTime2Str(data.actEndDate, 'yyyyMMdd hh:mm:ss')}`}
              </p>
            </div>
            <div className="ac_third_col6 text-truncate">
              {data.awardName}
            </div>
            <div className="ac_third_col7 text-truncate">
              {`￥${Utils.format3Number(data.awardPerPrice, 2)}`}
            </div>
            <div className="ac_third_col8 text-truncate">
              {data.userStatus}
            </div>
            <div className="ac_third_col9 text-truncate">
              {data.awardSendTime ? Utils.formatTime2Str(data.awardSendTime, 'yyyyMMdd hh:mm:ss') : '未发放'}
            </div>
            <div className="col text-truncate">
              {data.address}
            </div>
          </div>
        </div>
        <Line className="cm_slim_line bottom"/>
      </div>
    )
  }
}
