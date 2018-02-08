<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>份子钱大调查</title>
    <meta name="description" content="朋友婚礼上的故事情节早已忘光，随下的份子不管多久都会记得，人情社交场，你进阶到哪个段位了">
    <style>
        * {
            margin: 0;
            padding: 0;
        }
    </style>
    <script src="{{asset('js')}}/jquery.min.js"></script>
    <script src="{{asset('js')}}/jweixin-1.2.0.js"></script>
    <script src="{{asset('js')}}/share.js"></script>
</head>
<body>
<iframe src="{{asset('fenziqianv03')}}/" frameborder="0" id="fenziqian" style="width: 100%;height: 1136px;"></iframe>
<script>
    resize();
    var shareImg = "{{asset('img/share.jpg')}}",
        localUrl = window.location.href.split('#')[0],
        shareTitle = "我没买的iPhoneX，都在随出去的红包里",
        shareDesc = "测一测，人情社交场你是什么职位";
    setShareInfo({
        title: shareTitle,
        summary: shareDesc,
        pic: shareImg,
        url: localUrl,
        callback: function (e, res) {sharesAjax();}
    });
    window.setInterval("resize()", 500);
    $(function () {
        resize();
        $.ajax({
            url: "{{route('wx.getJsapiTicket')}}",
            type: "post",
            data: {url: localUrl},
            success: function (res) {
                if(!res.code){
                    var data = res.data;
                    wxConfig(data);
                }
            }
        });
    });
    function resize() {
        $('iframe').css({height: $(window).height()});
    }
    function wxConfig(data) {
        wx.config({
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: [
                "onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ", "onMenuShareQZone"
            ]
        });
    }
    function sharesAjax() {
        $.ajax({
            url: "{{route('wx.share')}}",
            type: "post",
            success: function (res) {
                //alert(res.message);
            }
        });
    }
    wx.ready(function(){
        wx.checkJsApi({
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ],
            success: function (res) {}
        });
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: shareDesc,
            link: localUrl,
            imgUrl: shareImg,
            type: 'link',
            dataUrl: '',
            success: function () {sharesAjax();}
        });
        wx.onMenuShareQQ({
            title: shareTitle,
            desc: shareDesc,
            link: localUrl,
            imgUrl: shareImg,
            success: function () {sharesAjax();},
        });
        wx.onMenuShareTimeline({
            title: shareTitle,
            link: localUrl,
            imgUrl: shareImg,
            success: function () {sharesAjax();},
        });
    });
    wx.error(function(res){
        console.error("error", res);
    });
</script>
</body>
</html>