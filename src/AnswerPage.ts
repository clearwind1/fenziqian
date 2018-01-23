
class AnswerPage extends GameUtil.BassPanel {

	private selectID: number = 0;	
	private selectP: MyBitmap;

	public constructor() {
		super();
	}
	public init() {
		this.show();
	}

	public show() {
		var askerbg: MyBitmap = new MyBitmap(RES.getRes('askerbg_jpg'), 0, 0);
		askerbg.setanchorOff(0, 0);
		this.addChild(askerbg);

		for (let i: number = 0; i < 5; i++){
			var btnpicstr = 'askerpic' + i + '_png';
			let askerpic: GameUtil.Menu = new GameUtil.Menu(this, btnpicstr, btnpicstr, this.selectC, [i]);
			askerpic.x = 375;
			askerpic.y = 748 + i * 76;
			this.addChild(askerpic);
		}
		this.selectP = new MyBitmap(RES.getRes('askerselectp_png'), 160, 748);
		this.addChild(this.selectP);

		var askerbtn = new GameUtil.Menu(this, 'askerbtn_png', 'askerbtn_png', this.upanswer);
		askerbtn.setScaleMode();
		askerbtn.x = 375;
		askerbtn.y = 1193;
		this.addChild(askerbtn);

	}

	private selectC(id) {
		console.log('selectid====', id);
		this.selectID = id;
		this.selectP.y = 748 + id * 76;
	}
	private upanswer() {
		var par = [this.selectID];
		GameUtil.GameScene.runscene(new CreateHaibaoPage(this.selectID));
	}
}