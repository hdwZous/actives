import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Line from '../CommonComponents/Line';

import Utils from '../../Utils'

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class ACSecondCell extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  render() {

    let {
      data
    } = this.props

    return (
      <div className="ac_cell">
        <div className="container">
          <div className="row">
            <div className="ac_second_col1 font_family_PingFangSC_Regular">
              <p className="text-truncate" style={{marginLeft: 30}}>{data.awardName}</p>
            </div>
            <div className="ac_second_col2 text-truncate">
              {`￥${Utils.format3Number(data.awardPrice, 2)}`}
            </div>
            <div className="col text-truncate">
              {Utils.format3Number(data.winUserCount)}
            </div>
            {/* <div className="col text-truncate font_family_PingFangSC_Regular">
              已发奖
            </div> */}
          </div>
        </div>
        <Line className="cm_slim_line bottom"/>
      </div>
    )
  }
}
