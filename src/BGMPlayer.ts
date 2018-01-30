/**
 * Create by hardy on 16/12/21
 * 背景音乐管理
 */
class BGMPlayer {
    private volume: number;         //音量
    private curbgmtag: number;      //当前bgm标志
    private pauseTag: number;       //暂停位置标志
    private isPause: boolean;
    private Loop: number;
    public constructor() {
        this.init();
    }

    private init() {
        this.curbgmtag = -1;
        this.volume = GameConfig._i().bgamemusic ? 1 : 0;
        this.isPause = false;
    }
    /**设置音量 */
    public setVolme(value: number) {
        this.volume = value;
        if (this.curbgmtag == -1) {
            return;
        }
        GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
    }
    /**播放背景音乐 */
    public play(bgmName: number, loop: number = -1, start: number = 0) {
        if (this.curbgmtag != -1 && GameData._i().gamesound[this.curbgmtag]) {
            GameData._i().gamesound[this.curbgmtag].stop();
        }
        this.curbgmtag = bgmName;
        if (GameData._i().gamesound[this.curbgmtag]) {
            this.Loop = loop;
            GameData._i().gamesound[this.curbgmtag].play(start, loop);
            if (!GameConfig._i().bgamemusic) {
                GameData._i().gamesound[this.curbgmtag].setvolume(0);
            } else {
                GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
            }
        }
    }
    public pause() {
        if (this.curbgmtag != -1 && GameData._i().gamesound[this.curbgmtag]) {
            this.isPause = true;
            this.pauseTag = GameData._i().gamesound[this.curbgmtag].getpostion();
            GameData._i().gamesound[this.curbgmtag].stop();
        }
    }
    public resume() {
        if (this.isPause) {
            this.isPause = false;
            GameData._i().gamesound[this.curbgmtag].play(this.pauseTag, this.Loop);
        }
    }

    private static _instance: BGMPlayer = null;
    public static _i(): BGMPlayer {
        if (this._instance == null) {
            this._instance = new BGMPlayer();
        }

        return this._instance;
    }

}