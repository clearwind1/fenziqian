/**
 * Created by pior on 16/3/22.
 */


class SharePage extends egret.DisplayObjectContainer
{

    private desctext: string = '我没买的iPhoneX，都在随出去的红包里';
    private newurl: string = 'http://bubblefightv02.h5.gamexun.com/';

    public constructor()
    {
        super();
    }
    /**
     * 获取签名分享
     */
    public getSignPackage() {

        var urllocal:string = encodeURIComponent(window.location.href.split('#')[0]);

        //console.log("url=====", urllocal);
        var parma:Object = {
            url: urllocal
        }
        GameUtil.Http.getinstance().send(parma,"/weixinshare/share",this.share,this,"api.h5.gamexun.com");//http://api.h5.gamexun.com/weixinshare/share
        //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
    }
    private share(data:any):void
    {
        console.log("data======",data);

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
        this.getWeiXinShareTimeline();//分享朋友圈
        this.getWeiXinShareAppMessage();
    }

    public setdesctext(text:string)
    {
        this.desctext = text;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    }
    public setNewUrl(url:string)
    {
        this.newurl = url;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    }

    /**
     * 获取微信分享到朋友圈
     */
    private getWeiXinShareTimeline() {

        var self:any = this;
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.desctext;
        bodyMenuShareTimeline.link = this.newurl;
        bodyMenuShareTimeline.imgUrl = 'http://bubblefightv02.h5.gamexun.com/shareicon.png';
        bodyMenuShareTimeline.trigger = ()=> {
            // alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = ()=> {
            //alert('已分享');
            //window[ 'weChat' ]();
            //alert('已分享')
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareTimeline.cancel = ()=> {
            //alert('已取消');
            // window[ 'weChat' ]();
            //self.closesharetip();
        };
        bodyMenuShareTimeline.fail = (res)=> {
            //alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        //alert('已注册获取“分享到朋友圈”状态事件');
    }
    /**
     * 获取微信分享到朋友
     */
    private getWeiXinShareAppMessage(){

        var self: any = this;

        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = '我没买的iPhoneX，都在随出去的红包里';
        bodyMenuShareAppMessage.desc = '朋友婚礼上的故事情节早已忘光，随下的份子不管多久都会记得，人情社交场，你进阶到哪个段位了？';
        bodyMenuShareAppMessage.link = this.newurl;
        bodyMenuShareAppMessage.imgUrl = 'http://bubblefightv02.h5.gamexun.com/shareicon.png';
        bodyMenuShareAppMessage.trigger = ()=> {
            // alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = ()=> {
            //alert('已分享');
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareAppMessage.cancel = ()=> {
            //alert('已取消');
            //self.closesharetip();

        };
        bodyMenuShareAppMessage.fail = (res)=> {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        // alert('已注册获取“发送给朋友”状态事件');
    }

    private static inst: SharePage;
    public static _i(): SharePage
    {
        if(this.inst == null)
        {
            this.inst = new SharePage();
        }

        return this.inst;
    }

}