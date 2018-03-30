import React, {Component} from 'react';
import { DatePicker, Select } from 'antd';

import JRSpace from '../CommonComponents/JRSpace';
import RISSearch from '../RightInterestShop/RISSearch';
import PropTypes from 'prop-types';

import '../../css/style.css';
import '../../css/risStyle.css';

const Option = Select.Option;
const { RangePicker } = DatePicker;

export default class CASection extends Component {
    static propTypes = {
        funcSelectCall:PropTypes.func,
        funcCalendarCall:PropTypes.func,
        funcViewCall:PropTypes.func,
        funcChangeCall:PropTypes.func
    }

    render() {
        let {
            funcSelectCall,
            funcCalendarCall,
            funcViewCall,
            funcChangeCall
        } = this.props;
        return (
            <div className="ris-search d-flex flex-row flex-nowrap align-items-center">
                <p className="ca-col0">名称</p>
                <JRSpace className="ris-col2"/>
                <div className="ris-col1"><RISSearch placeholder={"输入奖品名称"} inputChange={funcChangeCall && funcChangeCall}/></div>
                <JRSpace className="ris-col4"/>
                <p className="ca-col0">类型</p>
                <JRSpace className="ris-col2"/>
                <Select className="ris-col1 fontSize_14" onChange={funcSelectCall && funcSelectCall} placeholder={"选择广告计划"} optionFilterProp="children">
                    <Option value="全部">全部</Option>
                    <Option value="免费">免费</Option>
                    <Option value="收费">收费</Option>
                </Select>
                <JRSpace className="ris-col2"/>
                <p className="ca-col1">上架时间</p>
                <JRSpace className="ris-col2"/>
                <RangePicker className="ris-col1 dd fontSize_14 big" style={{width:'250px'}} onChange={funcCalendarCall && funcCalendarCall} placeholder={['开始日期', '结束日期']} />

                <JRSpace/>
                <div className="col ca-tc">
                    <div className="ris-btn-view" onClick={()=>{
                        funcViewCall && funcViewCall()
                    }}>查询</div>
                </div>
            </div>
        )
    }
}
