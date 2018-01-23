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
 * 滚动框
 * Created by pior on 15/11/3.
 */
var GameUtil;
(function (GameUtil) {
    /**
     * 创建一个滚动框
     */
    var ScrollView = (function (_super) {
        __extends(ScrollView, _super);
        function ScrollView(swidth, sheight, speed) {
            if (speed === void 0) { speed = 0.5; }
            var _this = _super.call(this) || this;
            _this.scrollview = new egret.ScrollView();
            _this.content = new egret.DisplayObjectContainer();
            _this.addChild(_this.scrollview);
            _this.scrollview.width = swidth;
            _this.scrollview.height = sheight;
            _this.scrollview.scrollSpeed = speed;
            _this.init();
            return _this;
        }
        ScrollView.prototype.init = function () {
            this.scrollview.setContent(this.content);
        };
        /**
         * 添加滚动元素
         * @param item {any} 元素
         */
        ScrollView.prototype.putItem = function (item) {
            this.content.addChild(item);
        };
        ScrollView.prototype.clearItem = function () {
            this.content.removeChildren();
        };
        ScrollView.prototype.getScorllTop = function () {
            return this.scrollview.scrollTop;
        };
        ScrollView.prototype.setScorllTop = function (value) {
            this.scrollview.scrollTop = value;
        };
        ScrollView.prototype.getScorllView = function () {
            return this.scrollview;
        };
        return ScrollView;
    }(egret.DisplayObjectContainer));
    GameUtil.ScrollView = ScrollView;
    __reflect(ScrollView.prototype, "GameUtil.ScrollView");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=ScrollView.js.map