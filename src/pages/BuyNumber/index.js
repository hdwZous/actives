import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JRBottomBar from '../CommonComponents/JRBottomBar';
import Header from '../CommonComponents/Header';
import BaseInput from '../CommonComponents/BaseInput';
import RedStar from '../CommonComponents/RedStar';

import '../../css/buyNumber.css';
import '../../css/buyCommon.css';
import '../../css/style.css';

export default class BuyNumber extends Component {

  static propTypes = {
      title: PropTypes.string.isRequired,
  }

  render() {

    let {title} = this.props;

    return (
      <div className="cm_absolute_full_bg d-flex justify-content-center align-items-center cm_12_color_style">
        <div className="cm_fixed_bounds cm_buy_boundsize">
          <Header title="购买商品"/>
          <div className="cm_buy_icon"><img src=""/></div>
          <p className="cm_buy_title">10元爱奇艺会员季卡代金券</p>

          <div className="media cm_buy_margin_top cm_buy_margin_bottom">
            <p className="cm_buy_left_content">使用条件</p>
            <div className="media-body">
              <p>爱奇艺视频会员季卡代金券</p>
            </div>
          </div>

          <div className="media cm_buy_margin_bottom">
            <p className="cm_buy_left_content">有效期限</p>
            <div className="media-body">
              <p>有效期至2017-12-31</p>
            </div>
          </div>

          <div className="media cm_buy_margin_bottom">
            <p className="cm_buy_left_content">适用平台</p>
            <div className="media-body">
              <p>访问爱奇艺网站或爱奇艺app</p>
            </div>
          </div>

          <div className="media cm_buy_margin_bottom">
            <p className="cm_buy_left_content">奖品面额</p>
            <div className="media-body">
              <p>10元</p>
            </div>
          </div>

          <div className="media cm_buy_margin_bottom">
            <p className="cm_buy_left_content"><RedStar/>奖品数量</p>
            <div className="media-body">
              <BaseInput className="cm_input" type="text" label="个"/>
            </div>
          </div>

          <div className="media cm_buy_margin_bottom">
            <p className="cm_buy_left_content">温馨提示</p>
            <div className="media-body">
              <p className="cm_buy_right_content" style={{lineHeight: '20px'}}>担惊受恐龙卷风私搭乱建索拉卡的房价设计费来看就是看了积分圣诞节浪费就离开设计费来看就就是多了房价了就是看了地脚螺栓局对路径了但是见了就了肯定手机看来飞机快老是惦记看逻辑施蒂利克老数据</p>
            </div>
          </div>

          <JRBottomBar>
  <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="返回" onClick={null}/>
  <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="提交" onClick={null}/>
</JRBottomBar>
        </div>
      </div>
    )
  }
}
