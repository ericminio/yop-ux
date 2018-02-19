var createMenuDom = function(data) {
    var lines = data.split('\n');
    var dom = '<ul>';
    for (var line of lines) {
        if (line.trim().length > 0) {
            dom += '<li><a href="/index.html?page=' + line.trim() + '">' + line.trim() + '</a></li>';
        }
    }
    dom += '</ul>';

    return dom;
};
