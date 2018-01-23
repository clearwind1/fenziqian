/**
 * Created by pior on 16/3/14.
 */
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
var AdaptGamelayer = (function (_super) {
    __extends(AdaptGamelayer, _super);
    function AdaptGamelayer() {
        return _super.call(this) || this;
    }
    AdaptGamelayer.prototype.initlayer = function (maxheight) {
        this.maxheight = maxheight;
    };
    AdaptGamelayer.prototype.putItme = function (child) {
        this.addChild(child);
    };
    AdaptGamelayer.prototype.adpat = function (bscalex) {
        if (bscalex === void 0) { bscalex = true; }
        var sc = 1;
        // console.log('adh=====',this.$getHeight(),'maxh======',this.maxheight);
        if (this.$getHeight() > this.maxheight) {
            sc = this.maxheight / this.$getHeight();
            if (bscalex) {
                this.scaleX = this.scaleY = sc;
            }
            else {
                this.scaleY = sc;
            }
        }
        var disw = (this.mStageW - this.$getWidth() * this.scaleX) / 2;
        this.x = disw;
    };
    AdaptGamelayer._i = function () {
        if (this.inst == null) {
            this.inst = new AdaptGamelayer();
        }
        return this.inst;
    };
    return AdaptGamelayer;
}(GameUtil.BassPanel));
__reflect(AdaptGamelayer.prototype, "AdaptGamelayer");
//# sourceMappingURL=AdaptGamelayer.js.map