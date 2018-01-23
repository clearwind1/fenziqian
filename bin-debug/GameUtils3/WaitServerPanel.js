/**
 * 等待响应
 * Created by pior on 15/11/11.
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
var GameUtil;
(function (GameUtil) {
    var WaitServerPanel = (function (_super) {
        __extends(WaitServerPanel, _super);
        function WaitServerPanel(alpha) {
            if (alpha === void 0) { alpha = 0; }
            var _this = _super.call(this) || this;
            _this.init(alpha);
            return _this;
        }
        WaitServerPanel.prototype.init = function (alpha) {
            this.coverBg = GameUtil.createRect(0, 0, 640, 1136, 0);
            this.addChild(this.coverBg);
            this.touchEnabled = true;
        };
        WaitServerPanel.prototype.setAlpha = function (aplha) {
            this.coverBg.alpha = aplha;
        };
        WaitServerPanel.getInstace = function () {
            if (this._instance == null) {
                this._instance = new GameUtil.WaitServerPanel(0);
            }
            return this._instance;
        };
        return WaitServerPanel;
    }(egret.DisplayObjectContainer));
    GameUtil.WaitServerPanel = WaitServerPanel;
    __reflect(WaitServerPanel.prototype, "GameUtil.WaitServerPanel");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=WaitServerPanel.js.map