var chai = require('chai')
    , expect = chai.expect;
chai.use(require('../support/document.contain.element.matcher'));
var fs = require('fs');
var externalApi = fs.readFileSync('app/client/scripts/menu.builder.js');
var createMenuDom = (new Function( externalApi + 'return createMenuDom;'))();
var JSDOM = require('jsdom').JSDOM;

describe('menu builder', function() {

    it('is available', function() {
        expect(createMenuDom).not.to.equal(undefined);
    });

    it('creates a list', function() {
        var data = `
            home
            config
        `;
        var document = new JSDOM(createMenuDom(data)).window.document;
        var items = document.querySelectorAll('ul > li');        

        expect(items.length).to.equal(2);
        expect(items[0].innerHTML).to.equal('home');
        expect(items[1].innerHTML).to.equal('config');
    });
});
