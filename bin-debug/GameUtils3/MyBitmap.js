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
 * 创建图片
 * Created by pior on 16/1/19.
 */
var MyBitmap = (function (_super) {
    __extends(MyBitmap, _super);
    function MyBitmap(texture, posx, posy, target) {
        if (posx === void 0) { posx = 0; }
        if (posy === void 0) { posy = 0; }
        if (target === void 0) { target = null; }
        var _this = _super.call(this) || this;
        _this.init(texture, posx, posy, target);
        return _this;
    }
    MyBitmap.prototype.init = function (texture, posx, posy, target) {
        this.texture = texture;
        this.$setX(posx);
        this.$setY(posy);
        this.setanchorOff(0.5, 0.5);
        if (target != null) {
            GameUtil.relativepos(this, target, posx, posy);
        }
    };
    MyBitmap.prototype.setNewTexture = function (texture) {
        this.texture = texture;
        //this.setanchorOff(0.5,0.5);
    };
    MyBitmap.prototype.setanchorOff = function (anchorx, anchory) {
        this.anchorOffsetX = this.$getWidth() * anchorx;
        this.anchorOffsetY = this.$getHeight() * anchory;
    };
    return MyBitmap;
}(egret.Bitmap));
__reflect(MyBitmap.prototype, "MyBitmap");
//# sourceMappingURL=MyBitmap.js.map