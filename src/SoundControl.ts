

class SoundControl extends GameUtil.BassPanel {
	private btnon: GameUtil.Menu;
	public constructor() {
		super();
	}
	public init() {
		this.showbtn();
	}
	private showbtn() {
		this.btnon = new GameUtil.Menu(this, 'soundbtnon_png', 'soundbtnon_png', this.changesound);
		this.btnon.x = this.mStageW - 60;
		this.btnon.y = 60;
		this.addChild(this.btnon);
		this.setrotation(true);
	}
	private changesound() {
		GameConfig._i().bgamesound = !GameConfig._i().bgamesound;
		GameConfig._i().bgamemusic = !GameConfig._i().bgamemusic;
		if (!GameConfig._i().bgamemusic) {
			BGMPlayer._i().setVolme(0);
			this.setrotation(false);
			this.btnon.setButtonTexture('soundbtnoff_png', 'soundbtnoff_png');
		} else {
			BGMPlayer._i().setVolme(1);
			this.setrotation(true);
			this.btnon.setButtonTexture('soundbtnon_png', 'soundbtnon_png');
		}
	}
	private setrotation(b) {
		if (b) {
			egret.Tween.get(this.btnon, { loop: true }).to({rotation:359},3000);
		}
		else {
			egret.Tween.removeTweens(this.btnon);
			this.btnon.rotation = 0;
		}
	}
}