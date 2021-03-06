import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { is,fromJS } from 'immutable';
import envconfig from '@/envconfig/envconfig';
import { saveFormData,saveImg,clearData } from '@/store/home/action';
import { clearSelected } from '@/store/production/action';
import NavHeader from '@/components/navHeader/navHeader';
import TouchEvent from '@/components/touchEvent/touchEvent';
import Alert from '@/components/alert/alert';
import API from '@/api/api';
import styles from './home.less';

class home extends Component {
    constructor(props){
        super(props);
        this.state={
            alertStatus:false,
            alertContext:'',
        }
    }
    /**
   * 已选择的商品数据
   * @type {Array}
   */
    selectedProList = []; 

    /*
  上传图片，并将图片地址存到redux，保留状态
   */
  loadImg = async (event)=>{
    try{
        let formdata=new FormData();
        formdata.append('file',event.target.files[0]);
        console.log(formdata)
        let result=await API.uploadImg({data:formdata});
        this.props.saveImg(envconfig.imgUrl+result.image_path);
        console.log(result);
    }catch(err){
        console.log(err);
    }
  }


    //获取输入值
    handleInput=(type,event)=>{
        let val=event.target.value;
        switch(type){
            case 'orderSum' :
                val=val.replace(/\D/g,'');
                break;
            case 'name' :
                break;
            case 'phoneNo' :
                val=val.replace(/\D/g,'');
                break;
        }
        this.props.saveFormData(val,type);
    }

    //提交
    submitForm=()=>{
        const {orderSum,name,phoneNo}=this.props.formData;
        let alertContext;
        if(!orderSum.toString().length){
            alertContext='请填写金额';
        }else if(!name.toString().length){
            alertContext='请填写姓名';
        }else if(!phoneNo.toString().length){
            alertContext='请填写正确的手机号';
        }else{
            alertContext='添加数据成功';
        }
        this.setState({
            alertStatus:true,
            alertContext,
        })
    }
    //关闭弹窗
    closeAlert=()=>{
        this.setState({
            alertStatus:false,
            alertContext:''
        })
    }
    // 初始化数据，获取已选择的商品
  initData = props => {
    this.selectedProList = [];
    props.proData.dataList.forEach(item => {
      if(item.selectStatus && item.selectNum){
        this.selectedProList.push(item);
      }
    })
  }
  omponentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.initData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  componentWillMount(){
    this.initData(this.props);
  }
    render() {
        const { orderSum,name,phoneNo ,imgPath}=this.props.formData;
        return (
            <main className={styles.home_container} >
                <NavHeader title='首页' record />
                <p className={styles.common_title}>请输入您的信息</p>
                <form className={styles.home_form} >
                    <div className={styles.home_form_item}>
                        <label>销售金额：</label>
                        <input type="text" value={orderSum} onChange={this.handleInput.bind(this,'orderSum')} placeholder='请输入订单金额' />
                    </div>
                    <div className={styles.home_form_item}>
                        <label>客户名称：</label>
                        <input type="text" value={name} onChange={this.handleInput.bind(this,'name')} placeholder='请输入客户名称' />
                    </div>
                    <div className={styles.home_form_item}>
                        <label>客户电话：</label>
                        <input type="text" value={phoneNo} onChange={this.handleInput.bind(this,'phoneNo')} maxLength='13' placeholder='请输入客户电话' />
                    </div>
                </form>
                <div>
                    <p className={styles.common_title}>请选择销售产品</p>
                    <Link to='/production' className={styles.common_select_btn} >
                        {
                            this.selectedProList.length ? <ul className={styles.select_list}>
                                {
                                    this.selectedProList.map((value,index)=>(
                                        <li key={index} className={styles.select_item}>{value.product_name}X{value.productNum}</li>
                                    ))
                                }
                            </ul> : '选择产品'
                        }
                    </Link>
                </div>
                <div className={styles.upload_img}>
                    <p className={styles.common_title}>请上传发票凭证</p>
                    <div className={styles.file_label}>
                        <span className={styles.common_select_btn}>上传图片</span>
                        <input type="file" onChange={this.loadImg} />
                    </div>
                    <img src={imgPath} className={styles.select_img} alt=""/>
                </div>
                <TouchEvent text='提交' clickCallBack={this.submitForm} />
                <Alert closeAlert={this.closeAlert} {...this.state} />
            </main>
        );
    }
}

export default connect(state=>({
    formData:state.formData,
    proData:state.proData,
}),
{
    saveFormData,
    saveImg,
    clearData,
    clearSelected,
}
)(home);