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
var CreateHaibaoPage = (function (_super) {
    __extends(CreateHaibaoPage, _super);
    function CreateHaibaoPage(selectid) {
        var _this = _super.call(this) || this;
        _this.selectID = 0;
        _this.selectID = selectid;
        return _this;
    }
    CreateHaibaoPage.prototype.init = function (selectid) {
        this.show();
    };
    CreateHaibaoPage.prototype.show = function () {
        var _this = this;
        var Haibaopic = new MyBitmap(RES.getRes('haibao' + this.selectID + '_jpg'), 0, 0);
        Haibaopic.setanchorOff(0, 0);
        this.addChild(Haibaopic);
        var nickname = new GameUtil.MyTextField(442, 93, 40, 0.5, 0.5);
        nickname.setText(GameData._i().Nickname);
        nickname.textColor = 0xffd11f;
        this.addChild(nickname);
        //头像
        // var headimg: GetImageByUrl = new GetImageByUrl(GameData._i().imageUrl, 140, 140);
        // headimg.x = 55;
        // headimg.y = 43;
        // this.addChild(headimg);
        var bmp = new egret.Bitmap();
        bmp.x = 55;
        bmp.y = 43;
        egret.BitmapData.create('base64', GameData._i().imageBase64, function (bitmapData) {
            bmp.bitmapData = bitmapData;
            bmp.width = 140;
            bmp.height = 140;
            _this.addChild(bmp);
        });
        // var backbtn: GameUtil.Menu = new GameUtil.Menu(this, 'backbtn_png', 'backbtn_png', this.backgamescene);
        // backbtn.setScaleMode();
        // backbtn.x = 375;
        // backbtn.y = 1130;
        // this.addChild(backbtn);
        this.tipContain = new egret.DisplayObjectContainer;
        this.addChild(this.tipContain);
        egret.setTimeout(this.showgz, this, 100);
    };
    CreateHaibaoPage.prototype.shareImage = function (target) {
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(target); //渲染到临时画布
        var divImage = document.getElementById("divImage"); //获取DIV
        var shareImage = document.getElementById("shareImage"); //获取Image标签
        shareImage.src = renderTexture.toDataURL('image/jpeg'); //把数据赋值给Image
        shareImage.width = document.body.clientWidth;
        shareImage.height = document.body.clientHeight;
        divImage.style.display = "block"; //显示DIV
    };
    CreateHaibaoPage.prototype.showgz = function () {
        var coverbg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.tipContain.addChild(coverbg);
        var tipbg = new MyBitmap(RES.getRes('tipgz_png'), this.mStageW / 2, 571);
        this.tipContain.addChild(tipbg);
        var closebtn = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closegz);
        closebtn.setScaleMode();
        closebtn.x = 688;
        closebtn.y = 430;
        this.tipContain.addChild(closebtn);
        var havegzbtn = new GameUtil.Menu(this, 'havegzbtn_png', 'havegzbtn_png', this.closegz);
        havegzbtn.setScaleMode();
        havegzbtn.x = 201;
        havegzbtn.y = 829;
        this.tipContain.addChild(havegzbtn);
        var donthavegzbtn = new GameUtil.Menu(this, 'donthavegzbtn_png', 'donthavegzbtn_png', this.jumpgz);
        donthavegzbtn.setScaleMode();
        donthavegzbtn.x = 552;
        donthavegzbtn.y = 829;
        this.tipContain.addChild(donthavegzbtn);
    };
    CreateHaibaoPage.prototype.closegz = function () {
        this.removeChild(this.tipContain);
        this.tipContain = null;
        this.showsharetip();
    };
    CreateHaibaoPage.prototype.jumpgz = function () {
        window.location.href = "http://tingfeng.tristana.cn/fenziqianv04/qrcode.html";
    };
    CreateHaibaoPage.prototype.showsharetip = function () {
        var _this = this;
        var sharetipcontain = new egret.DisplayObjectContainer();
        this.addChild(sharetipcontain);
        var shar = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        sharetipcontain.addChild(shar);
        var sharetip = new MyBitmap(RES.getRes('sharetip_png'), this.mStageW, 0);
        sharetip.setanchorOff(1, 0);
        sharetipcontain.addChild(sharetip);
        shar.$setTouchEnabled(true);
        shar.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.removeChild(sharetipcontain);
            _this.shareImage(_this.$stage);
        }, this);
    };
    CreateHaibaoPage.prototype.backgamescene = function () {
        GameUtil.GameScene.runscene(new GameScene());
    };
    return CreateHaibaoPage;
}(GameUtil.BassPanel));
__reflect(CreateHaibaoPage.prototype, "CreateHaibaoPage");
