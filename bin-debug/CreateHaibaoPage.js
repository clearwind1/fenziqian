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
        var Haibaopic = new MyBitmap(RES.getRes('haibao' + this.selectID + '_jpg'), 0, 0);
        Haibaopic.setanchorOff(0, 0);
        this.addChild(Haibaopic);
        var nickname = new GameUtil.MyTextField(442, 93, 40, 0.5, 0.5);
        nickname.setText(GameData._i().Nickname);
        nickname.textColor = 0xffd11f;
        this.addChild(nickname);
        //头像
        var headimg = new GetImageByUrl(GameData._i().imageUrl, 140, 140);
        headimg.x = 55;
        headimg.y = 43;
        this.addChild(headimg);
        // var backbtn: GameUtil.Menu = new GameUtil.Menu(this, 'backbtn_png', 'backbtn_png', this.backgamescene);
        // backbtn.setScaleMode();
        // backbtn.x = 375;
        // backbtn.y = 1130;
        // this.addChild(backbtn);
        this.tipContain = new egret.DisplayObjectContainer;
        this.addChild(this.tipContain);
        egret.setTimeout(this.showgz, this, 1000);
    };
    CreateHaibaoPage.prototype.showgz = function () {
        var coverbg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.tipContain.addChild(coverbg);
        var tipbg = new MyBitmap(RES.getRes('tipgz_png'), this.mStageW / 2, 600);
        this.tipContain.addChild(tipbg);
        var closebtn = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closegz);
        closebtn.setScaleMode();
        closebtn.x = 648;
        closebtn.y = 484;
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
    };
    CreateHaibaoPage.prototype.jumpgz = function () {
        window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MjQzMTA5MA==&scene=124#wechat_redirect";
    };
    CreateHaibaoPage.prototype.backgamescene = function () {
        GameUtil.GameScene.runscene(new GameScene());
    };
    return CreateHaibaoPage;
}(GameUtil.BassPanel));
__reflect(CreateHaibaoPage.prototype, "CreateHaibaoPage");
