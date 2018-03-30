import React, {Component} from 'react';
import PropTypes from 'prop-types';

import POST, {GET} from '../../NetWork'
import Api from '../../NetWork/Api'

import JRHeader from '../CommonComponents/JRHeader'
import ACThirdSection from './ACThirdSection'
import ACThirdCell from './ACThirdCell'
import ACJoinSearchMenus from './ACJoinSearchMenus'

import JRLoading from '../CommonComponents/JRLoading';

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class ACJoinSearch extends Component {

  static propTypes = {
      data: PropTypes.object,
      actKey: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      list: null,
      showLoading: false
    };
  }

  onSearch = (data)=> {
    this.setState({
      showLoading: true
    })
    this.requestList(data)
  }

  requestList = (params)=> {
    let {
      actKey
    } = this.props

    params.actKey = actKey

    POST(Api.GET_ACTIVE_COMPONENT_LIST, params, (res)=> {
      this.setState({
        list: res.data,
        showLoading: false
      })
    }, (err)=> {
      this.setState({
        showLoading: false
      })
    })
  }

  componentWillMount() {

    let {
      data
    } = this.props

    this.requestList({
      // userStatus: data ? data[0].index : null
    })
  }

  render() {

    let {
      data,
    } = this.props

    let {
      list,
      showLoading
    } = this.state

    return (
      <div className="">
        <JRHeader title="参与名单查询" line/>
        <ACJoinSearchMenus data={data} onSearch={this.onSearch}/>
        <ACThirdSection/>
        {
          list && list.map((value, idx) => {
              return (
                <ACThirdCell index={idx} key={idx} data={value}/>
              )
          })
        }
        <div style={{height: 35}}></div>
        {showLoading ? <JRLoading/> : undefined}
      </div>
    )
  }
}
