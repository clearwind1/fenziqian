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
var QuestionPage = (function (_super) {
    __extends(QuestionPage, _super);
    function QuestionPage() {
        return _super.call(this) || this;
    }
    QuestionPage.prototype.init = function () {
        this.showbg();
        this.stage.addChild(new SoundControl());
    };
    QuestionPage.prototype.showbg = function () {
        var bg = new MyBitmap(RES.getRes('quespic_jpg'), 0, 0);
        bg.setanchorOff(0, 0);
        this.addChild(bg);
        var btn = new GameUtil.Menu(this, 'checkbtn_png', 'checkbtn_png', this.anserpage);
        btn.setScaleMode();
        btn.x = this.mStageW / 2;
        btn.y = 914;
        this.addChild(btn);
    };
    QuestionPage.prototype.anserpage = function () {
        GameUtil.GameScene.runscene(new AnswerPage());
    };
    return QuestionPage;
}(GameUtil.BassPanel));
__reflect(QuestionPage.prototype, "QuestionPage");
//# sourceMappingURL=QuestionPage.js.map