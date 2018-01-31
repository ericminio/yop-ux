var chai = require('chai')
    , expect = chai.expect;
chai.use(require('../support/document.contain.element.matcher'));

describe('index.html', function() {

    describe('serving', function() {

        var Zombie = require("zombie");
        var Server = require('../server/server');

        var port = 5000;
        var url = 'http://localhost:' + port;

        beforeEach(function(done) {
            server = new Server();
            server.start(port, done);
        });

        afterEach(function(done) {
            server.stop(done);
        });

        it('works (external resources are reachable)', function(done) {
            const browser = new Zombie();

            browser.visit(url + '/index.html')
                .then(function() {
                    browser.assert.success();
                })
                .then(done, done);
        });

        it('initializes as expected', function(done) {
            const browser = new Zombie();

            browser.visit(url + '/index.html')
                .then(function() {
                    expect(browser.query('#welcome').innerHTML).to.equal('Ready :)');
                })
                .then(done, done);
        });
    });

    describe('structure', function() {

        var fs = require('fs');
        var JSDOM = require('jsdom').JSDOM;
        var document;

        beforeEach(function() {
            const dom = new JSDOM(fs.readFileSync('./app/client/index.html'));
            document = dom.window.document;
        });

        it('has the expected title', function() {
            expect(document.getElementsByTagName('title')[0].innerHTML).to.equal('Who am I?');
        });

        it('has a welcome message', function() {
            expect(document).to.containElement('#welcome');
        });
    });
});
