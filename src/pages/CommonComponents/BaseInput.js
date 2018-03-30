import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Utils from '../../Utils';

import '../../css/style.css';

export default class BaseInput extends Component {

  static propTypes = {
      label: PropTypes.string,
      placeholder: PropTypes.string,
      disabled: PropTypes.bool,
      showGrey: PropTypes.bool,
      isnumber: PropTypes.bool,
      fixed: PropTypes.number,
      isactived: PropTypes.bool,
  }

  static defaultProps = {
      label:'',
      placeholder: '',
      disabled: false,
      showGrey: false,
      isnumber: false,
      isactived: false,
      fixed: 0
  }

  constructor(props) {
      super(props);
      
      let {
        value,
      } = props;
      this.state = {
        value: value,
        changed: false
      };
      this.handleChange = this.handleChange.bind(this);
  }

  onBlur = ()=> {
    let {
      isnumber,
      fixed,
      onBlur
    } = this.props;

    let {
      value
    } = this.state;

    if (isnumber) {
      value = Utils.formatNoneNumber(value)
      value = Utils.formatNumber(value, fixed)

      this.setState({
        value: value,
        changed: false
      }, ()=> {
        onBlur && onBlur(this)
      });

    } else {
      onBlur && onBlur(this)
    }

    this.setState({
      isactived: false
    })

  }

  onFocus = ()=> {
    let {
      onFocus
    } = this.props

    onFocus && onFocus(this)

    this.setState({
      isactived: true
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      changed: true
    });
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        let {
          value,
          isnumber,
          fixed
        } = nextProps;

        if (isnumber) {
          value = Utils.format3Number(value, fixed)
        }

        this.setState({value: value});
      }
  }

  render() {

    let {
      label,
      disabled,
      placeholder,
      showGrey,
      isnumber,
      fixed,
      className: pClassName,
      onBlur,
      onFocus,
      value: value1,
      ...other
    } = this.props;

    let {
      value,
      changed,
      isactived
    } = this.state

    let cls = pClassName + " base-input media" + (showGrey ? " ca-greyBg fa-grey" : "");

    if (isactived) {
      cls += ' active'
    }

    if (isnumber) {
      cls += ' font_family_ArialMT'
    }

    if (disabled) {
      cls += ' unHover'
    }

    if (isnumber && changed === false) {
      value = Utils.formatNoneNumber(value)
      value = Utils.format3Number(value, fixed)
    }

    return (
      <div className={cls}>
        <div className="media-body">
          <input
          disabled={disabled}
          value={value}
          onChange={this.handleChange}
          placeholder={placeholder}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          {...other}>
          </input>
        </div>
        {
          label && label.length ? <div className="label d-flex align-items-center"><p>{label}</p></div> : undefined
        }
      </div>
    )
  }
}
