import React, {Component} from 'react';
import {Checkbox} from 'antd';

import Header from '../CommonComponents/Header';
import IconClose from '../CommonComponents/IconClose';
import PropTypes from 'prop-types';
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRButton from '../CommonComponents/JRButton';

import Post from '../../NetWork';
import Api from '../../NetWork/Api';


import '../../css/style.css';
import '../../css/applyAward.css';

class ApplyAward extends Component {
    static propTypes = {
        data: PropTypes.object,
        callBack:PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {isChecked:false};
    }

    funcFetch = (skuId) => {
        let {
            skuName,
            begin,
            end,
        } = this.state;

    }

    commit = ()=> {
        let {
            data,
            callBack
        } = this.props;
        if (this.state.isChecked) {

            Post(Api.GET_SHOP_WARD_APPLY,{skuID:data.awardSkuId,agreement:1},(res)=> {
                if (res && res.code === 1) {
                    callBack && callBack(1)
                }
            },(err)=> {

            })
        }
    }

    onCheckChange = (e)=> {

        this.setState({
            isChecked:e.target.checked
        })
    }

    clickUrl = (url)=> {
        if (url) {
            window.location.href = url;
        }
    }

    render() {
        let {
            callBack,
            data
        } = this.props;
        return (
            <div className="cm_full_fixed d-flex justify-content-center align-items-center" style={{background:'rgba(0,0,0,0.4)'}}>
                <div className="cm_full_container aa-container">
                    <Header>
                        <div className="jr_breadcrumb d-flex flex-row justify-content-between" style={{width:'100%'}}>
                            <p><span>申请奖品</span> </p>
                            <p className="" style={{marginRight:'20px'}}><IconClose callBack={()=>{callBack && callBack(2)}}/></p>
                        </div>
                    </Header>
                    <div className="aa-container-content">
                        <div className="media ad_margin_bottom">
                            <p className="aa-title">奖品编码:</p>
                            <div className="media-body aa-desc">
                                <p>{data && data.awardSkuId}</p>
                            </div>
                        </div>
                        <div className="media ad_margin_bottom">
                            <p className="aa-title">奖品名称:</p>
                            <div className="media-body aa-desc">
                                <p>{data && data.awardSkuName}</p>
                            </div>
                        </div>
                        <div className="media align-items-center">
                            <Checkbox className="aa-check" style={{marginRight:'10px'}} onChange={this.onCheckChange}></Checkbox>
                            <div className="media-body aa-check">
                                <p onClick={()=> {this.clickUrl(data.agreementUrl)}}>同意签署在线协议</p>
                            </div>
                        </div>
                    </div>
                    <JRBottomBar>
                        <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="申请" onClick={this.commit}/>
                    </JRBottomBar>
                </div>

            </div>
            // </div>
        );
    }
}

export default ApplyAward;
