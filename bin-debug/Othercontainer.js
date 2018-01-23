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
/**
 * Create by hardy on  16/12/21
 */
var Othercontainer = (function (_super) {
    __extends(Othercontainer, _super);
    function Othercontainer() {
        return _super.call(this) || this;
    }
    Othercontainer.prototype.init = function () {
        this.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.addChild(shap);
        this.show();
    };
    Othercontainer.prototype.show = function () {
    };
    Othercontainer.prototype.close = function () {
        egret.Tween.removeAllTweens();
        this.removeChildren();
        this.parent.removeChild(this);
    };
    return Othercontainer;
}(GameUtil.BassPanel));
__reflect(Othercontainer.prototype, "Othercontainer");
//# sourceMappingURL=Othercontainer.js.map