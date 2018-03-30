import {Component} from 'react';
// import PropTypes from 'prop-types';
import { message} from 'antd';

export default class JRMessage extends Component {

  static showMessage = (content) => {
      message.info(content);
  }

  // state = { visible: false, content:"" }
  //
  // showModal = (content) => {
  //   this.setState({
  //     visible: true,
  //     content: content
  //   });
  // }
  //
  // handleCancel = (e) => {
  //   this.setState({
  //     visible: false,
  //   });
  // }
  //
  // render() {
  //
  //   let {
  //     content
  //   } = this.state
  //
  //   return (
  //     <div>
  //       <Modal
  //         title="温馨提示"
  //         visible={this.state.visible}
  //         onCancel={this.handleCancel}
  //       >
  //         <p>{content}</p>
  //       </Modal>
  //     </div>
  //   );
  // }

}
