(function (window) {
    'use strict';

    var web = {
        c: {
            debug: false,
            host: '',
            res: '',
            init: 0,
            origin: window.location.protocol + "//" + window.location.hostname
        },
        v: {},
        m: {},
        methods: {
            $0: false,
            $200: false,
            $400: false,
            $401: false,
            data_check: false,
            beforeLoad: false
        }
    };

    window.web = web;
    window.$$ = web;

    web.log = function (info) {
        web.c.debug && console.log(info);
    };
    web.debug = function (info) {
        web.c.debug && console.debug(info);
    };

    web.setConfig = function (config) {
        if (typeof config === "string") {
            try {
                config = JSON.parse(config);
            } catch (e) {
                throw new Error("web: config must be a json object");
            }
        }
        $.extend(web.c, config);
    };

    web.initConfig = function () {
        var url_query = {}, query_params = location.search.substr(1).split("&");
        for (var i = 0; i < query_params.length; i++) {
            var query_param = query_params[i].split("=");
            url_query[query_param[0]] = query_param[1];
        }
        var cookie = {}, cookie_params = document.cookie.split("; ");
        for (var j = 0; j < cookie_params.length; j++) {
            var c = cookie_params[j].split("=");
            cookie[c[0]] = c[1];
        }
        web.c.path = location.pathname.substr(1).replace('.html', '').split('/');
        web.c.hash = location.hash.substr(1).split('/');
        web.c.query = url_query;
        web.c.cookie = cookie;
        web.c.init++;
    };

    web.initDebugConfig = function () {
        var is_dev = !!web.c.debug;
        Vue.config.silent = !is_dev;
        Vue.config.devtools = is_dev;
        if (!is_dev) {
            web.log = web.debug = function () {
            }
        }
    };

    web.reload = function () {
        if (web.temp_vue) {
            web.load(web.temp_vue);
            return true;
        } else {
            return false;
        }
    };

    web.load = function (vue) {

        //初始化内置配置
        web.initConfig();
        web.initDebugConfig();


        //开始数据检查
        if (web.methods.data_check && !web.methods.data_check()) {
            web.temp_vue = vue;
            return false;
        }

        //初始化数据
        if (web.v.$destroy) {
            web.v.$destroy();
            delete web.v;
            delete web.m;
        }

        //初始化vue数据
        web.methods.beforeLoad && web.methods.beforeLoad();
        vue.loaded();
        vue.data = web.m || {};

        //初始化hash_change事件
        web.onHashed = vue.hashed || false;
        web.onHashed && web.onHashed();

        //初始化Dom
        $("#app").remove();
        $('body').off().prepend("<div id='app'><div id='content'></div></div>");

        //初始化并挂载vue
        web.v = new Vue(vue);
        web.v.$mount('#content');

        //删除临时储存的vue对象
        delete web.temp_vue;

        return true;
    };
    window.onhashchange = function () {
        web.initConfig();
        web.onHashed && web.onHashed();
    };

})(this);