import React, { Component } from 'react';

import POST, {GET} from '../../NetWork'
import Api from '../../NetWork/Api'

import JRLoading from '../CommonComponents/JRLoading';
import JRMenus from '../CommonComponents/JRMenus';
import JRButton from '../CommonComponents/JRButton';
import JRMessage from '../CommonComponents/JRMessage';
import JREmpty from '../CommonComponents/JREmpty';

import ERFirstSection from './ERFirstSection'
import ERFirstCell from './ERFirstCell'

import ERSecondSection from './ERSecondSection'
import ERSecondCell from './ERSecondCell'

import '../../css/style.css';
import '../../css/expensesRecord.css';

class ExpensesRecord extends Component {

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
    POST(Api.GET_CONSUMPTION_INFO, {
      actKey: key
    }, (res)=> {
      if (res.code != 1) {
        JRMessage.showMessage(res.message)
      } else {
        this.setState({data: res.data})
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
            <ERFirstSection/>
            {
              data.consumptionList && data.consumptionList.map((value, idx) => {
                  return (
                    <ERFirstCell index={idx} key={idx} data={value}/>
                  )
              })
            }

            <ERSecondSection/>
            {
              data.consumeAwardList && data.consumeAwardList.map((value, idx) => {
                  return (
                    <ERSecondCell index={idx} key={idx} data={value}/>
                  )
              })
            }
          </div> : undefined
        }
        {
          showEmpty ? <JREmpty emptyValue={"暂无消费信息"}/> : undefined
        }
      </div>
    )
  }
}

export default ExpensesRecord;
