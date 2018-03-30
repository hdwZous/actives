import React, { Component } from 'react';

import Header from '../CommonComponents/Header';
import Line from '../CommonComponents/Line';
import RISHeader from './RISHeader';
import RISSection from './RISSection';
import RISItemRow from './RISItemRow';
import JRSpace from '../CommonComponents/JRSpace';
// import Pagination from '../CommonComponents/Pagination';
import ApplyAward from '../ApplyAward';
import Post from '../../NetWork';
import Api from '../../NetWork/Api';
import JRLoading from '../CommonComponents/JRLoading'
import PropTypes from 'prop-types';
import JRMessage from '../CommonComponents/JRMessage';
import JREmpty from '../CommonComponents/JREmpty';
import {Pagination} from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Utils from '../../Utils';


import '../../css/style.css';
import '../../css/ad.css';
import '../../css/risStyle.css';

class RightInterestShop extends Component {

    constructor(props) {
        super(props);
        this.state = {data:'',pageIndex:1,begin:undefined,end:undefined,skuName:undefined,showAward:false,showData:{}, idx:-1, freeType:undefined,showLoading: false,};
        this.funcChange = this.funcChange.bind(this);
    }

    componentDidMount() {
        this.funcSetState(true)
        this.funcFetch(1)
    }

    funcSetState = (loading) => {
        this.setState({
            showLoading:loading
        })
    }

    funcFetch = (pageNo) => {
        let {
            skuName,
            begin,
            freeType,
            end
        } = this.state;
        Post(Api.GET_SHOP_WARD_INFO,{skuName:skuName,pageNo:pageNo, pageSize:6,begin:begin, end:end, freeType:freeType},(res)=> {
            this.funcSetState(false)
            if (res.code ===1) {
                this.setState({
                    data: res,
                    pageIndex: pageNo
                });
            } else {
              JRMessage.showMessage(res.message)
            }
        },(err)=> {
            this.funcSetState(false)
        })
    }

    funcSelectCall = (value) =>{
        let ft = undefined;
        if ('收费' == value) {
            ft = 1;
        } else if ('免费' == value) {
            ft = 0;
        }
        this.setState({
            freeType:ft
        })
    }
    funcCalendarCall = (date,dataStr) =>{
        let start = dataStr[0];
        let end = dataStr[1];
        this.setState({
            begin:moment(start).valueOf(),
            end:moment(end).add('days', 1).valueOf()
        })
    }

    funcShow = ()=> {
        let json, items = new Array();
        if (this.state.data && this.state.data.data && this.state.data.data.data) {
            json = this.state.data;
            for (let i = 0; i < json.data.data.length;i++) {
                items.push(<RISItemRow key={i} data={json.data.data[i]} idx={i} callBack={this.funcCallBack}/>)
                items.push(<Line className="ris-line"/>)
            }
        }
        return items;
    }

    funcItemClick = (index)=> {
        this.funcFetch(index)
    }

    // 购买
    funcCallBack = (idx, data)=> {
        this.setState({
            idx:idx
        })

        // 1 待申请，2申请中，3可使用
        if (data && data.awardSkuStatus) {
            switch (data.awardSkuStatus) {
                case 1:
                    this.funcShowAward(data)
                    break;
                case 2:
                    JRMessage.showMessage('申请中')
                    break;
                case  3:
                    this.props.history.push("/ryu/shop/pro/pg_awardDetail/" + data.awardSkuId);
                    break;
            }
        }

    }

    // 查询
    funcViewCallBack = ()=> {
        this.funcFetch(1)
    }

    funcChange = (event)=> {
        this.setState({
            skuName:event.target.value
        })
    }

    funcShowAward = (data)=> {
        this.setState({
            showAward:true,
            showData:data
        })
    }

    funcHideAward = (status)=> {
        let idx = this.state.idx;
        let data = idx > -1 ? this.state.data : undefined;
        if (data && status == 1) {
            data.data.data[idx].awardSkuStatus = 2;
        }
        this.setState({
            showAward:false,
            data:data ? data : this.state.data
        })
    }

  render() {
      let size=0;
      let {
          data,
          pageIndex,
          showAward,
          showData,
          showLoading
      } = this.state;
      if (!data) {
          return (null);
      }
      if (data.data) {
          // size = Math.floor(data.data.dataCount / 6) + 1;
          size = data.data.dataCount;
      }

    return (
      /*<div className="d-flex justify-content-center align-items-center">*/
      <div>
        <div className="ris-container">
          <JRSpace className="ca-row-h"/>
          <RISHeader funcSelectCall={this.funcSelectCall} funcCalendarCall={this.funcCalendarCall} funcViewCall={this.funcViewCallBack} funcChangeCall={this.funcChange}/>
          <JRSpace className="ca-row-h"/>
          <JRSpace className="ca-row-h"/>
          <RISSection/>
            {
                showLoading ? <JRLoading/> : undefined
            }
            <div className="ris-container-content-scroll">
                {this.funcShow()}
                {size <= 0 ? <JREmpty emptyValue={"抱歉，权益列表为空"}/> : undefined}
            </div>
            {
                size > 6 ? <div className="d-flex justify-content-center align-items-center" style={{marginTop: '25px'}}>
                    <Pagination className="col ad_pagination justify-content-end pagination" current={pageIndex} total={size} onChange={this.funcItemClick} pageSize={6}/>
                    <p className="ris-page-size">{`共${size}条`}</p>
                </div> : undefined
            }

        </div>
          {
              showAward ? <ApplyAward data={showData} callBack={this.funcHideAward} /> : undefined
          }
      </div>
    );
  }
}

export default RightInterestShop;
