<template>
    <div class="rules-page">
        <h2 class="rules-title">活动规则</h2>
        <p class="rules-item">1.活动时间：2018年8月16日至2018年12月31日；</p>
        <p class="rules-item">2.每推荐一位新用户，该用户注册成功后发布1个服务并通过审核可获得1-99元现金红包奖励，现金红包奖励会直接放入您的流星狗钱包，余额满50元即可提现。</p>
        <p class="rules-item">3.本活动最终解释权归大恩德成科技（北京）有限公司所有。</p>        
        <div class="xiazai" @click="open()">下载流星狗APP</div>
    </div>
</template>
<script>
import shareUrl from '../../libs/shareUrl.js'
export default {
    created() {
        this.navigatorUserAgent = navigator.userAgent;
        this.isAndroid = this.navigatorUserAgent.indexOf("Android") > -1 || this.navigatorUserAgent.indexOf("Adr") > -1;
        this.isiOS = !!this.navigatorUserAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    methods: {
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
    }
}
</script>
<style>
.rules-page{
    padding: 0 40px 130px;
}
.rules-title{
    font-size: 34px;
    color: #313131;
    margin: 50px auto 30px;
    text-align: center;
    font-weight: normal;
}
.rules-item{
    font-size: 24px;
    color: #313131;
    line-height: 40px;
}
.xiazai{
    width: 100%;
    height: 100px;
    line-height: 100px;
    color: #fff;
    background: #00abd1;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 30px;
}
</style>
