import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JRBottomBar from '../CommonComponents/JRBottomBar';
import JRButton from '../CommonComponents/JRButton';
import Header from '../CommonComponents/Header';
import JRToast from '../CommonComponents/JRToast';
import IconClose from '../CommonComponents/IconClose';

import Post from '../../NetWork';
import Api from '../../NetWork/Api';

import '../../css/uploadImage.css';
import '../../css/style.css';
export default class UploadImage extends Component {

    constructor(props) {

        super(props);

        this.state = {
            imgUrl:undefined,
            dataUrl:'',
            file:''

        };
        // this.imgPreview = this.imgPreview.bind(this)

    }
  static propTypes = {
      index: PropTypes.number,
      callBack:PropTypes.func
  }
    imgPreview = (e)=>{

        var file = e.target.files[0];

        if (!file) {
            return;
        }
        var size = Math.floor(file.size / 1024);
        if (size > 20) {
            JRToast.showModal('图片大小不得超过20K');
            return;
        };
        this.funcParseImg(file);

    }

    funcParseImg = (file)=> {
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadstart = function(){
        };
        reader.onprogress = function(e){
        };
        reader.onabort = function(){
        };
        reader.onerror = function(){
        };
        reader.onload = function(){
        };
        reader.onloadend = function (e) {
            var dataURL = reader.result;
            this.setState({
                dataUrl:dataURL,
                file:file
            })
            this.funcUpdateBg();
        }.bind(this)
    }

    funcFetch = () => {
        let {
            index,
            callBack
        } = this.props;
        let {
            dataUrl,
            file
        } = this.state;
        if (!dataUrl) {
            JRToast.showModal('请选择图片');
            return;
        }
        let param = new FormData();
        param.append('multipartFile', file)
        Post(Api.GET_SHOP_UPLOAD, param, (res) => {
            if (res && res.code === 1) {
                callBack && callBack(index,res.data)
            }
        }, (err) => {

        })
    }

    funcUpdateBg = ()=> {
        this.refs.backG.style.backgroundImage = "url('')"
        this.refs.backG.style.borderColor = 'rgba(0,0,0,0)'
        this.refs.backG.style.borderStyle = 'none'
        this.refs.imgBorder.style.display = 'block'
        this.refs.imgUploaded.style.display = 'block'
    }

    render() {

      let {
          index,
          callBack
      } = this.props;

      let {
          imgUrl,
          dataUrl
      } = this.state;

    return (
      <div className="cm_absolute_full_bg d-flex justify-content-center align-items-center cm_12_color_style">
        <div className="cm_fixed_bounds ui_boundsize">
          <Header>
            <div className="jr_breadcrumb d-flex flex-row justify-content-between" style={{width:'100%'}}>
              <p><span>上传图片</span> </p>
              <p className="" style={{marginRight:'20px'}}><IconClose callBack={()=>{callBack && callBack(index)}}/></p>
            </div>
          </Header>
          <div className="">
              <div className="ui-content-img">
                <img id="preview" src={dataUrl ? dataUrl : imgUrl} ref={'imgBorder'}/>
                  <div className="ui-content-upload" id="ui-content-upload-preview" ref={'backG'}>
                      <p className="ui-content-upload-btn-re-bg" ref={'imgUploaded'}>
                          <span className="ui-content-upload-btn-re">重新上传</span>
                      </p>
                      <input className="ui-content-upload-btn ui-content-upload-invisible" type="file" accept="image/png" name="file" onChange={this.imgPreview} alt=""></input>
                  </div>
                  <div className="ui-content-conditions">
                      <p>上传要求: PNG透明背景图,大小不超过20K</p>
                  </div>
              </div>
          </div>

          <JRBottomBar>
            <JRButton type={JRButton.BUTTON_TYPE.NORMAL} title="取消" onClick={()=>{callBack && callBack(index)}}/>
            <JRButton type={JRButton.BUTTON_TYPE.BLUE} title="保存" onClick={this.funcFetch}/>
          </JRBottomBar>
        </div>
      </div>
    )
  }
}
