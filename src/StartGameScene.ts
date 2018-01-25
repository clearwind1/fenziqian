/**
 * Created by pior on 16/9/9.
 */

class StartGameScene extends GameUtil.BassPanel {

    public constructor() {
        super();
    }

    public init() {
        BGMPlayer._i().play(SoundName.startgamebgm);
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

        var btn: GameUtil.Menu = new GameUtil.Menu(this, 'msgtip_png', 'msgtip_png', this.startgame);
        btn.x = this.mStageW / 2;
        btn.y = 654;
        this.addChild(btn);
        btn.scaleX = btn.scaleY = 0;
        egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 600);

        var tip: MyBitmap = new MyBitmap(RES.getRes('tiptxt_png'), this.mStageW / 2, 1108);
        this.addChild(tip);

        egret.Tween.get(tip, { loop: true }).to({ alpha: 0 }, 0).wait(400).to({ alpha: 1 }, 0).wait(400);

    }

    /**开始游戏 */
    private startgame() {
        GameUtil.trace('startgame');
        GameUtil.GameScene.runscene(new GameScene());
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