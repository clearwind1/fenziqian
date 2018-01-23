
class QuestionPage extends GameUtil.BassPanel {
	public constructor() {
		super();
	}
	public init() {
		this.showbg();
	}

	private showbg() {
		var bg: MyBitmap = new MyBitmap(RES.getRes('quespic_jpg'), 0, 0);
		bg.setanchorOff(0, 0);
		this.addChild(bg);

		var btn: GameUtil.Menu = new GameUtil.Menu(this, 'checkbtn_png', 'checkbtn_png', this.showgz);
		btn.setScaleMode();
		btn.x = this.mStageW / 2;
		btn.y = 823;
		this.addChild(btn);
	}
	private showgz() {
		var coverbg: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
		this.addChild(coverbg);

		var tipbg: MyBitmap = new MyBitmap(RES.getRes('tipgz_png'), this.mStageW / 2, this.mStageH / 2);
		this.addChild(tipbg);

		var closebtn: GameUtil.Menu = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.anserpage);
		closebtn.setScaleMode();
		closebtn.x = 570;
		closebtn.y = 500;
		this.addChild(closebtn);

		var havegzbtn: GameUtil.Menu = new GameUtil.Menu(this, 'havegzbtn_png', 'havegzbtn_png', this.anserpage);
		havegzbtn.setScaleMode();
		havegzbtn.x = 290;
		havegzbtn.y = 755;
		this.addChild(havegzbtn);
		
		var donthavegzbtn: GameUtil.Menu = new GameUtil.Menu(this, 'donthavegzbtn_png', 'donthavegzbtn_png', this.jumpgz);
		donthavegzbtn.setScaleMode();
		donthavegzbtn.x = 470;
		donthavegzbtn.y = 755;
		this.addChild(donthavegzbtn);

	}
	private anserpage() {
		GameUtil.GameScene.runscene(new AnswerPage());
	}
	private jumpgz() {
		window.location.href = "https://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzAxNDQyMjM4Ng==#wechat_webview_type=1&wechat_redirect";
	}
}