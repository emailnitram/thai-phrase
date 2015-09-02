/* */ 
'use strict';
var LIBRARY = require("./$.library"),
    $def = require("./$.def"),
    $redef = require("./$.redef"),
    hide = require("./$.hide"),
    has = require("./$.has"),
    SYMBOL_ITERATOR = require("./$.wks")('iterator'),
    Iterators = require("./$.iterators"),
    FF_ITERATOR = '@@iterator',
    KEYS = 'keys',
    VALUES = 'values';
var returnThis = function() {
  return this;
};
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
  require("./$.iter-create")(Constructor, NAME, next);
  var createMethod = function(kind) {
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }
    return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator',
      proto = Base.prototype,
      _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
      _default = _native || createMethod(DEFAULT),
      methods,
      key;
  if (_native) {
    var IteratorPrototype = require("./$").getProto(_default.call(new Base));
    require("./$.tag")(IteratorPrototype, TAG, true);
    if (!LIBRARY && has(proto, FF_ITERATOR))
      hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
  }
  if (!LIBRARY || FORCE)
    hide(proto, SYMBOL_ITERATOR, _default);
  Iterators[NAME] = _default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      keys: IS_SET ? _default : createMethod(KEYS),
      values: DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if (FORCE)
      for (key in methods) {
        if (!(key in proto))
          $redef(proto, key, methods[key]);
      }
    else
      $def($def.P + $def.F * require("./$.iter-buggy"), NAME, methods);
  }
};
