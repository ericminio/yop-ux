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

        it('works', function(done) {
            const browser = new Zombie();

            browser.visit(url + '/index.html')
                .then(function() {
                    browser.assert.success();
                })
                .then(function() {
                    expect(browser.query('body').innerHTML).to.contain('home');
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
            expect(document.getElementsByTagName('title')[0].innerHTML).to.equal('Welcome');
        });
    });
});
