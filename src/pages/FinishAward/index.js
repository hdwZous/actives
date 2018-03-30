import React, { Component } from 'react';
import Steps from 'rc-steps';

import Header from '../CommonComponents/Header';
import Alert from '../CommonComponents/Alert';
import FASection from './FASection'
import FACell from './FACell'
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRButton from '../CommonComponents/JRButton';
import IconClose from '../CommonComponents/IconClose';
import JRSpace from '../CommonComponents/JRSpace';

import {closeIFrames, cloneIFrames} from '../CommonComponents/public';

import Utils from '../../Utils';

import JRLoading from '../CommonComponents/JRLoading';
import JRToast from '../CommonComponents/JRToast';

import POST from '../../NetWork'
import Api from '../../NetWork/Api'

import '../../css/steps.css';
import '../../css/iconfont.css';
import '../../css/style.css';
import '../../css/fa.css';

class FinishAward extends Component {

  constructor (props) {
    super(props);

    this.state = {
      data: null,
      showAlert: false,
      showLoading: false
    };
  }

  componentWillMount() {

    this.setState({
      showLoading: true
    })

    POST(Api.GET_ACTIVE_COST_LIST, {
      actKey: this.props.match.params.actKey,
      eventID: this.props.match.params.eventID,
    }, (res)=> {
      this.setState({
        showLoading: false
      })

      if (res.code === 1) {
        this.setState({data: res.data})
      } else {
        JRToast.showModal(res.message)
      }
    }, (err)=> {
      this.setState({
        showLoading: false
      })
    })
  }

  cancelAlert = ()=> {
    this.setState({
      showAlert: false
    })
  }

  recharge = ()=> {
    this.setState({
      showAlert: false
    })
  }

  commitClick = ()=> {

    this.setState({
      showLoading: true
    })

    POST(Api.GET_ACTIVE_COST_CHECK, {
      actKey: this.props.match.params.actKey
    }, (res)=> {

      this.setState({
        showLoading: false
      })

      if (res.code === 1) {
          closeIFrames()
          window.location.reload()
      } else if (res.code === 7001) { //用户余额不足
        this.setState({
          showAlert: true
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
      showAlert,
      showLoading
    } = this.state

    let {
      cancelClick
    } = this.props

    return (
      <div className="cm_full_background d-flex justify-content-center align-items-center">
        <div className="cm_full_container">
          <Header title="配置奖品" className="justify-content-between">
            <div className="jr_breadcrumb d-flex flex-row align-items-center">
              <IconClose callBack={closeIFrames}/>
              <JRSpace className="cm_space_20"/>
            </div>
          </Header>

          {
            data == null ? <div/> :
            <div className="fa_scroll cm_scrollbar">
              <div className="fa_steps">
                <Steps current={2}>
                  <Steps.Step title="设置奖品" />
                  <Steps.Step title="设置规则" />
                  <Steps.Step title="完成配置" />
                </Steps>
              </div>

              <p className="fa_result_content">您已成功创建活动！></p>

              <FASection/>

              {
                data.actAwardVoList.map((value, idx) => {
                    return (
                      <FACell index={idx} key={idx} data={value}/>
                    )
                })
              }

              <div className="media fa_page" style={{marginTop: '20px'}}>
                <div className="media-body">
                  {/* <p className="">账户余额 (元) :&nbsp;&nbsp;</p> */}
                  <p className="" style={{marginTop: 5}}>待锁定费用 (元) :&nbsp;&nbsp;</p>
                </div>
                <div>
                  {/* <p className="fa_price">{Utils.format3Number(data.accountBalance, 2)}</p> */}
                  <p className="fa_price fa_red" style={{marginTop: 5}}>{Utils.format3Number(data.lockAmount, 2)}</p>
                </div>
              </div>

            </div>
          }
          {
            showLoading ? <JRLoading/> : undefined
          }
          <JRBottomBar>
            {/* <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="充值" onClick={cancelClick}/> */}
            <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="完成" onClick={this.commitClick}/>
          </JRBottomBar>
        </div>

        {showAlert ?
        <Alert title="账户余额不足，建议充值" content="您可以维持计划继续添加单元">
          <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="关闭" onClick={this.cancelAlert}/>
          <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="充值" onClick={this.recharge}/>
        </Alert> : undefined}
      </div>
    );
  }
}

export default FinishAward;
