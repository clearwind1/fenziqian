
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
		
	}
}