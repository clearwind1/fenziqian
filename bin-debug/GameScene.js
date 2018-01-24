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
/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.btouch = false;
        return _this;
    }
    GameScene.prototype.init = function () {
        BGMPlayer._i().play(SoundName.gamebgm); //背景音乐
        this.intervalarr = [];
        this.initdata();
        this.showbg();
        this.addtouch();
        this.bindkeyboard();
        this.gameinterval();
    };
    /**
     * 初始化数据
     */
    GameScene.prototype.initdata = function () {
        GameData._i().GameOver = false;
        GameData._i().GameScore = 0;
        GameData._i().GameLevel = 1;
        this.picNumber = 1;
        this.DelayTime = 100; //1000
    };
    GameScene.prototype.showbg = function () {
        // this.picControl = new MyBitmap(RES.getRes('phonetip_jpg'), 0, 0);
        // this.picControl.setanchorOff(0, 0);
        // this.addChild(this.picControl);
        //egret.setTimeout(this.touchtap, this, this.DelayTime);
        //this.addChild(GameScore._i());
        var bg = new MyBitmap(RES.getRes('pic0_jpg'), 0, 0);
        bg.setanchorOff(0, 0);
        this.addChild(bg);
        //-----------------新的---------------//
        this.FirstContain = new egret.DisplayObjectContainer;
        this.addChild(this.FirstContain);
        this.SecondContain = new egret.DisplayObjectContainer;
        this.addChild(this.SecondContain);
        this.showLookphone();
    };
    GameScene.prototype.showLookphone = function () {
        var lookphone = new MyBitmap(RES.getRes('lookphone_png'), this.mStageW / 2, this.mStageH / 2);
        lookphone.$setScaleX(1.4);
        lookphone.$setScaleY(1.4);
        this.FirstContain.addChild(lookphone);
        egret.Tween.get(lookphone).to({ scaleX: 1, scaleY: 1 }, 500).wait(500).call(this.showmsg, this, [0]);
    };
    GameScene.prototype.showmsg = function (id) {
        var _this = this;
        var pos = [[430, 297], [109, 359], [109, 430]];
        var img = new MyBitmap(RES.getRes('showmsg' + id + '_png'), pos[id][0], pos[id][1]);
        img.setanchorOff(0, 0.5);
        this.FirstContain.addChild(img);
        id++;
        egret.setTimeout(function () { if (id > 2) {
            _this.showamazing();
        }
        else
            (_this.showmsg(id)); }, this, 1000);
    };
    GameScene.prototype.showamazing = function () {
        var img = new MyBitmap(RES.getRes('pic1_jpg'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(img);
        egret.setTimeout(this.showresb, this, 1000);
    };
    GameScene.prototype.showresb = function () {
        var _this = this;
        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 700).call(function () { _this.showresbtap(0); }, this);
        //this.showresbtap(0);
    };
    GameScene.prototype.showresbtap = function (id) {
        var _this = this;
        var img = new MyBitmap(RES.getRes('resbtpic' + id + '_png'), 169, 553);
        img.setanchorOff(0, 0.5);
        this.FirstContain.addChild(img);
        id++;
        egret.setTimeout(function () { if (id > 2) { }
        else {
            console.log('id===', id);
            _this.FirstContain.removeChild(img);
            egret.setTimeout(function () { _this.showresbtap(id); }, _this, 1000);
        } ; }, this, 1000);
    };
    /**
     * 游戏定时器
     */
    GameScene.prototype.gameinterval = function () {
        GameUtil.trace('interval');
    };
    /**
     * 绑定键盘事件
     */
    GameScene.prototype.bindkeyboard = function () {
        if (!GameConfig.IsBindKeyboard) {
            return;
        }
        KeyBoard._i().bindfun(this, this.keyup, KEYCODE.UP);
        KeyBoard._i().bindfun(this, this.keydown, KEYCODE.DOWN);
        KeyBoard._i().bindfun(this, this.keyleft, KEYCODE.LEFT);
        KeyBoard._i().bindfun(this, this.keyright, KEYCODE.RIGHT);
        KeyBoard._i().bindfun(this, this.keyspace, KEYCODE.SPACE);
    };
    /**
     * 检查游戏是否结束
     */
    GameScene.prototype.checkgameover = function () {
        var bgameover = false;
        if (bgameover) {
            this.gameover();
        }
    };
    GameScene.prototype.changepic = function () {
        var _this = this;
        this.picLBControl = new MyBitmap(RES.getRes('pic' + this.picNumber + '_jpg'), 0, 0);
        this.picLBControl.setanchorOff(0, 0);
        this.addChild(this.picLBControl);
        this.picLBControl.alpha = 0;
        egret.Tween.get(this.picLBControl).to({ alpha: 1 }, this.DelayTime);
        egret.Tween.get(this.picControl).to({ alpha: 0, x: 0 }, this.DelayTime).call(function () {
            _this.picControl.texture = _this.picLBControl.texture;
            _this.picControl.alpha = 1;
            _this.removeChild(_this.picLBControl);
            if (_this.picNumber == 3) {
                egret.Tween.get(_this.picControl).to({ x: -1350 }, 2000).call(function () {
                    egret.setTimeout(_this.touchtap, _this, _this.DelayTime);
                }, _this);
            }
            else {
                egret.setTimeout(_this.touchtap, _this, _this.DelayTime);
            }
        }, this);
    };
    GameScene.prototype.touchtap = function () {
        if (this.picNumber >= 23) {
            GameUtil.GameScene.runscene(new QuestionPage(), SceneEffect.TransAlpha);
            return;
        }
        this.picNumber++;
        this.changepic();
    };
    /**
     * 触摸层
     */
    GameScene.prototype.addtouch = function () {
        var touchshap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0);
        this.addChild(touchshap);
        touchshap.$setTouchEnabled(true);
        touchshap.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (GameData._i().GameOver) {
                return;
            }
            //this.touchtap();            
        }, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbegin, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmove, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_END, this.touchend, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchout, this);
    };
    GameScene.prototype.touchbegin = function (e) {
        if (GameData._i().GameOver) {
            return;
        }
        this.btouch = true;
    };
    GameScene.prototype.touchmove = function (e) {
        if (this.btouch) {
        }
    };
    GameScene.prototype.touchend = function (e) {
        if (this.btouch) {
            this.btouch = false;
        }
    };
    GameScene.prototype.touchout = function (e) {
        if (this.btouch) {
            this.btouch = false;
        }
    };
    /**
     * 游戏结束
     */
    GameScene.prototype.gameover = function () {
        console.log("GameOver");
        this.clearinter();
        GameData._i().GameOver = true;
        this.addChild(new GameOverPageShow());
    };
    /**
     *下一关
     */
    GameScene.prototype.nextlevelgame = function () {
    };
    /**
     * 重置游戏数据
     */
    GameScene.prototype.reset = function () {
        this.gameinterval();
        this.restart();
    };
    /**
     * 清除定时器
     */
    GameScene.prototype.clearinter = function () {
        GameUtil.clearinterval(this.intervalarr);
    };
    /**
     * 退出游戏，回到开始界面
     */
    GameScene.prototype.exitgame = function () {
        GameUtil.GameScene.runscene(new StartGameScene());
    };
    /**
     * 重新开始游戏
     */
    GameScene.prototype.restart = function () {
    };
    /**
     * 需要绑定的键盘事件
     */
    GameScene.prototype.keydown = function () {
    };
    GameScene.prototype.keyleft = function () {
    };
    GameScene.prototype.keyright = function () {
    };
    GameScene.prototype.keyup = function () {
    };
    GameScene.prototype.keyspace = function () {
        //GameData._i().GamePause = !GameData._i().GamePause;
    };
    return GameScene;
}(GameUtil.BassPanel));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map