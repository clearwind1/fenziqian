/**
 * Created by pior on 16/12/15.
 * 游戏配置
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**声音文件枚举 */
var SoundName;
(function (SoundName) {
    SoundName[SoundName["s27bgm"] = 0] = "s27bgm";
    SoundName[SoundName["s19bgm"] = 1] = "s19bgm";
    SoundName[SoundName["s1"] = 2] = "s1";
    SoundName[SoundName["s2_1"] = 3] = "s2_1";
    SoundName[SoundName["s2"] = 4] = "s2";
    SoundName[SoundName["s3"] = 5] = "s3";
    SoundName[SoundName["s5"] = 6] = "s5";
    SoundName[SoundName["s10"] = 7] = "s10";
    SoundName[SoundName["s12"] = 8] = "s12";
    SoundName[SoundName["s13"] = 9] = "s13";
    SoundName[SoundName["s15"] = 10] = "s15";
    SoundName[SoundName["s19"] = 11] = "s19";
    SoundName[SoundName["s20"] = 12] = "s20";
    SoundName[SoundName["s21"] = 13] = "s21";
    SoundName[SoundName["s24"] = 14] = "s24";
    SoundName[SoundName["s26"] = 15] = "s26";
    SoundName[SoundName["end"] = 16] = "end";
})(SoundName || (SoundName = {}));
;
/**场景转换效果，对应：无效果，从左往右，淡入淡出，向两边分开 */
var SceneEffect;
(function (SceneEffect) {
    SceneEffect[SceneEffect["NullAction"] = 0] = "NullAction";
    SceneEffect[SceneEffect["CrossLeft"] = 1] = "CrossLeft";
    SceneEffect[SceneEffect["TransAlpha"] = 2] = "TransAlpha";
    SceneEffect[SceneEffect["OpenDoor"] = 3] = "OpenDoor";
})(SceneEffect || (SceneEffect = {}));
;
var GameConfig = (function () {
    /**开发游戏配置结束 */
    function GameConfig() {
        this.initconfigdata();
    }
    /**初始化游戏配置数据 */
    GameConfig.prototype.initconfigdata = function () {
        this.bguidedone = true;
        this.bfirstplay = false;
        if (!GameUtil.readLocalData(GameConfig.FIRSTGAME)) {
            GameUtil.saveLocalData(GameConfig.FIRSTGAME, '1');
            GameUtil.saveLocalData(GameConfig.GAMESOUND, '1');
            GameUtil.saveLocalData(GameConfig.GAMEMUSIC, '1');
            GameUtil.saveLocalData(GameConfig.GAMELEVEL, '0');
            this.bfirstplay = true;
        }
        this.bgamemusic = parseInt(GameUtil.readLocalData(GameConfig.GAMEMUSIC)) == 1 ? true : false;
        this.bgamesound = parseInt(GameUtil.readLocalData(GameConfig.GAMESOUND)) == 1 ? true : false;
    };
    GameConfig.getSW = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    GameConfig.getSH = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    GameConfig._i = function () {
        if (this._instance == null) {
            this._instance = new GameConfig();
        }
        return this._instance;
    };
    /**基本配置 */
    GameConfig.DEBUG = true;
    GameConfig.IP = "tingfeng.tristana.cn"; //http连接地址
    GameConfig.GAMENAME = '份子钱大调查'; //游戏在服务器上的名字
    GameConfig.SERVERNAME = 'children'; //服务器连接名
    GameConfig.FIRSTGAME = 'firstgame'; //第一次进游戏标示
    GameConfig.GAMESOUND = 'gamesound'; //游戏音效
    GameConfig.GAMEMUSIC = 'gamemusic'; //游戏音乐
    GameConfig.GAMELEVEL = 'gamelevel'; //游戏等级
    GameConfig.IsLoadSound = true; //是否加载声音
    GameConfig.SoundName = [
        's27bgm.mp3', 's19bgm.mp3', 's1.mp3', 's2_1.mp3', 's2.mp3', 's3.mp3', 's5.mp3', 's10.mp3', 's12.mp3', 's13.mp3', 's15.mp3', 's19.mp3', 's20.mp3', 's21.mp3', 's24.mp3', 's26.mp3'
        // 'die.mp3', 'fail.mp3', 'goal.mp3', 'beatt.mp3', 'click.mp3'
    ];
    GameConfig.MoreGameName = [];
    GameConfig.GUIDESTEPNUM = 2; //新手引导总步数
    GameConfig.DesignWidth = 755; //游戏设计尺寸宽
    GameConfig.DesignHeight = 1334; //游戏设计尺寸高
    //常用判断类型    
    GameConfig.UATYPE = {
        WeiXinstr: 'micromessenger',
        Androidstr: 'android',
        Iphone: 'iPhone'
    };
    GameConfig.IsBindKeyboard = false; //是否绑定键盘事件
    /**基本配置结束 */
    /**开发游戏配置 */
    GameConfig.DICBW = 74;
    GameConfig.DICBH = 81;
    GameConfig.BROW = 10; //列数
    GameConfig.BCOL = 10; //行数
    GameConfig.OFFY = 400;
    GameConfig.TOTALLIFE = 3;
    GameConfig._instance = null;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map