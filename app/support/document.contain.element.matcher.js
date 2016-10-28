var matcher = function (chai, utils) {
    var Assertion = chai.Assertion;
    Assertion.addMethod('containElement', function (selector) {
        var document = this._obj;
        this.assert(
            document.querySelector(selector) != null
            , 'element ' + selector + ' not found'
            , 'element ' + selector + ' found'
      );
    });
};

module.exports = matcher;
