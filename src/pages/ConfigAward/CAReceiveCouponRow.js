import React, {Component} from 'react';
import PropTypes from 'prop-types';

import IconPlus from '../CommonComponents/IconPlus';
import IconMinus from '../CommonComponents/IconMinus';
import JRSpace from '../CommonComponents/JRSpace';
import Public from '../CommonComponents/JRPublic';

import '../../css/style.css';

export default class CAReceiveCouponRow extends Component {

  static propTypes = {
      index: PropTypes.number.isRequired,
      setCallback: PropTypes.func,
      uploadImageClick: PropTypes.func,
  }

  static defaultProps = {
      setCallback: null,
  }

  constructor(props) {
      super(props);

      let {
        data
      } = props;

      this.state = {
        data: data
      }

  }

  click = ()=> {
    let {
      setCallback,
      index
    } = this.props

    setCallback && setCallback(index)
  }

  isOK = ()=> {
    return '请设置优惠券'
  }

  uploadImageClick = ()=> {
    let {
      index,
      uploadImageClick
    } = this.props

    uploadImageClick && uploadImageClick(index)
  }

  render() {

    let {
      index,
      showType,
      data,
    } = this.props

    return (
      <div className="ca-row d-flex flex-row flex-nowrap align-items-center">
        <div className="ca-col1"><p style={{'WebkitBoxOrient': 'vertical'}}>{data.awardSkuName}</p></div>
        <JRSpace/>
        <div className="ca-col2"><a onClick={this.uploadImageClick}><div className="img"><img src={data.awardImg ? data.awardImg : ''} alt=""/></div></a></div>
        <JRSpace/>
        <div className="ca-col3">
          <div className='d-flex flex-row flex-nowrap align-items-center' style={{width: 500}}>
            <p>优惠券需要设置券面信息，请前往&nbsp;</p>
            <div className='cm_a'>
              <a onClick={this.click}>
                <p>设置优惠券</p>
              </a>
            </div>
          </div>
        </div>
        <JRSpace/>
        <div className="ca-col4"></div>
        <JRSpace/>
        <div className="ca-col5"></div>
        <JRSpace/>
        <div className="ca-col6"></div>
        <JRSpace/>
        <div className="ca-col7"></div>
      </div>
    )
  }
}
