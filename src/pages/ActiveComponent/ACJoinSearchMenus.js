import React, {Component} from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import JRSpace from '../CommonComponents/JRSpace';
import BaseInput from '../CommonComponents/BaseInput';
import JRButton from '../CommonComponents/JRButton';

import '../../css/style.css';
import '../../css/ActiveComponent.css';

const Option = Select.Option;

export default class ACJoinSearchMenus extends Component {

  static propTypes = {
      data: PropTypes.object,
      onSearch: PropTypes.func,
  }

  constructor(props) {
    super(props);

    let {
      data
    } = props

    // this.state = {
    //   data: data ? data : null,
    //   type: data ? data[0].index : null
    // };
  }

  onChange =(value) => {
    this.state.type = value
  }

  onSearch = ()=> {
    let {
      onSearch
    } = this.props

    onSearch && onSearch({
      pin: this.refs.ref_pin.state.value,
      name: this.refs.ref_name.state.value,
      phone: this.refs.ref_phone.state.value,
      // type: this.state.type
    })
  }

  render() {

    // let {
    //   data,
    //   type
    // } = this.state

    return (
      <div className="ac_join_search_menus d-flex align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <p>京东PIN</p>
          <JRSpace className="cm_space_10"/>
          <BaseInput ref="ref_pin" className="cm_input" type="text"/>

          <JRSpace className="cm_space_40"/>
          <p>姓名</p>
          <JRSpace className="cm_space_10"/>
          <BaseInput ref="ref_name" className="cm_input" type="text"/>

          <JRSpace className="cm_space_40"/>
          <p>手机号</p>
          <JRSpace className="cm_space_10"/>
          <BaseInput ref="ref_phone" className="cm_input" type="text"/>

          <JRSpace className="cm_space_40"/>
          {/* <p>用户状态</p>
          <JRSpace className="cm_space_10"/>
          <Select defaultValue={type} onChange={this.onChange}>
            {
              data && data.map((value, idx) => {
                  return (
                    <Option index={idx} key={idx} value={value.index}>{value.value}</Option>
                  )
              })
            }
          </Select> */}
        </div>

        <JRButton className="ac_btn" type={JRButton.BUTTON_TYPE.BLUE} title="查询" onClick={this.onSearch}/>
      </div>
    )
  }
}
