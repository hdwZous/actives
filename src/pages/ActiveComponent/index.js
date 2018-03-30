import React, { Component } from 'react';

import POST, {GET} from '../../NetWork'
import Api from '../../NetWork/Api'

import JRHeader from '../CommonComponents/JRHeader'
import ACFirstCell from './ACFirstCell'
import ACFirstSection from './ACFirstSection'
import JoinRule from './JoinRule'
import WinningRule from './WinningRule'
import ACAwardInfo from './ACAwardInfo'
import ACJoinSearch from './ACJoinSearch'

import JRLoading from '../CommonComponents/JRLoading';
import JRMenus from '../CommonComponents/JRMenus';
import JRButton from '../CommonComponents/JRButton';

import JREmpty from '../CommonComponents/JREmpty';

import JRMessage from '../CommonComponents/JRMessage';

import '../../css/style.css';

class ActiveComponent extends Component {

  constructor (props) {
    super(props);

    this.state = {
      data: null,
      menuIndex: 0,
      menuData: null,
      showLoading: false,
      showEmpty: false,
    };
  }

  componentWillMount() {

    this.setState({
      showLoading: true
    })

    POST(Api.GET_ACTIVE_ACTKEYS, {
      pageID: this.props.match.params.pageID,
    }, (res)=> {
      if (res.code === 1 && res.data && res.data.length) {
        this.setState({
          menuData: res.data,
          showEmpty: false
        })
        this.requestInfo(res.data[0].key)
      } else if (res.code === 2) {
        this.setState({
          showEmpty: true
        })
      } else {
        JRMessage.showMessage(res.message)
        this.setState({
          showEmpty: false
        })
      }

      this.setState({
        showLoading: false
      })
    }, (err)=> {
      this.setState({
        showLoading: false
      })
    })

  }

  requestInfo = (key)=> {
    this.setState({
      showLoading: true
    })
    POST(Api.GET_ACTIVE_COMPONENT_INFO, {
      actKey: key
    }, (res)=> {
      this.setState({
        showLoading: false
      })
      if (res.code === 1) {
        this.setState({data: res.data})
      } else {
        JRMessage.showMessage(res.message)
      }

    }, (err)=> {
      this.setState({
        showLoading: false
      })
    })
  }

  menuClick = (index) => {
    let {
      menuIndex,
      menuData
    } = this.state

    if (menuIndex === index) {
      return;
    }

    this.setState({
      menuIndex: index,
      data: null
    })

    this.requestInfo(menuData[index].key)
  }

  render() {

    let {
      data,
      menuIndex,
      menuData,
      showLoading,
      showEmpty
    } = this.state

    return (
      <div className="">
        {/* <JRHeader title={data.actTypeName} des={`( 活动编号: ${data.actVo.actKey} )`}/> */}

        {
          showLoading ? <JRLoading/> : undefined
        }

        {
          menuData ?
          <JRMenus style={{marginTop: 40, marginBottom: 30}}>
            {
              menuData.map((value, idx) => {
                  return (
                    <JRButton
                      index={idx}
                      key={idx}
                      className="cm_menus_btn"
                      type={idx === menuIndex ? JRButton.BUTTON_TYPE.BLUE : JRButton.BUTTON_TYPE.NORMAL}
                      title={value.key}
                      shadow={false}
                      onClick={()=>{this.menuClick(idx)}}/>
                  )
              })
            }

          </JRMenus> : undefined
        }

        {
          data ?
          <div>
            <ACFirstSection/>
            {
              data.actAwardVoList.map((value, idx) => {
                  return (
                    <ACFirstCell index={idx} key={idx} data={value}/>
                  )
              })
            }

            <div className="row">
              <div className="col">
                <JoinRule data={data.participateRuleList}/>
              </div>
              <div className="ac_space_120">
              </div>
              <div className="col">
                <WinningRule data={data.winRuleList}/>
              </div>
            </div>

            <ACAwardInfo data={data}/>
            <ACJoinSearch actKey={menuData[menuIndex].key} data={data.userTypeList}/>
          </div> : undefined
        }
        {
          showEmpty ? <JREmpty emptyValue={"暂无活动组件详情"}/> : undefined
        }

      </div>
    );
  }
}

export default ActiveComponent;
