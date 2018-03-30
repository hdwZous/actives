import React, {Component} from 'react';
import PropTypes from 'prop-types';

import IconPlus from '../CommonComponents/IconPlus';
import IconMinus from '../CommonComponents/IconMinus';
import JRSpace from '../CommonComponents/JRSpace';
import BaseInput from '../CommonComponents/BaseInput';
import Public from '../CommonComponents/JRPublic';

import '../../css/style.css';

export default class CASelectRow extends Component {

  static propTypes = {
      index: PropTypes.number.isRequired,
      showType: PropTypes.number,
      deleteCallback: PropTypes.func,
      addCallback: PropTypes.func,
      selectCallback: PropTypes.func,
  }

  static defaultProps = {
      showType: 0,
      deleteCallback: null,
      addCallback: null,
      selectCallback: null,
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
      selectCallback,
      index
    } = this.props

    selectCallback && selectCallback(index)
  }

  isOK = ()=> {
    return null
  }

  render() {

    let {
      index,
      showType,
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
      <div className="ca-row d-flex flex-row flex-nowrap align-items-center ca-select-row">
        <p className="ca-col0"><span>*</span>{index + 1}</p>
        <JRSpace/>
        <div className="ca-col1 cm_a"><a onClick={this.click}>选择奖品</a></div>
        <JRSpace/>
        <div className="ca-col2"><div className="img d-flex align-items-center justify-content-center"><div className="plus" style={{width: 30, height: 30}}/></div></div>
        <JRSpace/>
        <div className="ca-col3"><BaseInput className="font14" type="text" label="元" disabled status={'2'}/></div>
        <JRSpace/>
        <div className="ca-col4"><BaseInput className="font14" type="text" label="个" disabled status={'2'}/></div>
        <JRSpace/>
        <div className="ca-col5"><BaseInput className="font14" type="text" label="元" disabled status={'2'}/></div>
        <JRSpace/>
        <div className="ca-col6"><BaseInput className="font14" type="text" label="%" disabled status={'2'}/></div>
        <JRSpace/>
        <div className="ca-col7"><BaseInput className="font14" type="text" label="" disabled maxLength="6" status={'2'} placeholder="限制六个字"/></div>
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
