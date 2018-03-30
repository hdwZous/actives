import React, {Component} from 'react';
import PropTypes from 'prop-types';

import IconPlus from '../CommonComponents/IconPlus';
import IconMinus from '../CommonComponents/IconMinus';
import JRSpace from '../CommonComponents/JRSpace';
import Public from '../CommonComponents/JRPublic';
import Utils from '../../Utils';

import '../../css/style.css';

export default class CACouponRow extends Component {

  static propTypes = {
      index: PropTypes.number.isRequired,
      showType: PropTypes.number,
      deleteCallback: PropTypes.func,
      addCallback: PropTypes.func,
      setCallback: PropTypes.func,
      uploadImageClick: PropTypes.func,
  }

  static defaultProps = {
      showType: 0,
      deleteCallback: null,
      addCallback: null,
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
      deleteCallback,
      addCallback
    } = this.props

    let showDelete = false
    let showAdd = false

    switch (showType) {
      case Public.ICON_SHOW_TYPE.SHOW_ALL:
        showDelete = true
        showAdd = true
        break;
      case Public.ICON_SHOW_TYPE.SHOW_DELETE:
        showDelete = true
        break;
      case Public.ICON_SHOW_TYPE.SHOW_ADD:
        showAdd = true
        break;
      default:
    }

    return (
      <div className="ca-row d-flex flex-row flex-nowrap align-items-center">
        <p className="ca-col0"><span>*</span>{index + 1}</p>
        <JRSpace/>
        <div className="ca-col1"><p style={{'WebkitBoxOrient': 'vertical'}}>{data.awardSkuName}</p></div>
        <JRSpace/>
        {
          Utils.isErrValue(data.awardImg) ? <div className="ca-col2"><a onClick={this.uploadImageClick}><div className="img d-flex align-items-center justify-content-center"><div className="plus enable" style={{width: 30, height: 30}}/></div></a></div> :
          <div className="ca-col2"><a onClick={this.uploadImageClick}><div className="img"><img src={Utils.isErrValue(data.awardImg) ? '' : data.awardImg} alt=""/></div></a></div>
        }
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
        {
            showDelete ? <JRSpace/> : undefined
        }
        {
            showDelete ? (<IconMinus className="font14" click={()=>{
              if (deleteCallback) {
                deleteCallback(index)
              }
            }}/>) : undefined
        }
        {
            showAdd ? <JRSpace/> : undefined
        }
        {
            showAdd ? <IconPlus className="font14" click={()=>{
              if (addCallback) {
                addCallback(index)
              }
            }}/> : undefined
        }
      </div>
    )
  }
}
