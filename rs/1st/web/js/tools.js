web.setRequirePath = function (paths) {
    $.each(paths, function (index, value) {
        paths[index] = value.replace('.js', '');
    });
    require.config({paths: paths});
};