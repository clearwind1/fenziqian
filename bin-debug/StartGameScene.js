/**
 * Created by pior on 16/9/9.
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
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        return _super.call(this) || this;
    }
    StartGameScene.prototype.init = function () {
        BGMPlayer._i().play(SoundName.startgamebgm);
        var data = {
            'code': 1
        };
        this.show(data);
    };
    StartGameScene.prototype.show = function (data) {
        if (data['code'] == 1) {
            this.showbg();
        }
        else {
            GameUtil.trace(data['msg']);
        }
    };
    /**显示背景界面 */
    StartGameScene.prototype.showbg = function () {
        var shap = new MyBitmap(RES.getRes('startbg_png'), 0, 0);
        shap.setanchorOff(0, 0);
        shap.width = this.mStageW;
        shap.height = this.mStageH;
        this.addChild(shap);
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var gametitletext = new GameUtil.MyTextField(posx, 200, 100, 0.5, 0.5);
        gametitletext.setText(GameConfig.GAMENAME);
        gametitletext.italic = true;
        gametitletext.textColor = 0x75bfea;
        this.addChild(gametitletext);
        // this.addChild(new GameMenus(DisType.LeftTRight));
        var startbtn = new GameUtil.Menu(this, 'startgamebtn_png', 'startgamebtn_png', this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW / 2;
        startbtn.y = this.mStageH / 2;
        this.addChild(startbtn);
    };
    /**开始游戏 */
    StartGameScene.prototype.startgame = function () {
        GameUtil.trace('startgame');
        GameUtil.GameScene.runscene(new GameScene());
    };
    /**游戏排行榜 */
    StartGameScene.prototype.gamerank = function () {
        GameUtil.trace('gamerank');
        this.addChild(new GameRankPageShow());
    };
    /**游戏帮助 */
    StartGameScene.prototype.gamehelp = function () {
        GameUtil.trace('gamehelp');
        this.addChild(new GameHelpPageShow());
    };
    /**游戏设置，音乐与音效 */
    StartGameScene.prototype.setting = function () {
        GameUtil.trace('setting');
        this.addChild(new GameSetting());
    };
    /**更多游戏 */
    StartGameScene.prototype.moregame = function () {
        //this.addChild(new MoreGamePage());
    };
    return StartGameScene;
}(GameUtil.BassPanel));
__reflect(StartGameScene.prototype, "StartGameScene");
//# sourceMappingURL=StartGameScene.js.map