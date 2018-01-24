/**
 * Created by pior on 16/3/22.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SharePage = (function (_super) {
    __extends(SharePage, _super);
    function SharePage() {
        var _this = _super.call(this) || this;
        _this.desctext = '我没买的iPhoneX，都在随出去的红包里';
        _this.newurl = 'http://bubblefightv02.h5.gamexun.com/';
        return _this;
    }
    /**
     * 获取签名分享
     */
    SharePage.prototype.getSignPackage = function () {
        var urllocal = encodeURIComponent(window.location.href.split('#')[0]);
        //console.log("url=====", urllocal);
        var parma = {
            url: urllocal
        };
        GameUtil.Http.getinstance().send(parma, "/weixinshare/share", this.share, this, "api.h5.gamexun.com"); //http://api.h5.gamexun.com/weixinshare/share
        //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
    };
    SharePage.prototype.share = function (data) {
        console.log("data======", data);
        //this.shareTip();
        //alert("id==="+data['appId']+"\ntimestamp==="+data['timestamp']+"\nnonceStr==="+data['noncestr']+"\nsign==="+data['sign']);
        //........................................................
        //基本配置
        //配置参数
        wx.config({
            debug: false,
            appId: data['appId'],
            timestamp: Number(data['timestamp']),
            nonceStr: data['noncestr'],
            signature: data['sign'],
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ]
        });
        //下面可以加更多接口,可自行扩展
        this.getWeiXinShareTimeline(); //分享朋友圈
        this.getWeiXinShareAppMessage();
    };
    SharePage.prototype.setdesctext = function (text) {
        this.desctext = text;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    };
    SharePage.prototype.setNewUrl = function (url) {
        this.newurl = url;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    };
    /**
     * 获取微信分享到朋友圈
     */
    SharePage.prototype.getWeiXinShareTimeline = function () {
        var self = this;
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.desctext;
        bodyMenuShareTimeline.link = this.newurl;
        bodyMenuShareTimeline.imgUrl = 'http://bubblefightv02.h5.gamexun.com/shareicon.png';
        bodyMenuShareTimeline.trigger = function () {
            // alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = function () {
            //alert('已分享');
            //window[ 'weChat' ]();
            //alert('已分享')
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareTimeline.cancel = function () {
            //alert('已取消');
            // window[ 'weChat' ]();
            //self.closesharetip();
        };
        bodyMenuShareTimeline.fail = function (res) {
            //alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        //alert('已注册获取“分享到朋友圈”状态事件');
    };
    /**
     * 获取微信分享到朋友
     */
    SharePage.prototype.getWeiXinShareAppMessage = function () {
        var self = this;
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = '我没买的iPhoneX，都在随出去的红包里';
        bodyMenuShareAppMessage.desc = '朋友婚礼上的故事情节早已忘光，随下的份子不管多久都会记得，人情社交场，你进阶到哪个段位了？';
        bodyMenuShareAppMessage.link = this.newurl;
        bodyMenuShareAppMessage.imgUrl = 'http://bubblefightv02.h5.gamexun.com/shareicon.png';
        bodyMenuShareAppMessage.trigger = function () {
            // alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function () {
            //alert('已分享');
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareAppMessage.cancel = function () {
            //alert('已取消');
            //self.closesharetip();
        };
        bodyMenuShareAppMessage.fail = function (res) {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        // alert('已注册获取“发送给朋友”状态事件');
    };
    SharePage._i = function () {
        if (this.inst == null) {
            this.inst = new SharePage();
        }
        return this.inst;
    };
    return SharePage;
}(egret.DisplayObjectContainer));
__reflect(SharePage.prototype, "SharePage");
//# sourceMappingURL=SharePage.js.map