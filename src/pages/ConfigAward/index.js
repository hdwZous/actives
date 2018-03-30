import React, { Component } from 'react';
import Steps from 'rc-steps';
import { DatePicker } from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn'
import clone from 'clone';
import queryString from 'query-string';

import Header from '../CommonComponents/Header';
import Navs from '../CommonComponents/Navs';
import JRBottomBar from '../CommonComponents/JRBottomBar';
import CASection from './CASection';
import CAReceiveSection from './CAReceiveSection';
import CASelectRow from './CASelectRow';
import CANormalRow from './CANormalRow';
import CANoneAwardRow from './CANoneAwardRow';
import CACouponRow from './CACouponRow';
import CAReceiveCouponRow from './CAReceiveCouponRow';
import CAReceiveRow from './CAReceiveRow';
import JRSpace from '../CommonComponents/JRSpace';
import CommonSection from '../CommonComponents/CommonSection';
import JRButton from '../CommonComponents/JRButton';
import JRLoading from '../CommonComponents/JRLoading';
import IconQuestion from '../CommonComponents/IconQuestion';
import IconClose from '../CommonComponents/IconClose';
import JRToast from '../CommonComponents/JRToast';
import JRMessage from '../CommonComponents/JRMessage';
import JRDatePicker from '../CommonComponents/JRDatePicker';
import {closeIFrames} from '../CommonComponents/public';
import SetCoupon from '../SetCoupon';
import Public from '../CommonComponents/JRPublic';
import Utils from '../../Utils';

import UploadImage from '../UploadImage'
import SelectAward from '../SelectAward';
import SetRule from '../SetRule';

import POST, {GET} from '../../NetWork'
import Api from '../../NetWork/Api'

import '../../css/style.css';
import '../../css/configAward.css';

const MAX_ROW = 7

const dateFormat = 'YYYY-MM-DD';

const ROW_TYPE_1 = 1 //定额不可修改
const ROW_TYPE_2 = 2 //定额可修改
const ROW_TYPE_3 = 3 //需要设置优惠券
const ROW_TYPE_4 = 4 //优惠券设置完成
const ROW_TYPE_999 = 999 //添加行数。。。

class ConfigAward extends Component {

  constructor (props) {
    super(props);

    this.state = {
      data: null,
      showSelectAward: false,
      selectAwardIndex: 0,
      showSetCoupon: false,
      selectSetCouponIndex: 0,
      showLoading: false,
      showSetRule: false,
      showUploadImage: false,
      uploadImageIndex: 0,
    };
  }

  componentDidMount() {
      window.addEventListener('message', function (e) {
        // debugger
        if (e.source != window.parent) return;
    }, false)

  }

  componentWillMount() {

    this.setState({
      showLoading: true
    })

    POST(Api.GET_CONFIG_REWARD_INFO, {
      actKey: this.props.match.params.actKey,
      eventID: this.props.match.params.eventID,
      tpl: queryString.parse(window.location.search).tpl
    }, (res)=> {
      this.setState({
        showLoading: false
      })

      if (res.code != 1) {
        JRToast.showModal(res.message)
      } else {

        if (res.data.message) {
          JRToast.showModal(res.data.message)
        }

        if (Utils.isErrValue(res.data)) {
          res.data = {}
        }

        if (Utils.isErrValue(res.data.loseLotteryAward)) {
          res.data.loseLotteryAward = {}
        }

        if (Utils.isErrValue(res.data.actAwardList)) {
          res.data.actAwardList = []
        }

        if (Utils.isErrValue(res.data.actKey)) {
          res.data.actKey = this.props.match.params.actKey
          res.data.eventID = this.props.match.params.eventID
        }

        if (res.data.actAwardList.length === 0) {
          res.data.actAwardList.push({
            awardConfigType: ROW_TYPE_999
          })
        }

        this.updateData(res.data)

        this.setState({
          data: res.data
        })
      }

    }, (err)=> {
      this.setState({
        showLoading: false
      })
    })

  }

  //添加行
  addRowClick = (index)=> {

    if (index >= MAX_ROW - 1) {
      JRToast.showModal(`最多添加${MAX_ROW}个奖品`)
      return
    }

    let {
      data
    } = this.state

    data.actAwardList.push({
      awardConfigType: ROW_TYPE_999
    })

    this.updateData(data)

    this.setState({
      data: data
    })
  }

  //删除行
  deleteRowClick = (index)=> {
    let {
      data
    } = this.state

    data.actAwardList.splice(index, 1)

    this.updateData(data)

    this.setState({
      data: data
    })

  }

  //选择奖品点击事件
  selectAwardClick = (index)=> {
    this.setState({
      showSelectAward: true,
      selectAwardIndex: index
    })
  }

  //打开选择奖品界面，并且选择完奖品的回调事件
  selectAwardCallback = (idx, da)=> {

    let {
      data
    } = this.state

    data.actAwardList.splice(idx, 1, da)

    this.updateData(data)

    this.setState({
      data: data,
      showSelectAward: false
    })
  }

  selectAwardCancelCallback = ()=> {
    this.setState({
      showSelectAward: false
    })
  }

  nameClick = (index)=> {
    this.setCouponClick(index)
  }

  //设置优惠券
  setCouponClick = (index)=> {
    this.setState({
      showSetCoupon: true,
      selectSetCouponIndex: index
    })
  }

  //设置完成优惠券的成功提交回调
  couponCommitCallback = (index, da)=> {
    let {
      data
    } = this.state

    data.actAwardList.splice(index, 1, da)

    this.setState({
      showSetCoupon: false,
      data: data
    })
  }

  //设置优惠券取消设置
  couponCancelCallback = ()=> {
    this.setState({
      showSetCoupon: false
    })
  }

  //关闭规则配置界面
  setRuleCancelCallback = ()=> {
    this.setState({
      showSetRule: false
    })
  }

  //如果输入改变则重新校验中奖率
  onBlur = ()=> {

    this.setState({
      data: this.state.data
    })
  }

  //规整数据
  updateData(data) {
    //先给所有的iconShowType都赋值SHOW_DELETE
    data.actAwardList.forEach(function (value) {
      value['iconShowType'] = Public.ICON_SHOW_TYPE.SHOW_DELETE
      Utils.isErrValue(value.awardPerPrice) ? value.awardPerPrice = 0 : undefined
      Utils.isErrValue(value.awardCount) ? value.awardCount = 0 : undefined
      Utils.isErrValue(value.awardRate) ? value.awardRate = 0 : undefined
      Utils.isErrValue(value.awardShowName) ? value.awardShowName = '' : undefined
    });

    //然后把最后一个的iconShowType赋值成SHOW_ALL
    data.actAwardList[data.actAwardList.length - 1]['iconShowType'] = Public.ICON_SHOW_TYPE.SHOW_ALL

    //如果发现只有一个数据，那么只显示加号
    if (data.actAwardList.length === 1) {
      data.actAwardList[0]['iconShowType'] = Public.ICON_SHOW_TYPE.SHOW_ADD
    }
  }

  uploadImageCallback = (idx, imgurl)=> {

    this.setState({
      showUploadImage: false
    })

    if (!imgurl) {
      return;
    }

    switch (idx) {
      case -1:
        {
          let {
            data
          } = this.state

          data.loseLotteryAward.awardImg = imgurl
          this.setState({
            data: data
          })
        }
        break;
      default: {
        let {
          data
        } = this.state

        data.actAwardList[idx].awardImg = imgurl

        this.setState({
          data: data
        })
      }

    }

  }

  //点击下一步操作
  saveData = ()=> {

    let {
      data
    } = this.state

    if (data.actBegin === null) {
      JRMessage.showMessage('请选择活动开始时间')
      return
    }

    if (data.actEnd === null) {
      JRMessage.showMessage('请选择活动结束时间')
      return
    }

    if (data.actBegin >= data.actEnd) {
      JRMessage.showMessage('结束时间不能比开始时间早')
      return
    }

    for (var i = 0; i < data.actAwardList.length; i++) {
      var err = this.refs[`row_index_${i}`].isOK()
      if (err) {
        JRMessage.showMessage(err)
        return;
      }
    }

    //必须至少选择一个奖品
    let configType = ROW_TYPE_999

    for (var i = 0; i < data.actAwardList.length; i++) {
      let type = data.actAwardList[i].awardConfigType
      if (type != ROW_TYPE_999) {
        configType = type
      }
    }

    if (configType === ROW_TYPE_999) {
      JRMessage.showMessage('请选择至少一个奖品')
      return;
    }

    if (data.actBegin >= data.actEnd) {
      JRMessage.showMessage('结束时间不能比开始时间早')
      return
    }


    if (data.type === 1) {

      if (Utils.isNullStr(data.loseLotteryAward.awardImg)) {
        JRMessage.showMessage('请选择未中奖图片')
        return
      }

      if (Utils.isNullStr(data.loseLotteryAward.awardDesc)) {
        JRMessage.showMessage('请输入未中奖描述')
        return
      }
    }

    let sectionRate = 0
    data.actAwardList.forEach(function (value) {
      sectionRate += value.awardRate
    });

    if (sectionRate > 100) {
      JRMessage.showMessage('总中奖率不能超过100%')
      return
    }

    //把当前的stateData拷贝出来，然后替换每个新的row数据，然后在过滤那个没用的row
    let tmpData = clone(data)
    tmpData.actAwardList = []

    let idx = 0

    for (var i = 0; i < data.actAwardList.length; i++) {
      if (data.actAwardList[i].awardConfigType != ROW_TYPE_999) {
        tmpData.actAwardList[idx++] = data.actAwardList[i]
      }

      if (data.actAwardList[i].awardConfigType === ROW_TYPE_3 || data.actAwardList[i].awardConfigType === ROW_TYPE_4) {
        if (data.actAwardList[i].couponTimeType === 1 && parseInt(data.actEnd) + 24 * 60 * 60 * 3 * 1000 > parseInt(data.actAwardList[i].couponAbsoluteEnd)) {
          JRMessage.showMessage(`第${i + 1}个优惠券的绝对时间的结束时间要 大于等于 活动结束时间+3天`)
          return
        }
      }

    }

    for (var i = 0; i < tmpData.actAwardList.length; i++) {
      if (tmpData.actEnd > tmpData.actAwardList[i].awardSkuEnd) {
        JRToast.showModal(`活动结束日期不能大于第${i + 1}个奖品(${tmpData.actAwardList[i].awardSkuName})的有效期`)
        return
      }
    }

    this.setState({
      showLoading: true
    })

    POST(Api.GET_CONFIG_REWARD_SAVE, tmpData, (res)=> {
      this.setState({
        showLoading: false
      })
      if (res.code === 1) {

        data.eventsID = res.data.eventsID

        this.setState({
          data: data,
          showSetRule: true
        })
        return
      } else if (res.code === 7000) {

        function findAwardName(skuid) {
          for (var i = 0; i < data.actAwardList.length; i++) {
            let d = data.actAwardList[i]
            if (d.awardSkuId === skuid) {
              return d.awardSkuName
            }
          }
        }

        JRToast.showModal(`${findAwardName(res.data.skuId)}奖品的总数不能超过${res.data.stock}库存量，请重新修改${findAwardName(res.data.skuId)}奖品的数量`)
        return
      } else {
        // this.props.history.push("/setRule/" + this.props.match.params.actKey);
        JRToast.showModal(res.message)
        return
      }

    }, (err)=> {
      this.setState({
        showLoading: false
      })
    })

  }

  beginDateOnChange = (m)=> {
    if (m) {
      this.state.data.actBegin = m.format('x')
    } else {
      this.state.data.actBegin = null
    }
  }

  endDateOnChange = (m)=> {
    if (m) {
      this.state.data.actEnd = m.format('x')
    } else {
      this.state.data.actEnd = null
    }
  }

  render() {

    let {
      data,
      showSelectAward,
      selectAwardIndex,
      showSetCoupon,
      selectSetCouponIndex,
      showLoading,
      showSetRule,
      showUploadImage,
      uploadImageIndex
    } = this.state

    let sectionRate = 0

    if (data && data.actAwardList) {
      data.actAwardList.forEach(function (value) {
        sectionRate += value.awardRate
      });
    }

    sectionRate = sectionRate.toFixed(2)

    return (
      <div>
        <div className="cm_full_background d-flex justify-content-center align-items-center">
          <div className="cm_full_container">

            <Header title="配置奖品" className="justify-content-between">
              <div className="jr_breadcrumb d-flex flex-row align-items-center">
                {/* <IconQuestion/>
                <JRSpace className="cm_space_30"/> */}
                <IconClose callBack={closeIFrames}/>
                <JRSpace className="cm_space_20"/>
              </div>
            </Header>
            {
              data == null ? <div/> :
              <div className="cm_scroll_top_bottom_surplus cm_scrollbar">
                <div style={{marginLeft: 40}}>
                  <div className="ca_steps ca_margin_right_40">
                    <Steps current={0}>
                      <Steps.Step title="设置奖品" />
                      <Steps.Step title="设置规则" />
                      <Steps.Step title="完成配置" />
                    </Steps>
                  </div>
                  <div>
                    <CommonSection className="ca_margin_right_40" title="活动时间"/>

                    <div className="d-flex flex-row align-items-center" style={{marginTop: 20}}>
                      <p className="cm_star font_family_PingFangSC_Regular" style={{marginLeft: 5}}>开始时间</p>
                      <JRSpace/>

                      <JRDatePicker className="cm_datePicker fontSize_14 big" onChange={this.beginDateOnChange} placeholder="选择开始日期" defaultValue={data.actBegin ? moment(data.actBegin) : undefined}/>
                      <JRSpace className="cm_space_40"/>
                      <p className="cm_star font_family_PingFangSC_Regular">结束时间</p>
                      <JRSpace/>
                      <JRDatePicker className="cm_datePicker fontSize_14 big" onChange={this.endDateOnChange} placeholder="选择结束日期" defaultValue={data.actEnd ? moment(data.actEnd) : undefined}/>
                    </div>
                  </div>

                  <div>
                    <CommonSection title="选择奖品" className="ca_margin_right_40"/>
                    <JRSpace className="ca-row-h"/>

                    {
                      data.type === 1 ? <CASection rate={sectionRate}/> : <CAReceiveSection/>
                    }

                    {
                      data.actAwardList.map((value, idx) => {

                        if (data.type === 1) {
                          return (
                            <div index={idx} key={idx}>
                              <JRSpace className="ca-row-h"/>
                              {
                                (()=>{
                                  switch (value.awardConfigType) {
                                    case ROW_TYPE_1:
                                    case ROW_TYPE_2:
                                    case ROW_TYPE_4:
                                      return <CANormalRow
                                      ref={`row_index_${idx}`}
                                      index={idx}
                                      data={value}
                                      isFixed={value.awardConfigType === 1 || value.awardConfigType === 4}
                                      showType={value.iconShowType}
                                      onBlur={this.onBlur}
                                      nameClick={this.nameClick}
                                      deleteCallback={this.deleteRowClick}
                                      addCallback={this.addRowClick}
                                      uploadImageClick={()=>{
                                        this.setState({
                                          showUploadImage: true,
                                          uploadImageIndex: idx,
                                        })
                                      }}/>
                                      break;
                                    case ROW_TYPE_3:
                                      return <CACouponRow
                                      ref={`row_index_${idx}`}
                                      index={idx}
                                      data={value}
                                      showType={value.iconShowType}
                                      setCallback={this.setCouponClick}
                                      deleteCallback={this.deleteRowClick}
                                      addCallback={this.addRowClick}
                                      uploadImageClick={()=>{
                                        this.setState({
                                          showUploadImage: true,
                                          uploadImageIndex: idx,
                                        })
                                      }}/>
                                      break;
                                    case ROW_TYPE_999:
                                      return <CASelectRow
                                      ref={`row_index_${idx}`}
                                      index={idx}
                                      data={value}
                                      showType={value.iconShowType}
                                      selectCallback={this.selectAwardClick}
                                      deleteCallback={this.deleteRowClick}
                                      addCallback={this.addRowClick}/>
                                    default:
                                  }
                                })()
                              }
                            </div>
                          )
                        } else {
                          return (
                            <div index={idx} key={idx}>
                              <JRSpace className="ca-row-h"/>
                              {
                                (()=>{
                                  switch (value.awardConfigType) {
                                    case ROW_TYPE_1:
                                    case ROW_TYPE_2:
                                    case ROW_TYPE_4:
                                      return <CAReceiveRow
                                      ref={`row_index_${idx}`}
                                      index={idx}
                                      data={value}
                                      isFixed={value.awardConfigType === 1 || value.awardConfigType === 4}
                                      onBlur={this.onBlur}
                                      nameClick={this.nameClick}
                                      uploadImageClick={()=>{
                                        this.setState({
                                          showUploadImage: true,
                                          uploadImageIndex: idx,
                                        })
                                      }}/>
                                      break;
                                    case ROW_TYPE_3:
                                      return <CAReceiveCouponRow
                                      ref={`row_index_${idx}`}
                                      index={idx}
                                      data={value}
                                      setCallback={this.setCouponClick}
                                      uploadImageClick={()=>{
                                        this.setState({
                                          showUploadImage: true,
                                          uploadImageIndex: idx,
                                        })
                                      }}/>
                                      break;
                                  }
                                })()
                              }
                            </div>
                          )
                        }

                      })
                    }
                  </div>

                  {
                    data.type === 1 ? <div>
                      <CommonSection title="无奖品" className="ca_margin_right_40"/>
                      <JRSpace className="ca-row-h"/>
                      <CANoneAwardRow ref='row_index_none' data={data.loseLotteryAward} uploadImageClick={()=>{
                        this.setState({
                          showUploadImage: true,
                          uploadImageIndex: -1,
                        })
                      }}/>
                    </div> : undefined
                  }

                  <div style={{marginTop: 50}}>
                  </div>

                </div>
              </div>
            }
            {
              showLoading ? <JRLoading/> : undefined
            }
            <JRBottomBar>
              <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="返回" onClick={closeIFrames}/>
              <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="下一步" onClick={this.saveData}/>
            </JRBottomBar>
          </div>
        </div>
        {
          showSelectAward ? <SelectAward callBack={this.selectAwardCallback} cancelCallback={this.selectAwardCancelCallback} idx={selectAwardIndex} {...this.props}/> : undefined
        }
        {
          showSetCoupon ? <SetCoupon index={selectSetCouponIndex} data={data.actAwardList[selectSetCouponIndex]} commitCallback={this.couponCommitCallback} cancelCallback={this.couponCancelCallback}/> : undefined
        }
        {
          showSetRule ? <SetRule cancelClick={this.setRuleCancelCallback} {...this.props}/> : undefined
        }
        {
          showUploadImage ? <UploadImage index={uploadImageIndex} callBack={this.uploadImageCallback}/> : undefined
        }

      </div>
    );
  }
}

export default ConfigAward;
