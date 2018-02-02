
class CreateHaibaoPage extends GameUtil.BassPanel {
	private selectID: number = 0;
	private tipContain: egret.DisplayObjectContainer;
	private headimg;
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
		// var headimg: GetImageByUrl = new GetImageByUrl(GameData._i().imageUrl, 140, 140);
		// headimg.x = 55;
		// headimg.y = 43;
		// this.addChild(headimg);
		var bmp = new egret.Bitmap();
		bmp.x = 55;
		bmp.y = 43;
		egret.BitmapData.create('base64', GameData._i().imageBase64, (bitmapData) => {
			bmp.bitmapData = bitmapData;
			bmp.width = 140;
			bmp.height = 140;
			this.addChild(bmp);
		});


		// var backbtn: GameUtil.Menu = new GameUtil.Menu(this, 'backbtn_png', 'backbtn_png', this.backgamescene);
		// backbtn.setScaleMode();
		// backbtn.x = 375;
		// backbtn.y = 1130;
		// this.addChild(backbtn);

		this.tipContain = new egret.DisplayObjectContainer;
		this.addChild(this.tipContain);

		egret.setTimeout(this.showgz, this, 5000);
	}

	public shareImage(target: egret.DisplayObject): void {
		var renderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(target);//渲染到临时画布
		var divImage = document.getElementById("divImage");//获取DIV
		var shareImage: HTMLImageElement = document.getElementById("shareImage") as HTMLImageElement;//获取Image标签
		shareImage.src = renderTexture.toDataURL('image/jpeg');//把数据赋值给Image
		shareImage.width = document.body.clientWidth;
		shareImage.height = document.body.clientHeight;
		divImage.style.display = "block";//显示DIV
	}

	private showgz() {
		var coverbg: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
		this.tipContain.addChild(coverbg);

		var tipbg: MyBitmap = new MyBitmap(RES.getRes('tipgz_png'), this.mStageW / 2, 571);
		this.tipContain.addChild(tipbg);

		var closebtn: GameUtil.Menu = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closegz);
		closebtn.setScaleMode();
		closebtn.x = 688;
		closebtn.y = 430;
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
		this.tipContain = null;
		egret.setTimeout(this.showsharetip, this, 3000);
	}
	private jumpgz() {
		if (window.top) {
			window.top.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MjQzMTA5MA==&scene=124#wechat_redirect";
		}
		else {
			window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MjQzMTA5MA==&scene=124#wechat_redirect";
		}
		
	}
	private showsharetip() {
		var sharetipcontain: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		this.addChild(sharetipcontain);
		var shar = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
		sharetipcontain.addChild(shar);
		var sharetip = new MyBitmap(RES.getRes('sharetip_png'), this.mStageW/2, this.mStageH/2);
		sharetipcontain.addChild(sharetip);
		shar.$setTouchEnabled(true);

		shar.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.removeChild(sharetipcontain);
			this.shareImage(this.$stage);
		}, this);

	}

	private backgamescene() {
		GameUtil.GameScene.runscene(new GameScene());
	}
}