
class CreateHaibaoPage extends GameUtil.BassPanel {
	private selectID: number = 0;
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

		var backbtn: GameUtil.Menu = new GameUtil.Menu(this, 'backbtn_png', 'backbtn_png', this.backgamescene);
		backbtn.setScaleMode();
		backbtn.x = 375;
		backbtn.y = 1130;
		this.addChild(backbtn);
	}

	private backgamescene() {
		GameUtil.GameScene.runscene(new GameScene());
	}
}