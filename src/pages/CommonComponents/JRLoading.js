import React, {Component} from 'react';
import Spinner from 'react-spinkit'

import '../../css/loading.css';

export default class JRLoading extends Component {

  render() {
    return (
      <div className="cm_loading d-flex justify-content-center align-items-center">
        <Spinner className="circle" />
      </div>
    )
  }
}
