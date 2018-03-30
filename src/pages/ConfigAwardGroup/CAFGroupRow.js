import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import POST, {GET} from '../../NetWork'
import Api from '../../NetWork/Api'

import IconMinus from '../CommonComponents/IconMinus';
import IconPlus from '../CommonComponents/IconPlus';
import JRSpace from '../CommonComponents/JRSpace';
import BaseInput from '../CommonComponents/BaseInput';
import Public from '../CommonComponents/JRPublic';
import JRMessage from '../CommonComponents/JRMessage';
import Utils from '../../Utils';

import ConfigAwardGroup from '../ConfigAwardGroup';

import '../../css/style.css';
import '../../css/configAwardFixed.css';

const Option = Select.Option;
const USER_LIST = 'user_list';
const USER_LOWEST_PRICE = 'user_lowest_price';
const USER_HIGHEST_PRICE = 'user_highest_price';

export default class CAFGroupRow extends Component {

    static propTypes = {
        data: PropTypes.object,
        index: PropTypes.number.isRequired,
        showType: PropTypes.number,
        deleteCallback: PropTypes.func,
        addCallback: PropTypes.func,
        onBlur: PropTypes.func,
    }

    static defaultProps = {
        showType: 0,
        deleteCallback: null,
        addCallback: null,
    }

    constructor(props) {
        super(props);

        let {
            data,
            index
        } = props;

        this.state = {
            data: data,
            open: false,
            userList:data.jdUserTagPrices[index].jdUserTagId
,
            userValue:data.jdUserTagPrices[index].jdUserTagName,
            lowestPrice:data.jdUserTagPrices[index].lowestPrice,
            highestPrice:data.jdUserTagPrices[index].highestPrice,
            showRefreshBtn: false
        }

    }

    onChange = (item)=> {
        let {
            data,
            userValue,
            lowestPrice,
            highestPrice
        } = this.state;// item切换不对highestPrice赋值
        if (data && data.jdUserTagList) {
            data.jdUserTagList.map((value, idx) => {
                if (value && value.index === item) {
                    userValue = value.value;
                }
            })
        }
        if (data && data.jdUserTagPrices) {
            data.jdUserTagPrices.map((value, idx) => {
                if (value && value.jdUserTagId === item) {
                    highestPrice = value.highestPrice;
                    lowestPrice = value.lowestPrice;
                }
            })
            let {
                index
            } = this.props;
            if (index < data.jdUserTagPrices.length) {
                let itemData = data.jdUserTagPrices[index];
                if (!itemData.jdUserTagId) {
                    itemData.highestPrice = highestPrice;
                    itemData.lowestPrice = lowestPrice;
                }
                itemData.jdUserTagId = item;
                itemData.jdUserTagName = userValue;
            }
        }
        this.setState({
            data:data,
            userList:item,
            userValue:userValue,
            // highestPrice:highestPrice
        })
    }

    onBlur = (input)=> {
        let {
            data,
            userList,
            lowestPrice,
            highestPrice
        } = this.state;

        if (input instanceof Object) {
            if (input.props.index === USER_LOWEST_PRICE) {
                lowestPrice = input.state.value;
            } else if (input.props.index === USER_HIGHEST_PRICE) {
                highestPrice = input.state.value;
            }

            let {
                index
            } = this.props;
            if (data && data.jdUserTagPrices && index < data.jdUserTagPrices.length) {
                let item = data.jdUserTagPrices[index];
                if (userList) {
                    item.jdUserTagId = userList;
                }
                item.lowestPrice = lowestPrice;
                item.highestPrice = highestPrice;
            }

            this.setState({
                data: data,
                lowestPrice: lowestPrice,
                highestPrice: highestPrice
            })
        } else {
            // if (data && data.jdUserTagPrices) {
            //     data.jdUserTagPrices.map((value, idx) => {
            //         if (value && value.jdUserTagId === userList) {
            //             lowestPrice = value.lowestPrice;
            //             highestPrice = value.highestPrice;
            //         }
            //     })
            // }
            //
            // this.setState({
            //     lowestPrice:lowestPrice,
            //     highestPrice:highestPrice
            // })
        }
    }

    funcShowRefresh = (isRefresh)=> {
        this.setState({
            showRefreshBtn: isRefresh
        })
    }

    createGroupClick = ()=> {
        this.funcShowRefresh(true);
    }

    refreshClick = ()=> {
        POST(Api.GET_ACTIVE_RULE_REFRESH, {
            actKey: this.props.match.params.actKey,
            eventID: this.props.match.params.eventID,
        }, (res)=> {

            let {
                data
            } = this.state

            data.jdUserTagList = res.data

            // if (Utils.isErrValue(data.jdUserTag) && res.data) {
            //     data.jdUserTag = res.data[0].index
            // }

            this.setState({
                data: data,
                showRefreshBtn: false
            })

            this.refs.myTextInput.rcSelect.setOpenState(true)
        }, (err)=> {
            this.funcShowRefresh(false);

            this.refs.myTextInput.rcSelect.setOpenState(true)
        })
    }

    render() {
        let {
            index,
            showType,
            deleteCallback,
            addCallback
        } = this.props;
        let {
            data,
            open,
            userList,
            userValue,
            lowestPrice,
            highestPrice,
            showRefreshBtn
        } = this.state;
        if (!data) {
            return(null);
        }
        let tagList, tagPrices;
        tagList = data.jdUserTagList;
        tagPrices = data.jdUserTagPrices;
        if (tagPrices && index < tagPrices.length) {
            let itemPrice = tagPrices[index];
            if (!userList && itemPrice.jdUserTagId) {
                userList = itemPrice.jdUserTagId;
            }
            if (lowestPrice === undefined && itemPrice.lowestPrice) {
                lowestPrice = itemPrice.lowestPrice;
            }
            if (highestPrice === undefined && itemPrice.highestPrice) {
                highestPrice = itemPrice.highestPrice;
            }
            if (tagList) {
                tagList.map((value, idx) => {
                    if (!userValue && value && itemPrice.jdUserTagId && value.index === itemPrice.jdUserTagId) {
                        userValue = value.value;
                    }
                })
            }
        }
        if (!lowestPrice) {
            lowestPrice = '';
        }
        if (!highestPrice) {
            highestPrice = '';
        }

        let showDelete = false;
        let showAdd = false;

        switch (showType) {
            case Public.ICON_SHOW_TYPE.SHOW_ALL:
                showDelete = true
                showAdd = true
                break;
            case Public.ICON_SHOW_TYPE.SHOW_DELETE:
                showDelete = true
                break;
            case Public.ICON_SHOW_TYPE.SHOW_ADD:
                showAdd = true
                break;
            default:
        }

        return (

            <div className="media cm_row">
                <p className="caf_title text-right">{`人群标签${index + 1}：`}</p>
                <div className="media-body d-flex flex-row align-items-center">

                    <Select ref="myTextInput" value={userValue} open={open} placeholder="选择用户群" onChange={this.onChange} onSelect={this.onSelect} onDeselect={this.onDeselect} index={USER_LIST} onBlur={this.onBlur} onFocus={this.onFocus}>
                        <Option value={1} disabled><div className="cm_a"><a href={data.toNewUserTagUrl} target="_blank" onClick={this.createGroupClick}><p>+ 新建人群标签</p></a></div></Option>
                        {
                            tagList && tagList.map((value,idx) =>  {
                                return(<Option key={`caf${idx}`} value={value.index}>{value.value}</Option>)
                            })
                        }
                    </Select>
                    {
                        showRefreshBtn ? <a className="cm_absolute_full" onClick={this.refreshClick}></a> : undefined
                    }
                    <JRSpace/>
                    <p>出价区间</p>
                    <JRSpace className="cm_space_10"/>
                    <BaseInput isnumber fixed={2} className="cm_input" type="text" label="元" index={USER_LOWEST_PRICE} onBlur={this.onBlur} value={lowestPrice} label={data.award.awardSkuUnit} fixed={data.award.awardDigit}/>
                    <JRSpace className="cm_space_10"/>
                    <p>至</p>
                    <JRSpace className="cm_space_10"/>
                    <BaseInput isnumber fixed={2} className="cm_input" type="text" label="元" index={USER_HIGHEST_PRICE} onBlur={this.onBlur} value={highestPrice} label={data.award.awardSkuUnit} fixed={data.award.awardDigit}/>

                    {
                        showDelete ? <JRSpace/> : undefined
                    }
                    {
                        showDelete ? (<IconMinus className="font14" click={()=>{
                            if (deleteCallback) {
                                deleteCallback(index)
                            }

                            //this.refs.myTextInput.rcSelect.setOpenState(true)


                        }}/>) : undefined
                    }
                    {
                        showAdd ? <JRSpace/> : undefined
                    }
                    {
                        showAdd ? <IconPlus className="font14" click={()=>{
                            if (addCallback) {
                                addCallback(index)
                            }
                        }}/> : undefined
                    }
                </div>

            </div>
        )
    }
}
