import React, { Component } from 'react';
import Steps from 'rc-steps';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { Tooltip } from 'antd';

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
import FinishAward from '../FinishAward';
import {closeIFrames} from '../CommonComponents/public';
import RedStar from '../CommonComponents/RedStar';
import BaseInput from '../CommonComponents/BaseInput';

import '../../css/steps.css';
import '../../css/iconfont.css';
import '../../css/style.css';
import '../../css/setRuleFixed.css';

const RadioGroup = Radio.Group;

const INDEX_SRF_WIN_URL = 1
const INDEX_SRF_JOB_URL = 2
const INDEX_SRF_JOB_NAME = 3

class SetRuleFixed extends Component {

  static propTypes = {
      cancelClick: PropTypes.func,
  }

  constructor (props) {
    super(props);

    this.state = {
      data: null,
      showDoneAward: false,
      showLoading: false
    };
  }

  componentWillMount() {

    this.setState({
      showLoading: true
    })

    POST(Api.GET_FIXED_SET_RULE_INFO, {
      actKey: this.props.match.params.actKey,
      eventID: this.props.match.params.eventID,
    }, (res)=> {
      this.setState({
        showLoading: false
      })
      if (res.code != 1) {
        JRToast.showModal(res.message)
      } else {
        this.setState({data: res.data})
      }

      if (res.data.message) {
        JRToast.showModal(res.data.message)
      }
    }, (err)=> {
      this.setState({
        showLoading: false
      })
    })
  }

  cancelClick =()=> {
    let {
      cancelClick
    } = this.props

    cancelClick && cancelClick()
  }

  commitClick = ()=> {

    let {
      data
    } = this.state


    if (Utils.isNullStr(data.winUrl)) {
      JRMessage.showMessage('请输入奖品中奖门槛URL地址')
      return
    }

    if (Utils.isNullStr(data.jobUrl)) {
      JRMessage.showMessage('请输入任务地址')
      return
    }

    if (Utils.isNullStr(data.jobName)) {
      JRMessage.showMessage('请输入任务名称')
      return
    }

    if (Utils.isErrValue(data.isJdRisk)) {
      JRMessage.showMessage('请选择是否使用京东风控')
      return
    }

    this.setState({
      showLoading: true
    })

    POST(Api.GET_FIXED_SET_RULE_SAVE, data, (res)=> {

      this.setState({
        showLoading: false
      })

      if (res.code === 1) {
        this.setState({
          showDoneAward: true
        })
      } else {
        JRToast.showModal(res.message)
      }
    }, (err)=> {
      this.setState({
        showLoading: false
      })
    })
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
      case INDEX_SRF_WIN_URL:
        data.winUrl = value
        break;
      case INDEX_SRF_JOB_URL:
        data.jobUrl = value
        break;
      case INDEX_SRF_JOB_NAME:
        data.jobName = value
        break;
      default:
    }

    this.setState({
      data: data
    })

  }

  onChange = (e) => {

    let {
      data
    } = this.state

    data.isJdRisk = e.target.value

    this.setState({
      data: data,
    });
  }

  render() {

    let {
      data,
      showDoneAward,
      showLoading
    } = this.state

    return (
      <div>
        <div className="cm_full_background d-flex justify-content-center align-items-center cm_12_color_style">
          <div className="cm_full_container">
            <Header title="配置奖品" className="justify-content-between">
              <div className="jr_breadcrumb d-flex flex-row align-items-center">
                {/* <IconQuestion/>
                <JRSpace className="cm_space_30"/> */}
                <IconClose callBack={closeIFrames}/>
                <JRSpace className="cm_space_20"/>
              </div>
            </Header>

            <div className="cm_scroll_top_bottom_surplus cm_scroll">
              <div className="sr_steps">
                <Steps current={1}>
                  <Steps.Step title="设置奖品" />
                  <Steps.Step title="设置规则" />
                  <Steps.Step title="完成配置" />
                </Steps>
              </div>
              {/* data === null ? <div/> : */}
              {
                 <div style={{marginTop: 40}}>
                  <div className="media cm_row">
                    <div className="srf_title d-flex flex-row align-items-center justify-content-end">
                      <RedStar/>
                      <JRSpace className="cm_space_4"/>
                      <Tooltip placement="right" title="中奖门槛接口用于判断用户是否已经完成活动任务，已完成任务的用户可以直接领取奖励，未完成的用户需要先完成任务，然后才能领取奖励。">
                        <IconQuestion/>
                      </Tooltip>
                      <JRSpace className="cm_space_4"/>
                      <p>奖品中奖门槛：</p>
                    </div>
                    <div className="media-body d-flex flex-row">
                      <p>输入 API</p>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput index={INDEX_SRF_WIN_URL} className="cm_input" type="text" onBlur={this.onBlur} value={data && data.winUrl ? data.winUrl : ''}/>
                      <JRSpace className="cm_space_10"/>
                      <div className='cm_a'>
                        <a href="https://lottery-pre.jd.com/task.html" target="_blank">
                          <p>查看规则说明</p>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="media cm_row">
                    <div className="srf_title d-flex flex-row align-items-center justify-content-end">
                      <RedStar/>
                      <JRSpace className="cm_space_4"/>
                      <Tooltip placement="right" title="“任务名称” 用于活动流程中提示用户需完成任务，我们会引导用户前往“任务地址”页面完成任务">
                        <IconQuestion/>
                      </Tooltip>
                      <JRSpace className="cm_space_4"/>
                      <p>任务名称：</p>
                    </div>
                    <div className="media-body d-flex flex-row">
                      <BaseInput index={INDEX_SRF_JOB_NAME} className="cm_input" type="text" placeholder="输入任务名称" onBlur={this.onBlur} value={data && data.jobName ? data.jobName : ''}/>
                      <JRSpace/>
                      <p>任务地址</p>
                      <JRSpace className="cm_space_10"/>
                      <BaseInput index={INDEX_SRF_JOB_URL} className="cm_input" type="text" placeholder="输入URL" onBlur={this.onBlur} value={data && data.jobUrl ? data.jobUrl : ''}/>
                    </div>
                  </div>

                  <div className="media">
                    <p className="srf_title text-right"><RedStar/>是否使用京东风控：</p>
                    <div className="media-body d-flex flex-row align-items-center">
                      <RadioGroup style={{marginLeft: 5}} onChange={this.onChange} value={data && data.isJdRisk ? data.isJdRisk : 0}>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                      </RadioGroup>
                      <p className='cm_red_color' style={{marginLeft: -5, marginTop: 1}}>开启京东风控系统，帮助抵御恶意刷量，避免你的资金损失</p>
                    </div>
                  </div>
                </div>
              }

              <div style={{marginBottom: '50px'}}></div>
            </div>
            {
              showLoading ? <JRLoading/> : undefined
            }
            <JRBottomBar>
              <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="上一步" onClick={this.cancelClick}/>
              <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="下一步" onClick={this.commitClick}/>
            </JRBottomBar>
          </div>
        </div>
        {
          showDoneAward ? <FinishAward cancelClick={()=>{
            this.setState({
              showDoneAward: false
            })
          }} {...this.props}/> : undefined
        }
      </div>
    );
  }
}

export default SetRuleFixed;
