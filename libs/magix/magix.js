/**
 * magix API文档
 * @module magix
 */
/**
 * magix History 服务
 * @class History
 * @namespace Magix
 * @static
 */
(function(){
    if (!window.console) {
        window.console = {
            log: function(s){
                //alert(s);
            },
            dir: function(s){
                //alert(s);
            },
            warn: function(s){
                //alert("[warn]:" + s);
            },
            error: function(s){
                //alert("[error]:" + s);
            }
        };
    }
    Magix = window.Magix || {};
    Magix.History = Magix.History ||
    {
        hash: "",
        oldHash: null,
        showIframe: false,
        isIE: false,
        iframe: null,
        slient: false,
        interval: 50,
        intervalId: 0,
        iframeSrc: "",
        /**
         * Magix应用程序入口 启动History服务
         * <pre>
         * &lt;script src="seajs.js">&lt;/script>
         * &lt;script src="magix.js">&lt;/script>
         * &lt;script>
         * 	Magix.History.init("mxhistory.html", function(query){
         * 	&nbsp;&nbsp;&nbsp;&nbsp;seajs.use(['libs/magix/controller'], function(ctrl){
         * 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ctrl._route(query);
         * 	&nbsp;&nbsp;&nbsp;&nbsp;});
         * 	});
         * &lt;/script>
         * </pre>
         * @method init
         * @param {String} iframeSrc 用于IE6/7记录历史的iframe地址,注意需要填写相对于主页的相对路径.
         * @param {Function} router 回调函数,在hash发生变化时触发,将会接到一个参数query.
         * @namespace Magix
         */
        init: function(iframeSrc, router){
            this.iframeSrc = iframeSrc;
            this.hash = location.hash;
            this.oldHash = this.hash;
            this.isIE = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
            var docMode = document.documentMode;
            this.showIframe = this.isIE && (!docMode || docMode < 7);
            this.wirteFrame(iframeSrc);
            this.regHashChange();
            this.router = router;
            if (!this.showIframe) {
                this.route(this.hash);
            }
        },
        regHashChange: function(){
            var self = this;
            if ('onhashchange' in window && !this.showIframe) {
                window.onhashchange = function(){
                    self.hashChange.call(self);
                };
            }
            else {
                this.intervalId = window.setInterval((function(){
                    var hash = location.hash;
                    if (hash != self.oldHash) {
                        self.hashChange.call(self);
                    }
                }), this.interval);
            }
        },
        hashChange: function(){
            this.hash = location.hash;
            this.oldHash = this.hash;
            if (!this.showIframe) {
                this.route(this.hash);
            }
            else {
                this.iframe.src = this.iframeSrc + "?" + (this.hash ? this.hash.substr(1) : "");
            }
        },
        frameLoad: function(){
            var h = Magix.History;
            if (h.iframe) {
                var ns = h.iframe.contentWindow.location.search.substr(1);
                h.hash = h.oldHash = "#" + ns;
                location.hash = ns;
            }//else{
            this.route(this.hash);
            //}
        },
        route: function(query){
            if (query.indexOf("#") === 0) {
                query = query.substr(1);
            }
            if (query.indexOf("?") === 0) {
                query = query.substr(1);
            }
            if (query.indexOf("!") === 0) {
                query = query.substr(1);
            }
            this.router(query);
            //dv.innerHTML = "<div>" + query + "</div>" + dv.innerHTML;
        },
        wirteFrame: function(){
            var self = this;
            if (this.showIframe) {
                //document.write("<iframe onload='Magix.History.frameLoad();' id='MxHistory' src='" + this.iframeSrc + "?" + (this.hash ? this.hash.substr(1) : "") + "' width='90%'></iframe>");
                document.write("<iframe onload='Magix.History.frameLoad();' id='MxHistory' src='" + this.iframeSrc + "?" + (this.hash ? this.hash.substr(1) : "") + "' style='z-index:99998;visibility:hidden;position:absolute;' border='0' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' ></iframe>");
            }
            window.setTimeout((function(){
                self.iframe = document.getElementById("MxHistory");
            }), 0);
        }
    };
    //Magix.History.init("mxhistory.html");
})();
