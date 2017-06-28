module.exports = [{
    //编译定义
    amd: true,
    entry_files: '/*/**/*.html',
    not_mod_files: ['/1st/**', '/3rd/**'],
    package: [{
        files: '/(*)/(*)/**.{js,vue,htm,tpl}',
        to: '/$1/0s/$2.js'
    }, {
        files: '/(*)/(*)/**.{css,less}',
        to: '/$1/0s/$2.css'
    }, {
        files: '/3rd/**.{js,htm,tpl}',
        to: false
    }],
    //部署配置
    relative: false,
    minimum: false,
    hash: false,
    domain: false,
    loader_libs: {
        html: ['/1st/web/web.js']
    },
    code_config: {
        debug: true
    }
}, require("./config_server")];