import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BaseInput from '../CommonComponents/BaseInput';
import JRSpace from '../CommonComponents/JRSpace';
import RedStar from '../CommonComponents/RedStar';

import '../../css/style.css';
import '../../css/sr.css';

const DAY_MORE_INDEX = 0
const MORE_INDEX = 1
const SHARE_INDEX = 2

export default class SRJoinRule extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  constructor (props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  //输入框里面的内容变了修改当前的state的值
  onBlur = (input)=> {
    let {
      data
    } = this.state

    let {
      value
    } = input.state

    switch (input.props.index) {
      case DAY_MORE_INDEX:
        data.countPerdayForEveryone = value
        break;
      case MORE_INDEX:
        data.countTotalForEveryone = value
        break;
      case SHARE_INDEX:
        data.countExtendForShare = value
        break;
      default:
    }

    this.setState({
      data: data
    })

  }

  render() {

    let {
      data
    } = this.state

    return (
      <div className="sr_page">

        <div className="media">
          <p className="sr_title text-right"><RedStar/>每人每天最多参与：</p>
          <div className="media-body">
            <BaseInput index={DAY_MORE_INDEX} className="cm_input" value={data.countPerdayForEveryone} type="text" label="次" onBlur={this.onBlur} isnumber/>
          </div>
        </div>

        <div className="media">
          <p className="sr_title text-right"><RedStar/>每人最多参与：</p>
          <div className="media-body">
            <BaseInput index={MORE_INDEX} className="cm_input" value={data.countTotalForEveryone} type="text" label="次" onBlur={this.onBlur} isnumber/>
          </div>
        </div>

        <div className="media">
          <p className="sr_title text-right">分享增加参与次数：</p>
          <div className="media-body d-flex flex-row">
            <BaseInput index={SHARE_INDEX} className="cm_input" value={data.countExtendForShare} type="text" label="次" onBlur={this.onBlur} isnumber/>
            <JRSpace className="cm_space_10"/>
            <p className='cm_red_color'>投放渠道在微信和京东体系，该设置才能生效</p>
          </div>
        </div>
      </div>
    )
  }
}
