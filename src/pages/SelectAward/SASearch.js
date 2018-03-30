import React, {Component} from 'react';

import IconSearch from '../CommonComponents/IconSearch';
import PropTypes from 'prop-types';

import '../../css/style.css';
import '../../css/selectAward.css';

export default class SASearch extends Component {

    static propTypes = {
        placeholder: PropTypes.string,
        inputChange:PropTypes.func,
        callBack:PropTypes.func
    }

    static defaultProps = {
        placeholder: ''
    }

    render() {

        let {
            placeholder,
            inputChange,
            callBack
        } = this.props;

        return (
            <div className="unHover base-input media align-items-center ca-tc" style={{border: 'none'}}>
                <IconSearch callBack={callBack} />
                <div className="media-body">
                    <input placeholder={placeholder} onChange={inputChange && inputChange} style={{border: 'none',background:'transparent'}} onKeyUp={(e) => {if (e.keyCode === 13) {callBack}}}>
                    </input>
                </div>
            </div>
        )
    }
}
