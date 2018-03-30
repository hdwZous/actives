import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import 'moment/locale/zh-cn'

import Header from '../CommonComponents/Header';
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRButton from '../CommonComponents/JRButton';
import JRSpace from '../CommonComponents/JRSpace';
import BaseInput from '../CommonComponents/BaseInput';
import Public from '../CommonComponents/JRPublic';
import IconAngleRight from '../CommonComponents/IconAngleRight';

import CAFGroupRow from './CAFGroupRow';

import '../../css/steps.css';
import '../../css/iconfont.css';
import '../../css/style.css';
import '../../css/configAwardFixed.css';

const RadioGroup = Radio.Group;
const USER_API_URL = 'userApiUrl';
const URL_HIGHEST_PRICE = 'urlHighestPrice';
const URL_LOWEST_PRICE = 'urlLowestPrice';

class ConfigAwardGroup extends Component {

    static propTypes = {
        commitCallback: PropTypes.func,
        cancelCallback: PropTypes.func,
        data: PropTypes.object
    }

  constructor (props) {
    super(props);
    let data = this.props.data;
    this.state = {
        option: data.userTagType
    };
  }

  componentDidMount() {
  }

  onChange = (e) => {
    let o = e.target.value;
    this.setState({
      option: o
    }, ()=>{this.props.data.userTagType = o});
  }

  nextClick = ()=> {
  }
    onBlur = (input)=> {
      let {data} = this.props;

        switch (input.props.index){
            case USER_API_URL:
                if (data){
                    data.userApiUrl = input.state.value;
                }
                break;
            case URL_HIGHEST_PRICE:
                if (data){
                    data.urlHighestPrice = input.state.value;
                }
                break;
            case URL_LOWEST_PRICE:
                if (data){
                    data.urlLowestPrice = input.state.value;
                }
                break;
        }
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

    funcAddCall = (index)=> {

        let {
            data
        } = this.props;
        data.jdUserTagPrices.push({})
        this.funcUpdateData(data);
        this.setState({
            data: data
        })
    }

    funcDeleteCall = (index)=> {

        let {
            data
        } = this.props;
        data.jdUserTagPrices.splice(index, 1);

        this.funcUpdateData(data);
        this.setState({
            data: data
        })
    }

    funcGroupItem = (data)=> {
        let itemArray = new Array();
        if (data && data.jdUserTagPrices) {
            data.jdUserTagPrices.map((value, idx) => {
                itemArray.push(<CAFGroupRow key={`cafRowItem${idx}`} index={idx} ref={`cafRowItem${idx}`} data={data}
                                            showType={value.showType} addCallback={this.funcAddCall}
                                            deleteCallback={this.funcDeleteCall} {...this.props}/>)
            })
        }
        return itemArray;
    }

  render() {

    let {cancelCallback, commitCallback, data} = this.props;

    let {
      option,
    } = this.state;
    if (!data) {
        return(null);
    }

    return (
      <div>
        <div className="cm_full_background d-flex justify-content-center align-items-center cm_12_color_style">
          <div className="cm_full_container">
            <Header className="justify-content-between">
              <div className="jr_breadcrumb d-flex flex-row align-items-center">
                  <JRSpace className="cm_space_40"/>
                  <a onClick={cancelCallback}><img src={require('../../img/ic_back.png')} style={{width: 24, height: 24}}/></a>
                  <JRSpace className="cm_space_15"/>
                  <p>设置奖品</p>
                  <IconAngleRight className="ad_arrow_space"/>
                  <p className='current'>奖品面额设置</p>
              </div>
            </Header>
            <div className="cm_scroll_top_bottom_surplus cm_scroll cm_scrollbar">

              <div style={{marginTop: 40}}>
                <p>
                  {`已设置奖品面额为 ${data.defaultLowestPrice ? data.defaultLowestPrice : 0} ${data.award.awardSkuUnit} 至 ${data.defaultHighestPrice ? data.defaultHighestPrice : 0} ${data.award.awardSkuUnit}，可在此区间内针对不同人群标签设置奖品面额。`}
                </p>
              </div>
              <div style={{marginTop: 40}}>

                <div className="media cm_row">
                  <p className="caf_title text-right">人群标签：</p>
                  <div className="media-body">
                    <div style={{marginTop: '3px'}}>
                      <RadioGroup className="caf_radio" onChange={this.onChange} value={option}>
                        <Radio value={1}>自定义用户群</Radio>
                        <Radio value={2}>京东用户群</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {
                  option === 1 ? <div>
                    <div className="media cm_row">
                      <p className="caf_title text-right">接口地址：</p>
                      <div className="media-body d-flex flex-row">
                        <BaseInput className="cm_input" index={USER_API_URL} ref={'userApiUrl'} placeholder="URL/API接口地址" type="text" onBlur={this.onBlur} value={data && data.userApiUrl ? data.userApiUrl : ''}/>
                        <JRSpace className="cm_space_10"/>
                        <div className='cm_a'>
                          <a href="https://lottery-pre.jd.com/task.html" target="_blank">
                            <p>查看规则说明</p>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="media cm_row">
                      <p className="caf_title text-right">出价区间：</p>
                        <div className="media-body d-flex flex-row">
                            <BaseInput isnumber fixed={2} className="cm_input" index={URL_LOWEST_PRICE} type="text" label="元" onBlur={this.onBlur} value={data && data.urlLowestPrice ? data.urlLowestPrice : ''} label={data.award.awardSkuUnit} fixed={data.award.awardDigit}/>
                            <JRSpace className="cm_space_10"/>
                            <p>至</p>
                            <JRSpace className="cm_space_10"/>
                            <BaseInput isnumber fixed={2} className="cm_input" index={URL_HIGHEST_PRICE} type="text" label="元" onBlur={this.onBlur} value={data && data.urlHighestPrice ? data.urlHighestPrice : ''} label={data.award.awardSkuUnit} fixed={data.award.awardDigit}/>
                        </div>
                    </div>
                  </div> : undefined
                }
                {
                  option === 2 ? <div>
                      {this.funcGroupItem(data)}
                  </div> : undefined
                }

              </div>
            </div>
            <JRBottomBar>
              <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="返回" onClick={cancelCallback}/>
              <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="确定" onClick={cancelCallback}/>
            </JRBottomBar>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfigAwardGroup;
