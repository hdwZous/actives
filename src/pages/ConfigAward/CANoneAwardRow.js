import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JRSpace from '../CommonComponents/JRSpace';
import BaseInput from '../CommonComponents/BaseInput';
import Utils from '../../Utils';

import '../../css/style.css';

export default class CANoneAwardRow extends Component {

  static propTypes = {
      data: PropTypes.object,
      uploadImageClick: PropTypes.func,
  }

  constructor(props) {
      super(props);

      let {
        data
      } = props;

      // if (Utils.isErrValue(data.awardDesc)) {
      //   data.awardDesc = ''
      // }

      this.state = {
        data: data
      }

  }

  uploadImageClick = ()=> {
    let {
      uploadImageClick
    } = this.props

    uploadImageClick && uploadImageClick()
  }

  onBlur = (input)=> {
    let {
      data
    } = this.state

    let {
      value
    } = input.state

    data.awardDesc = value

    this.setState({
      data: data
    })

  }

  render() {

    let {
      data
    } = this.state

    return (

      <div className="ca-row d-flex flex-row flex-nowrap align-items-center ca-select-row">
        <p className="cm_star font_family_PingFangSC_Regular">无奖品</p>
        <JRSpace/>
        {
          Utils.isErrValue(data.awardImg) ? <div className="ca-col2"><a onClick={this.uploadImageClick}><div className="img d-flex align-items-center justify-content-center"><div className="plus enable" style={{width: 30, height: 30}}/></div></a></div> :
          <div className="ca-col2"><a onClick={this.uploadImageClick}><div className="img"><img src={Utils.isErrValue(data.awardImg) ? '' : data.awardImg} alt=""/></div></a></div>
        }
        <JRSpace/>
        <div style={{width: 260}}><BaseInput className="font14" type="text" value={Utils.isErrValue(data.awardDesc) ? '' : data.awardDesc} maxLength="6"  placeholder="限制六个字" onBlur={this.onBlur}/></div>
      </div>
    )
  }
}
