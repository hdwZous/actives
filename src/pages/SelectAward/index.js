import React, {Component} from 'react';
import {DatePicker, Select, Pagination} from 'antd';

import Line from '../CommonComponents/Line';
import SASection from './SASection';
import SAItemRow from './SAItemRow';
import SelectAwardDetail from '../SelectAwardDetail';
import JRSpace from '../CommonComponents/JRSpace';
import Header from '../CommonComponents/Header';
import SASearch from './SASearch';
import IconAngleRight from '../CommonComponents/IconAngleRight';
import Post from '../../NetWork';
import Api from '../../NetWork/Api';
import JRLoading from '../CommonComponents/JRLoading'
import JREmpty from '../CommonComponents/JREmpty'
import IconArrowDown from '../CommonComponents/IconArrowDown'
import JRToast from '../CommonComponents/JRToast';
import PropTypes from 'prop-types';


import '../../css/style.css';
import '../../css/ad.css';
import '../../css/selectAward.css';

const Option = Select.Option;

class SelectAward extends Component {
    static propTypes = {
        idx: PropTypes.number,
        callBack:PropTypes.func,
        cancelCallback:PropTypes.func
    }
    static defaultProps = {
        idx: 0
    }
    constructor(props) {
        super(props);
        this.state = {data:'',pageIndex:1,begin:0,end:0,skuName:undefined,showDetail:false,skuId:undefined,showLoading: false};
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
        let actKey = this.props.match.params.actKey;
        Post(Api.GET_CONFIG_SELECT_WARD_INFO,{skuName:this.state.skuName,pageNo:pageNo, pageSize:3,actKey:actKey},(res)=> {
            this.funcSetState(false);
            if (res.code ===1) {
                this.setState({
                    data: res,
                    pageIndex: pageNo
                });
            } else {
                JRToast.showModal(res.message)
            }
        },(err)=> {
            this.funcSetState(false)
        })
    }

    funcChange = (event)=> {
        this.setState({
            skuName:event.target.value
        })
    }

    funcSelectCall = (value) =>{
    }
    funcCalendarCall = (date, dateString) =>{
        this.setState({
            begin:date ? date.valueOf() : 0
        })
    }

    funcShow = ()=> {
        let json, items = new Array();
        if (this.state.data && this.state.data.data && this.state.data.data.data) {
            json = this.state.data;
            for (let i = 0; i < json.data.data.length;i++) {
                items.push(<SAItemRow key={i} actEnd={this.state.actEnd} data={json.data.data[i]} addCall={this.funcAddCall} viewCall={this.funcViewCall}/>)
                items.push(<Line key={`line${i}`} className="sad-line"/>)
            }
        }
        return items;
    }

    funcItemClick = (index)=> {
        this.funcFetch(index)
    }

    // 添加
    funcAddCall = (data)=> {
        let {
            idx,
            callBack
        } = this.props;
        callBack && callBack (idx,data)

    }

    // 查看
    funcViewCall = (data)=> {
        this.setState({
            showDetail:true,
            skuId:data.awardSkuId
        })
    }

    funcBack = ()=> {
        this.setState({
            showDetail:false
        })
    }

    funcAdd = (data)=> {
        this.setState({
            showDetail:false
        })
        this.funcAddCall(data.data)
    }

    render() {
        let size=0;
        let {
            data,
            showDetail,
            skuId,
            pageIndex,
            showLoading
        } = this.state
        if (!data) {
            return (null);
        }
        if (data.data) {
            size = data.data.dataCount;
        }
        let {
            cancelCallback
        } = this.props
        return (
            <div className="cm_full_fixed d-flex justify-content-center align-items-center" style={{background:"rgba(0, 0, 0, 0.4)"}}>
                <div className="cm_full_container sad-container">
                    <Header>
                        <div className="jr_breadcrumb d-flex flex-row align-items-center">
                            <JRSpace className="cm_space_40"/>
                            <a onClick={()=>{cancelCallback && cancelCallback()}}><img src={require("../../img/ic_back.png")} style={{width: 24, height: 24}}/></a>
                            <JRSpace className="cm_space_15"/>
                            <p>设置奖品</p>
                            <JRSpace className="cm_space_10"/>
                            <IconAngleRight className="ad_arrow_space"/>
                            <JRSpace className="cm_space_10"/>
                            <p className="current">选择奖品</p>
                        </div>
                    </Header>

                    {
                        showLoading ? <JRLoading/> : undefined
                    }
                    {
                        <div className="sad-container-content">
                            <p className="sad-search">奖品列表</p>
                            <Line className="sad-line-sub"/>
                            <div className="d-flex flex-row align-items-center sad-container-title">
                                <div className="sad-col1"><SASearch placeholder={"输入奖品名称"} inputChange={this.funcChange} callBack={() => {this.funcFetch(this.state.pageIndex)}}/></div>
                                {/*<JRSpace className="sad-col4"/>*/}
                                {/*<p className="ca-col0">类型</p>*/}
                                {/*<JRSpace className="sad-col2"/>*/}
                                {/*<Select className="sad-col1" onChange={this.funcSelectCall} placeholder={"选择广告计划"}*/}
                                        {/*optionFilterProp="children">*/}
                                    {/*<Option value="广告计划1">广告计划1</Option>*/}
                                    {/*<Option value="广告计划2">广告计划2</Option>*/}
                                    {/*<Option value="广告计划3">广告计划3</Option>*/}
                                {/*</Select>*/}
                                {/*<JRSpace/>*/}
                                {/*<p className="ca-col1">上架时间</p>*/}
                                {/*<JRSpace className="sad-col2"/>*/}
                                {/*<DatePicker className="sad-col1" onChange={this.funcCalendarCall} placeholder="选择起止时间"/>*/}
                                {/*<JRSpace/>*/}
                                {/*<div className="sad-search-label col-3 ca-tc">*/}
                                    {/*<span className="sad-search-label-num">共&nbsp;{len}&nbsp;条，每页显示&nbsp;</span>4&nbsp;条<IconArrowDown />*/}
                                {/*</div>*/}
                            </div>
                            <SASection/>
                            <div className="sad-container-content-scroll cm_scrollbar">
                                {this.funcShow()}
                                {size <= 0 ? <JREmpty emptyValue={"抱歉，奖品列表为空"}/> : undefined}
                            </div>
                            {
                                size > 2 ? <Pagination className="ad_pagination justify-content-end pagination" current={pageIndex}  total={size} onChange={this.funcItemClick} pageSize={3}/> : undefined
                            }
                        </div>
                    }
                </div>
                {
                    showDetail ? <SelectAwardDetail skuId={skuId} backCall={this.funcBack} commitCall={this.funcAdd} /> : undefined
                }
            </div>
            // </div>
        );
    }
}

export default SelectAward;
