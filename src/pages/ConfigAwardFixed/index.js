import React, { Component } from 'react';
import Steps from 'rc-steps';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn'
import clone from 'clone';

import POST, {GET} from '../../NetWork'
import Api from '../../NetWork/Api'

import Header from '../CommonComponents/Header';
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRMessage from '../CommonComponents/JRMessage';
import JRButton from '../CommonComponents/JRButton';
import IconQuestion from '../CommonComponents/IconQuestion';
import IconClose from '../CommonComponents/IconClose';
import JRSpace from '../CommonComponents/JRSpace';
import Utils from '../../Utils'
import JRLoading from '../CommonComponents/JRLoading';
import JRToast from '../CommonComponents/JRToast';
import SetRuleFixed from '../SetRuleFixed';
import {closeIFrames} from '../CommonComponents/public';
import RedStar from '../CommonComponents/RedStar';
import BaseInput from '../CommonComponents/BaseInput';
import JRDatePicker from '../CommonComponents/JRDatePicker';
import Public from '../CommonComponents/JRPublic';
import CommonSection from '../CommonComponents/CommonSection';
import ConfigAwardGroup from '../ConfigAwardGroup';
import SelectAward from '../SelectAward';

import '../../css/steps.css';
import '../../css/iconfont.css';
import '../../css/style.css';
import '../../css/configAwardFixed.css';

const PREDICT_COST = 'predictCost';
const DEFAULT_HIGHEST_PRICE = 'defaultHighestPrice';
const DEFAULT_LOWEST_PRICE = 'defaultLowestPrice';

class ConfigAwardFixed extends Component {

  static propTypes = {
  }

  constructor (props) {
    super(props);

    this.state = {
        data: null,
        showSetRule: false,
        showLoading: false,
        showGroup:false,
        showSelectAward: false,
    };
  }

  componentDidMount() {

    this.funcSetState(true);

    POST(Api.GET_SMART_ACTIVE_PRICE_INFO, {
      actKey: this.props.match.params.actKey,
      eventID: this.props.match.params.eventID,
    }, (res)=> {


      this.funcSetState(false);
      if (res.code != 1) {
        JRToast.showModal(res.message)
      } else {
          if (Utils.isErrValue(res.data.jdUserTagPrices)) {
              res.data.jdUserTagPrices = []
          }

          if (res.data.jdUserTagPrices.length == 0) {
              res.data.jdUserTagPrices.push({});
          }

        this.funcUpdateData(res.data);
        this.setState({
            data: res.data
        })
      }

      if (res.data.message) {
        JRToast.showModal(res.data.message)
      }
    }, (err)=> {
        this.funcSetState(false);
    })
  }

  nextClick = ()=> {
      this.funcSaveAward();
  }
    funcSetState = (loading) => {
        this.setState({
            showLoading:loading
        })
    }

    onBlur = (input)=> {
      let {data} = this.state;

        switch (input.props.index){
            case PREDICT_COST:
                if (data){
                    data.predictCost = input.state.value;
                }
                break;
            case DEFAULT_HIGHEST_PRICE:
                if (data){
                    data.defaultHighestPrice = input.state.value;
                }
                break;
            case DEFAULT_LOWEST_PRICE:
                if (data){
                    data.defaultLowestPrice = input.state.value;
                }
                break;
        }
    }
    //下面是选择日期的几个callback
    beginValidOnChange = (m)=> {
      if (m) {
        this.state.data.actBegin = m.format('x')
          this.checkTime(this.state.data.actBegin, this.state.data.actEnd)
      } else {
        this.state.data.actBegin = null
      }
    }

    endValidOnChange = (m)=> {
      if (m) {
        this.state.data.actEnd = m.format('x')
          this.checkTime(this.state.data.actBegin, this.state.data.actEnd)
      } else {
        this.state.data.actEnd = null
      }
    }

    checkTime = (start, end) => {
      if (start && end && start >= end) {
          JRMessage.showMessage("结束时间必须晚于开始时间")
          return true;
      }
      return false;
    }

    funcSaveAward = ()=> {

        let {
            data
        } = this.state;

        let tmpData = clone(data)

        if (tmpData.actBegin === null) {
            JRMessage.showMessage('请选择活动开始时间')
            return
        }

        if (tmpData.actEnd === null) {
            JRMessage.showMessage('请选择活动结束时间')
            return
        }

        if (this.checkTime(tmpData.actBegin, tmpData.actEnd)) {
            return
        }

        if (Utils.isNullStr(tmpData.predictCost)) {
            JRMessage.showMessage('请填写预计花费')
            return
        }

        if (parseFloat(tmpData.predictCost) <= 0) {
            JRMessage.showMessage("预计花费必须大于0")
            return
        }

        if (Utils.isNullStr(tmpData.defaultLowestPrice)) {
            JRMessage.showMessage('请填写默认最低出价')
            return
        }

        if (parseFloat(data.defaultLowestPrice) <= 0) {
            JRMessage.showMessage("默认最低出价必须大于0")
            return
        }

        if (Utils.isNullStr(tmpData.defaultHighestPrice)) {
            JRMessage.showMessage('请填写默认最高出价')
            return
        }

        if (parseFloat(tmpData.defaultHighestPrice) <= 0) {
            JRMessage.showMessage("默认最高出价必须大于0")
            return
        }

        if (parseFloat(tmpData.defaultHighestPrice) > parseFloat(tmpData.predictCost)) {
            JRMessage.showMessage("默认最高出价必须小于等于预计花费")
            return
        }

        if (parseFloat(tmpData.defaultLowestPrice) > parseFloat(tmpData.defaultHighestPrice)) {
            JRMessage.showMessage("默认最高出价必须大于等于默认最低出价")
            return
        }

        if (Utils.isErrValue(tmpData.award) || Utils.isNullStr(tmpData.award.awardSkuId)) {
            JRMessage.showMessage('请选择奖品')
            return
        }

        if (tmpData.userTagType === 1) {
            if (parseFloat(tmpData.urlLowestPrice) <= 0) {
                JRMessage.showMessage("最低出价必须大于0")
                return
            }

            if (parseFloat(tmpData.urlHighestPrice) > parseFloat(tmpData.defaultHighestPrice)) {
                JRMessage.showMessage("最高出价必须小于等于默认最高出价")
                return
            }
            if (parseFloat(tmpData.defaultLowestPrice) > parseFloat(tmpData.urlLowestPrice)) {
                JRMessage.showMessage("最低出价必须大于等于默认最低出价")
                return
            }
            if (parseFloat(tmpData.urlLowestPrice) > parseFloat(tmpData.urlHighestPrice)) {
                JRMessage.showMessage("最高出价必须大于等于最低出价")
                return
            }
            tmpData.jdUserTagPrices = []
        }
        if (tmpData.userTagType === 2) {

            let prices = new Array();
            let isCorrect = false, lowest = undefined, highest = undefined;
            tmpData.jdUserTagPrices.forEach(function (value) {
                if (Utils.isNullStr(value.lowestPrice) === false && Utils.isNullStr(value.highestPrice) === false) {
                  if (value.lowestPrice && !value.highestPrice || parseFloat(value.lowestPrice) > parseFloat(value.highestPrice)) {
                      isCorrect = true;
                  }
                  if (highest === undefined) {
                      highest = value.highestPrice
                  }

                  if (lowest === undefined) {
                      lowest = value.lowestPrice
                  }

                  if (value.highestPrice && parseFloat(value.highestPrice) > highest) {
                      highest = value.highestPrice;
                  }

                  if (value.lowestPrice && parseFloat(value.lowestPrice) < lowest) {
                      lowest = value.lowestPrice;
                  }
                }
                if (value.jdUserTagId && value.highestPrice && value.lowestPrice) {
                    let item = {};
                    item.jdUserTagId = value.jdUserTagId;
                    item.lowestPrice = value.lowestPrice;
                    item.highestPrice = value.highestPrice;
                    item.jdUserTagName = value.jdUserTagName;
                    prices.push(item);
                }
            });
            if (Utils.isNullStr(lowest) === false && lowest <= 0) {
                JRMessage.showMessage("最低出价必须大于0")
                return
            }
            if (Utils.isNullStr(lowest) === false && lowest < parseFloat(tmpData.defaultLowestPrice)) {
                JRMessage.showMessage("最低出价必须大于等于默认最低出价")
                return
            }
            if (Utils.isNullStr(highest) === false && highest > parseFloat(tmpData.defaultHighestPrice)) {
                JRMessage.showMessage("最高出价必须小于等于默认最高出价")
                return
            }
            if (isCorrect) {
                JRMessage.showMessage("最高出价必须大于最低出价")
                return
            }
            tmpData.userApiUrl = null;
            tmpData.urlLowestPrice = null;
            tmpData.urlHighestPrice = null;
            tmpData.jdUserTagPrices = prices;
        }

        this.funcSetState(true);


        POST(Api.GET_SMART_ACTIVE_PRICE_SAVE, tmpData, (res)=> {

            this.funcSetState(false);
            if (res.code != 1) {
                JRToast.showModal(res.message)
            } else {
                data.eventId = res.data.eventId
                data.award = res.data.award
                this.setState({
                    showSetRule:true
                })
            }
        }, (err)=> {
            this.funcSetState(false);
        })
    }

    funcUpdateData = (data)=> {
      if (data && data.jdUserTagPrices) {
          data.jdUserTagPrices.forEach(function (value) {
              value.showType = Public.ICON_SHOW_TYPE.SHOW_DELETE;
          });
          data.jdUserTagPrices[data.jdUserTagPrices.length - 1].showType = Public.ICON_SHOW_TYPE.SHOW_ALL;

          if (data.jdUserTagPrices.length === 1) {
              data.jdUserTagPrices[0].showType = Public.ICON_SHOW_TYPE.SHOW_ADD
          }
      }
    }

    selectAwardCancelCallback = ()=> {
        this.setState({
            showSelectAward: false
        })
    }

    //打开选择奖品界面，并且选择完奖品的回调事件
    selectAwardCallback = (idx, da)=> {

        let {
            data
        } = this.state

        if (data.award && data.award.awardSkuId && da && da.awardSkuId && data.award.awardSkuId !== da.awardSkuId) {
          data.defaultLowestPrice = ''
          data.defaultHighestPrice = ''
          data.jdUserTagPrices = []
          data.jdUserTagPrices.push({})

          data.urlHighestPrice = null
          data.urlLowestPrice = null
          data.userApiUrl = null

          data.userTagType = undefined
        }

        if (da) {
            data.award = da
        }
        this.setState({
            data: data,
            showSelectAward: false
        })
    }

  render() {

    let {
      data,
      showSetRule,
      showLoading,
      showGroup,
      showSelectAward
    } = this.state;
    if (!data) {
        return(null);
    }

    return (
      <div>
        <div className="cm_full_background d-flex justify-content-center align-items-center cm_12_color_style">
          <div className="cm_full_container">
            {
              showLoading ? <JRLoading/> : undefined
            }
            <Header title="配置奖品" className="justify-content-between">
              <div className="jr_breadcrumb d-flex flex-row align-items-center">
                {/* <IconQuestion/>
                <JRSpace className="cm_space_30"/> */}
                <IconClose callBack={closeIFrames}/>
                <JRSpace className="cm_space_20"/>
              </div>
            </Header>
            <div className="cm_scroll_top_bottom_surplus cm_scroll cm_scrollbar">
              <div className="caf_steps">
                <Steps current={0}>
                  <Steps.Step title="设置奖品" />
                  <Steps.Step title="设置规则" />
                  <Steps.Step title="完成配置" />
                </Steps>
              </div>

              <div style={{marginTop: 40}}>
                <CommonSection className="cm_row" title="基础设置"/>
                <div className="media cm_row">
                  <p className="caf_title"><RedStar/>推广日期：</p>
                  <div className="media-body d-flex flex-row">
                      <JRDatePicker className="caf_datePicker" onChange={this.beginValidOnChange} placeholder="开始日期" defaultValue={(data && data.actBegin) ? moment(data.actBegin) : undefined}/>
                      <JRSpace className="cm_space_10"/>
                      <JRDatePicker className="caf_datePicker" onChange={this.endValidOnChange} placeholder="结束日期" defaultValue={(data && data.actEnd) ? moment(data.actEnd) : undefined}/>
                  </div>
                </div>

                <div className="media cm_row">
                  <p className="caf_title"><RedStar/>活动预算：</p>
                  <div className="media-body">
                    <BaseInput isnumber fixed={2} className="cm_input" index={PREDICT_COST} ref="predictCost" type="text" label="元" onBlur={this.onBlur} value={data ? data.predictCost : ''}/>
                  </div>
                </div>

                <CommonSection className="cm_row" title="奖品信息设置"/>
                <div className="media cm_row">
                  <p className="caf_title">奖品名称</p>
                  <div className="media-body d-flex flex-row">
                      <p className="caf_award_info">面额区间</p>
                      <p>说明</p>
                  </div>
                </div>
                <div className="media cm_row d-flex align-items-center">
                  <a>
                    <p className="caf_title cm_a" style={{'WebkitBoxOrient': 'vertical'}} onClick={()=>{
                        this.setState({showSelectAward:true})
                    }}>{data.award ? <span className="caf_select_award">{data.award.awardSkuName}</span> : <p><RedStar/>选择奖品</p>}</p>
                  </a>
                  <div className="media-body d-flex flex-row">
                      <BaseInput isnumber className="cm_input" index={DEFAULT_LOWEST_PRICE} type="text" label={data.award ? data.award.awardSkuUnit : ''} onBlur={this.onBlur} value={data ? data.defaultLowestPrice : ''} disabled={data.award ? false : true} showGrey={data.award ? false : true} fixed={data.award ? data.award.awardDigit : 2}/>
                      <JRSpace className="cm_space_10"/>
                      <p>至</p>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput isnumber className="cm_input" index={DEFAULT_HIGHEST_PRICE} type="text" label={data.award ? data.award.awardSkuUnit : ''} onBlur={this.onBlur} value={data ? data.defaultHighestPrice : ''} disabled={data.award ? false : true} showGrey={data.award ? false : true} fixed={data.award ? data.award.awardDigit : 2}/>
                      <JRSpace className="cm_space_20"/>
                      {
                        data.userTagType ? <p className="caf_award_desc">已针对不同人群设置奖品面额区间， <a>
                          <span className="cm_a" onClick={()=>{
                              this.setState({showGroup:true})
                          }}>修改设置</span>
                        </a></p> :
                        <p className="caf_award_desc">(非必填) 可针对不同人群设置奖品面额区间, <a>
                          <span className="cm_a" onClick={()=>{
                              if (data.award) {
                                this.setState({showGroup:true})
                              } else {
                                JRMessage.showMessage('请选择奖品')
                              }
                          }}>前往设置</span>
                        </a></p>
                      }

                  </div>
                </div>
              </div>
            </div>
            <JRBottomBar>
              <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="取消" onClick={closeIFrames}/>
              <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="下一步" onClick={this.nextClick}/>
            </JRBottomBar>
          </div>
        </div>
        {
          showSetRule ? <SetRuleFixed cancelClick={()=>{
            this.setState({
              showSetRule: false
            })
          }} {...this.props}/> : undefined
        }
        {
            showGroup ? <ConfigAwardGroup data={data} cancelCallback={()=>{
            this.setState({
                showGroup: false
            })
          }}/> : undefined
        }
          {
              showSelectAward ? <SelectAward callBack={this.selectAwardCallback} cancelCallback={this.selectAwardCancelCallback} idx={0} {...this.props}/> : undefined
          }
      </div>
    );
  }
}

export default ConfigAwardFixed;
