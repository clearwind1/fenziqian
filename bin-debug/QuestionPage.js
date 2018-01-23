var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var QuestionPage = (function (_super) {
    __extends(QuestionPage, _super);
    function QuestionPage() {
        return _super.call(this) || this;
    }
    QuestionPage.prototype.init = function () {
        this.showbg();
    };
    QuestionPage.prototype.showbg = function () {
        var bg = new MyBitmap(RES.getRes('quespic_jpg'), 0, 0);
        bg.setanchorOff(0, 0);
        this.addChild(bg);
        var btn = new GameUtil.Menu(this, 'checkbtn_png', 'checkbtn_png', this.showgz);
        btn.setScaleMode();
        btn.x = this.mStageW / 2;
        btn.y = 823;
        this.addChild(btn);
    };
    QuestionPage.prototype.showgz = function () {
        var coverbg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.addChild(coverbg);
        var tipbg = new MyBitmap(RES.getRes('tipgz_png'), this.mStageW / 2, this.mStageH / 2);
        this.addChild(tipbg);
        var closebtn = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.anserpage);
        closebtn.setScaleMode();
        closebtn.x = 570;
        closebtn.y = 500;
        this.addChild(closebtn);
        var havegzbtn = new GameUtil.Menu(this, 'havegzbtn_png', 'havegzbtn_png', this.anserpage);
        havegzbtn.setScaleMode();
        havegzbtn.x = 290;
        havegzbtn.y = 755;
        this.addChild(havegzbtn);
        var donthavegzbtn = new GameUtil.Menu(this, 'donthavegzbtn_png', 'donthavegzbtn_png', this.jumpgz);
        donthavegzbtn.setScaleMode();
        donthavegzbtn.x = 470;
        donthavegzbtn.y = 755;
        this.addChild(donthavegzbtn);
    };
    QuestionPage.prototype.anserpage = function () {
        GameUtil.GameScene.runscene(new AnswerPage());
    };
    QuestionPage.prototype.jumpgz = function () {
        window.location.href = "https://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzAxNDQyMjM4Ng==#wechat_webview_type=1&wechat_redirect";
    };
    return QuestionPage;
}(GameUtil.BassPanel));
__reflect(QuestionPage.prototype, "QuestionPage");
//# sourceMappingURL=QuestionPage.js.map