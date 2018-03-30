import React, {Component} from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

import '../../css/style.css';
import '../../css/risStyle.css';

export default class IconSearch extends Component {

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
      <a onClick={this.click}><i className={classNames("fa fa-search fa-grey ris-col3", pClassName)} aria-hidden="true"></i></a>
    )
  }
}
