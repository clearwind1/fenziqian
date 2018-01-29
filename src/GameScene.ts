/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
class GameScene extends GameUtil.BassPanel {

    private intervalarr: number[];      //存储定时器标志
    private touchlayer: egret.Shape;    //触摸层
    private beginpointx: number;
    private beginpointy: number;
    private picControl: MyBitmap;
    private picLBControl: MyBitmap;
    private picNumber: number;
    private DelayTime: number;

    public constructor() {
        super();
    }
    public init() {
        //BGMPlayer._i().play(SoundName.sbgm);     //背景音乐
        this.intervalarr = [];
        this.initdata();
        this.showbg();
        this.addtouch();
        this.bindkeyboard();
        this.gameinterval();
        this.stage.addChild(new SoundControl());
    }
    /**
     * 初始化数据
     */
    private initdata() {
        GameData._i().GameOver = false;
        GameData._i().GameScore = 0;
        GameData._i().GameLevel = 1;
        this.picNumber = 1;
        this.DelayTime = 100;//1000
    }
    /**
     * 显示背景
     */
    private FirstContain: egret.DisplayObjectContainer;
    private SecondContain: egret.DisplayObjectContainer;
    private showbg() {
        // this.picControl = new MyBitmap(RES.getRes('phonetip_jpg'), 0, 0);
        // this.picControl.setanchorOff(0, 0);
        // this.addChild(this.picControl);
        //egret.setTimeout(this.touchtap, this, this.DelayTime);

        //this.addChild(GameScore._i());

        var bg: MyBitmap = new MyBitmap(RES.getRes('pic0_jpg'), 0, 0);
        bg.setanchorOff(0, 0);
        this.addChild(bg);

        //-----------------新的---------------//
        this.FirstContain = new egret.DisplayObjectContainer;
        this.addChild(this.FirstContain);
        this.SecondContain = new egret.DisplayObjectContainer;
        this.addChild(this.SecondContain);

        this.showLookphone();
        //测试
        //this.showflfq();
    }
    //画面2
    private showLookphone() {
        var lookphone: MyBitmap = new MyBitmap(RES.getRes('lookphone_png'), this.mStageW / 2, this.mStageH / 2);
        lookphone.$setScaleX(1.4);
        lookphone.$setScaleY(1.4);
        this.FirstContain.addChild(lookphone);
        egret.Tween.get(lookphone).to({ scaleX: 1, scaleY: 1 }, 500).wait(500).call(this.showmsg, this, [0]);
    }
    //
    private showmsg(id) {
        var pos = [[430, 297], [109, 359], [109, 430]];
        var img = new MyBitmap(RES.getRes('showmsg' + id + '_png'), pos[id][0], pos[id][1]);
        img.setanchorOff(0, 0.5);
        this.FirstContain.addChild(img);
        GameData._i().gamesound[SoundName.s2].play();
        id++;
        egret.setTimeout(() => { if (id > 2) { this.showamazing(); } else (this.showmsg(id)); }, this, 1000);
    }
    //画面3
    private showamazing() {
        BGMPlayer._i().play(SoundName.s27bgm, 1);
        this.FirstContain.alpha = 0;
        GameData._i().gamesound[SoundName.s2].stop();
        GameData._i().gamesound[SoundName.s3].play();
        var img = new MyBitmap(RES.getRes('pic0_1_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(img);
        var sx: MyBitmap = new MyBitmap(RES.getRes('pic0_0_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(sx);
        egret.Tween.get(sx, { loop: true }).to({ x: this.mStageW / 2 + 4, y: this.mStageH / 2 - 4 }).wait(2).to({ x: this.mStageW / 2 - 4, y: this.mStageH / 2 + 4 }).wait(2);
        egret.setTimeout(this.showresb, this, 1200);
        this.showlyric(0, this.SecondContain);
    }
    //画面4
    private showresb() {
        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 700).call(() => { this.showlyric(1, this.FirstContain); this.showresbtap(0); }, this, );
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 700);

        //this.showresbtap(0);
    }
    private showresbtap(id) {
        GameData._i().gamesound[SoundName.s2_1].stop();
        GameData._i().gamesound[SoundName.s2_1].play();
        var img = new MyBitmap(RES.getRes('resbtpic' + id + '_png'), 169, 553);
        img.setanchorOff(0, 0.5);
        this.FirstContain.addChild(img);
        id++;
        egret.setTimeout(() => { if (id > 2) { this.showflfq(); } else { console.log('id===', id); this.FirstContain.removeChild(img); egret.setTimeout(() => { this.showresbtap(id) }, this, 1200) }; }, this, 1000);
    }
    //画面5
    private showflfq() {

        GameData._i().gamesound[SoundName.s2_1].stop();
        this.FirstContain.removeChildren();
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0.4;
        
        var rw: MyBitmap = new MyBitmap(RES.getRes('pic5_0_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(rw);

        var qt: MyBitmap = new MyBitmap(RES.getRes('pic5_qt_png'), 184, 1164);
        this.SecondContain.addChild(qt);
        egret.Tween.get(qt, { loop: true }).to({ x: 190, y: 1150 }, 500).to({ x: 170, y: 1160 }, 500).to({ x: 173, y: 1170 }, 500).to({ x: 184, y: 1164 }, 500);
        var qt2: MyBitmap = new MyBitmap(RES.getRes('pic5_qt_png'), 622, 471);
        qt2.$setRotation(-20);
        this.SecondContain.addChild(qt2);
        egret.Tween.get(qt2, { loop: true }).to({ x: 618, y: 466 }, 500).to({ x: 630, y: 466 }, 500).to({ x: 629, y: 473 }, 500).to({ x: 622, y: 471 }, 500);
        var tq: MyBitmap = new MyBitmap(RES.getRes('pic5_tq_png'), 186, 867);
        this.SecondContain.addChild(tq);
        tq.scaleX = tq.scaleY = 0.5;
        GameData._i().gamesound[SoundName.s5].play();

        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 500).call(() => {
            this.showlyric(2, this.SecondContain);
            egret.Tween.get(tq).to({ alpha: 0, scaleX: 1.5, scaleY: 1.5, x: 53, y: 798, rotation: 27 }, 500).call(() => {
                egret.Tween.get(rw, { loop: true }).to({ texture: RES.getRes('pic5_1_png')}).wait(1000).to({ texture: RES.getRes('pic5_0_png') }).wait(1000);
            }, this);
        }, this);

        egret.setTimeout(this.showgzlight, this, 3000);
    }
    //画面6
    private showgzlight() {
        GameData._i().gamesound[SoundName.s5].stop();
        this.FirstContain.alpha = 0;
        var bg: MyBitmap = new MyBitmap(RES.getRes('pic6_0_png'), 0, 0);
        bg.setanchorOff(0, 0);
        this.FirstContain.addChild(bg);
        var hand = new MyBitmap(RES.getRes('pic6_1_png'), 494, 957);
        this.FirstContain.addChild(hand);
        var light = new MyBitmap(RES.getRes('pic6_2_png'), 1827, 785);
        this.FirstContain.addChild(light);
        egret.Tween.get(light, { loop: true }).to({ alpha: 0 }).wait(300).to({ alpha: 1 }).wait(300);

        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 500);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 500).call(() => {
            this.showlyric(3, this.FirstContain);
            egret.Tween.get(hand).to({ rotation: 1 }).wait(100).to({ rotation: 0 }).wait(100).to({ rotation: 1 }).wait(100).to({ rotation: 0 }).wait(600).call(() => {
                egret.Tween.get(this.FirstContain).to({ x: -1350 }, 2000).call(() => {
                    this.showlyric(4, this.FirstContain);
                }, this).wait(1200).call(() => {
                    this.showWind();
                }, this);
            }, this);
        }, this);
    }
    //画面7
    private showWind() {
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;
        //this.SecondContain.scaleX = this.SecondContain.scaleY = 0.3;
        var bg: MyBitmap = new MyBitmap(RES.getRes('pic7_0_jpg'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(bg);

        var wind = new Animation('pic7_', 4, 100, this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(wind);
        wind.alpha = 0;
        wind.setLoop(-1);
        wind.play();
        egret.Tween.get(wind).to({ alpha: 1 }, 800);

        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 800);
        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 800).call(() => {
            this.showlyric(5, this.SecondContain);
            egret.setTimeout(this.showflymoney, this, 1800);
        }, this);
    }
    //画面8
    private showflymoney() {
        this.SecondContain.alpha = 0;
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 1;
        this.FirstContain.x = 0;

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic7_jpg'), posx, posy);
        this.FirstContain.addChild(img);
        var wind = new Animation('pic8_', 6, 200, this.mStageW / 2, this.mStageH / 2);
        this.FirstContain.addChild(wind);
        wind.play();
        wind.setLoop(1);
        wind.setRemove(false);
        wind.setendcall(this.showscn, this);

        this.showlyric(6, this.FirstContain);

    }
    //画面9
    private showscn() {
        this.FirstContain.removeChildren();
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 1;

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic7_jpg'), posx, posy);
        this.SecondContain.addChild(img);
        var qt = new MyBitmap(RES.getRes('pic9_0_png'), posx, posy);
        this.SecondContain.addChild(qt);
        var wind = new MyBitmap(RES.getRes('pic9_1_png'), posx, -200);
        this.SecondContain.addChild(wind);
        egret.Tween.get(wind).to({ y: posy }, 300).call(() => {
            egret.Tween.get(qt).to({ x: posx - 15 }, 100).to({ x: posx + 15 }, 100).to({ x: posx }, 100);
        }, this);

        this.showlyric(7, this.SecondContain);

        egret.setTimeout(this.showsct, this, 1200);
    }
    ////画面10
    private showsct() {
        this.FirstContain.alpha = 0;
        GameData._i().gamesound[SoundName.s10].play();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic10_jpg'), posx, posy);
        this.FirstContain.addChild(img);

        var rain = new MyBitmap(RES.getRes('pic10_1_png'), posx, posy);
        this.FirstContain.addChild(rain);
        egret.Tween.get(rain, { loop: true }).to({ alpha: 0 }).wait(300).to({ alpha: 1 }).wait(200);

        var lhand = new MyBitmap(RES.getRes('pic10_5_png'), posx, posy);
        this.FirstContain.addChild(lhand);
        egret.Tween.get(lhand, { loop: true }).to({ rotation: 1 }, 200).to({ rotation: 0 }, 150);
        var head = new MyBitmap(RES.getRes('pic10_4_png'), posx, posy);
        this.FirstContain.addChild(head);
        egret.Tween.get(head, { loop: true }).to({ rotation: 0 }, 200).to({ rotation: 1 }, 200);
        var body = new MyBitmap(RES.getRes('pic10_6_png'), posx, posy);
        this.FirstContain.addChild(body);
        var rhand = new MyBitmap(RES.getRes('pic10_3_png'), posx, posy);
        this.FirstContain.addChild(rhand);
        egret.Tween.get(rhand, { loop: true }).to({ rotation: 1 }, 200).to({ rotation: 0 }, 150);

        var redpack = new MyBitmap(RES.getRes('pic10_2_png'), 644, 414);
        this.FirstContain.addChild(redpack);
        egret.Tween.get(redpack, { loop: true }).to({ y: 404 }, 300).to({ y: 414 }, 300);

        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 800).call(() => {
            this.showlyric(8, this.FirstContain);
        }, this);

        egret.setTimeout(this.showsce, this, 2300);
    }
    ////画面11
    private showsce() {
        GameData._i().gamesound[SoundName.s10].stop();
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic11_jpg'), 83, 297);
        img.anchorOffsetX = 83;
        img.anchorOffsetY = 297;
        this.SecondContain.addChild(img);

        var light = new MyBitmap(RES.getRes('pic11_2_png'), posx, posy);
        this.SecondContain.addChild(light);
        egret.Tween.get(light, { loop: true }).to({ alpha: 0 }).wait(500).to({ alpha: 1 }).wait(500);

        var snowman = new MyBitmap(RES.getRes('pic11_1_png'), posx, 1081);
        this.SecondContain.addChild(snowman);

        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 800).call(() => {
            this.showlyric(9, this.SecondContain);
        }, this);

        egret.setTimeout(() => {
            this.SecondContain.removeChild(light);
            this.SecondContain.removeChild(snowman);
            egret.Tween.get(img).to({ scaleX: 5, scaleY: 5 }, 600).call(() => {
                this.showsctw();
            }, this);
        }, this, 1900);
    }
    ////画面12
    private showsctw() {
        //this.SecondContain.removeChildren();
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 0;
        GameData._i().gamesound[SoundName.s12].play();
        //console.log('loging====');

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic7_jpg'), 83, 297);
        img.anchorOffsetX = 83;
        img.anchorOffsetY = 297;
        this.FirstContain.addChild(img);

        var body = new MyBitmap(RES.getRes('pic12_2_png'), posx, posy);
        this.FirstContain.addChild(body);
        egret.Tween.get(body, { loop: true }).to({ scaleX: 0.97, scaleY: 0.97 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        var xian = new MyBitmap(RES.getRes('pic12_3_png'), 632, 412);
        this.FirstContain.addChild(xian);
        egret.Tween.get(xian, { loop: true }).to({ y: 416 }, 600).to({ y: 412 }, 600);

        var door = new MyBitmap(RES.getRes('pic12_1_png'), posx, posy);
        this.FirstContain.addChild(door);

        var light = new MyBitmap(RES.getRes('pic12_0_png'), 393, 1234);
        this.FirstContain.addChild(light);
        egret.Tween.get(light, { loop: true }).to({ scaleX: 1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);

        //console.log('loging====');
        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 800).call(() => {
            this.showlyric(10, this.FirstContain);
        }, this);

        egret.setTimeout(this.showscth, this, 4500);
    }
    ////画面13
    private showscth() {
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;
        GameData._i().gamesound[SoundName.s12].stop();
        GameData._i().gamesound[SoundName.s13].play();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic13_1_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(img);

        //left hand        
        var lhand = new MyBitmap(RES.getRes('pic13_4_png'), 555, 1068);
        lhand.anchorOffsetX = 82;
        lhand.anchorOffsetY = 528;
        this.SecondContain.addChild(lhand);
        egret.Tween.get(lhand, { loop: true }).to({ rotation: -1 }, 300).to({ rotation: 0 }, 300);
        //right hand
        var rhand = new MyBitmap(RES.getRes('pic13_3_png'), 211, 1063);
        rhand.anchorOffsetX = 202;
        rhand.anchorOffsetY = 562;
        this.SecondContain.addChild(rhand);
        egret.Tween.get(rhand, { loop: true }).to({ rotation: 1 }, 300).to({ rotation: 0 }, 300);
        //ball
        var ball = new MyBitmap(RES.getRes('pic13_2_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(ball);
        egret.Tween.get(ball, { loop: true }).to({ y: this.mStageH / 2 + 10 }, 600).to({ y: this.mStageH / 2 }, 600);

        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 800).call(() => {
            this.showlyric(11, this.SecondContain);
        }, this);;

        egret.setTimeout(this.showscft, this, 3500);
    }
    ////画面14
    private showscft() {
        //this.SecondContain.removeChildren();
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 0;
        GameData._i().gamesound[SoundName.s13].stop();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic14_jpg'), posx, posy);
        this.FirstContain.addChild(img);

        for (let i: number = 0; i < 13; i++) {
            let qt = new MyBitmap(RES.getRes('pic14_' + i + '_png'), 375, 670);
            qt.name = 'qt' + i;
            this.FirstContain.addChild(qt);
            qt.scaleX = qt.scaleY = 2;
            qt.visible = false;
        }

        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 500);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 500).call(() => {
            this.showlyric(12, this.FirstContain);
            downqt(0);
        }, this);

        var self = this;
        function downqt(id) {
            var pos = [[574, 1238], [417, 25], [674, 724], [190, 615], [708, 221], [91, 1152], [141, 166], [591, 1114], [400, 140], [330, 1042], [363, 461], [544, 685], [242, 771]];
            let qt = self.FirstContain.getChildByName('qt' + id);
            qt.visible = true;

            egret.Tween.get(qt).to({ x: pos[id][0], y: pos[id][1], scaleX: 1, scaleY: 1 }, 200 - id * 20).call(() => {
                id++;
                if (id > 12) {
                    egret.setTimeout(self.showscfif, self, 1500);
                } else {
                    downqt(id);
                }
            }, self);
        }
    }
    ////画面15
    private showscfif() {
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;
        GameData._i().gamesound[SoundName.s15].play();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic15_jpg'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(img);
        //head        
        var head = new MyBitmap(RES.getRes('pic15_2_png'), 379, 317);
        this.SecondContain.addChild(head);
        egret.Tween.get(head, { loop: true }).to({ scaleY: 0.98, rotation: -0.8 }, 300).to({ scaleY: 1, rotation: 0 }, 300);
        //right hand
        var rhand = new MyBitmap(RES.getRes('pic15_5_png'), 219, 643);
        this.SecondContain.addChild(rhand);
        //beizi
        var beizi = new MyBitmap(RES.getRes('pic15_4_png'), this.mStageW / 2, this.mStageH / 2);
        this.SecondContain.addChild(beizi);
        //text
        var bitext = new MyBitmap(RES.getRes('pic15_1_png'), 109, 241);
        this.SecondContain.addChild(bitext);
        egret.Tween.get(bitext, { loop: true }).to({ rotation: 0.8 }, 300).to({ rotation: 0 }, 300);
        //left hand        
        var lhand = new MyBitmap(RES.getRes('pic15_3_png'), 640, 753);
        this.SecondContain.addChild(lhand);
        egret.Tween.get(lhand, { loop: true }).to({ y: 767 }, 300).to({ y: 753 }, 300);

        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 800).call(() => {
            egret.setTimeout(this.showscsit, this, 1500);
            this.showlyric(13, this.SecondContain);
        }, this);

    }
    ////画面16
    private showscsit() {
        //this.SecondContain.removeChildren();
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 0;
        GameData._i().gamesound[SoundName.s15].stop();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic16_jpg'), posx, posy);
        this.FirstContain.addChild(img);

        var qt = new MyBitmap(RES.getRes('pic16_1_png'), 300, 1413);//1104
        this.FirstContain.addChild(qt);
        egret.Tween.get(qt).to({ y: 1104 }, 800);

        //left hand        
        var lhand = new MyBitmap(RES.getRes('pic16_2_png'), 546, 734);
        lhand.anchorOffsetX = 66;
        lhand.anchorOffsetY = 485;
        this.FirstContain.addChild(lhand);
        egret.Tween.get(lhand, { loop: true }).to({ rotation: -3 }, 600).to({ rotation: 0 }, 600);
        //head        
        var head = new MyBitmap(RES.getRes('pic16_3_png'), 376, 470);
        this.FirstContain.addChild(head);
        egret.Tween.get(head, { loop: true }).to({ skewX: 4 }, 500).to({ skewX: 0 }, 500);
        //right hand
        var rhand = new MyBitmap(RES.getRes('pic16_4_png'), 163, 1000);
        rhand.anchorOffsetX = 143;
        rhand.anchorOffsetY = 540;
        this.FirstContain.addChild(rhand);
        egret.Tween.get(rhand, { loop: true }).to({ rotation: -4 }, 300).to({ rotation: 4 }, 300).to({ rotation: 0 }, 300);

        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 500);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 500).call(() => {
            this.showlyric(14, this.FirstContain);
        }, this);

        egret.setTimeout(this.showscset, this, 1500);

    }
    ////画面17
    private showscset() {
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 1;

        for (let i: number = 0; i < 25; i++) {
            let qt = new MyBitmap(RES.getRes('pic17_' + i + '_png'), 375, 670);
            qt.name = 'qt' + i;
            this.SecondContain.addChild(qt);
            qt.scaleX = qt.scaleY = 2;
            qt.visible = false;
        }
        egret.setTimeout(() => { downqt(0); }, this, 100);

        var self = this;
        function downqt(id) {
            var pos = [[122, 87], [362, 226], [349, 475], [540, 607], [151, 850], [619, 1275], [156, 611], [209, 1053], [395, 861], [552, 263], [654, 973], [322, 677], [162, 1258], [348, 1086], [2, 348], [719, 197], [427, 21], [615, 784], [627, 413], [194, 934], [687, 1090], [94, 1115], [361, 364], [76, 132], [682, 721], [127, 482], [15, 755]];
            let qt = self.SecondContain.getChildByName('qt' + id);
            qt.visible = true;

            egret.Tween.get(qt).to({ x: pos[id][0], y: pos[id][1], scaleX: 1, scaleY: 1 }, 200 - id * 30).call(() => {
                id++;
                if (id > 24) {
                    egret.setTimeout(self.showscet, self, 2000);
                } else {
                    downqt(id);
                }
            }, self);
        }

        // egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 800);
        // egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 800);

        this.showlyric(15, this.SecondContain);
    }
    ////画面18
    private showscet() {
        //this.SecondContain.removeChildren();
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 0;

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic18_0_jpg'), posx, posy);
        this.FirstContain.addChild(img);

        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 500);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 500).call(() => {
            egret.setTimeout(() => {
                GameData._i().gamesound[SoundName.s2_1].play();
                var qt = new MyBitmap(RES.getRes('pic18_0_png'), 292, 553);
                qt.name = 'qt';
                this.FirstContain.addChild(qt);
            }, this, 300);
            egret.setTimeout(() => {
                this.FirstContain.removeChild(this.FirstContain.getChildByName('qt'));
                GameData._i().gamesound[SoundName.s2_1].stop();
                GameData._i().gamesound[SoundName.s2].play();
                img.setNewTexture(RES.getRes('pic18_1_jpg'));
            }, this, 900);
        }, this);

        egret.setTimeout(() => {
            egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 500).wait(300).call(()=>{
                this.showscnt();
            },this);
        }, this, 2000);
    }
    ////画面19
    private showscnt() {
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;
        GameData._i().gamesound[SoundName.s2].stop();
        BGMPlayer._i().play(SoundName.s19bgm);

        GameData._i().gamesound[SoundName.s19].play();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic19_jpg'), posx, posy);
        this.SecondContain.addChild(img);

        egret.setTimeout(this.showsctt, this, 1500);

        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 800);
    }
    ////画面20
    private showsctt() {
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 0;
        GameData._i().gamesound[SoundName.s19].stop();
        GameData._i().gamesound[SoundName.s20].play();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic20_jpg'), posx, posy);
        this.FirstContain.addChild(img);

        egret.setTimeout(this.showsctto, this, 1500);

        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 800);
    }
    ////画面21
    private showsctto() {
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;
        GameData._i().gamesound[SoundName.s20].stop();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic21_jpg'), posx, posy);
        this.SecondContain.addChild(img);

        egret.setTimeout(this.showscttt, this, 1500);

        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 800).call(() => {
            GameData._i().gamesound[SoundName.s21].play();
        }, this);
    }
    ////画面22
    private showscttt() {
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 0;
        GameData._i().gamesound[SoundName.s21].stop();
        //GameData._i().gamesound[SoundName.s22].play();

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic22_jpg'), posx, posy);
        this.FirstContain.addChild(img);

        egret.setTimeout(this.showscttth, this, 1500);

        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 800);
    }
    ////画面23
    private showscttth() {
        this.SecondContain.removeChildren();
        this.SecondContain.alpha = 0;

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic23_0_jpg'), posx, posy);
        this.SecondContain.addChild(img);

        var self = this;
        function changeimg(id) {
            img.setNewTexture(RES.getRes('pic23_' + id + '_jpg'));
            id++;
            egret.setTimeout(() => {
                if (id > 3) {
                    self.showscttf();
                } else {
                    changeimg(id);
                }
            }, self, 1200);
        }

        //egret.setTimeout(this.showsctt, this, 1500);

        egret.Tween.get(this.SecondContain).to({ alpha: 1 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 0 }, 800).call(() => {
            egret.setTimeout(() => {
                changeimg(1);
            }, this, 1200);
        }, this);
    }
    ////画面24
    private showscttf() {
        this.FirstContain.removeChildren();
        this.FirstContain.alpha = 0;

        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var img = new MyBitmap(RES.getRes('pic24_0_jpg'), posx, posy);
        this.FirstContain.addChild(img);

        egret.Tween.get(this.SecondContain).to({ alpha: 0 }, 800);
        egret.Tween.get(this.FirstContain).to({ alpha: 1 }, 800).call(() => {
            GameData._i().gamesound[SoundName.s24].play();
            egret.setTimeout(() => {
                img.setNewTexture(RES.getRes('pic24_1_jpg'));
            }, this, 1200);
            egret.setTimeout(() => {
                GameUtil.GameScene.runscene(new QuestionPage(), SceneEffect.TransAlpha);
            }, this, 1700);

        }, this);
    }
    private
    //添加显示歌词    
    private showlyric(id, contain: egret.DisplayObjectContainer) {
        var posx = [361, 350, 368, 412, 1845, 379, 382, 363, 366, 432, 378, 358, 375, 380, 379, 381,];
        var posy = [201, 1222, 219, 124, 1132, 1107, 519, 1178, 170, 245, 120, 189, 198, 1046, 171, 655,];
        var lyricpic = new MyBitmap(RES.getRes('cripic' + id + '_png'), posx[id], posy[id]);
        contain.addChild(lyricpic);
        lyricpic.alpha = 0;
        //egret.Tween.get(lyricpic, { loop: true }).to({ alpha: 0 }).wait(400).to({ alpha: 1 }).wait(1000);
        egret.Tween.get(lyricpic).to({ alpha: 1 }, 700);
    }
    /**
     * 游戏定时器
     */
    private gameinterval() {
        GameUtil.trace('interval');
    }
    /**
     * 绑定键盘事件
     */
    private bindkeyboard() {
        if (!GameConfig.IsBindKeyboard) {
            return;
        }
        KeyBoard._i().bindfun(this, this.keyup, KEYCODE.UP);
        KeyBoard._i().bindfun(this, this.keydown, KEYCODE.DOWN);
        KeyBoard._i().bindfun(this, this.keyleft, KEYCODE.LEFT);
        KeyBoard._i().bindfun(this, this.keyright, KEYCODE.RIGHT);
        KeyBoard._i().bindfun(this, this.keyspace, KEYCODE.SPACE);
    }
    /**
     * 检查游戏是否结束
     */
    private checkgameover() {
        var bgameover = false;
        if (bgameover) {
            this.gameover();
        }
    }
    private changepic() {

        this.picLBControl = new MyBitmap(RES.getRes('pic' + this.picNumber + '_jpg'), 0, 0);
        this.picLBControl.setanchorOff(0, 0);
        this.addChild(this.picLBControl);
        this.picLBControl.alpha = 0;

        egret.Tween.get(this.picLBControl).to({ alpha: 1 }, this.DelayTime);
        egret.Tween.get(this.picControl).to({ alpha: 0, x: 0 }, this.DelayTime).call(() => {
            this.picControl.texture = this.picLBControl.texture;
            this.picControl.alpha = 1;

            this.removeChild(this.picLBControl);
            if (this.picNumber == 3) {
                egret.Tween.get(this.picControl).to({ x: -1350 }, 2000).call(() => {
                    egret.setTimeout(this.touchtap, this, this.DelayTime);
                }, this);
            } else {
                egret.setTimeout(this.touchtap, this, this.DelayTime);
            }
        }, this);
    }
    private touchtap() {
        if (this.picNumber >= 23) {
            GameUtil.GameScene.runscene(new QuestionPage(), SceneEffect.TransAlpha);
            return;
        }

        this.picNumber++;
        this.changepic();
    }
    /**
     * 触摸层
     */
    private addtouch() {
        let touchshap: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0);
        this.addChild(touchshap);
        touchshap.$setTouchEnabled(true);
        touchshap.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
            if (GameData._i().GameOver) {
                return;
            }

            //this.touchtap();            

        }, this);

        // touchshap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbegin, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmove, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_END, this.touchend, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchout, this);
    }
    private btouch: boolean = false;
    private touchbegin(e: egret.TouchEvent) {
        if (GameData._i().GameOver) {
            return;
        }
        this.btouch = true;
    }
    private touchmove(e: egret.TouchEvent) {
        if (this.btouch) {
        }
    }
    private touchend(e: egret.TouchEvent) {
        if (this.btouch) {
            this.btouch = false;
        }
    }
    private touchout(e: egret.TouchEvent) {
        if (this.btouch) {
            this.btouch = false;
        }
    }

    /**
     * 游戏结束
     */
    public gameover() {
        console.log("GameOver");
        this.clearinter();
        GameData._i().GameOver = true;
        this.addChild(new GameOverPageShow());
    }
    /**
     *下一关
     */
    private nextlevelgame() {

    }
    /**
     * 重置游戏数据
     */
    public reset() {
        this.gameinterval();
        this.restart();
    }
    /**
     * 清除定时器
     */
    private clearinter() {
        GameUtil.clearinterval(this.intervalarr);
    }
    /**
     * 退出游戏，回到开始界面
     */
    private exitgame() {
        GameUtil.GameScene.runscene(new StartGameScene());
    }
    /**
     * 重新开始游戏
     */
    private restart() {

    }
    /**
     * 需要绑定的键盘事件
     */
    private keydown() {
    }
    private keyleft() {
    }
    private keyright() {
    }
    private keyup() {
    }
    private keyspace() {
        //GameData._i().GamePause = !GameData._i().GamePause;
    }
}