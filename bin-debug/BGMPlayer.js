var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Create by hardy on 16/12/21
 * 背景音乐管理
 */
var BGMPlayer = (function () {
    function BGMPlayer() {
        this.init();
    }
    BGMPlayer.prototype.init = function () {
        this.curbgmtag = -1;
        this.volume = GameConfig._i().bgamemusic ? 1 : 0;
        this.isPause = false;
    };
    /**设置音量 */
    BGMPlayer.prototype.setVolme = function (value) {
        this.volume = value;
        if (this.curbgmtag == -1) {
            return;
        }
        GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
    };
    /**播放背景音乐 */
    BGMPlayer.prototype.play = function (bgmName, loop, start) {
        if (loop === void 0) { loop = -1; }
        if (start === void 0) { start = 0; }
        if (this.curbgmtag != -1 && GameData._i().gamesound[this.curbgmtag]) {
            GameData._i().gamesound[this.curbgmtag].stop();
        }
        this.curbgmtag = bgmName;
        if (GameData._i().gamesound[this.curbgmtag]) {
            this.Loop = loop;
            GameData._i().gamesound[this.curbgmtag].play(start, loop);
            if (!GameConfig._i().bgamemusic) {
                GameData._i().gamesound[this.curbgmtag].setvolume(0);
            }
            else {
                GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
            }
        }
    };
    BGMPlayer.prototype.pause = function () {
        if (this.curbgmtag != -1 && GameData._i().gamesound[this.curbgmtag]) {
            this.isPause = true;
            this.pauseTag = GameData._i().gamesound[this.curbgmtag].getpostion();
            GameData._i().gamesound[this.curbgmtag].stop();
        }
    };
    BGMPlayer.prototype.resume = function () {
        if (this.isPause) {
            this.isPause = false;
            GameData._i().gamesound[this.curbgmtag].play(this.pauseTag, this.Loop);
        }
    };
    BGMPlayer._i = function () {
        if (this._instance == null) {
            this._instance = new BGMPlayer();
        }
        return this._instance;
    };
    BGMPlayer._instance = null;
    return BGMPlayer;
}());
__reflect(BGMPlayer.prototype, "BGMPlayer");
//# sourceMappingURL=BGMPlayer.js.map