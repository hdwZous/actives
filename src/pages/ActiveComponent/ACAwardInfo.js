import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JRHeader from '../CommonComponents/JRHeader'
import ACSecondSection from './ACSecondSection'
import ACSecondCell from './ACSecondCell'

import Utils from '../../Utils'

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class ACAwardInfo extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  render() {

    let {
      data
    } = this.props

    return (
      <div className="">
        <JRHeader title="奖品明细" line/>
        <div className="ac_info_title d-flex justify-content-between">
          <p>{`活动时间：${Utils.formatTime2Str(data.actBegin, 'yyyy-MM-dd hh:mm:ss')} 至 ${Utils.formatTime2Str(data.actEnd, 'yyyy-MM-dd hh:mm:ss')}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`参与人数：${Utils.format3Number(data.participateNumber)} 人`}</p>
          <a target="_blank" href={data.downloadUrl}>下载中奖名单</a>
        </div>
        <ACSecondSection/>
        {
          data.actAwardStatVoList && data.actAwardStatVoList.map((value, idx) => {
              return (
                <ACSecondCell index={idx} key={idx} data={value}/>
              )
          })
        }
      </div>
    )
  }
}
