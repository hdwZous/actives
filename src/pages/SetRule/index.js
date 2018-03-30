import React, { Component } from 'react';
import Steps from 'rc-steps';
import PropTypes from 'prop-types';

import POST, {GET} from '../../NetWork'
import Api from '../../NetWork/Api'

import Header from '../CommonComponents/Header';
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRMessage from '../CommonComponents/JRMessage';
import JRButton from '../CommonComponents/JRButton';
import IconQuestion from '../CommonComponents/IconQuestion';
import IconClose from '../CommonComponents/IconClose';
import JRSpace from '../CommonComponents/JRSpace';
import CommonSection from '../CommonComponents/CommonSection';
import SRJoinRule from './SRJoinRule';
import SRWinRule from './SRWinRule';
import Utils from '../../Utils'
import JRLoading from '../CommonComponents/JRLoading';
import JRToast from '../CommonComponents/JRToast';
import FinishAward from '../FinishAward';
import {closeIFrames} from '../CommonComponents/public';

import '../../css/steps.css';
import '../../css/iconfont.css';
import '../../css/style.css';
import '../../css/sr.css';

class SetRule extends Component {

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

    POST(Api.GET_ACTIVE_RULE_INFO, {
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

    if (Utils.isNullStr(data.countPerdayForEveryone) || parseInt(data.countPerdayForEveryone) === 0) {
      JRMessage.showMessage('请输入每人每天最多参与次数，并且次数大于0')
      return
    }

    if (Utils.isNullStr(data.countTotalForEveryone) || parseInt(data.countTotalForEveryone) === 0) {
      JRMessage.showMessage('请输入每人最多参与次数，并且次数大于0')
      return
    }

    if (parseInt(data.countTotalForEveryone) < parseInt(data.countPerdayForEveryone)) {
      JRMessage.showMessage('每人最多参与次数要大于等于每人每天最多参与次数')
      return
    }

    // if (data.winType === 1) {
    //   if (Utils.isErrValue(data.userApiUrl)) {
    //     JRMessage.showMessage('请输入API')
    //     return
    //   }
    // }
    //
    // if (data.winType === 2) {
    //   if (Utils.isErrValue(data.jdUserTag)) {
    //     JRMessage.showMessage('请选择京东用户群')
    //     return
    //   }
    // }

    if (Utils.isErrValue(data.isShopRisk)) {
      JRMessage.showMessage('请选择是否使用京东风控')
      return
    }

    if (Utils.isNullStr(data.winCountPerdayForEveryone) || parseInt(data.winCountPerdayForEveryone) === 0) {
      JRMessage.showMessage('请输入每人每天最多中奖次数，并且次数大于0')
      return
    }

    if (Utils.isNullStr(data.winCountTotalForEveryone) || parseInt(data.winCountTotalForEveryone) === 0) {
      JRMessage.showMessage('请输入每人最多中奖次数，并且次数大于0')
      return
    }

    if (parseInt(data.winCountTotalForEveryone) < parseInt(data.winCountPerdayForEveryone)) {
      JRMessage.showMessage('每人最多中奖次数要大于等于每人每天最多中奖次数')
      return
    }

    this.setState({
      showLoading: true
    })

    function findValue() {
      let tagValue = undefined
      if (data.jdUserTagList && data.jdUserTagList.length) {
        for (var i = 0; i < data.jdUserTagList.length; i++) {
          if (data.jdUserTagList[i].index === data.jdUserTag) {
            tagValue = data.jdUserTagList[i].value
            break
          }
        }
      }
      return tagValue
    }

    data.jdUserTagName = findValue()

    POST(Api.GET_ACTIVE_RULE_SAVE, data, (res)=> {

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
            {
              data == null ? <div/> :
              <div className="cm_scroll_top_bottom_surplus cm_scroll cm_scrollbar">
                <div className="sr_steps">
                  <Steps current={1}>
                    <Steps.Step title="设置奖品" />
                    <Steps.Step title="设置规则" />
                    <Steps.Step title="完成配置" />
                  </Steps>
                </div>
                <CommonSection title="参与规则"/>
                <SRJoinRule data={data}/>
                <CommonSection title="中奖规则"/>
                <SRWinRule data={data} {...this.props}/>
                <div style={{marginBottom: '50px'}}></div>
              </div>
            }
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

export default SetRule;
