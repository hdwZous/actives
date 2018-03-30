import React, {Component} from 'react';
import JRSpace from '../CommonComponents/JRSpace';
import '../../css/style.css';

export default class SASection extends Component {

    render() {
        return (
            <div className="sad-section d-flex flex-row flex-nowrap ca-greyBg align-items-center">
                <p className="sad-row-col">配图</p>
                <JRSpace/>
                <p className="col">奖品名称</p>
                <p className="sad-row-col-desc ca-tc">奖品金额（元）</p>
                <p className="sad-row-col-desc ca-tc">操作</p>
            </div>
        )
    }
}
