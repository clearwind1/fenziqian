/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
class GameScene extends GameUtil.BassPanel {

    private intervalarr: number[];      //存储定时器标志
    private touchlayer: egret.Shape;    //触摸层
    private beginpointx: number;
    private beginpointy: number;
    private picControl: MyBitmap;
    private picLBControl: MyBitmap;
    private picNumber: number;
    private DelayTime: number;

    public constructor() {
        super();
    }
    public init() {
        BGMPlayer._i().play(SoundName.gamebgm);     //背景音乐
        this.intervalarr = [];
        this.initdata();
        this.showbg();
        this.addtouch();
        this.bindkeyboard();
        this.gameinterval();
    }
    /**
     * 初始化数据
     */
    private initdata() {
        GameData._i().GameOver = false;
        GameData._i().GameScore = 0;
        GameData._i().GameLevel = 1;
        this.picNumber = 1;
        this.DelayTime = 500;//1000
    }
    /**
     * 显示背景
     */
    private showbg() {
        this.picControl = new MyBitmap(RES.getRes('pic1_jpg'), 0, 0);
        this.picControl.setanchorOff(0, 0);
        this.addChild(this.picControl);

        egret.setTimeout(this.touchtap, this, this.DelayTime);

        //this.addChild(GameScore._i());
    }
    /**
     * 游戏定时器
     */
    private gameinterval() {
        GameUtil.trace('interval');
    }
    /**
     * 绑定键盘事件
     */
    private bindkeyboard() {
        if (!GameConfig.IsBindKeyboard) {
            return;
        }
        KeyBoard._i().bindfun(this, this.keyup, KEYCODE.UP);
        KeyBoard._i().bindfun(this, this.keydown, KEYCODE.DOWN);
        KeyBoard._i().bindfun(this, this.keyleft, KEYCODE.LEFT);
        KeyBoard._i().bindfun(this, this.keyright, KEYCODE.RIGHT);
        KeyBoard._i().bindfun(this, this.keyspace, KEYCODE.SPACE);
    }
    /**
     * 检查游戏是否结束
     */
    private checkgameover() {
        var bgameover = false;
        if (bgameover) {
            this.gameover();
        }
    }
    private changepic() {

        this.picLBControl = new MyBitmap(RES.getRes('pic' + this.picNumber + '_jpg'), 0, 0);
        this.picLBControl.setanchorOff(0, 0);
        this.addChild(this.picLBControl);
        this.picLBControl.alpha = 0;

        egret.Tween.get(this.picLBControl).to({ alpha: 1 }, this.DelayTime);
        egret.Tween.get(this.picControl).to({ alpha: 0, x: 0 }, this.DelayTime).call(() => {
            this.picControl.texture = this.picLBControl.texture;
            this.picControl.alpha = 1;

            this.removeChild(this.picLBControl);
            if (this.picNumber == 3) {
                egret.Tween.get(this.picControl).to({ x: -1350 }, 2000).call(() => {
                    egret.setTimeout(this.touchtap, this, this.DelayTime);
                }, this);
            } else {
                egret.setTimeout(this.touchtap, this, this.DelayTime);
            }
        }, this);
    }
    private touchtap() {
        if (this.picNumber >= 23) {
            GameUtil.GameScene.runscene(new QuestionPage(), SceneEffect.TransAlpha);
            return;
        }

        this.picNumber++;
        this.changepic();
    }
    /**
     * 触摸层
     */
    private addtouch() {
        let touchshap: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0);
        this.addChild(touchshap);
        touchshap.$setTouchEnabled(true);
        touchshap.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
            if (GameData._i().GameOver) {
                return;
            }

            //this.touchtap();            

        }, this);

        // touchshap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbegin, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmove, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_END, this.touchend, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchout, this);
    }
    private btouch: boolean = false;
    private touchbegin(e: egret.TouchEvent) {
        if (GameData._i().GameOver) {
            return;
        }
        this.btouch = true;
    }
    private touchmove(e: egret.TouchEvent) {
        if (this.btouch) {
        }
    }
    private touchend(e: egret.TouchEvent) {
        if (this.btouch) {
            this.btouch = false;
        }
    }
    private touchout(e: egret.TouchEvent) {
        if (this.btouch) {
            this.btouch = false;
        }
    }

    /**
     * 游戏结束
     */
    public gameover() {
        console.log("GameOver");
        this.clearinter();
        GameData._i().GameOver = true;
        this.addChild(new GameOverPageShow());
    }
    /**
     *下一关
     */
    private nextlevelgame() {

    }
    /**
     * 重置游戏数据
     */
    public reset() {
        this.gameinterval();
        this.restart();
    }
    /**
     * 清除定时器
     */
    private clearinter() {
        GameUtil.clearinterval(this.intervalarr);
    }
    /**
     * 退出游戏，回到开始界面
     */
    private exitgame() {
        GameUtil.GameScene.runscene(new StartGameScene());
    }
    /**
     * 重新开始游戏
     */
    private restart() {

    }
    /**
     * 需要绑定的键盘事件
     */
    private keydown() {
    }
    private keyleft() {
    }
    private keyright() {
    }
    private keyup() {
    }
    private keyspace() {
        //GameData._i().GamePause = !GameData._i().GamePause;
    }
}