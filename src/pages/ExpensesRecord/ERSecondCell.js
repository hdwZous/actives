import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Line from '../CommonComponents/Line';
import Utils from '../../Utils'

import '../../css/style.css';
import '../../css/expensesRecord.css';

export default class ERSecondCell extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  render() {

    let {
      data
    } = this.props

    return (
      <div className="er_cell">
        <div className="container">
          <div className="row">
            <div className="er_second_col1">
              <p className="text-truncate" style={{marginLeft: 30}}>{data.transactionNo}</p>
            </div>
            <div className="er_second_col2 text-truncate font_family_PingFangSC_Regular">
              {data.awardName}
            </div>
            <div className="er_second_col3 text-truncate">
              {Utils.formatTime2Str(data.lockDate, 'yyyy-MM-dd')}
            </div>
            <div className="er_second_col4 text-truncate">
              {`￥${Utils.format3Number(data.awardAmount, 2)}`}
            </div>
            <div className="er_second_col5 text-truncate">
              {Utils.format3Number(data.consumeQuantity)}
            </div>
            <div className="er_second_col6 text-truncate">
              {`￥${Utils.format3Number(data.releaseAmount, 2)}`}
            </div>
            {/* <div className="er_second_col7 text-truncate">

            </div> */}
            <div className="col text-truncate">
              {Utils.formatTime2Str(data.releaseDate, 'yyyy-MM-dd')}
            </div>
          </div>
        </div>
        <Line className="cm_slim_line bottom"/>
      </div>
    )
  }
}
