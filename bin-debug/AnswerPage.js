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
var AnswerPage = (function (_super) {
    __extends(AnswerPage, _super);
    function AnswerPage() {
        var _this = _super.call(this) || this;
        _this.selectID = 0;
        return _this;
    }
    AnswerPage.prototype.init = function () {
        this.show();
    };
    AnswerPage.prototype.show = function () {
        var askerbg = new MyBitmap(RES.getRes('askerbg_jpg'), 0, 0);
        askerbg.setanchorOff(0, 0);
        this.addChild(askerbg);
        for (var i = 0; i < 5; i++) {
            var btnpicstr = 'askerpic' + i + '_png';
            var askerpic = new GameUtil.Menu(this, btnpicstr, btnpicstr, this.selectC, [i]);
            askerpic.x = 375;
            askerpic.y = 748 + i * 76;
            this.addChild(askerpic);
        }
        this.selectP = new MyBitmap(RES.getRes('askerselectp_png'), 160, 748);
        this.addChild(this.selectP);
        var askerbtn = new GameUtil.Menu(this, 'askerbtn_png', 'askerbtn_png', this.upanswer);
        askerbtn.setScaleMode();
        askerbtn.x = 375;
        askerbtn.y = 1193;
        this.addChild(askerbtn);
    };
    AnswerPage.prototype.selectC = function (id) {
        console.log('selectid====', id);
        this.selectID = id;
        this.selectP.y = 748 + id * 76;
    };
    AnswerPage.prototype.upanswer = function () {
        var par = [this.selectID];
        GameUtil.GameScene.runscene(new CreateHaibaoPage(this.selectID));
    };
    return AnswerPage;
}(GameUtil.BassPanel));
__reflect(AnswerPage.prototype, "AnswerPage");
//# sourceMappingURL=AnswerPage.js.map