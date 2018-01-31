/**
 * Created by pior on 16/12/15.
 * 游戏数据
 */

class GameData {

    public GamePause: boolean;              //游戏暂停标志    
    public GameOver: boolean;               //游戏结束标志
    public isLoadingend: boolean;           //游戏加载进度结束标志
    public gamesound: MySound[] = [];       //游戏声音
    public GameLevel: number;               //游戏等级
    public GameScore: number;               //游戏分数
    public HeightScore: number;             //最高分数
    public Nickname: string;
    public imageBase64: string;
    public imageUrl: string;
    public isSound: boolean;

    public constructor() {
        this.init();
    }

    private init()
    {
        this.GamePause = false;
        this.GameOver = false;
        this.isLoadingend = false;
        this.GameScore = 0;
        this.GameLevel = 1;
        this.HeightScore = 0;
        this.isSound = true;
        this.Nickname = ' 人情用户';
        this.imageBase64 = '';
        this.imageUrl = 'http://wx.qlogo.cn/mmopen/vi_32/mZeQYkK1XCmP2UJFpYOf2W16wiazRBNcIkAjnhYicv0VfRBRiamB9yG1Zv3icIGJeo15zkXjib7icXVdv4wXUFDXumAw/132';
    }

    private static _inst:GameData = null;

    public static _i():GameData
    {
        return (this._inst = (this._inst==null ? new GameData():this._inst));
    }
}