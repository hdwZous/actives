import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { DatePicker } from 'antd';

import JRBottomBar from '../CommonComponents/JRBottomBar';
import Header from '../CommonComponents/Header';
import BaseInput from '../CommonComponents/BaseInput';
import JRSpace from '../CommonComponents/JRSpace';

import '../../css/buyCoupon.css';
import '../../css/buyCommon.css';
import '../../css/style.css';

const RadioGroup = Radio.Group;

export default class BuyCoupon extends Component {

  static propTypes = {
      title: PropTypes.string.isRequired,
  }

  state = {
    value: 1,
  }

  onChange = (e) => {

    this.setState({
      value: e.target.value,
    });
  }

  render() {

    let {title} = this.props;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <div className="cm_absolute_full_bg d-flex justify-content-center align-items-center cm_12_color_style">
        <div className="cm_fixed_bounds cm_buy_boundsize">
          <Header title="购买商品"/>

          <div className="cm_scroll_top_bottom_surplus">
            <div className="cm_buy_icon"><img src=""/></div>
            <p className="cm_buy_title">基金满返券</p>

            <div className="media cm_buy_margin_top cm_buy_margin_bottom">
              <p className="bc_left_content">使用条件</p>
              <div className="media-body">
                <p>基金满返券</p>
              </div>
            </div>

            <div className="media cm_buy_margin_bottom">
              <p className="bc_left_content">有效期限</p>
              <div className="media-body">
                <p>有效期至2017-12-31</p>
              </div>
            </div>

            <div className="media cm_buy_margin_bottom">
              <p className="bc_left_content">适用平台</p>
              <div className="media-body">
                <p>访问爱奇艺网站或爱奇艺app</p>
              </div>
            </div>

            <div className="media cm_buy_margin_bottom">
              <p className="bc_left_content">券类型</p>
              <div className="media-body">
                <p>满返券</p>
              </div>
            </div>

            <div className="media cm_buy_margin_bottom">
              <p className="cm_star bc_left_content">奖品面额</p>
              <div className="media-body d-flex flex-row">
                <p>满</p>
                <JRSpace className="cm_space_10"/>
                <BaseInput className="cm_input" type="text" label="元"/>
                <JRSpace className="cm_space_10"/>
                <p>到</p>
                <JRSpace className="cm_space_10"/>
                <BaseInput className="cm_input" type="text" label="元"/>
              </div>
            </div>

            <div className="media cm_buy_margin_bottom">
              <p className="cm_star bc_left_content">券名称</p>
              <div className="media-body">
                <BaseInput className="cm_input" type="text"/>
              </div>
            </div>

            <div className="media cm_buy_margin_bottom">
              <p className="cm_star bc_left_content">券有效期</p>
              <div className="media-body position-relative">
                <RadioGroup className="bc_select_time" onChange={this.onChange} value={this.state.value}>
                  <Radio style={radioStyle} value={1}>绝对时间</Radio>
                  <Radio style={radioStyle} value={2}>相对时间</Radio>
                </RadioGroup>
                <div className="bc_select_time_wrap">
                  <DatePicker/>
                  <DatePicker/>
                </div>
                <div className="d-flex flex-row" style={{marginTop: '10px'}}>
                  <p className="bc_label">领取后</p>
                  <JRSpace className="cm_space_10"/>
                  <BaseInput className="cm_input" type="text" label="元"/>
                  <JRSpace className="cm_space_10"/>
                  <p className="bc_space_label">有效</p>
                </div>

              </div>
            </div>

            <div className="media cm_buy_margin_bottom">
              <p className="cm_star bc_left_content">预计数量</p>
              <div className="media-body">
                <BaseInput className="cm_input" type="text" label="张"/>
              </div>
            </div>

            <div className="media cm_buy_margin_bottom">
              <p className="cm_star bc_left_content">使用说明</p>
              <div className="media-body">
                <BaseInput className="cm_input" type="text" placeholder="例：订单满1000元可用"/>
              </div>
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
