import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Line from '../CommonComponents/Line';
import Utils from '../../Utils'

import '../../css/style.css';
import '../../css/expensesRecord.css';

export default class ERFirstCell extends Component {

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
            <div className="er_first_col1">
              <p className="text-truncate" style={{marginLeft: 30}}>{data.transactionNo}</p>
            </div>
            {/* <div className="er_first_col1 text-truncate">
              <p className="text-truncate" style={{marginLeft: 30}}>{data.transactionNo}</p>
            </div> */}
            <div className="er_first_col2 text-truncate">
              {`￥${Utils.format3Number(data.lockAmount, 2)}`}
            </div>
            <div className="er_first_col3 text-truncate">
              {Utils.formatTime2Str(data.lockDate, 'yyyy-MM-dd')}
              {/* {Utils.formatTime2Str(data.lockDate, 'yyyy-MM-dd hh:mm')} */}
            </div>
            <div className="er_first_col4 text-truncate">
              {`￥${Utils.format3Number(data.consumeAmount, 2)}`}
            </div>
            <div className="col text-truncate">
              {`￥${Utils.format3Number(data.releaseAmount, 2)}`}
            </div>
            {/* <div className="col text-truncate">
              {Utils.formatTime2Str(data.releaseDate, 'yyyy-MM-dd hh:mm')}
            </div> */}
          </div>
        </div>
        <Line className="cm_slim_line bottom"/>
      </div>
    )
  }
}
