
class CreateHaibaoPage extends GameUtil.BassPanel {
	private selectID: number = 0;
	private tipContain: egret.DisplayObjectContainer;
	public constructor(selectid: number) {
		super();
		this.selectID = selectid;
	}
	public init(selectid) {
		this.show();
	}
	public show() {
		var Haibaopic: MyBitmap = new MyBitmap(RES.getRes('haibao' + this.selectID + '_jpg'), 0, 0);
		Haibaopic.setanchorOff(0, 0);
		this.addChild(Haibaopic);

		var nickname: GameUtil.MyTextField = new GameUtil.MyTextField(442, 93, 40, 0.5, 0.5);
		nickname.setText(GameData._i().Nickname);
		nickname.textColor = 0xffd11f;
		this.addChild(nickname);

		//头像
		var headimg: GetImageByUrl = new GetImageByUrl(GameData._i().imageUrl, 140, 140);
		headimg.x = 55;
		headimg.y = 43;
		this.addChild(headimg);

		// var backbtn: GameUtil.Menu = new GameUtil.Menu(this, 'backbtn_png', 'backbtn_png', this.backgamescene);
		// backbtn.setScaleMode();
		// backbtn.x = 375;
		// backbtn.y = 1130;
		// this.addChild(backbtn);

		this.tipContain = new egret.DisplayObjectContainer;
		this.addChild(this.tipContain);

		egret.setTimeout(this.showgz, this, 1000);
	}

	private showgz() {
		var coverbg: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
		this.tipContain.addChild(coverbg);

		var tipbg: MyBitmap = new MyBitmap(RES.getRes('tipgz_png'), this.mStageW / 2, 600);
		this.tipContain.addChild(tipbg);

		var closebtn: GameUtil.Menu = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closegz);
		closebtn.setScaleMode();
		closebtn.x = 648;
		closebtn.y = 484;
		this.tipContain.addChild(closebtn);

		var havegzbtn: GameUtil.Menu = new GameUtil.Menu(this, 'havegzbtn_png', 'havegzbtn_png', this.closegz);
		havegzbtn.setScaleMode();
		havegzbtn.x = 201;
		havegzbtn.y = 829;
		this.tipContain.addChild(havegzbtn);

		var donthavegzbtn: GameUtil.Menu = new GameUtil.Menu(this, 'donthavegzbtn_png', 'donthavegzbtn_png', this.jumpgz);
		donthavegzbtn.setScaleMode();
		donthavegzbtn.x = 552;
		donthavegzbtn.y = 829;
		this.tipContain.addChild(donthavegzbtn);

	}

	private closegz() {
		this.removeChild(this.tipContain);
	}
	private jumpgz() {
		window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MjQzMTA5MA==&scene=124#wechat_redirect";
	}

	private backgamescene() {
		GameUtil.GameScene.runscene(new GameScene());
	}
}