
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
		var param: Object = {
            option: (this.selectID+1)
        }
		GameUtil.Http.getinstance().send(param, 'tingfeng.free.ngrok.cc/api/submitAnswer', this.updone, this,'');
		
		//GameUtil.GameScene.runscene(new CreateHaibaoPage(this.selectID));
	}
	private updone(data) {
		if (data['code'] == 0) {
			console.log('data====', data['data']);
			var info = data['data'];
			GameData._i().Nickname = info['nickName'];
			if (GameData._i().Nickname == 'test1') {
				GameData._i().Nickname = '人情用户'
			}
			GameData._i().imageUrl = info['avatarUrl'];
			if (GameData._i().imageUrl.length < 8) {
				GameData._i().imageUrl = 'http://wx.qlogo.cn/mmopen/vi_32/mZeQYkK1XCmP2UJFpYOf2W16wiazRBNcIkAjnhYicv0VfRBRiamB9yG1Zv3icIGJeo15zkXjib7icXVdv4wXUFDXumAw/132';
			}
			GameUtil.GameScene.runscene(new CreateHaibaoPage(this.selectID));
		} else
		{
			console.log('msg====', data['message']);
		}	
	}
}