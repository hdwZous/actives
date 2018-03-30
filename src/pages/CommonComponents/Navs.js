import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../css/style.css';

export default class Navs extends Component {

  static propTypes = {
      data: PropTypes.array.isRequired,
  }

  state = {
    index:0
  }

  click = (index)=> {
    this.setState({
      index: index
    })
  }

  render() {

    let { index } = this.state
    let { data } = this.props;

    return (
      <div>
        <ul className="nav nav-tabs">
          {
            data.map((value, idx) => {
                let className = 'nav-link '
                if (idx === index) {
                  className += 'active'
                }
                return (
                  <li className="nav-item" key={idx}>
                    <a className={className} onClick={()=>{this.click(idx)}}>{value.title}</a>
                  </li>
                )
            })
          }
        </ul>
        {data[index]['children']}
      </div>
    )
  }
}
