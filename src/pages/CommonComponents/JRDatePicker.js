import React, {Component} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment'
// import DatePicker from 'react-datetime'
import { DatePicker } from 'antd';

import 'react-datetime/css/react-datetime.css';
import '../../css/style.css';


require('moment/locale/zh-cn');

export default class JRDatePicker extends Component {

  render() {

    let {
      placeholder,
      className,
      ...other
    } = this.props

    return (
      <div style={{position: 'relative'}} className={className}>
        <DatePicker showTime placeholder={placeholder} format='YYYY-MM-DD HH:mm:ss' {...other}/>
        {/* <span className="ant-calendar-picker-icon"></span> */}
      </div>
    )
  }
}
