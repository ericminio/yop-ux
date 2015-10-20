var express = require('express');
var compression = require('compression');
var morgan = require('morgan');

function Server() {
    this.createHttpRoutes();
};

Server.prototype.start = function (port, done) {
    this.http = require('http').createServer(this.application);
    this.http.listen(port, done);
};

Server.prototype.stop = function (done) {
    this.http.close(done);
};

Server.prototype.createHttpRoutes = function () {
    var self = this;
    this.application = express();

    this.application.use(compression());
    this.application.use(require('body-parser').json());
    this.application.use(require('body-parser').urlencoded({ extended: true }));

    this.application.use(express.static(__dirname + '/../client'));
};

module.exports = Server;
