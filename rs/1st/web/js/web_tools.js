(function (window) {
    'use strict';

    web.loadCss = function (url) {
        var node = document.createElement('link');
        node.type = 'text/css';
        node.rel = 'stylesheet';
        node.href = url;
        document.getElementsByTagName('head')[0].appendChild(node);
    };

    web.loadJs = function (url, callback) {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = url;
        if (callback) node.onload = callback;
        document.body.appendChild(node);
    };

    web.localStore = function (key, value) {
        if (!key) return false;
        return value ? localStorage.setItem(key, JSON.stringify(value)) : JSON.parse(localStorage.getItem(key));

    };

    web.sessionStore = function (key, value) {
        if (!key) return false;
        return value ? sessionStorage.setItem(key, JSON.stringify(value)) : JSON.parse(sessionStorage.getItem(key));
    };

})(this);