import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../css/alert.css';
import '../../css/style.css';

export default class Alert extends Component {

  static propTypes = {
      title: PropTypes.string,
      content: PropTypes.string,
  }

  render() {

    let {
      title,
      content,
      children
    } = this.props;

    return (
      <div className="jr_alert_bg d-flex justify-content-center align-items-center">
        <div className="jr_alert">
          <div className="media" style={{margin: '40px 40px 30px 40px'}}>
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            <div className="media-body">
              <p className="jr_alert_title">{title}</p>
              <p className="jr_alert_content">{content}</p>
            </div>
          </div>
          <div className="jr_alert_bottom_bar d-flex justify-content-end align-items-center">
            {

                React.Children.map(children, (value, idx) => {
                    return (
                      <div index={idx} key={idx}>
                        {value}
                      </div>
                    )
                })
            }
          </div>
        </div>
      </div>
    )
  }
}
