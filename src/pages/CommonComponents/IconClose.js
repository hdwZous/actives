import React, {Component} from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

export default class IconClose extends Component {

    static propTypes = {
        callBack:PropTypes.func
    }

  click = ()=> {
      let {
          callBack
      } = this.props;
      callBack && callBack();
  }

  render() {

    let { className: pClassName } = this.props

    return (
      <a onClick={this.click}><div className={classNames('cm_close', pClassName)} aria-hidden="true" style={{width: 16, height: 16}}></div></a>
    )
  }

}
