import React, {Component} from 'react';

import IconArrowDown from '../CommonComponents/IconArrowDown';
import IconCalendar from '../CommonComponents/IconCalendar';
import PropTypes from 'prop-types';

import '../../css/style.css';
import '../../css/risStyle.css';

export default class RISInputDialog extends Component {

    static propTypes = {
        placeholder:PropTypes.string,
        callback:PropTypes.func,
        type:PropTypes.string
    }

    static defaultProps = {
        placeholder:'',
        callback: {},
        type:''
    }

    render() {

        let {
            placeholder,
            callback,
            type
        } = this.props;

        let icon;
        switch (type) {
            case '1':
                icon = <div onClick={callback && callback}><IconArrowDown /></div>;
                break;
            case '2':
                icon = <div onClick={callback && callback}><IconCalendar/></div>;
                break;
        }
        return (
            <div className="base-input media align-items-center ca-tc">
                <div className="media-body">
                    <input placeholder={placeholder}>
                    </input>
                </div>
                {icon}
            </div>
        )
    }
}
