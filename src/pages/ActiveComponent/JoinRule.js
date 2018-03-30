import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JRHeader from '../CommonComponents/JRHeader'

import '../../css/style.css';
import '../../css/ActiveComponent.css';

export default class JoinRule extends Component {

  static propTypes = {
      data: PropTypes.object,
  }

  render() {

    let {
      data
    } = this.props

    return (
      <div className="ac_rule">
        <JRHeader title="参与规则" line/>
        <div className="media">
          <div>
          {
            data.map((value, idx) => {
                return (
                  <p index={idx} key={idx} className="text-right ac_margin_20">{`${value.key}：`}&nbsp;</p>
                )
            })
          }
          </div>
          <div className="media-body">
            {
              data.map((value, idx) => {
                  return (
                    <p index={idx} key={idx} className="ac_margin_20">{value.value}</p>
                  )
              })
            }
          </div>
        </div>

        <div style={{marginBottom: 35}}></div>
      </div>
    )
  }
}
