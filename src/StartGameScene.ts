/**
 * Created by pior on 16/9/9.
 */

class StartGameScene extends GameUtil.BassPanel {

    public constructor() {
        super();
    }

    public init() {
        // BGMPlayer._i().play(SoundName.sbgm);
        var data: any = {
            'code': 1
        };
        this.show(data);
    }

    private show(data: any) {
        if (data['code'] == 1) {
            this.showbg();
        }
        else {
            GameUtil.trace(data['msg']);
        }
    }
    /**显示背景界面 */
    private showbg() {

        // var shap: MyBitmap = new MyBitmap(RES.getRes('startbg_png'), 0, 0);
        // shap.setanchorOff(0, 0);
        // shap.width = this.mStageW;
        // shap.height = this.mStageH;
        // this.addChild(shap);

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
        var shap: MyBitmap = new MyBitmap(RES.getRes('phonetip_jpg'), 0, 0);
        shap.setanchorOff(0, 0);
        shap.width = this.mStageW;
        shap.height = this.mStageH;
        this.addChild(shap);

        var btn: GameUtil.Menu = new GameUtil.Menu(this, 'msgtip_2_png', 'msgtip_2_png', () => { });
        btn.x = this.mStageW / 2;
        btn.y = 508;
        this.addChild(btn);
        btn.scaleX = btn.scaleY = 0;
        egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 400).wait(300).call(() => {
            GameData._i().gamesound[SoundName.s1].play();
            var btn2: GameUtil.Menu = new GameUtil.Menu(this, 'msgtip_1_png', 'msgtip_1_png', () => { });
            btn2.x = this.mStageW / 2;
            btn2.y = 508;
            this.addChild(btn2);
            btn2.scaleX = btn2.scaleY = 0;
            egret.Tween.get(btn).to({ y: 708 }, 400);
            egret.Tween.get(btn2).to({ scaleX: 1, scaleY: 1 }, 400).wait(300).call(() => {
                GameData._i().gamesound[SoundName.s1].play();
                var btn3: GameUtil.Menu = new GameUtil.Menu(this, 'msgtip_0_png', 'msgtip_0_png', this.startgame);
                btn3.x = this.mStageW / 2;
                btn3.y = 508;
                this.addChild(btn3);
                btn3.scaleX = btn3.scaleY = 0;
                egret.Tween.get(btn2).to({ y: 708 }, 400);
                egret.Tween.get(btn).to({ y: 908 }, 400);
                egret.Tween.get(btn3).to({ scaleX: 1, scaleY: 1 }, 400).wait(300).call(() => {
                    egret.Tween.get(btn3, { loop: true }).to({ scaleX: 0.98, scaleY: 0.98 }, 800).to({ scaleX: 1, scaleY: 1 }, 800);
                }, this);
            }, this);
        }, this);
        GameData._i().gamesound[SoundName.s1].play();

        var tip: MyBitmap = new MyBitmap(RES.getRes('tiptxt_png'), this.mStageW / 2, 1108);
        this.addChild(tip);

        egret.Tween.get(tip, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);

    }

    /**开始游戏 */
    private startgame() {
        GameUtil.trace('startgame');
        GameData._i().gamesound[SoundName.s2].play(0, 1);
        GameUtil.GameScene.runscene(new GameScene());
        //GameUtil.GameScene.runscene(new CreateHaibaoPage(2));
    }
    /**游戏排行榜 */
    private gamerank() {
        GameUtil.trace('gamerank');
        this.addChild(new GameRankPageShow());
    }
    /**游戏帮助 */
    private gamehelp() {
        GameUtil.trace('gamehelp');
        this.addChild(new GameHelpPageShow());
    }
    /**游戏设置，音乐与音效 */
    private setting() {
        GameUtil.trace('setting');
        this.addChild(new GameSetting());
    }
    /**更多游戏 */
    private moregame() {
        //this.addChild(new MoreGamePage());
    }
}