import React, { Component } from 'react';

import Header from '../CommonComponents/Header';
import IconAngleRight from '../CommonComponents/IconAngleRight';
import Line from '../CommonComponents/Line';
import JRSpace from '../CommonComponents/JRSpace';
import Pagination from '../CommonComponents/Pagination';
import ADInfo from './ADInfo'
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRButton from '../CommonComponents/JRButton';
import PropTypes from 'prop-types';
import Post from '../../NetWork';
import Api from '../../NetWork/Api';

import '../../css/style.css';
import '../../css/sad.css';
const mounted = false

class SelectAwardDetail extends Component {

    static propTypes = {
        backCall: PropTypes.func,
        commitCall:PropTypes.func,
        skuId:PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {data:undefined};
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.funcFetch()
    }

    funcFetch = () => {
        this.mounted = true;
        let skuId = this.props.skuId;
        Post(Api.GET_SHOP_WARD_DETAIL + '?skuId=' + skuId, null,(res)=> {
            if (this.mounted) {
                this.setState({
                    data: res
                });

            }
        },(err)=> {

        })
    }

  render() {
      let {
        backCall,
          commitCall
      } = this.props;
      let {
          data
      } = this.state;


    return (
      <div className="cm_full_fixed d-flex justify-content-center align-items-center cm_12_color_style sad_container-p">
        <div className="cm_full_container cm_fixed_bounds">
            <Header>
                <div className="jr_breadcrumb d-flex flex-row align-items-center">
                    <JRSpace className="cm_space_40"/>
                    <a onClick={()=> {backCall && backCall()}}><img src={require("../../img/ic_back.png")} style={{width: 24, height: 24}}/></a>
                    <JRSpace className="cm_space_15"/>
                    <p>设置奖品</p>
                    <JRSpace className="cm_space_10"/>
                    <IconAngleRight className="ad_arrow_space"/>
                    <JRSpace className="cm_space_10"/>
                    <p>选择奖品</p>
                    <JRSpace className="cm_space_10"/>
                    <IconAngleRight className="ad_arrow_space"/>
                    <JRSpace className="cm_space_10"/>
                    <p className="current">奖品详情</p>
                </div>
            </Header>

          {
            data ? <ADInfo data={data && data.data}/> : undefined
          }
          <JRBottomBar>
            <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="返回" onClick={()=> {backCall && backCall()}}/>
            <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="添加" onClick={()=> {commitCall && commitCall(data)}}/>
          </JRBottomBar>
        </div>
      </div>

    );
  }
}

export default SelectAwardDetail;
