import React, {Component} from 'react';

import IconSearch from '../CommonComponents/IconSearch';
import PropTypes from 'prop-types';

import '../../css/style.css';
import '../../css/risStyle.css';

export default class RISSearch extends Component {

    static propTypes = {
        placeholder: PropTypes.string,
        inputChange:PropTypes.func
    }

    static defaultProps = {
        placeholder: ''
    }

    render() {

        let {
            placeholder,
            inputChange
        } = this.props;

        return (
            <div className="base-input media align-items-center ca-tc">
                <IconSearch />
                <div className="media-body">
                    <input placeholder={placeholder} onChange={inputChange && inputChange}>
                    </input>
                </div>
            </div>
        )
    }
}

