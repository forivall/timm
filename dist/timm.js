// Generated by CoffeeScript 1.10.0

/*
| Timm
| (c) Guillermo Grau Panea 2016
| License: MIT
 */

(function() {
  var MERGE_ERROR, _clone, _merge, _throw, addDefaults, addFirst, addLast, merge, removeAt, replaceAt, set, setIn,
    slice = [].slice;

  _throw = function(msg) {
    throw new Error(msg);
  };

  _clone = function(obj) {
    var i, key, keys, len1, out;
    keys = Object.keys(obj);
    out = {};
    for (i = 0, len1 = keys.length; i < len1; i++) {
      key = keys[i];
      out[key] = obj[key];
    }
    return out;
  };

  MERGE_ERROR = 'MERGE_ERROR';

  _merge = function(fAddDefaults) {
    var args, fChanged, i, idx, j, key, keys, len, len1, obj, out, ref;
    args = arguments;
    len = args.length;
    !(len > 1) && _throw(process.env.NODE_ENV !== 'production' ? "At least one object should be provided to merge()" : MERGE_ERROR);
    out = args[1];
    !(out != null) && _throw(process.env.NODE_ENV !== 'production' ? "At least one object should be provided to merge()" : MERGE_ERROR);
    fChanged = false;
    for (idx = i = 2, ref = len; i < ref; idx = i += 1) {
      obj = args[idx];
      if (obj == null) {
        continue;
      }
      keys = Object.keys(obj);
      if (!keys.length) {
        continue;
      }
      for (j = 0, len1 = keys.length; j < len1; j++) {
        key = keys[j];
        if (fAddDefaults && out[key] !== void 0) {
          continue;
        }
        if (obj[key] === out[key]) {
          continue;
        }
        if (!fChanged) {
          fChanged = true;
          out = _clone(out);
        }
        out[key] = obj[key];
      }
    }
    return out;
  };

  addLast = function(array, val) {
    if (Array.isArray(val)) {
      return array.concat(val);
    }
    return array.concat([val]);
  };

  addFirst = function(array, val) {
    if (Array.isArray(val)) {
      return val.concat(array);
    }
    return [val].concat(array);
  };

  removeAt = function(array, idx) {
    return array.slice(0, idx).concat(array.slice(idx + 1));
  };

  replaceAt = function(array, idx, newItem) {
    if (array[idx] === newItem) {
      return array;
    }
    return array.slice(0, idx).concat([newItem]).concat(array.slice(idx + 1));
  };

  set = function(obj, key, val) {
    var obj2;
    if (obj[key] === val) {
      return obj;
    }
    obj2 = _clone(obj);
    obj2[key] = val;
    return obj2;
  };

  setIn = function(obj, path, val, idx) {
    var key, newValue;
    if (idx == null) {
      idx = 0;
    }
    key = path[idx];
    if (idx === path.length - 1) {
      newValue = val;
    } else {
      newValue = setIn(obj[key], path, val, idx + 1);
    }
    return set(obj, key, newValue);
  };

  merge = function(a, b, c, d, e, f) {
    if (arguments.length <= 6) {
      return _merge(false, a, b, c, d, e, f);
    } else {
      return _merge.apply(null, [false].concat(slice.call(arguments)));
    }
  };

  addDefaults = function(a, b, c, d, e, f) {
    if (arguments.length <= 6) {
      return _merge(true, a, b, c, d, e, f);
    } else {
      return _merge.apply(null, [true].concat(slice.call(arguments)));
    }
  };

  module.exports = {
    addLast: addLast,
    addFirst: addFirst,
    removeAt: removeAt,
    replaceAt: replaceAt,
    set: set,
    setIn: setIn,
    merge: merge,
    addDefaults: addDefaults
  };

}).call(this);
