// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voteOption = exports.removePost = exports.addPost = exports.loadDefaultState = exports.state = void 0;
var state = {
  posts: []
};
exports.state = state;

var loadDefaultState = function loadDefaultState(data) {
  if (data.length > 0) {
    data.map(function (post) {
      return state.posts.push(post);
    });
  }
};

exports.loadDefaultState = loadDefaultState;

var addPost = function addPost(post) {
  return state.posts.push(post);
};

exports.addPost = addPost;

var removePost = function removePost(id) {
  var splitID = id.split('-')[1];
  var index = state.posts.map(function (item, index) {
    return index;
  }).indexOf(parseInt(splitID));
  return state.posts.splice(index, 1);
};

exports.removePost = removePost;

var voteOption = function voteOption(id, type) {
  var object = state.posts[id];

  if (type == "plus") {
    return object.vote.plus += 1;
  } else if (type == "minus") {
    return object.vote.minus += 1;
  }
};

exports.voteOption = voteOption;
},{}],"js/static.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSuccessElement = exports.countElement = exports.formElement = exports.postsContainerElement = void 0;
var postsContainerElement = document.querySelector('.posts-container-js');
exports.postsContainerElement = postsContainerElement;
var formElement = document.querySelector('.form-js');
exports.formElement = formElement;
var countElement = document.querySelector('.count-js');
exports.countElement = countElement;
var postSuccessElement = document.querySelector('.post-success-js');
exports.postSuccessElement = postSuccessElement;
},{}],"js/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEvents = exports.voteButton = exports.removeButtonAction = void 0;

var _static = require("./static");

var _model = require("./model");

var _views = require("./views");

var addPostAction = function addPostAction() {
  _static.formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    if (this.title.value && this.description.value) {
      var postObject = {
        id: _model.state.posts.length + 1,
        title: this.title.value,
        description: this.description.value,
        vote: {
          plus: 0,
          minus: 0
        }
      };
      (0, _model.addPost)(postObject);
      _static.postsContainerElement.innerHTML = "";
      (0, _views.renderPosts)(_model.state.posts);

      _static.postSuccessElement.classList.add('show');

      this.title.value = "";
      this.description.value = "";
      setTimeout(function () {
        _static.postSuccessElement.classList.remove('show');
      }, 1500);
    } else {
      alert("Validate error");
    }
  });
};

var removeButtonAction = function removeButtonAction(element) {
  if (!element) return;
  element.addEventListener("click", function () {
    var postElement = this.closest('.blog-tile-js');
    var postID = postElement.id;
    (0, _model.removePost)(postID);
    _static.postsContainerElement.innerHTML = "";
    (0, _views.renderPosts)(_model.state.posts);
  });
};

exports.removeButtonAction = removeButtonAction;

var voteButton = function voteButton(element, type, index) {
  if (!element) return;
  element.addEventListener("click", function () {
    (0, _model.voteOption)(index, type);
    _static.postsContainerElement.innerHTML = "";
    (0, _views.renderPosts)(_model.state.posts);
  });
};

exports.voteButton = voteButton;

var initEvents = function initEvents() {
  addPostAction();
  removeButtonAction();
};

exports.initEvents = initEvents;
},{"./static":"js/static.js","./model":"js/model.js","./views":"js/views.js"}],"js/views.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPosts = void 0;

var _static = require("./static");

var events = _interopRequireWildcard(require("./events"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _renderTile = function _renderTile(post, index) {
  return "\n    <div id=\"post-".concat(index, "\" class=\"blog__tile blog-tile-js\">\n        <div class=\"blog__tile-title\">\n            ").concat(post.title, "\n        </div>\n\n        <div class=\"blog__tile-description\">\n            ").concat(post.description, "\n        </div>\n\n        <div class=\"blog__tile-menu\">\n            <div class=\"blog__tile-remove remove-button-js\">\n                Remove\n            </div>\n            \n            <div class=\"blog__tile-vote vote-js\">\n            (").concat(post.vote.plus, ") <span class=\"cursor-pointer vote-plus-js\">+</span> (").concat(post.vote.minus, ") <span class=\"cursor-pointer vote-minus-js\">-</span>\n            </div>\n        </div>\n    </div>\n    ");
};

var renderPosts = function renderPosts(posts) {
  posts.map(function (post, index) {
    _static.postsContainerElement.insertAdjacentHTML("beforeend", _renderTile(post, index));

    var element = document.querySelector("#".concat('post-' + index));
    var buttonElement = element.querySelector('.remove-button-js');
    var votePlus = element.querySelector('.vote-plus-js');
    var voteMinus = element.querySelector('.vote-minus-js');
    events.voteButton(votePlus, "plus", index);
    events.voteButton(voteMinus, "minus", index);
    events.removeButtonAction(buttonElement);
  });
  _static.countElement.textContent = posts.length;
};

exports.renderPosts = renderPosts;
},{"./static":"js/static.js","./events":"js/events.js"}],"data/posts.json":[function(require,module,exports) {
module.exports = [{
  "title": "First Example Article",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a auctor lacus. Quisque bibendum quam tortor, vitae lacinia mauris congue eu. Donec nibh eros, volutpat nec eleifend sed, pulvinar in risus. Curabitur a pulvinar diam. ",
  "vote": {
    "plus": 5,
    "minus": 3
  }
}, {
  "title": "Second Example Article",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a auctor lacus. Quisque bibendum quam tortor, vitae lacinia mauris congue eu. Donec nibh eros, volutpat nec eleifend sed, pulvinar in risus. Curabitur a pulvinar diam. ",
  "vote": {
    "plus": 2,
    "minus": 7
  }
}, {
  "title": "Third Example Article",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a auctor lacus. Quisque bibendum quam tortor, vitae lacinia mauris congue eu. Donec nibh eros, volutpat nec eleifend sed, pulvinar in risus. Curabitur a pulvinar diam. ",
  "vote": {
    "plus": 3,
    "minus": 5
  }
}];
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _model = require("./model");

var _views = require("./views");

var _events = require("./events");

var data = require("../data/posts.json");

(0, _model.loadDefaultState)(data);
(0, _views.renderPosts)(_model.state.posts);
(0, _events.initEvents)(true);
},{"./model":"js/model.js","./views":"js/views.js","./events":"js/events.js","../data/posts.json":"data/posts.json"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59566" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map