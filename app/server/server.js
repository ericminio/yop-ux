var url = require('url');
var fs = require('fs');
var path = require('path');

function Server() {
};

Server.prototype.start = function (port, done) {
    this.http = require('http').createServer(function(request, response) {
        if ('/' == request.url) { request.url = '/index.html'; }

        var parsed = url.parse(request.url, true);
        var filePath = path.join(__dirname, '../client/' + parsed.pathname);
        var content = '';
        try { content = fs.readFileSync(filePath).toString(); }
        catch (error) { 
            response.statusCode = 404; 
            content = request.url;
        }
        if (/\.js$/.test(parsed.pathname)) {
            response.setHeader('Content-Type', 'application/javascript');
        }
        if (/\.css$/.test(parsed.pathname)) {
            response.setHeader('Content-Type', 'text/css');
        }
        if (/\.html$/.test(parsed.pathname)) {
            response.setHeader('Content-Type', 'text/html');
        }
        if (/\.data$/.test(parsed.pathname)) {
            response.setHeader('Content-Type', 'text/plain');
        }
        response.write(content);
        response.end();
    });
    this.io = require('socket.io')(this.http);
    this.io.on('connection', function(socket) {
    });
    var self = this;
    fs.watch(path.join(__dirname, '../client/'), { recursive:true }, function(e, file) {
        self.sendReload();
    });
    this.http.listen(port, done);
};

Server.prototype.sendReload = function() {
    this.io.emit('reload', {});
};

Server.prototype.stop = function (done) {
    this.http.close();
    done();
};

module.exports = Server;
