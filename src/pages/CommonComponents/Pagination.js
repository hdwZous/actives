import React, {Component} from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

import IconAngleLeft from './IconAngleLeft'
import IconAngleRight from './IconAngleRight'

import '../../css/style.css';

export default class Pagination extends Component {

  static propTypes = {
      index: PropTypes.number,
      total: PropTypes.number,
      click:PropTypes.func
  }

  static defaultProps = {
    index: 1,
    total: 0
  }

  render() {

    let {
    className: pClassName,
    index,
    total,
        click
    } = this.props

    if (total === 0) {
      return (<div></div>)
    }

    let divs = new Array()

    //先处理左箭头
    {
      let classname = "page-item "

      if (index === 1) {
        classname += 'disabled'
      }

      let div =
      <li className={classname}>
        <a className="page-link" onClick={()=>{
            click && click(index - 1)
        }}><IconAngleLeft/></a>
      </li>

      divs.push(div)
    }

    //处理中间的数
    {
      let showCount = 0
      let needAddEnd = false

      for (var i = 0; i < total; i++) {
        let classname = "page-item "
          let idx = i + 1
        if (index === i + 1) {
          classname += 'active'
        }

        if ( i + 1 === 2 && total > 6) {
          if (index - 2 > 2) {
            divs.push(<li className="page-item"><p className="more">...</p></li>)
            continue;
          }
        }

        if ( i + 1 === total - 1 && total > 6) {
          if (total - index > 2) {
            divs.push(<li className="page-item"><p className="more">...</p></li>)
            needAddEnd = true
            continue;
          }
        }

        if (showCount > 5) {
          if (needAddEnd) {
            let div = <li className={classname}><a className="page-link" onClick={()=>{
                click && click(idx)
            }}>{i + 1}</a></li>
            divs.push(div)
            needAddEnd = false
          }
          continue;
        }

        if (index - (i + 1) < 3 || total - (i + 1) < 4 || i + 1 === 1) {
          let div = <li className={classname}><a className="page-link" onClick={()=>{
              click && click(idx)
          }}>{i + 1}</a></li>
          divs.push(div)

          showCount++;
        }

      }
    }

    //处理右箭头
    {
      let classname = "page-item "

      if (index === total) {
        classname += 'disabled'
      }

      let div =
      <li className={classname}>
        <a className="page-link" onClick={()=>{
            click && click(index + 1)
        }}><IconAngleRight/></a>
      </li>

      divs.push(div)
    }

    return (
      <nav className={classNames(pClassName)} aria-label="...">
        <ul className="pagination  justify-content-end">
        {
            divs.map(function(div){
                return div
            })
        }

        </ul>
      </nav>
    )
  }
}
