import React, { Component } from 'react';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import clone from 'clone';
import moment from 'moment'
import 'moment/locale/zh-cn'

import Header from '../CommonComponents/Header';
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRDatePicker from '../CommonComponents/JRDatePicker';
import JRButton from '../CommonComponents/JRButton';
import IconAngleRight from '../CommonComponents/IconAngleRight';
import JRSpace from '../CommonComponents/JRSpace';
import BaseInput from '../CommonComponents/BaseInput';
import Utils from '../../Utils';
import JRMessage from '../CommonComponents/JRMessage';
import RedStar from '../CommonComponents/RedStar';

import '../../css/style.css';
import '../../css/setCoupon.css';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

const INPUT_FULL_INDEX = 0 //满
const INPUT_BACK_INDEX = 1 //返
const INPUT_NAME_INDEX = 2 //全名称
const INPUT_DAYS_INDEX = 3 //领取后多少天
const INPUT_EXPECTED_INDEX = 4 //预计数量
const INPUT_DES_INDEX = 5 //说明
const INPUT_LIMIT_INDEX = 6 //限制张数

class SetCoupon extends Component {

  static propTypes = {
      commitCallback: PropTypes.func,
      cancelCallback: PropTypes.func,
      data: PropTypes.object
  }

  constructor (props) {
    super(props);

    let {
      data
    } = props

    if (Utils.isErrValue(data.couponTimeType)) {
      data.couponTimeType = 1
    }

    this.state = {
      data: clone(data)
    };
  }

  onChange = (e) => {

    let {
      data
    } = this.state

    data.couponTimeType = e.target.value

    this.setState({
      data: data
    })
  }

  //下面是下拉菜单的几个回调
  receiveHandleChange =(value) => {
    this.state.data.couponPickUpLimitScope = value
  }

  useHandleChange =(value) => {
    this.state.data.couponUseChannel = value
  }

  waringHandleChange =(value) => {
    this.state.data.couponBalanceWarning = value
  }

  //下面是选择日期的几个callback
  beginValidOnChange = (m)=> {
    if (m) {
      this.state.data.couponAbsoluteBegin = m.format('x')
    } else {
      this.state.data.couponAbsoluteBegin = null
    }
  }

  endValidOnChange = (m)=> {
    if (m) {
      this.state.data.couponAbsoluteEnd = m.format('x')
    } else {
      this.state.data.couponAbsoluteEnd = null
    }
  }

  beginReceiveOnChange = (m)=> {
    this.state.data.couponPickupBegin = m.format('x')
  }

  endReceiveOnChange = (m)=> {
    this.state.data.couponPickupEnd = m.format('x')
  }

  //输入框里面的内容变了修改当前的state的值
  onBlur = (input)=> {
    let {
      data
    } = this.state

    let {
      value
    } = input.state

    switch (input.props.index) {
      case INPUT_FULL_INDEX:
        data.couponRebateLimit = value
        break;
      case INPUT_BACK_INDEX:
        data.awardPerPrice = value
        break;
      case INPUT_NAME_INDEX:
        data.couponDisplayName = value
        break;
      case INPUT_DAYS_INDEX:
        data.couponRelativeEnd = value
        break;
      case INPUT_EXPECTED_INDEX:
        data.awardCount = value
        break;
      case INPUT_DES_INDEX:
        data.couponDesc = value
        break;
      case INPUT_LIMIT_INDEX:
        data.couponPickUpLimitCount = value
        break;
      default:
    }

    this.setState({
      data: data
    })

  }

  commitClick = ()=> {

    let {
      index,
      commitCallback
    } = this.props

    let {
      data
    } = this.state

    if (Utils.isNullStr(data.couponRebateLimit) || parseFloat(data.couponRebateLimit) === 0) {
      JRMessage.showMessage('请输入满金额并且大于0')
      return
    }

    if (Utils.isNullStr(data.awardPerPrice) || parseFloat(data.awardPerPrice) === 0) {
      JRMessage.showMessage('请输入返金额并且大于0')
      return
    }

    if (Utils.isNullStr(data.couponDisplayName)) {
      JRMessage.showMessage('请输入券名称')
      return
    }

    if (data.couponTimeType === 1) {
      if (Utils.isErrValue(data.couponAbsoluteBegin)) {
        JRMessage.showMessage('请选择绝对时间的开始时间')
        return
      }

      if (Utils.isErrValue(data.couponAbsoluteEnd)) {
        JRMessage.showMessage('请选择绝对时间的结束时间')
        return
      }

      if (data.couponAbsoluteBegin >= data.couponAbsoluteEnd) {
        JRMessage.showMessage('结束时间不能比开始时间早')
        return
      }
    } else if (data.couponTimeType === 2) {
      if (Utils.isNullStr(data.couponRelativeEnd) || parseInt(data.couponRelativeEnd) === 0) {
        JRMessage.showMessage('请选择相对时间的有效天数并且大于0')
        return
      }
    }

    if (Utils.isNullStr(data.awardCount) || parseInt(data.awardCount) === 0) {
      JRMessage.showMessage('请输入预计数量并且大于0')
      return
    }

    if (Utils.isNullStr(data.couponDesc)) {
      JRMessage.showMessage('请输入使用说明')
      return
    }

    // if (Utils.isErrValue(data.couponPickupBegin)) {
    //   JRMessage.showMessage('请选择领取开始时间')
    //   return
    // }
    //
    // if (Utils.isErrValue(data.couponPickupEnd)) {
    //   JRMessage.showMessage('请选择领取结束时间')
    //   return
    // }
    //
    // if (data.couponPickupBegin >= data.couponPickupEnd) {
    //   JRMessage.showMessage('结束时间不能比开始时间早')
    //   return
    // }

    data.awardConfigType = 4

    commitCallback && commitCallback(index, data)
  }

  render() {
    let {
      data
    } = this.state

    let {
      cancelCallback
    } = this.props

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };


    return (
      <div className="cm_full_fixed App d-flex justify-content-center align-items-center cm_12_color_style">
        <div className="cm_full_container">
          <Header>
            <div className="jr_breadcrumb d-flex flex-row align-items-center">
              <JRSpace className="cm_space_40"/>
              <a onClick={cancelCallback}><img src={require('../../img/ic_back.png')} style={{width: 24, height: 24}}/></a>
              <JRSpace className="cm_space_15"/>
              <p>配置奖品</p>
              <IconAngleRight className="ad_arrow_space"/>
              <p className='current'>设置优惠券</p>
            </div>
          </Header>

          <div className="cm_scroll_top_bottom_surplus sc_bounds">

            <div className="media sc_margin_top sc_margin_bottom">
              <p className="sc_left_content"><RedStar/>券类型：</p>
              <div className="media-body">
                <p>{data.couponTypeName}</p>
              </div>
            </div>

            <div className="media sc_margin_bottom">
              <p className="sc_left_content"><RedStar/>优惠面额：</p>
              <div className="media-body d-flex flex-row align-items-center">
                <p>满</p>
                <JRSpace className="cm_space_10"/>
                <BaseInput index={INPUT_FULL_INDEX} className="cm_input" type="text" label="元" value={Utils.isErrValue(data.couponRebateLimit) ? '' : data.couponRebateLimit} onBlur={this.onBlur} isnumber/>
                <JRSpace className="cm_space_10"/>
                <p>返</p>
                <JRSpace className="cm_space_10"/>
                <BaseInput index={INPUT_BACK_INDEX} className="cm_input" type="text" label="元" value={Utils.isErrValue(data.awardPerPrice) ? '' : data.awardPerPrice} onBlur={this.onBlur} isnumber/>
              </div>
            </div>

            <div className="media sc_margin_bottom">
              <p className="sc_left_content"><RedStar/>券名称：</p>
              <div className="media-body d-flex flex-row">
                <BaseInput index={INPUT_NAME_INDEX} className="cm_input" type="text" value={Utils.isErrValue(data.couponDisplayName) ? '' : data.couponDisplayName} onBlur={this.onBlur}/>
              </div>
            </div>

            <div className="media sc_margin_bottom">
              <p className="sc_left_content"><RedStar/>券有效期：</p>
              <div className="media-body position-relative">
                <RadioGroup className="sc_select_time" onChange={this.onChange} value={data.couponTimeType}>
                  <Radio style={radioStyle} value={1}>绝对时间</Radio>
                  <Radio style={radioStyle} value={2}>相对时间</Radio>
                </RadioGroup>
                <div className="sc_select_time_wrap d-flex flex-row">
                  <JRDatePicker className="cm_datePicker" onChange={this.beginValidOnChange} placeholder="选择开始时间" defaultValue={data.couponAbsoluteBegin ? moment(parseInt(data.couponAbsoluteBegin)) : undefined}/>
                  <JRSpace className="cm_space_10"/>
                  <JRDatePicker className="cm_datePicker" onChange={this.endValidOnChange} placeholder="选择结束时间" defaultValue={data.couponAbsoluteEnd ? moment(parseInt(data.couponAbsoluteEnd)) : undefined}/>
                </div>
                <div className="d-flex flex-row" style={{marginTop: '10px'}}>
                  <p className="sc_label">领取后</p>
                  <JRSpace className="cm_space_10"/>
                  <BaseInput index={INPUT_DAYS_INDEX} className="cm_input" type="text" label="天" value={Utils.isErrValue(data.couponRelativeEnd) ? '' : data.couponRelativeEnd} onBlur={this.onBlur} isnumber/>
                  <JRSpace className="cm_space_10"/>
                  <p className="sc_space_label">有效</p>
                </div>
              </div>
            </div>

            <div className="media sc_margin_bottom">
              <p className="sc_left_content"><RedStar/>预计数量：</p>
              <div className="media-body d-flex flex-row">
                <BaseInput index={INPUT_EXPECTED_INDEX} className="cm_input" type="text" label="张" value={Utils.isErrValue(data.awardCount) ? '' : data.awardCount} onBlur={this.onBlur} isnumber/>
              </div>
            </div>

            <div className="media sc_margin_bottom">
              <p className="sc_left_content"><RedStar/>使用说明：</p>
              <div className="media-body d-flex flex-row">
                <BaseInput index={INPUT_DES_INDEX} className="cm_input" type="text" placeholder="例：订单满1000元可用" value={Utils.isErrValue(data.couponDesc) ? '' : data.couponDesc} onBlur={this.onBlur}/>
              </div>
            </div>

            <div className="media sc_margin_bottom">
              <p className="sc_left_content">使用范围：</p>
              <div className="media-body d-flex flex-row">
              <div>
                <Select defaultValue={data.couponUseChannel} onChange={this.useHandleChange}>
                {
                  data.couponUseChannelList && data.couponUseChannelList.map((value, idx) => {
                      return (
                        <Option index={idx} key={idx} value={value.index}>{value.value}</Option>
                      )
                  })
                }
                </Select>
              </div>
              </div>
            </div>

            {/* <div className="media sc_margin_bottom">
              <p className="sc_left_content">领取开始时间</p>
              <div className="media-body d-flex flex-row">
                <JRDatePicker onChange={this.beginReceiveOnChange} placeholder="选择开始日期" defaultValue={data.couponPickupBegin ? moment(data.couponPickupBegin) : undefined}/>
              </div>
            </div>

            <div className="media sc_margin_bottom">
              <p className="sc_left_content">领取结束时间</p>
              <div className="media-body d-flex flex-row">
                <JRDatePicker onChange={this.endReceiveOnChange} placeholder="选择结束时间" defaultValue={data.couponPickupEnd ? moment(data.couponPickupEnd) : undefined}/>
              </div>
            </div> */}

            {/* <div className="media sc_margin_bottom">
              <p className="sc_left_content">用户领取限制</p>
              <div className="media-body d-flex flex-row">
                <div>
                  <Select defaultValue={data.couponPickUpLimitScope} onChange={this.receiveHandleChange}>
                  {
                    data.couponPickUpLimitCountList.map((value, idx) => {
                        return (
                          <Option index={idx} key={idx} value={value.index}>{value.value}</Option>
                        )
                    })
                  }
                  </Select>
                </div>

                <JRSpace className="cm_space_10"/>
                <BaseInput index={INPUT_LIMIT_INDEX} className="cm_input" type="text" label="张" value={Utils.isErrValue(data.couponPickUpLimitCount) ? '' : data.couponPickUpLimitCount} onBlur={this.onBlur}/>
              </div>
            </div> */}

            {/* <div className="media sc_margin_bottom">
              <p className="sc_left_content">库存预警比例</p>
              <div className="media-body d-flex flex-row">
                <div>
                  <Select defaultValue={data.couponBalanceWarning} onChange={this.waringHandleChange}>
                  {
                    data.couponBalanceWarningList.map((value, idx) => {
                        return (
                          <Option index={idx} key={idx} value={value.index}>{value.value}</Option>
                        )
                    })
                  }
                  </Select>

                </div>
              </div>
            </div> */}

            <div style={{marginBottom: '50px'}}>
            </div>

          </div>

          <JRBottomBar>
            <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="返回" onClick={cancelCallback}></JRButton>
            <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="提交" onClick={this.commitClick}/>
          </JRBottomBar>
        </div>
      </div>
    );
  }
}

export default SetCoupon;
