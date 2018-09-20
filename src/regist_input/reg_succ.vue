<template>
    <div class="reg-succ-mask">
        <div class="reg-succ-panel">
            <div class="reg-succ-download" v-on:click="open()"></div>
            <div class="reg-succ-close" v-on:click="hide()"></div>
        </div>
    </div>
</template>
<script>
import shareUrl from '../../libs/shareUrl.js'
export default {
    data(){
        return{
            navigatorUserAgent: "",
            isAndroid: "",
            isiOS: "",
        }
    },
    props:['isRegSucc'],
    created() {
        this.navigatorUserAgent = navigator.userAgent;
        this.isAndroid = this.navigatorUserAgent.indexOf("Android") > -1 || this.navigatorUserAgent.indexOf("Adr") > -1;
        this.isiOS = !!this.navigatorUserAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    methods:{
        open() {
            if (this.isAndroid) {
                //alert('android')
                var loadTime = new Date();
                var ifr = document.createElement("iframe");
                ifr.src = shareUrl.android_url; /***打开app的协议***/
                ifr.style.display = "none";
                document.body.appendChild(ifr);
                window.setTimeout(function() {
                var outTime = new Date();
                document.body.removeChild(ifr);
                if (outTime - loadTime > 800) {
                    window.location.href =  shareUrl.android_download_url; /***下载app的地址***/
                }
                }, 1000);
            }
            if (this.isiOS) {
                //alert('ios')
                var loadTime = new Date();
                var ifr = document.createElement("iframe");
                ifr.src =  shareUrl.ios_url; /***打开app的协议***/
                ifr.style.display = "none";
                document.body.appendChild(ifr);
                window.location.href =  shareUrl.ios_url;
                window.setTimeout(function() {
                var outTime = new Date();
                document.body.removeChild(ifr);
                if (outTime - loadTime > 800) {
                    window.location.href =  shareUrl.ios_download_url; /***下载app的地址***/
                }
                }, 1000);
            }
        },
        hide() {
            this.$emit('success',false)
        }
    }
}
</script>

<style>
    .reg-succ-mask{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.7);
        z-index: 999;
    }
    .reg-succ-panel{
        width: 530px;
        height: 495px;
        background-image: url(../../images/succ.png);
        background-repeat: no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        position: relative;
        margin: 300px auto 0;
    }
    .reg-succ-download{
        position: absolute;
        bottom: 30px;
        width: 360px;
        height: 80px;
        left: 85px;
    }
    .reg-succ-close{
        width: 60px;
        height: 60px;
        background-image: url('../../images/close-mask.png');
        background-repeat: no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        position: absolute;
        bottom: -80px;
        left: 234px;
    }

</style>

