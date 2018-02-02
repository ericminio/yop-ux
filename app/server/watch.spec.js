var chai = require('chai')
    , expect = chai.expect;
chai.use(require('../support/document.contain.element.matcher'));
var Zombie = require("zombie");
var Server = require('../server/server');
var fs = require('fs');
var path = require('path');

describe('Modifying a file', function() {

    var port = 5000;
    var url = 'http://localhost:' + port;
    var fileName;
    var filePath;
    var content = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <script src="/socket.io/socket.io.js"></script>
        </head>
        <body>
            <div id="welcome">home</div>
            <script>
                var socket = io();
                socket.on('reload', function() {
                    document.location.reload(true);
                });
            </script>
      </body>
    </html>
    `;

    beforeEach(function(done) {
        fileName = new Date().getTime();
        filePath = path.join(__dirname, '../client/' + fileName + '.html');
        fs.writeFileSync(filePath, content);
        server = new Server();
        server.start(port, done);
    });

    afterEach(function(done) {
        server.stop(done);
        fs.unlinkSync(filePath);
    });

    it('triggers a reload', function(done) {
        const browser = new Zombie();

        browser.visit(url + '/' + fileName + '.html')
            .then(function() {
                expect(browser.query('#welcome').innerHTML).to.equal('home');
            })
            .then(function() {
                content = content.replace('home', 'budy');
                fs.writeFileSync(filePath, content);
            })
            .then(function() {
                server.sendReload();
            })
            .then(function() {
                setTimeout(function() {
                    browser.wait(function() {
                        expect(browser.query('#welcome').innerHTML).to.equal('budy');
                        done();
                    });
                }, 200);
            });
    });
});
