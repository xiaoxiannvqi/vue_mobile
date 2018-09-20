<template>
  <div class="invite-reg-panel">
        <form action="" id="form">
            <div class="invite-input">
                <input class="input" id="phone" name="phoneNum" type="number" placeholder="请输入您的手机号码" v-model="phoneNum" v-on:blur="phoneBlur"/>
            </div>
            <div class="invite-input">
                <input class="input" style="width: 50%;" id="code" name="codeNum" type="number" placeholder="请输入验证码" v-model="codeNum"/>
                <input id="code-btn" class="reg-yzm" type="button" value="|  获取验证码" v-on:click="handleGetCode"/>
            </div>
            <div class="invite-input">
                <input class="input" id="pwd" name="pwdNum" type="password" placeholder="请设置登录密码" v-model="pwdNum"/>
            </div>
            <div class="invite-submit reg-btn" id="regBtn" v-on:click="registSubmit">立即注册</div>
        </form>
        <!-- 提示 -->
        <div class="reg-tip" v-if="isShowTip">{{tipContent}}</div>
        <!-- 注册成功弹层 -->
        <reg-success v-if="isRegSucc" v-bind:isRegSucc="isRegSucc" v-on:success="success"></reg-success>
    </div>
</template>
<script>
import regSuccess from "./reg_succ"
import baseUrl from "../../libs/baseUrl";
import util from "../../libs/util";
export default {
    data() {
        return {
            phoneNum: '',
            codeNum: '',
            pwdNum: '',
            tipContent: '',
            isShowTip: false,
            channelName: '',
            isRegSucc: false,
            countdown: 60, //倒计时
        };
    },
    components:{
        regSuccess
    },
    mounted() { //获取渠道名称
        let channelName = this.getQueryString('channel')
        this.channelName = channelName
    },
    methods: {
        // 手机号失去焦点 验证手机号+是否存在
        phoneBlur() {
            let pattern = /^1\d{10}$/;
            let phoneNum = this.phoneNum;
            if(phoneNum == ''){
                this.alertTip('手机号码不能为空!');
                return;
            }else if(!pattern.test(phoneNum)){
                this.alertTip('请输入正确的手机号码!');
                return;
            }
            let params = {
                phoneNo: phoneNum
            }
            util.get(baseUrl.is_phone_exits_url,params).then(resp => {
                if(resp.data.code == 6){
                    this.alertTip(resp.data.msg);
                    this.phoneNum = '';
                }
            })
        },
        // 获取验证码
        handleGetCode() {
            let _this = this;
            setTimeout(function(){
                let phoneNum = _this.phoneNum;
                if(phoneNum == '') {
                    return;
                }
                // 判断使用何种发送验证码方式
                util.postBody(baseUrl.get_verity_type_url,{},{channelName: _this.channelName}).then( resp => {
                    let params = {
                        phoneNo: phoneNum,
                        type: 0
                    }
                    if(resp.data.code == 0){ //短信验证
                        _this.getSmsCode(params)
                    }else if(resp.data.code == 1) { //语音
                        _this.getVmsCode(params)
                    }
                })
            },500)
        },
        // 短信
        getSmsCode(params) {
            util.get(baseUrl.get_code_url,params).then(resp => {
                if(resp.data.success){
                    this.alertTip('已发送短信验证码,请注意查收。');
                    this.settime($('#code-btn'))
                }else{
                    this.alertTip(res.data.msg); 
                }
            })
        },
        // 语音
        getVmsCode(params) {
            util.get(baseUrl.send_vms_url,params).then(resp => {
                if(resp.data.success){
                    this.alertTip('已经发送语音验证码，请注意接听电话。');
                    this.settime($('#code-btn'))
                }else{
                    this.alertTip(res.data.msg); 
                }
            })
        },
        // 提交注册
        registSubmit() {
            if(this.phoneNum == ''){
                this.alertTip('手机号码不能为空!');
                return;
            }else if(this.codeNum == '') {
                this.alertTip('验证码不能为空!');
                return;
            }else if(this.pwdNum == '') {
                this.alertTip('密码不能为空!');
                return;
            }else if(this.pwdNum.length < 6 || this.pwdNum.length > 21){
                this.alertTip('请设置密码长度6~21位!');
                return;
            }
            let params = {
                verificationCode:this.codeNum,
                channelName: this.channelName
            }
            let data = {
                phone: this.phoneNum,
                password: this.pwdNum
            }
            util.postBody(baseUrl.register_url,data,params).then(resp => {
                if(resp.data.code == 1){
                    this.isRegSucc = true
                }else{
                    this.alertTip(resp.data.msg)
                }
            })
        },
        //提示
        alertTip(msg) {
            let _this = this
            _this.tipContent = msg;
            _this.isShowTip = true;
            setTimeout(function(){
                _this.isShowTip = false; 
            },3000);
        },
        // 获取参数
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if(r != null) return decodeURI(r[2]);
            return null;
        },
        // 倒计时
        settime(obj) { 
            let countdown = this.countdown
            let _this =this
            if (countdown == 0) { 
                console.log(1)
                obj.attr('disabled',false);
                obj.val('|  获取验证码');
                obj.css('color','rgb(255,65,65)')
                countdown=60;
                return;
            } else { 
                obj.attr('disabled',true);
                obj.css('color','#cccccc')
                countdown--;
                this.countdown = countdown
                obj.val('|  重新发送('+this.countdown+'s)');
                setTimeout(function(){_this.settime(obj)},1000) 
            } 
        },
        success(res){
            this.isRegSucc = res
        }
    }
} 
</script>
<style>
    @import "../../style/public.css";
    .invite-reg-panel{
        width: 702px;
        height: 522px;
        border-radius: 6px;
        margin: 0 auto;
        background: #fff;
        padding: 42px;
    }
    .invite-input{
        width: 100%;
        height: 84px;
        border: 2px solid #e5e5e5;
        margin-bottom: 30px;
        padding: 0 20px;
        border-radius: 3px;
        position: relative;
    }
    .invite-input .input{
        font-size: 30px;
        color: #333;
        width: 100%;
        height: 99%;
        border: none;
        outline: none;
    }
    .invite-input input.reg-yzm{
        color: rgb(255,65,65);
        font-size: 30px;
        padding:0 20px;
        position: absolute;
        right: 0;
        top: 20px;
        background: transparent;
        border: none;
        outline: none;
    }
    .invite-submit{
        width: 100%;
        height: 84px;
        border-radius: 84px;
        background: rgb(255,65,65);
        line-height: 84px;
        text-align: center;
        font-size: 32px;
        color: #fff;
        margin-top: 42px;
    }
    .reg-tip{
        width: 60%;
        height: 80px;
        line-height: 80px;
        background: rgba(0,0,0,.5);
        border-radius: 80px;
        -webkit-border-radius: 80px;
        -moz-border-radius: 80px;
        font-size: 24px;
        color: #fff;
        text-align: center;
        text-align: -moz-center;
        text-align: -webkit-center;
        position: fixed;
        bottom: 200px;
        left: 20%;
    }
</style>