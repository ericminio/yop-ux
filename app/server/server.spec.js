var expect = require('chai').expect;
var Server = require('./server');
var request = require('request');

describe('Server', function() {

    var server;
    var port = 5000;
    var home = 'http://localhost:' + port;

    beforeEach(function(done) {
        server = new Server();
        server.start(port, done);
    });

    afterEach(function(done) {
        server.stop(done);
    });

    it('serves index.html', function(done) {
        request(home + '/index.html', function(err, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});
