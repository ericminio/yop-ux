describe('index.html', function() {

    describe('serving', function() {

        var Zombie = require("zombie");
        var Server = require('../../app/server/server');

        var port = 5000;
        var url = 'http://localhost:' + port;

        beforeEach(function(done) {
            server = new Server();
            server.start(port, done);
        });

        afterEach(function(done) {
            server.stop(done);
        });

        it('works', function(done) {
            const browser = new Zombie();

            browser.visit(url + '/index.html')
                .then(function() {
                    browser.assert.success();
                })
                .then(done, done);
        });
    });

    describe('structure', function() {

        var expect = require('chai').expect;
        var jsdom = require('jsdom').jsdom
        var document;

        beforeEach(function() {
            document = jsdom(require('fs').readFileSync('./app/client/index.html'));
        });

        it('has the expected title', function() {
            expect(document.getElementsByTagName('title')[0].innerHTML).to.equal('Who am I?');
        });

        it('has a welcome message', function() {
            expect(document.querySelector('#welcome')).not.to.equal(undefined);
        });
    });
});
