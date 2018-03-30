import React, {Component} from 'react';
import JRSpace from '../CommonComponents/JRSpace';
import '../../css/style.css';
import '../../css/selectAward.css';
import PropTypes from 'prop-types';
import Utils from '../../Utils';

export default class SAItemRow extends Component {

    static propTypes = {
        data: PropTypes.object,
        addCall:PropTypes.func,
        viewCall:PropTypes.func,
        actEnd:PropTypes.number
    }

    render() {

        let {
            data,
            addCall,
            actEnd,
            viewCall
        } = this.props;Date;
        let type = '';
        if (data && data.awardSkuPriceType) {
            switch (data.awardSkuPriceType) {
                case 1:
                    type = '免费'
                    break;
                case 2:
                    type = '￥' + data.awardPerPrice
                    break;
                case 3:
                    type = '自定义'
                    break;
            }
        }
        let end = '';
        if (!Utils.isErrValue(actEnd) && actEnd > data.awardSkuEnd) {
            end = '活动截止时间超过奖品有效期' + Utils.formatTime2Str(data.awardSkuEnd,'yyyy-MM-dd');
        } else {
            end = '有效期至' + Utils.formatTime2Str(data.awardSkuEnd,'yyyy-MM-dd');
        }
        return (
            <div className="sad-row d-flex flex-row flex-nowrap align-items-center">
                <div className="sad-row-col" onClick={()=>{viewCall && viewCall(data)}}>
                    <div className="sad-icon"><img src={data.awardImg} /></div>
                </div>
                <JRSpace/>
                <div className="col" onClick={()=>{viewCall && viewCall(data)}}>
                    <div className="title" style={{lineHeight: '15px'}}>{data.awardSkuName}</div>
                    <JRSpace className="title-space"/>
                    <div className="desc">{end}</div>
                    <JRSpace className="desc-space"/>
                    <div className="desc">{data.awardSkuFrom}</div>
                </div>
                <div className="sad-row-col-desc ca-tc btn-status" onClick={()=>{viewCall && viewCall(data)}}>
                    {type}
                </div>
                <div className="sad-row-col-desc ca-tc">
                    <div className="btn-buy" onClick={()=>{
                        addCall&&addCall(data)
                    }}>添加</div>
                </div>
            </div>
        )
    }
}
