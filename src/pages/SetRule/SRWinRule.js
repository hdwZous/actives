import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { Select } from 'antd';

import POST, {GET} from '../../NetWork'
import Api from '../../NetWork/Api'

import BaseInput from '../CommonComponents/BaseInput';
import JRSpace from '../CommonComponents/JRSpace';
import JRButton from '../CommonComponents/JRButton';
import RedStar from '../CommonComponents/RedStar';
import Utils from '../../Utils';

import '../../css/style.css';
import '../../css/sr.css';

const RadioGroup = Radio.Group;
const Option = Select.Option;

const API_URL_INDEX = 0
const DAY_MORE_INDEX = 1
const MORE_INDEX = 2

export default class SRJoinRule extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  constructor (props) {
    super(props);

    let {
      data
    } = this.props

    if (data.winType === null || data.winType  === undefined) {
      data.winType = 1
    }

    if (data.isShopRisk === null || data.isShopRisk  === undefined) {
      data.isShopRisk = 2
    }

    this.state = {
      data: data,
      showRefreshBtn: false
    };
  }

  onChange1 = (e) => {
    let {
      data
    } = this.state

    data.winType = e.target.value

    this.setState({
      data: data,
    });
  }

  onChange2 = (e) => {

    let {
      data
    } = this.state

    data.isShopRisk = e.target.value

    this.setState({
      data: data,
    });
  }

  createGroupClick = ()=> {
    this.setState({
      showRefreshBtn: true
    })
  }

  refreshClick = ()=> {
    POST(Api.GET_ACTIVE_RULE_REFRESH, {
      actKey: this.props.match.params.actKey,
      eventID: this.props.match.params.eventID,
    }, (res)=> {

      let {
        data
      } = this.state

      data.jdUserTagList = res.data

      // if (Utils.isErrValue(data.jdUserTag) && res.data) {
      //   data.jdUserTag = res.data[0].index
      // }

      this.setState({
        data: data,
        showRefreshBtn: false
      })
      this.refs.mySelect.rcSelect.setOpenState(true)
    }, (err)=> {
      this.setState({
        showRefreshBtn: false
      })

      this.refs.mySelect.rcSelect.setOpenState(true)
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
      case API_URL_INDEX:
        data.userApiUrl = value
        break;
      case DAY_MORE_INDEX:
        data.winCountPerdayForEveryone = value
        break;
      case MORE_INDEX:
        data.winCountTotalForEveryone = value
        break;
      default:
    }

    this.setState({
      data: data
    })

  }

  listChange =(value) => {
    this.state.data.jdUserTag = value
  }

  render() {

    let {
      data,
      showRefreshBtn
    } = this.state

    return (
      <div className="sr_page">

        <div className="media">
          <p className="sr_title text-right">奖品中奖门槛：</p>
          <div className="media-body d-flex flex-row" style={{position: 'relative', marginTop: 2}}>
            <div style={{marginTop: 1}}>
              <RadioGroup className="sr_radio" onChange={this.onChange1} value={data.winType}>
                <Radio value={1}>输入 URL 地址</Radio>
                <Radio value={2}>选择京东用户群</Radio>
              </RadioGroup>
            </div>
            <BaseInput index={API_URL_INDEX} className="cm_input" value={Utils.isErrValue(data.userApiUrl) ? '' : data.userApiUrl} type="text" onBlur={this.onBlur}/>
            <JRSpace className="cm_space_10"/>

            {data.winType === 1 ? <p className='cm_red_color'>通过API，商户自行判断用户是否可以中奖</p> : undefined}

            <div className="flex-row align-items-center" style={{position: 'absolute', top: 45, left: 120}}>
              {
                <Select ref="mySelect" defaultValue={data.jdUserTag} onChange={this.listChange}>
                  <Option value={1} disabled><div className="cm_a"><a href={data.toNewUserTagUrl} target="_blank" onClick={this.createGroupClick}><p><i className='fa fa-plus' aria-hidden="true"></i> 新建用户群</p></a></div></Option>
                  {
                    data.jdUserTagList && data.jdUserTagList.map((value, idx) => {
                        return (
                          <Option index={idx} key={idx} value={value.index}>{value.value}</Option>
                        )
                    })
                  }
                </Select>
              }

              {
                showRefreshBtn ? <a className="cm_absolute_full" onClick={this.refreshClick}></a> : undefined
              }


              {/* {data.winType === 2 ?
                <div className="d-flex flex-row align-items-center">
                  <a className="sr_plus" target="_blank" href="http://demo.jr.jd.com/finance/technology/daplatform/index.html?demo=1#/dmp"><p><i className='fa fa-plus' aria-hidden="true"></i> 新建用户群</p></a>
                  <JRSpace className="cm_space_10"/>
                  <JRButton className="sr_refresh_btn" type={JRButton.BUTTON_TYPE.CUSTOM} title="刷新" onClick={this.refreshClick}/>
                </div>
               : undefined} */}

            </div>

          </div>
        </div>

        <div className="media">
          <p className="sr_title text-right"><RedStar/>是否使用京东风控：</p>
          <div className="media-body">
            <RadioGroup style={{marginTop: '4px'}} onChange={this.onChange2} value={data.isShopRisk}>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </RadioGroup>
          </div>
        </div>

        <div className="media">
          <p className="sr_title text-right"><RedStar/>每人每天最多中奖：</p>
          <div className="media-body">
            <BaseInput index={DAY_MORE_INDEX} className="cm_input" value={data.winCountPerdayForEveryone} type="text" label="次" onBlur={this.onBlur} isnumber/>
          </div>
        </div>

        <div className="media">
          <p className="sr_title text-right"><RedStar/>每人最多中奖：</p>
          <div className="media-body">
            <BaseInput index={MORE_INDEX} className="cm_input" value={data.winCountTotalForEveryone} type="text" label="次" onBlur={this.onBlur} isnumber/>
          </div>
        </div>
      </div>
    )
  }
}
