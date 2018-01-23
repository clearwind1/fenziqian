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
 * Create by hardy on 16/12/21
 * 游戏分享提示页面
 */
var SharePageShow = (function (_super) {
    __extends(SharePageShow, _super);
    function SharePageShow() {
        return _super.call(this) || this;
    }
    SharePageShow.prototype.show = function () {
        var self = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.close();
        }, this);
        var sharetip = new MyBitmap(RES.getRes('sharetip_png'), this.mStageW, 0);
        sharetip.setanchorOff(1, 0);
        this.addChild(sharetip);
    };
    return SharePageShow;
}(Othercontainer));
__reflect(SharePageShow.prototype, "SharePageShow");
//# sourceMappingURL=SharePageShow.js.map