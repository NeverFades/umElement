function $EE() {
    window.require = function () {
    };
    window.__uri = function () {
    };
    window.module = {};
    window.exports = {};

    /*support*/
    require('./js/support.js');

    /*jquery*/
    require('./lib/jquery_2.2.4.js');

    /*jquery cookie */
    require('./lib/jquery_cookie.js');

    /*vue*/
    require('./lib/vue_2.2.6.js');

    /*web*/
    require('./js/web.js');

    /*web_tools*/
    require('./js/web_tools.js');

    /*web_ajax*/
    require('./js/web_ajax.js');

    /*web_push*/
    require('./js/web_push.js');

    /*require*/
    require('./lib/require_2.3.3.js');

    /*tools*/
    require('./js/tools.js');
}