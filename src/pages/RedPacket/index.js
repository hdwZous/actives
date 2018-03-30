import React, { Component } from 'react';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import { Select } from 'antd';

import Header from '../CommonComponents/Header';
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRButton from '../CommonComponents/JRButton';
import IconAngleRight from '../CommonComponents/IconAngleRight';
import BaseInput from '../CommonComponents/BaseInput';
import IconPlus from '../CommonComponents/IconPlus';
import IconMinus from '../CommonComponents/IconMinus';
import JRSpace from '../CommonComponents/JRSpace';

import '../../css/style.css';
import '../../css/sa.css';

const RadioGroup = Radio.Group;
const Option = Select.Option;

class RedPacket extends Component {
  state = {
    radioIndex: 1,
  }

  raidoClick = (e) => {
    this.setState({
      radioIndex: e.target.value,
    });
  }

  handleChange = (value) => {

  }

  render() {

    let {
      radioIndex
    } = this.state

    return (
      <div className="cm_full_background d-flex justify-content-center align-items-center cm_12_color_style">
        <div className="cm_full_container">
          <Header>
            <div className="jr_breadcrumb"><p>配置奖品<IconAngleRight className="ad_arrow_space"/><span>奖品设置</span></p></div>
          </Header>
          <div className="sa_bounds">
            <div className="media sa_margin_top sa_margin_bottom">
              <p className="sa_left_content">奖品类型</p>
              <div className="media-body">
                <p>智能红包</p>
              </div>
            </div>

            <div className="media sa_margin_bottom">
              <p className="cm_star sa_left_content">活动日期</p>
              <div className="media-body position-relative">
                <div className="sa_select_time_wrap">
                  <DatePicker/>
                  <DatePicker/>
                </div>
              </div>
            </div>

            <div className="media sa_margin_bottom">
              <p className="cm_star sa_left_content">预计花费</p>
              <div className="media-body d-flex flex-row">
                <BaseInput className="cm_input" type="text" label="元"/>
              </div>
            </div>

            <div className="media sa_margin_bottom">
              <p className="cm_star sa_left_content">设置最高出价</p>
              <div className="media-body d-flex flex-row">
                <p style={{marginRight: '10px'}}>全部用户</p>
                <BaseInput className="cm_input" type="text" label="元"/>
              </div>
            </div>

            <div className="media sa_margin_bottom">
              <p className="cm_star sa_left_content">分用户群出价</p>
              <div className="media-body">
                <RadioGroup style={{marginTop: '4px'}} onChange={this.raidoClick} value={radioIndex}>
                  <Radio value={1}>添加京东用户群</Radio>
                  <Radio value={2}>自定义用户群</Radio>
                </RadioGroup>
              </div>
            </div>

            {
              radioIndex == 1 ? (
                <div>
                  <div className="media sa_margin_bottom">
                    <p className="sa_left_content">用户群1</p>
                    <div className="media-body d-flex flex-row align-items-center">
                      <BaseInput className="cm_input" type="text" label="元"/>
                      <JRSpace className="cm_space_10"/>
                      <p>至</p>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput className="cm_input" type="text" label="元"/>
                      <JRSpace/>
                      <IconMinus className="font14"/>
                      <JRSpace/>
                      <IconPlus className="font14"/>
                    </div>
                  </div>

                  <div className="media sa_margin_bottom">
                    <p className="sa_left_content">用户群2</p>
                    <div className="media-body d-flex flex-row align-items-center">
                      <BaseInput className="cm_input" type="text" label="元"/>
                      <JRSpace className="cm_space_10"/>
                      <p>至</p>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput className="cm_input" type="text" label="元"/>
                      <JRSpace/>
                      <IconMinus className="font14"/>
                      <JRSpace/>
                      <IconPlus className="font14"/>
                    </div>
                  </div>

                  <div className="media sa_margin_bottom">
                    <p className="sa_left_content">输入接口地址</p>
                    <div className="media-body d-flex flex-row">
                      <BaseInput className="sa_long_input" type="text" placeholder="URL/API接口地址"/>
                    </div>
                  </div>
                </div>
              ) : undefined
            }

            {
              radioIndex == 2 ? (
                <div>
                  <div className="media sa_margin_bottom">
                    <p className="sa_left_content">用户群1</p>
                    <div className="media-body d-flex flex-row align-items-center">
                      <Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled">Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput className="cm_input" type="text" label="元"/>
                      <JRSpace className="cm_space_10"/>
                      <p>至</p>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput className="cm_input" type="text" label="元"/>
                      <JRSpace/>
                      <IconMinus className="font14"/>
                    </div>
                  </div>

                  <div className="media sa_margin_bottom">
                    <p className="sa_left_content">用户群2</p>
                    <div className="media-body d-flex flex-row align-items-center">
                      <Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled">Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput className="cm_input" type="text" label="元"/>
                      <JRSpace className="cm_space_10"/>
                      <p>至</p>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput className="cm_input" type="text" label="元"/>
                      <JRSpace/>
                      <IconMinus className="font14"/>
                      <JRSpace/>
                      <IconPlus className="font14"/>
                    </div>
                  </div>
                </div>
              ) : undefined
            }

          </div>
          <JRBottomBar>
            <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="返回" onClick={null}/>
            <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="提交" onClick={null}/>
          </JRBottomBar>
        </div>
      </div>
    );
  }
}

export default RedPacket;
