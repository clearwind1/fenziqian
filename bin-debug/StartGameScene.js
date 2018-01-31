/**
 * Created by pior on 16/9/9.
 */
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
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        return _super.call(this) || this;
    }
    StartGameScene.prototype.init = function () {
        // BGMPlayer._i().play(SoundName.sbgm);
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
        // var shap: MyBitmap = new MyBitmap(RES.getRes('startbg_png'), 0, 0);
        // shap.setanchorOff(0, 0);
        // shap.width = this.mStageW;
        // shap.height = this.mStageH;
        // this.addChild(shap);
        var _this = this;
        // var posx = this.mStageW / 2;
        // var posy = this.mStageH / 2;
        // var gametitletext = new GameUtil.MyTextField(posx, 400, 100, 0.5, 0.5);
        // gametitletext.setText(GameConfig.GAMENAME);
        // gametitletext.italic = true;
        // gametitletext.textColor = 0x75bfea;
        // this.addChild(gametitletext);
        // // this.addChild(new GameMenus(DisType.LeftTRight));
        // var startbtn = new GameUtil.Menu(this, 'startgamebtn_png', 'startgamebtn_png', this.startgame);
        // startbtn.setScaleMode();
        // startbtn.x = this.mStageW / 2;
        // startbtn.y = this.mStageH / 2;
        // this.addChild(startbtn);
        //------------------新的---------------------------//
        //消息提示
        var shap = new MyBitmap(RES.getRes('phonetip_jpg'), 0, 0);
        shap.setanchorOff(0, 0);
        shap.width = this.mStageW;
        shap.height = this.mStageH;
        this.addChild(shap);
        var btn = new GameUtil.Menu(this, 'msgtip_2_png', 'msgtip_2_png', function () { });
        btn.x = this.mStageW / 2;
        btn.y = 508;
        this.addChild(btn);
        btn.scaleX = btn.scaleY = 0;
        egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 400).wait(300).call(function () {
            GameData._i().gamesound[SoundName.s1].play();
            var btn2 = new GameUtil.Menu(_this, 'msgtip_1_png', 'msgtip_1_png', function () { });
            btn2.x = _this.mStageW / 2;
            btn2.y = 508;
            _this.addChild(btn2);
            btn2.scaleX = btn2.scaleY = 0;
            egret.Tween.get(btn).to({ y: 708 }, 400);
            egret.Tween.get(btn2).to({ scaleX: 1, scaleY: 1 }, 400).wait(300).call(function () {
                GameData._i().gamesound[SoundName.s1].play();
                var btn3 = new GameUtil.Menu(_this, 'msgtip_0_png', 'msgtip_0_png', _this.startgame);
                btn3.x = _this.mStageW / 2;
                btn3.y = 508;
                _this.addChild(btn3);
                btn3.scaleX = btn3.scaleY = 0;
                egret.Tween.get(btn2).to({ y: 708 }, 400);
                egret.Tween.get(btn).to({ y: 908 }, 400);
                egret.Tween.get(btn3).to({ scaleX: 1, scaleY: 1 }, 400).wait(300).call(function () {
                    egret.Tween.get(btn3, { loop: true }).to({ scaleX: 0.98, scaleY: 0.98 }, 800).to({ scaleX: 1, scaleY: 1 }, 800);
                }, _this);
            }, _this);
        }, this);
        GameData._i().gamesound[SoundName.s1].play();
        var tip = new MyBitmap(RES.getRes('tiptxt_png'), this.mStageW / 2, 1108);
        this.addChild(tip);
        egret.Tween.get(tip, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
    };
    /**开始游戏 */
    StartGameScene.prototype.startgame = function () {
        GameUtil.trace('startgame');
        GameData._i().gamesound[SoundName.s2].play(0, 1);
        GameUtil.GameScene.runscene(new GameScene());
        //GameUtil.GameScene.runscene(new AnswerPage());
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
