(function (window) {
    'use strict';

    web.methods.ajax_opts = function (opts) {

        opts.result = {};

        opts.url.indexOf("http://") < 0 && (opts.url = web.c.host + opts.url);
        opts.url.indexOf(".json") < 0 && (opts.url += '.json');
        return opts;
    };

    web.methods.ajax_result = function (methods, data) {
        if (web.c.debug && data.consoles) {
            $('body').append("<script id='ajax_consoles'>" + data.consoles + "</script>");
            $('#ajax_consoles').remove();
        }
        if (methods.page_id !== -1 && methods.page_id !== web.c.init) return;
        data = data || {code: 4001, msg: "网络连接错误，请重试"};
        var code_name = '$' + data.code;
        if (methods[code_name]) methods[code_name](data);
        else if (web.methods[code_name]) web.methods[code_name](data);
        else if (methods['$0']) methods['$0'](data);
        else if (web.methods['$0']) web.methods['$0'](data);
        else throw new Error("code methods " + code_name + "() not exist");
        methods['$end'] && methods['$end']();
    };

    web.ajax = function (para, result, common) {

        if (!web.c) throw new Error("[web error] web have not init yet.");

        result = result || para.result || {};
        result.page_id = common ? -1 : web.c.init;

        var opts = {
            type: "post",
            dataType: "json",
            timeout: 15000,
            data: {},
            success: function (data) {
                web.methods.ajax_result(result, data);
            },
            error: function () {
                web.methods.ajax_result(result);
            }
        };
        $.extend(opts, para);
        opts = web.methods.ajax_opts(opts);
        $.ajax(opts);
    };

})(this);