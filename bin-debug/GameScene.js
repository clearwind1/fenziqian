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
        //测试
        //this.showsce();
    };
    //画面2
    GameScene.prototype.showLookphone = function () {
        var lookphone = new MyBitmap(RES.getRes('lookphone_png'), this.mStageW / 2, this.mStageH / 2);
        lookphone.$setScaleX(1.4);
        lookphone.$setScaleY(1.4);
        this.FirstContain.addChild(lookphone);
        egret.Tween.get(lookphone).to({ scaleX: 1, scaleY: 1 }, 500).wait(500).call(this.showmsg, this, [0]);
    };
    //
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
    //画面3
    GameScene.prototype.showamazing = function () {
        this.FirstContain.alpha = 0;
        var img = new MyBitmap(RES.getRes('pic0_1_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(img);
        var sx = new MyBitmap(RES.getRes('pic0_0_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(sx);
        egret.Tween.get(sx, { loop: true }).to({ x: this.mStageW / 2 + 4, y: this.mStageH / 2 - 4 }).wait(2).to({ x: this.mStageW / 2 - 4, y: this.mStageH / 2 + 4 }).wait(2);
        egret.setTimeout(this.showresb, this, 1000);
        this.showlyric(0, this.SecondContain);
    };
    //画面4
    GameScene.prototype.showresb = function () {
        var _this = this;
        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 700).call(function () { _this.showresbtap(0); }, this);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 700);
        this.showlyric(1, this.FirstContain);
        //this.showresbtap(0);
    };
    GameScene.prototype.showresbtap = function (id) {
        var _this = this;
        var img = new MyBitmap(RES.getRes('resbtpic' + id + '_png'), 169, 553);
        img.setanchorOff(0, 0.5);
        this.FirstContain.addChild(img);
        id++;
        egret.setTimeout(function () { if (id > 2) {
            _this.showflfq();
        }
        else {
            console.log('id===', id);
            _this.FirstContain.removeChild(img);
            egret.setTimeout(function () { _this.showresbtap(id); }, _this, 1200);
        } ; }, this, 1000);
    };
    //画面5
    GameScene.prototype.showflfq = function () {
        var _this = this;
        this.FirstContain.removeChildren();
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0.4;
        var zt = new MyBitmap(RES.getRes('pic5_1_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(zt);
        var ys = new MyBitmap(RES.getRes('pic5_2_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(ys);
        var rw = new MyBitmap(RES.getRes('pic5_0_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(rw);
        var qt = new MyBitmap(RES.getRes('pic5_qt_png'), 254, 1114);
        this.SecondContain.addChild(qt);
        egret.Tween.get(qt, { loop: true }).to({ x: 260, y: 1100 }, 500).to({ x: 240, y: 1110 }, 500).to({ x: 243, y: 1120 }, 500).to({ x: 254, y: 1114 }, 500);
        var qt2 = new MyBitmap(RES.getRes('pic5_qt_png'), 622, 471);
        qt2.$setRotation(-20);
        this.SecondContain.addChild(qt2);
        egret.Tween.get(qt2, { loop: true }).to({ x: 618, y: 466 }, 500).to({ x: 630, y: 466 }, 500).to({ x: 629, y: 473 }, 500).to({ x: 622, y: 471 }, 500);
        var tq = new MyBitmap(RES.getRes('pic5_tq_png'), 186, 867);
        this.SecondContain.addChild(tq);
        tq.scaleX = tq.scaleY = 0.5;
        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 500).call(function () {
            egret.Tween.get(tq).to({ alpha: 0, scaleX: 1.5, scaleY: 1.5, x: 53, y: 798, rotation: 27 }, 500).call(function () {
                egret.Tween.get(ys, { loop: true }).to({ scaleX: -1, rotation: -40 }).wait(1000).to({ scaleX: 1, rotation: 0 }).wait(1000);
                egret.Tween.get(rw, { loop: true }).to({ scaleX: -1, rotation: -40 }).wait(1000).to({ scaleX: 1, rotation: 0 }).wait(1000);
            }, _this);
        }, this);
        this.showlyric(2, this.SecondContain);
        egret.setTimeout(this.showgzlight, this, 3000);
    };
    //画面6
    GameScene.prototype.showgzlight = function () {
        var _this = this;
        this.FirstContain.alpha = 0;
        var bg = new MyBitmap(RES.getRes('pic6_0_png'), 0, 0);
        bg.setanchorOff(0, 0);
        this.FirstContain.addChild(bg);
        var hand = new MyBitmap(RES.getRes('pic6_1_png'), 494, 957);
        this.FirstContain.addChild(hand);
        var light = new MyBitmap(RES.getRes('pic6_2_png'), 1827, 785);
        this.FirstContain.addChild(light);
        egret.Tween.get(light, { loop: true }).to({ alpha: 0 }).wait(300).to({ alpha: 1 }).wait(300);
        this.showlyric(3, this.FirstContain);
        this.showlyric(4, this.FirstContain);
        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 500);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 500).call(function () {
            egret.Tween.get(hand).to({ rotation: 1 }).wait(100).to({ rotation: 0 }).wait(100).to({ rotation: 1 }).wait(400).call(function () {
                egret.Tween.get(_this.FirstContain).to({ x: -1350 }, 2000).wait(500).call(function () {
                    _this.showWind();
                }, _this);
            }, _this);
        }, this);
    };
    //画面7
    GameScene.prototype.showWind = function () {
        var _this = this;
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;
        //this.SecondContain.scaleX = this.SecondContain.scaleY = 0.3;
        var bg = new MyBitmap(RES.getRes('pic7_0_jpg'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(bg);
        this.showlyric(5, this.SecondContain);
        var wind = new MyBitmap(RES.getRes('pic7_1_png'), 440, 825);
        wind.setanchorOff(0.5, 1);
        wind.scaleX = 0;
        //wind.scaleY = 0;
        this.SecondContain.addChild(wind);
        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 500);
        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 500).call(function () {
            egret.Tween.get(wind).to({ scaleX: 1 }, 200).to({ scaleX: 1.1 }, 400).to({ scaleX: 1 }, 400).to({ scaleX: 1.1 }, 400).call(function () {
                _this.showflymoney();
            });
        }, this);
    };
    //画面8
    GameScene.prototype.showflymoney = function () {
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 0;
        this.FirstContain.x = 0;
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic7_jpg'), posx, posy);
        this.FirstContain.addChild(img);
        var wind = new MyBitmap(RES.getRes('pic8_0_png'), posx, posy);
        this.FirstContain.addChild(wind);
        egret.Tween.get(wind, { loop: true }).to({ scaleX: 1.1 }, 300).to({ scaleX: 1 }, 300);
        var money = new MyBitmap(RES.getRes('pic8_1_png'), posx, posy);
        this.FirstContain.addChild(money);
        egret.Tween.get(money, { loop: true }).to({ y: posy - 4 }, 300).to({ y: posy }, 300);
        this.showlyric(6, this.FirstContain);
        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 500);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 500);
        egret.setTimeout(this.showscn, this, 1000);
    };
    //画面9
    GameScene.prototype.showscn = function () {
        this.FirstContain.removeChildren();
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 1;
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic7_jpg'), posx, posy);
        this.SecondContain.addChild(img);
        var qt = new MyBitmap(RES.getRes('pic9_0_png'), posx, posy);
        this.SecondContain.addChild(qt);
        var wind = new MyBitmap(RES.getRes('pic9_1_png'), posx, -200);
        this.SecondContain.addChild(wind);
        egret.Tween.get(wind).to({ y: posy }, 300).call(function () {
            egret.Tween.get(qt).to({ x: posx - 15 }, 100).to({ x: posx + 15 }, 100).to({ x: posx }, 100);
        }, this);
        this.showlyric(7, this.SecondContain);
        egret.setTimeout(this.showsct, this, 800);
    };
    ////画面10
    GameScene.prototype.showsct = function () {
        this.FirstContain.alpha = 0;
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic10_jpg'), posx, posy);
        this.FirstContain.addChild(img);
        var rain = new MyBitmap(RES.getRes('pic10_1_png'), posx, posy);
        this.FirstContain.addChild(rain);
        egret.Tween.get(rain, { loop: true }).to({ alpha: 0 }).wait(300).to({ alpha: 1 }).wait(200);
        var lhand = new MyBitmap(RES.getRes('pic10_5_png'), posx, posy);
        this.FirstContain.addChild(lhand);
        egret.Tween.get(lhand, { loop: true }).to({ rotation: 1 }, 200).to({ rotation: 0 }, 150);
        var head = new MyBitmap(RES.getRes('pic10_4_png'), posx, posy);
        this.FirstContain.addChild(head);
        egret.Tween.get(head, { loop: true }).to({ rotation: 0 }, 200).to({ rotation: 1 }, 200);
        var body = new MyBitmap(RES.getRes('pic10_6_png'), posx, posy);
        this.FirstContain.addChild(body);
        var rhand = new MyBitmap(RES.getRes('pic10_3_png'), posx, posy);
        this.FirstContain.addChild(rhand);
        egret.Tween.get(rhand, { loop: true }).to({ rotation: 1 }, 200).to({ rotation: 0 }, 150);
        var redpack = new MyBitmap(RES.getRes('pic10_2_png'), 644, 414);
        this.FirstContain.addChild(redpack);
        egret.Tween.get(redpack, { loop: true }).to({ y: 404 }, 300).to({ y: 414 }, 300);
        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 500);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 500);
        this.showlyric(8, this.FirstContain);
        egret.setTimeout(this.showsce, this, 1200);
    };
    ////画面11
    GameScene.prototype.showsce = function () {
        var _this = this;
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic11_jpg'), 83, 297);
        img.anchorOffsetX = 83;
        img.anchorOffsetY = 297;
        this.SecondContain.addChild(img);
        var light = new MyBitmap(RES.getRes('pic11_2_png'), posx, posy);
        this.SecondContain.addChild(light);
        egret.Tween.get(light, { loop: true }).to({ alpha: 0 }).wait(500).to({ alpha: 1 }).wait(500);
        var snowman = new MyBitmap(RES.getRes('pic11_1_png'), posx, 1081);
        this.SecondContain.addChild(snowman);
        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 500);
        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 500);
        this.showlyric(9, this.SecondContain);
        egret.setTimeout(function () {
            _this.SecondContain.removeChild(light);
            _this.SecondContain.removeChild(snowman);
            egret.Tween.get(img).to({ scaleX: 5, scaleY: 5 }, 400).call(function () {
                _this.showsctw();
            }, _this);
        }, this, 1200);
    };
    ////画面12
    GameScene.prototype.showsctw = function () {
        this.SecondContain.removeChildren();
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 1;
        console.log('loging====');
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic7_jpg'), 83, 297);
        img.anchorOffsetX = 83;
        img.anchorOffsetY = 297;
        this.FirstContain.addChild(img);
        var body = new MyBitmap(RES.getRes('pic12_2_png'), posx, posy);
        this.FirstContain.addChild(body);
        egret.Tween.get(body, { loop: true }).to({ scaleX: 0.97, scaleY: 0.97 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        var xian = new MyBitmap(RES.getRes('pic12_3_png'), 632, 412);
        this.FirstContain.addChild(xian);
        egret.Tween.get(xian, { loop: true }).to({ y: 416 }, 600).to({ y: 412 }, 600);
        var door = new MyBitmap(RES.getRes('pic12_1_png'), posx, posy);
        this.FirstContain.addChild(door);
        var light = new MyBitmap(RES.getRes('pic12_0_png'), 393, 1234);
        this.FirstContain.addChild(light);
        egret.Tween.get(light, { loop: true }).to({ scaleX: 1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
        console.log('loging====');
        // egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 500);
        // egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 500);
        this.showlyric(10, this.FirstContain);
    };
    //添加显示歌词    
    GameScene.prototype.showlyric = function (id, contain) {
        var posx = [361, 350, 368, 412, 1845, 379, 382, 363, 366, 432, 378];
        var posy = [201, 1222, 219, 124, 1132, 1107, 519, 1178, 170, 245, 120];
        var lyricpic = new MyBitmap(RES.getRes('cripic' + id + '_png'), posx[id], posy[id]);
        contain.addChild(lyricpic);
        egret.Tween.get(lyricpic, { loop: true }).to({ alpha: 0 }).wait(300).to({ alpha: 1 }).wait(300);
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