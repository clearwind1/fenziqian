/**
 * Created by pior on 15/9/29.
 * 封装egret Http类
 */

module GameUtil
{
    export class Http
    {
        private urlLoader: egret.URLLoader;
        private urlRequest: egret.URLRequest;
        private onLoader: Function;
        private thisObj: any;

        private covercontain: egret.DisplayObjectContainer;        
        //private coverBg: egret.Shape;

        public constructor(reqMethod:string=egret.URLRequestMethod.POST,dataFormat:string=egret.URLLoaderDataFormat.TEXT)
        {
            this.init(reqMethod,dataFormat);
        }

        private init(reqMethod:string=egret.URLRequestMethod.POST,dataFormat:string=egret.URLLoaderDataFormat.TEXT):void
        {
            this.urlLoader = new egret.URLLoader();
            this.urlLoader.dataFormat = dataFormat;
            this.urlLoader.addEventListener( egret.Event.COMPLETE, this.loaded, this );

            this.urlRequest = new egret.URLRequest();
            this.urlRequest.method = reqMethod;
        }

        private loaded(event:egret.Event):void
        {
            //this.thisObj.removeChild(GameUtil.WaitServerPanel.getInstace());

            this.urlLoader.removeEventListener(egret.Event.COMPLETE,this.loaded,this);

            this.thisObj.removeChild(this.covercontain);
            //console.log('urldata====', this.urlLoader.data);
            var data:any = JSON.parse(this.urlLoader.data);
            if(this.onLoader != null)
            {
                this.onLoader.apply(this.thisObj,[data]);
            }

            //console.log("GameUtil.WaitServerPanel=========",GameUtil.WaitServerPanel.getInstace());
        }

        public send( param:any, file?:string, loaded:Function = null, thisObj:any = null,url:string=GameConfig.IP):void
        {
            this.urlRequest.url = "Http://"+url+file;
            this.onLoader = loaded;
            this.thisObj = thisObj;

            //console.log("paramJson==========",GameUtil.objectToString(param));

            var urlVariables:egret.URLVariables = new egret.URLVariables(GameUtil.objectToString(param));
            this.urlRequest.data = urlVariables;
            this.urlLoader.addEventListener( egret.Event.COMPLETE, this.loaded, this );

            this.urlLoader.load( this.urlRequest );

            this.covercontain = new egret.DisplayObjectContainer();
            this.thisObj.addChild(this.covercontain);
            var coverBg = GameUtil.createRect(0,0,GameConfig.getSW(),GameConfig.getSH(),0.6);
            this.covercontain.addChild(coverBg);
            this.covercontain.touchEnabled = true;
            var gif = new Animation('gifloadingbar', 2, 100, 375, 675);
            gif.setLoop(-1);
            this.covercontain.addChild(gif);
            gif.play();
            var logo = new MyBitmap(RES.getRes('logo_png'), 375, 675 + 100);
                this.covercontain.addChild(logo);

            //console.log("GameUtil.WaitServerPanel.getInstace()=========",GameUtil.WaitServerPanel.getInstace());
            //this.thisObj.addChild(GameUtil.WaitServerPanel.getInstace());
        }

        public setReqMethod(reqMethod:string):void
        {
            this.urlRequest.method = reqMethod;
        }

        private static _instance:Http;

        public static getinstance(reqMethod:string=egret.URLRequestMethod.POST,dataFormat:string=egret.URLLoaderDataFormat.TEXT):Http
        {
            if( null == Http._instance )
            {
                Http._instance = new Http(reqMethod,dataFormat);
            }

            return Http._instance;
        }

    }
}