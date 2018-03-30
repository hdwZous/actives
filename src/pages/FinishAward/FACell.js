import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Line from '../CommonComponents/Line';

import Utils from '../../Utils';

import '../../css/style.css';
import '../../css/fa.css';

export default class FACell extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  render() {

    let {
      data
    } = this.props

    return (
      <div className="fa_cell_container font14">
        <div className="container">
          <div className="row">
            <div className="col-7 font_family_PingFangSC_Regular">
              {data.awardShowName}
            </div>
            <div className="col">
              <div className="container">
                <div className="row">
                  <div className="col font-weight-bold">
                    {data.awardPerPrice}
                    {/* <p>{`￥${Utils.format3Number(data.awardPerPrice, 2)}`}</p> */}
                  </div>
                  <div className="col font-weight-bold" style={{paddingLeft: 70}}>
                    {data.awardCount}
                    {/* <p>{Utils.format3Number(data.awardCount)}</p> */}
                  </div>
                  <div className="col font-weight-bold" style={{paddingLeft: 70}}>
                    {data.awardTotalPrice}
                    {/* <p>{`￥${Utils.format3Number(data.awardTotalPrice, 2)}`}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Line className="bottom fa_cell_line"/>
      </div>
    )
  }
}
