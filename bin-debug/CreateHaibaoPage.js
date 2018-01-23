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
        var backbtn = new GameUtil.Menu(this, 'backbtn_png', 'backbtn_png', this.backgamescene);
        backbtn.setScaleMode();
        backbtn.x = 375;
        backbtn.y = 1130;
        this.addChild(backbtn);
    };
    CreateHaibaoPage.prototype.backgamescene = function () {
        GameUtil.GameScene.runscene(new GameScene());
    };
    return CreateHaibaoPage;
}(GameUtil.BassPanel));
__reflect(CreateHaibaoPage.prototype, "CreateHaibaoPage");
//# sourceMappingURL=CreateHaibaoPage.js.map