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
var SoundControl = (function (_super) {
    __extends(SoundControl, _super);
    function SoundControl() {
        return _super.call(this) || this;
    }
    SoundControl.prototype.init = function () {
        this.showbtn();
    };
    SoundControl.prototype.showbtn = function () {
        this.btnon = new GameUtil.Menu(this, 'soundbtnon_png', 'soundbtnon_png', this.changesound);
        this.btnon.x = this.mStageW - 60;
        this.btnon.y = 60;
        this.addChild(this.btnon);
        this.setrotation(true);
    };
    SoundControl.prototype.changesound = function () {
        GameConfig._i().bgamesound = !GameConfig._i().bgamesound;
        GameConfig._i().bgamemusic = !GameConfig._i().bgamemusic;
        if (!GameConfig._i().bgamemusic) {
            BGMPlayer._i().setVolme(0);
            this.setrotation(false);
            this.btnon.setButtonTexture('soundbtnoff_png', 'soundbtnoff_png');
        }
        else {
            BGMPlayer._i().setVolme(1);
            this.setrotation(true);
            this.btnon.setButtonTexture('soundbtnon_png', 'soundbtnon_png');
        }
    };
    SoundControl.prototype.setrotation = function (b) {
        if (b) {
            egret.Tween.get(this.btnon, { loop: true }).to({ rotation: 359 }, 3000);
        }
        else {
            egret.Tween.removeTweens(this.btnon);
            this.btnon.rotation = 0;
        }
    };
    return SoundControl;
}(GameUtil.BassPanel));
__reflect(SoundControl.prototype, "SoundControl");
