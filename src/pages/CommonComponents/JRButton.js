import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../css/style.css';

export default class JRButton extends Component {

  static propTypes = {
      click: PropTypes.func,
      type: PropTypes.number,
      title: PropTypes.string,
      shadow: PropTypes.bool,
  }

  static defaultProps = {
      type: 0,
      shadow: true,
  }

  static BUTTON_TYPE = {
    NORMAL: 0,
    BLUE: 1,
    CUSTOM: 2
  }

  render() {

    let {
      title,
      click,
      type,
      shadow,
      className: pClassName,
      ...other
    } = this.props

    let className = ''

    switch (type) {
      case JRButton.BUTTON_TYPE.NORMAL:
        className = 'btn btn-outline-secondary my-outline-secondary '
        break;
      case JRButton.BUTTON_TYPE.BLUE:
        if (shadow) {
          className = 'btn btn-primary my-primary '
        } else {
          className = 'btn btn-primary my-primary-noShadow '
        }
        break;
      default:

    }

    className += pClassName

    return (
      <button type="button" className={className} {...other}>{title}</button>
    )
  }
}
