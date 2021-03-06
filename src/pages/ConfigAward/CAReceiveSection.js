import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JRSpace from '../CommonComponents/JRSpace';

import '../../css/style.css';

export default class CAReceiveSection extends Component {

  render() {

    return (
      <div className="ca-section d-flex flex-row flex-nowrap">
        <p className="ca-col1">奖品名称</p>
        <JRSpace/>
        <p className="ca-col2">缩略图</p>
        <JRSpace/>
        <p className="ca-col3">奖品面额（元）</p>
        <JRSpace/>
        <p className="ca-col4">奖品数量（个）</p>
        <JRSpace/>
        <p className="ca-col5">奖品费用（元）</p>
        <JRSpace/>
        <p className="ca-col7">奖品显示名称</p>
        <JRSpace/>
      </div>
    )
  }
}
