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
 * 获取网络图片
 * Created by pior on 15/11/13.
 */
var GetImageByUrl = (function (_super) {
    __extends(GetImageByUrl, _super);
    function GetImageByUrl(url, imgwidth, imgheight) {
        if (imgwidth === void 0) { imgwidth = 0; }
        if (imgheight === void 0) { imgheight = 0; }
        var _this = _super.call(this) || this;
        _this.imgUrl = url;
        _this.imgwidth = imgwidth;
        _this.imgheight = imgheight;
        _this.init();
        return _this;
    }
    GetImageByUrl.prototype.init = function () {
        RES.getResByUrl(this.imgUrl, this.comp, this, RES.ResourceItem.TYPE_IMAGE);
    };
    GetImageByUrl.prototype.comp = function (data) {
        console.log('data====', data);
        this.imag = new egret.Bitmap();
        this.imag.texture = data;
        this.addChild(this.imag);
        if (this.imgwidth != 0) {
            this.imag.width = this.imgwidth;
        }
        if (this.imgheight != 0) {
            this.imag.height = this.imgheight;
        }
        this.imag.anchorOffsetX = this.imgwidth / 2;
        this.imag.anchorOffsetY = this.imgheight / 2;
    };
    GetImageByUrl.prototype.getimg = function () {
        return this.imag;
    };
    return GetImageByUrl;
}(egret.DisplayObjectContainer));
__reflect(GetImageByUrl.prototype, "GetImageByUrl");
//# sourceMappingURL=GetImageByUrl.js.map