import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Line from '../CommonComponents/Line';

import Utils from '../../Utils'

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class ACFirstCell extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  render() {

    let {
      data,
      index
    } = this.props

    return (
      <div className="ac_cell">
        <div className="container">
          <div className="row">
            <div className="ac_first_col1 font_family_PingFangSC_Regular">
              <p className="text-truncate" style={{marginLeft: 30}}>{`奖品${Utils.NumberToChinese(index + 1)}`}</p>
            </div>
            <div className="ac_first_col2 d-flex align-items-center">
              <div className="ac_icon"><img src={data.awardImg} alt=""/></div>
            </div>
            <div className="ac_first_col3 text-truncate font_family_PingFangSC_Regular">
              {data.awardSkuName}
            </div>
            <div className="ac_first_col4 text-truncate">
              {`￥${Utils.format3Number(data.awardPerPrice, 2)}`}
            </div>
            <div className="ac_first_col5 text-truncate">
              {Utils.format3Number(data.awardCount)}
            </div>
            <div className="ac_first_col6 text-truncate">
              {`￥${Utils.format3Number(data.awardTotalPrice, 2)}`}
            </div>
            <div className="ac_first_col7 text-truncate">
              {`${data.awardRate}%`}
            </div>
            <div className="col text-truncate font_family_PingFangSC_Regular">
              {data.awardShowName}
            </div>
          </div>
        </div>
        <Line className="cm_slim_line bottom"/>
      </div>
    )
  }
}
