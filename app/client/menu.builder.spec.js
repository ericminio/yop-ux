var chai = require('chai')
    , expect = chai.expect;
chai.use(require('../support/document.contain.element.matcher'));
var fs = require('fs');
var externalApi = fs.readFileSync('app/client/scripts/menu.builder.js');
var createMenuDom = (new Function( externalApi + 'return createMenuDom;'))();

describe('menu builder', function() {

    it('is available', function() {
        expect(createMenuDom).not.to.equal(undefined);
    });

    it('creates a list', function() {
        var data = `
            home
            config
        `;
        var dom = createMenuDom(data);

        expect(dom).to.equal('<ul><li>home</li><li>config</li></ul>');
    });
});
