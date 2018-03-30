import React, {Component} from 'react';
import JRSpace from '../CommonComponents/JRSpace';
import '../../css/style.css';
import '../../css/risStyle.css';
import PropTypes from 'prop-types';
import Utils from '../../Utils';

export default class RISItemRow extends Component {

    static propTypes = {
        idx:PropTypes.number,
        data: PropTypes.object,
        callBack:PropTypes.func
    }

    static propTypes = {
        idx:-1
    }

    render() {

        let {
            idx,
            data,
            callBack
        } = this.props;
        let status = '', opt = '', price = '';
        // 1 待申请，2申请中，3可使用
        if (data && data.awardSkuStatus) {
            switch (data.awardSkuStatus) {
                case 1:
                    status = '待申请';
                    opt = '申请';
                    break;
                case 2:
                    status = '申请中';
                    opt = '申请中';
                    break;
                case  3:
                    status = '可使用';
                    opt = '查看';
                    break;
            }
        }

        if (data && data.awardSkuPriceType) {
            switch (data.awardSkuPriceType) {
                case 1:
                    price = '免费';
                    break;
                case 2:
                    price = '￥' + data.awardPerPrice;
                    break;
                case  3:
                    price = '自定义';
                    break;
            }
        }

        return (
            <div className="ris-row d-flex flex-row flex-nowrap align-items-center">
                <div className="ris-row-col"  onClick={()=>{callBack && callBack(idx, data)}}>
                    <div className="ris-icon"><img src={data.awardImg}/></div>
                </div>
                <JRSpace/>
                <div className="col"  onClick={()=>{callBack && callBack(idx, data)}}>
                    <div className="title" style={{lineHeight: '15px'}}>{data.awardSkuName}</div>
                    <JRSpace className="title-space"/>
                    <div className="desc">{data.awardSkuFrom}</div>
                    <JRSpace className="desc-space"/>
                    <div className="desc">有效期至{Utils.formatTime2Str(data.awardSkuEnd, 'yyyy-MM-dd')}</div>
                </div>
                <div className="ris-row-col-desc ca-tc btn-status">
                    {status}
                </div>
                <div className="ris-row-col-desc ca-tc btn-status">
                    {price}
                </div>
                <div className="ris-row-col-desc ca-tc">
                    <div className="btn-buy" onClick={()=>{callBack && callBack(idx, data)}}>{opt}</div>
                </div>
            </div>
        )
    }
}
