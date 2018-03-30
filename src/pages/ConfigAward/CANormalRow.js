import React, {Component} from 'react';
import PropTypes from 'prop-types';

import IconMinus from '../CommonComponents/IconMinus';
import IconPlus from '../CommonComponents/IconPlus';
import JRSpace from '../CommonComponents/JRSpace';
import BaseInput from '../CommonComponents/BaseInput';
import Public from '../CommonComponents/JRPublic';
import Utils from '../../Utils';

import '../../css/style.css';

const PRICE_INDEX = 0
const NUMBER_INDEX = 1
const TOTAL_INDEX = 2
const RATE_INDEX = 3
const SHOW_NAME_INDEX = 4

export default class CANormalRow extends Component {

  static propTypes = {
      data: PropTypes.object,
      index: PropTypes.number.isRequired,
      isFixed: PropTypes.bool,
      showType: PropTypes.number,
      deleteCallback: PropTypes.func,
      addCallback: PropTypes.func,
      nameClick: PropTypes.func,
      uploadImageClick: PropTypes.func,
      onBlur: PropTypes.func,
  }

  static defaultProps = {
      showType: 0,
      deleteCallback: null,
      addCallback: null,
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

  onBlur = (input)=> {

    let {
      data
    } = this.state

    let {
      onBlur
    } = this.props

    let {
      value
    } = input.state

    switch (input.props.index) {
      case PRICE_INDEX:
        value = Utils.formatNoneNumber(value)
        data.awardPerPrice = value

        this.updateTotalPrice()
        break;
      case NUMBER_INDEX:
        value = Utils.formatNoneNumber(value)
        data.awardCount = value

        this.updateTotalPrice()
        break;
      case TOTAL_INDEX:
        break;
      case RATE_INDEX:
        value = Utils.formatNoneNumber(value)
        data.awardRate = value

        onBlur && onBlur()
        break;
      case SHOW_NAME_INDEX:
        data.awardShowName = value
        break;
      default:

    }

    data.awardTotalPrice = data.awardPerPrice * data.awardCount

    this.setState({
      data: data
    })

  }

  updateTotalPrice = ()=> {

    let {
      data
    } = this.state

    if (Utils.isCorrectValue(data.awardPerPrice) && Utils.isCorrectValue(data.awardCount)) {
      data.awardTotalPrice = data.awardPerPrice * data.awardCount
    } else {
      data.awardTotalPrice = 0
    }
  }

  isOK = ()=> {

    let {
      data
    } = this.state

    let {
      isFixed
    } = this.props

    if (data.awardImg === null) {
      return '请选择奖品图片'
    }

    if (isFixed === false) {
      if (data.awardPerPrice === null || data.awardPerPrice === 0 || data.awardPerPrice.length === 0) {
        return '请填写正确的奖品面额'
      }
    }

    if (data.awardCount === null || data.awardCount === 0 || data.awardCount.length === 0) {
      return '请填写正确的奖品数量'
    }

    if (data.awardRate === null || data.awardRate === 0 || data.awardRate.length === 0) {
      return '请输入正确的奖品中奖率'
    }

    if (data.awardShowName === null || data.awardShowName.length === 0) {
      return '请填写奖品显示名称'
    }

    return null
  }

  nameClick = ()=> {
    let {
      index,
      nameClick
    } = this.props

    nameClick && nameClick(index)
  }

  uploadImageClick = ()=> {
    let {
      index,
      uploadImageClick
    } = this.props

    uploadImageClick && uploadImageClick(index)
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.state.data = nextProps.data

    return true
  }

  render() {

    let {
      index,
      isFixed,
      showType,
      deleteCallback,
      addCallback
    } = this.props

    let {
      data
    } = this.state

    this.updateTotalPrice()

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
      <div className="ca-row d-flex flex-row flex-nowrap align-items-center ca-select-row">
        <p className="ca-col0"><span>*</span>{index + 1}</p>
        <JRSpace/>
        {
          data.awardConfigType === 4 ? <div className="ca-col1 cm_a"><a onClick={this.nameClick}><p style={{'WebkitBoxOrient': 'vertical'}}>{data.awardSkuName}</p></a></div> : <div className="ca-col1"><p style={{'WebkitBoxOrient': 'vertical'}}>{data.awardSkuName}</p></div>
        }
        <JRSpace/>
        {
          Utils.isErrValue(data.awardImg) ? <div className="ca-col2"><a onClick={this.uploadImageClick}><div className="img d-flex align-items-center justify-content-center"><div className="plus enable" style={{width: 30, height: 30}}/></div></a></div> :
          <div className="ca-col2"><a onClick={this.uploadImageClick}><div className="img"><img src={Utils.isErrValue(data.awardImg) ? '' : data.awardImg} alt=""/></div></a></div>
        }
        <JRSpace/>
        <div className="ca-col3"><BaseInput className="font14" type="text" index={PRICE_INDEX} isnumber fixed={2} value={Utils.isCorrectValue(data.awardPerPrice) ? data.awardPerPrice : ''} label="元" disabled={isFixed} showGrey={isFixed} onBlur={this.onBlur}/></div>
        <JRSpace/>
        <div className="ca-col4"><BaseInput className="font14" type="text" index={NUMBER_INDEX} isnumber value={Utils.isCorrectValue(data.awardCount) ? data.awardCount : 0} label="个" onBlur={this.onBlur}/></div>
        <JRSpace/>
        <div className="ca-col5"><BaseInput className="font14" type="text" index={TOTAL_INDEX} isnumber fixed={2} value={Utils.isCorrectValue(data.awardPerPrice) && Utils.isCorrectValue(data.awardCount) ? data.awardPerPrice * data.awardCount : 0} label="元" disabled showGrey/></div>
        <JRSpace/>
        <div className="ca-col6"><BaseInput className="font14" type="text" index={RATE_INDEX} isnumber fixed={2} value={Utils.isCorrectValue(data.awardRate) ? data.awardRate : 0} label="%" onBlur={this.onBlur}/></div>
        <JRSpace/>
        <div className="ca-col7"><BaseInput className="font14" type="text" index={SHOW_NAME_INDEX} value={Utils.isString(data.awardShowName) ? data.awardShowName : ''} maxLength="6"  placeholder="限制六个字" onBlur={this.onBlur}/></div>

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
