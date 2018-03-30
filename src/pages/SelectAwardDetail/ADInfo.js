import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Utils from '../../Utils';

import '../../css/style.css';
import '../../css/sad.css';

export default class ADInfo extends Component {
    static propTypes = {
        data:PropTypes.object
    }
  render() {
        let {
            data
        } = this.props
      let type = '';
      if (data) {
          switch (data.awardSkuPriceType) {
              case 1:
                  type = '免费'
                  break;
              case 2:
                  type = data.awardPerPrice ? data.awardPerPrice : 0
                  break;
              case 3:
                  type = '自定义'
                  break;
          }
      }


    return (
      <div className="sad_container">
        <div className="ad_icon_name clearfix">
          <img className="ad_icon" src={data && data.awardImg} alt=""/>
          <p>{data && data.awardSkuName}</p>
        </div>

        <div className="media ad_margin_bottom">
          <p className="ad_left_content">有效期限:</p>
          <div className="media-body">
            <p>有效期至{Utils.formatTime2Str(data && data.awardSkuEnd, 'yyyy/MM/dd')}</p>
          </div>
        </div>

          <div className="media ad_margin_bottom">
              <p className="ad_left_content">奖品面额:</p>
              <div className="media-body">
                  <p>{type}</p>
              </div>
          </div>

        <div className="media ad_margin_bottom">
          <p className="ad_left_content">使用说明:</p>
          <div className="media-body">
            <p>{data.awardSkuDesc}</p>
          </div>
        </div>

      </div>
    )
  }
}
