import React, { Component } from 'react';

import IconAngleRight from '../CommonComponents/IconAngleRight';
import Line from '../CommonComponents/Line';
import ADInfo from './ADInfo'
import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRButton from '../CommonComponents/JRButton';
import Post from '../../NetWork';
import Api from '../../NetWork/Api';

import '../../css/style.css';
import '../../css/ad.css';

class AwardDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {data:''};
    }


    componentDidMount() {
        this.funcFetch(1)
    }

    funcFetch = () => {
        let skuId = this.props.match.params.skuId;
        Post(Api.GET_SHOP_WARD_DETAIL + '?skuId=' + skuId, null,(res)=> {
            this.setState({
                data:res
            });
        },(err)=> {

        })
    }
  render() {
        let {
            data
        } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center cm_12_color_style">

        <div className="ad_container_detail">
          <ADInfo data={data && data.data}/>
          <div className="ad-bottom">
            <JRBottomBar>
              <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="返回" onClick={()=> {this.props.history.goBack()}}/>
            </JRBottomBar>
          </div>
        </div>
      </div>






    );
  }
}

export default AwardDetail;
