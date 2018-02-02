var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AnswerPage = (function (_super) {
    __extends(AnswerPage, _super);
    function AnswerPage() {
        var _this = _super.call(this) || this;
        _this.selectID = 0;
        return _this;
    }
    AnswerPage.prototype.init = function () {
        this.show();
        this.stage.addChild(new SoundControl());
    };
    AnswerPage.prototype.show = function () {
        var askerbg = new MyBitmap(RES.getRes('askerbg_jpg'), 0, 0);
        askerbg.setanchorOff(0, 0);
        this.addChild(askerbg);
        for (var i = 0; i < 5; i++) {
            var btnpicstr = 'askerpic' + i + '_png';
            var askerpic = new GameUtil.Menu(this, btnpicstr, btnpicstr, this.selectC, [i]);
            askerpic.x = 375;
            askerpic.y = 594 + i * 106;
            this.addChild(askerpic);
        }
        this.selectP = new MyBitmap(RES.getRes('askerselectp_png'), 143, 594);
        this.addChild(this.selectP);
        var askerbtn = new GameUtil.Menu(this, 'askerbtn_png', 'askerbtn_png', this.upanswer);
        askerbtn.setScaleMode();
        askerbtn.x = 375;
        askerbtn.y = 1151;
        this.addChild(askerbtn);
    };
    AnswerPage.prototype.selectC = function (id) {
        console.log('selectid====', id);
        GameData._i().gamesound[SoundName.s26].play();
        this.selectID = id;
        this.selectP.y = 594 + id * 106;
    };
    AnswerPage.prototype.upanswer = function () {
        var par = [this.selectID];
        var param = {
            option: (this.selectID + 1)
        };
        //GameUtil.Http.getinstance().send(param, '/api/submitAnswer', this.updone, this,'tingfeng.free.ngrok.cc');
        GameUtil.Http.getinstance().send(param, '/api/submitAnswer', this.updone, this);
        //GameUtil.GameScene.runscene(new CreateHaibaoPage(this.selectID));
    };
    AnswerPage.prototype.updone = function (data) {
        if (data['code'] == 0) {
            console.log('data====', data['data']);
            var info = data['data'];
            GameData._i().Nickname = info['nickName'];
            if (GameData._i().Nickname == 'test1') {
                GameData._i().Nickname = '人情用户';
            }
            GameData._i().imageUrl = info['avatarUrl'];
            if (GameData._i().imageUrl.length < 8) {
                GameData._i().imageUrl = 'http://wx.qlogo.cn/mmopen/vi_32/mZeQYkK1XCmP2UJFpYOf2W16wiazRBNcIkAjnhYicv0VfRBRiamB9yG1Zv3icIGJeo15zkXjib7icXVdv4wXUFDXumAw/132';
            }
            GameData._i().imageBase64 = info['avatarBase64'];
            GameUtil.GameScene.runscene(new CreateHaibaoPage(this.selectID));
        }
        else {
            console.log('msg====', data['message']);
        }
    };
    return AnswerPage;
}(GameUtil.BassPanel));
__reflect(AnswerPage.prototype, "AnswerPage");
