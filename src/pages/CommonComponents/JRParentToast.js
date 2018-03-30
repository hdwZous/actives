import {Component} from 'react';
// import PropTypes from 'prop-types';
import { Modal} from 'antd';
import {showModal} from './public'
// import JRMessage from './JRMessage'

export default class JRParentToast extends Component {

  static showModal = (content) => {
    // JRMessage.showMessage(content)
      if (window.self != window.top) {
          showModal(content)
      } else {
          Modal.warning({
              title: '温馨提示',
              content: content,
          });
      }
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
