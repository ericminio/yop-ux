var createMenuDom = function(data) {
    var lines = data.split('\n');
    var dom = '<ul>';
    for (var line of lines) {
        if (line.trim().length > 0) {
            dom += '<li>' + line.trim() + '</li>';
        }
    }
    dom += '</ul>';

    return dom;
};
