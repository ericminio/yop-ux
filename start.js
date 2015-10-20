var Server = require('./app/server/server');

var server = new Server();

var port = 5003;
server.start(port, function() {
    console.log('listening on port ' + port);
});

module.exports = server;
module.exports.port = port;
