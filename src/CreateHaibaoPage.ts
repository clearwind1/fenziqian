
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

		var nickname: GameUtil.MyTextField = new GameUtil.MyTextField(374, 93, 40, 0.5, 0.5);
		nickname.setText(GameData._i().Nickname);
		nickname.textColor = 0xffd11f;
		this.addChild(nickname);

		//头像
		// var headimg: GetImageByUrl = new GetImageByUrl(GameData._i().imageUrl, 140, 140);
		// headimg.x = 55;
		// headimg.y = 43;
		// this.addChild(headimg);

		this.getbase64();

		// var bmp = new egret.Bitmap();
		// bmp.x = 55;
		// bmp.y = 43;
		// egret.BitmapData.create('base64', GameData._i().imageBase64, (bitmapData) => {
		// 	bmp.bitmapData = bitmapData;
		// 	bmp.width = 140;
		// 	bmp.height = 140;
		// 	this.addChild(bmp);
		// });

		this.tipContain = new egret.DisplayObjectContainer;
		this.addChild(this.tipContain);

		egret.setTimeout(this.showgz, this, 5000);
	}

	private getbase64() {
		var self = this;
		function getBase64Image(img) {
			var canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, img.width, img.height);
			var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
			var dataURL = canvas.toDataURL("image/" + ext);
			return dataURL;
		}
		var imgLink = GameData._i().imageUrl;
		var tempImage = new Image();
		tempImage.src = imgLink;
		tempImage.crossOrigin = "*";
		tempImage.onload = function () {
			var base64 = getBase64Image(tempImage);
			var str = base64.substring(base64.indexOf(',') + 1);
			console.log(str);

			var bmp = new egret.Bitmap();
			bmp.x = 55;
			bmp.y = 43;
			egret.BitmapData.create('base64', str, (bitmapData) => {
				bmp.bitmapData = bitmapData;
				bmp.width = 140;
				bmp.height = 140;
				self.addChild(bmp);
			});
		}

		//////////////////////
		/*
		var self = this;
		var img_1 = new Image();
		img_1.src = GameData._i().imageUrl;
		img_1.crossOrigin = '*';
		var bmp = new egret.Bitmap();
		bmp.x = 55;
		bmp.y = 43;
		var bitmapData_1 = new egret.BitmapData(img_1);
		img_1.onload = function () {
			img_1.onload = undefined;
			bitmapData_1.source = img_1;
			bitmapData_1.height = img_1.height;
			bitmapData_1.width = img_1.width;
			bmp.bitmapData = bitmapData_1;
			bmp.width = 140;
			bmp.height = 140;
			self.addChild(bmp);
		};
		*/
	}

	public shareImage(target: egret.DisplayObject): void {
		var renderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(target);//渲染到临时画布
		var divImage = document.getElementById("divImage");//获取DIV
		var shareImage: HTMLImageElement = document.getElementById("shareImage") as HTMLImageElement;//获取Image标签
		shareImage.src = renderTexture.toDataURL('image/png');//把数据赋值给Image
		shareImage.style.width = window.top.document.body.clientWidth + 'px';
		shareImage.style.height = window.top.document.body.clientHeight + 'px';
		divImage.style.display = "block";//显示DIV
		//alert('test==='+shareImage.style.width);
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
		window.top.location.href = "http://tingfeng.tristana.cn/showqrcode/qrcode.html";

	}
	private showsharetip() {
		var sharetipcontain: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		this.addChild(sharetipcontain);
		var shar = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
		sharetipcontain.addChild(shar);
		var sharetip = new MyBitmap(RES.getRes('sharetip_png'), this.mStageW / 2, this.mStageH / 2);
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