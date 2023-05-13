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
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/bird.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bird = void 0;
var Bird = /** @class */function () {
  function Bird(boid, wingSpan) {
    if (wingSpan === void 0) {
      wingSpan = 10;
    }
    this.greenValue = 255;
    this.boid = boid;
    this.wingSpan = wingSpan;
  }
  Bird.prototype.draw = function (ctx, frame) {
    var angle = Math.atan2(this.boid.velocity.y, this.boid.velocity.x);
    var _a = this.boid.position,
      x = _a.x,
      y = _a.y;
    var size = this.wingSpan + Math.sin(frame / 10) * this.wingSpan / 4;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size / 2, size / 2);
    ctx.lineTo(-size / 2, -size / 2);
    ctx.closePath();
    var color = "rgb(0, ".concat(this.greenValue, ", 0)");
    ctx.fillStyle = color;
    this.greenValue = Math.max(this.greenValue - 2, 0);
    ctx.fill();
    ctx.restore();
  };
  Bird.prototype.printBoidForces = function (ctx) {
    ctx.save();
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("".concat(this.boid.alignmentForce.x.toFixed(2), ", ").concat(this.boid.alignmentForce.y.toFixed(2)), this.boid.position.x + 10, this.boid.position.y - 10);
    ctx.fillStyle = "red";
    ctx.fillText("".concat(this.boid.cohesionForce.x.toFixed(2), ", ").concat(this.boid.cohesionForce.y.toFixed(2)), this.boid.position.x + 10, this.boid.position.y);
    ctx.fillStyle = "blue";
    ctx.fillText("".concat(this.boid.separationForce.x.toFixed(2), ", ").concat(this.boid.separationForce.y.toFixed(2)), this.boid.position.x + 10, this.boid.position.y + 10);
    ctx.restore();
  };
  return Bird;
}();
exports.Bird = Bird;
},{}],"src/vector.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = void 0;
var Vector = /** @class */function () {
  function Vector(x, y) {
    if (x === void 0) {
      x = 0;
    }
    if (y === void 0) {
      y = 0;
    }
    this.x = x;
    this.y = y;
  }
  Vector.prototype.add = function (v) {
    return new Vector(this.x + v.x, this.y + v.y);
  };
  Vector.prototype.sub = function (v) {
    return new Vector(this.x - v.x, this.y - v.y);
  };
  Vector.prototype.mult = function (n) {
    return new Vector(this.x * n, this.y * n);
  };
  Vector.prototype.div = function (n) {
    return new Vector(this.x / n, this.y / n);
  };
  Vector.prototype.normalize = function () {
    var mag = this.mag();
    if (mag !== 0) {
      return this.div(mag);
    }
    return this;
  };
  Vector.prototype.limit = function (max) {
    if (this.mag() > max) {
      return this.normalize().mult(max);
    }
    return this;
  };
  Vector.prototype.mag = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  Vector.dist = function (v1, v2) {
    return v1.sub(v2).mag();
  };
  return Vector;
}();
exports.Vector = Vector;
},{}],"src/boid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Boid = void 0;
var vector_1 = require("./vector");
var Boid = /** @class */function () {
  function Boid(position, velocity, maxSpeed, maxForce) {
    this.position = position;
    this.velocity = velocity;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.alignmentForce = new vector_1.Vector(0, 0);
    this.cohesionForce = new vector_1.Vector(0, 0);
    this.separationForce = new vector_1.Vector(0, 0);
    this.acceleration = new vector_1.Vector(0, 0);
    this.seekForceMultiplier = 1.5;
    this.edgeAvoidanceDistance = 20;
    this.edgeAvoidanceStrength = 1;
    this.obstacleAvoidanceDistance = 20;
    this.obstacleAvoidanceStrength = 0.5;
  }
  Boid.prototype.update = function (boids, cursorPosition, obstacles, screenWidth, screenHeight) {
    this.applyFlockingBehaviors(boids);
    if (cursorPosition) this.applyCursorForce(cursorPosition);
    this.applyEdgeAvoidanceForce(screenWidth, screenHeight);
    this.applyObstacleAvoidanceForce(obstacles);
    this.updateVelocity();
    this.updatePosition();
    this.resetAcceleration();
  };
  Boid.prototype.isOutside = function (width, height) {
    return this.position.x < 0 || this.position.y < 0 || this.position.x > width || this.position.y > height;
  };
  Boid.prototype.seek = function (target) {
    var desired = target.sub(this.position).normalize().mult(this.maxSpeed);
    var steer = desired.sub(this.velocity).limit(this.maxForce);
    return steer;
  };
  Boid.prototype.applyFlockingBehaviors = function (boids) {
    this.alignmentForce = this.calculateAlignmentForce(boids, 50);
    this.cohesionForce = this.calculateCohesionForce(boids, 50);
    this.separationForce = this.calculateSeparationForce(boids, 50);
    this.applySteerForce(this.separationForce);
    this.applySteerForce(this.alignmentForce);
    this.applySteerForce(this.cohesionForce);
  };
  Boid.prototype.applyCursorForce = function (cursorPosition) {
    var cursorForce = this.seek(cursorPosition).mult(this.seekForceMultiplier);
    this.applyForce(cursorForce);
  };
  Boid.prototype.applyEdgeAvoidanceForce = function (screenWidth, screenHeight) {
    var edgeAvoidanceForce = this.calculateEdgeAvoidanceForce(screenWidth, screenHeight);
    this.applyForce(edgeAvoidanceForce);
  };
  Boid.prototype.applyObstacleAvoidanceForce = function (obstacles) {
    var obstacleAvoidanceForce = this.calculateObstacleAvoidanceForce(obstacles);
    this.applyForce(obstacleAvoidanceForce);
  };
  Boid.prototype.getBoidsInRange = function (boids, range) {
    var _this = this;
    return boids.filter(function (boid) {
      return vector_1.Vector.dist(_this.position, boid.position) > 0 && vector_1.Vector.dist(_this.position, boid.position) < range;
    });
  };
  Boid.prototype.calculateSeparationForce = function (boids, range) {
    var _this = this;
    var diffVectors = this.getBoidsInRange(boids, range).map(function (boid) {
      return _this.position.sub(boid.position).normalize().div(vector_1.Vector.dist(_this.position, boid.position));
    });
    return this.getAverageVector(diffVectors);
  };
  Boid.prototype.calculateAlignmentForce = function (boids, range) {
    var velocityVectors = this.getBoidsInRange(boids, range).map(function (boid) {
      return boid.velocity;
    });
    return this.getAverageVector(velocityVectors);
  };
  Boid.prototype.calculateCohesionForce = function (boids, range) {
    var positionVectors = this.getBoidsInRange(boids, range).map(function (boid) {
      return boid.position;
    });
    return this.getAverageVector(positionVectors);
  };
  Boid.prototype.calculateEdgeAvoidanceForce = function (screenWidth, screenHeight) {
    var avoidanceForce = new vector_1.Vector(0, 0);
    var leftEdgeDistance = this.position.x;
    var rightEdgeDistance = screenWidth - this.position.x;
    var topEdgeDistance = this.position.y;
    var bottomEdgeDistance = screenHeight - this.position.y;
    if (leftEdgeDistance < this.edgeAvoidanceDistance) {
      avoidanceForce.x = (this.edgeAvoidanceDistance - leftEdgeDistance) / this.edgeAvoidanceDistance * this.edgeAvoidanceStrength;
    } else if (rightEdgeDistance < this.edgeAvoidanceDistance) {
      avoidanceForce.x = -((this.edgeAvoidanceDistance - rightEdgeDistance) / this.edgeAvoidanceDistance * this.edgeAvoidanceStrength);
    }
    if (topEdgeDistance < this.edgeAvoidanceDistance) {
      avoidanceForce.y = (this.edgeAvoidanceDistance - topEdgeDistance) / this.edgeAvoidanceDistance * this.edgeAvoidanceStrength;
    } else if (bottomEdgeDistance < this.edgeAvoidanceDistance) {
      avoidanceForce.y = -((this.edgeAvoidanceDistance - bottomEdgeDistance) / this.edgeAvoidanceDistance * this.edgeAvoidanceStrength);
    }
    return avoidanceForce;
  };
  Boid.prototype.calculateObstacleAvoidanceForce = function (obstacles) {
    var avoidanceForce = new vector_1.Vector(0, 0);
    for (var _i = 0, obstacles_1 = obstacles; _i < obstacles_1.length; _i++) {
      var obstacle = obstacles_1[_i];
      var directionToObstacle = this.position.sub(obstacle.center);
      var distanceToObstacle = directionToObstacle.mag();
      if (distanceToObstacle < this.obstacleAvoidanceDistance + obstacle.radius) {
        var avoidanceStrength = (this.obstacleAvoidanceDistance + obstacle.radius - distanceToObstacle) / this.obstacleAvoidanceDistance * this.obstacleAvoidanceStrength;
        avoidanceForce = avoidanceForce.add(directionToObstacle.normalize().mult(avoidanceStrength));
      }
    }
    return avoidanceForce;
  };
  Boid.prototype.getAverageVector = function (vectors) {
    var sum = vectors.reduce(function (sum, vector) {
      return sum.add(vector);
    }, new vector_1.Vector(0, 0));
    var count = vectors.length;
    return count > 0 ? sum.div(count) : new vector_1.Vector(0, 0);
  };
  Boid.prototype.applyForce = function (force) {
    this.acceleration = this.acceleration.add(force);
  };
  Boid.prototype.applySteerForce = function (force) {
    if (force.mag() > 0) {
      var steerForce = force.normalize().mult(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
      this.applyForce(steerForce);
    }
  };
  Boid.prototype.updateVelocity = function () {
    this.velocity = this.velocity.add(this.acceleration).limit(this.maxSpeed);
  };
  Boid.prototype.updatePosition = function () {
    this.position = this.position.add(this.velocity);
  };
  Boid.prototype.resetAcceleration = function () {
    this.acceleration = new vector_1.Vector(0, 0);
  };
  return Boid;
}();
exports.Boid = Boid;
},{"./vector":"src/vector.ts"}],"src/canvas.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = void 0;
var Canvas = /** @class */function () {
  function Canvas(elementId) {
    var _this = this;
    var _a;
    this.element = document.getElementById(elementId);
    this.context = (_a = this.element) === null || _a === void 0 ? void 0 : _a.getContext("2d");
    if (!this.context) {
      throw new Error("Could not get canvas context");
    }
    this.updateSize();
    window.addEventListener("resize", function () {
      return _this.updateSize();
    });
  }
  Object.defineProperty(Canvas.prototype, "width", {
    get: function get() {
      return this.element.width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Canvas.prototype, "height", {
    get: function get() {
      return this.element.height;
    },
    enumerable: false,
    configurable: true
  });
  Canvas.prototype.updateSize = function () {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  };
  Canvas.prototype.clear = function () {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  };
  return Canvas;
}();
exports.Canvas = Canvas;
},{}],"src/ui.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onBirdCountChange = exports.getCursorPosition = void 0;
var vector_1 = require("./vector");
// cursor position
var cursorPosition = new vector_1.Vector(0, 0);
var cursorIsDown = false;
function updateCursorPosition(event) {
  if (event instanceof TouchEvent) {
    cursorPosition = new vector_1.Vector(event.touches[0].clientX, event.touches[0].clientY);
  } else if (event instanceof MouseEvent) {
    cursorPosition = new vector_1.Vector(event.clientX, event.clientY);
  }
}
function onCursorUp() {
  cursorIsDown = false;
}
function onCursorDown() {
  cursorIsDown = true;
}
window.addEventListener("mousemove", updateCursorPosition);
window.addEventListener("touchmove", updateCursorPosition);
window.addEventListener("mousedown", onCursorDown);
window.addEventListener("touchstart", onCursorDown);
window.addEventListener("mouseup", onCursorUp);
window.addEventListener("touchend", onCursorUp);
function getCursorPosition() {
  return cursorIsDown ? cursorPosition : null;
}
exports.getCursorPosition = getCursorPosition;
// bird count input
var birdCountInput = document.getElementById("birdCount");
function onBirdCountChange(callback) {
  birdCountInput.addEventListener("change", function () {
    callback(parseInt(birdCountInput.value));
  });
}
exports.onBirdCountChange = onBirdCountChange;
},{"./vector":"src/vector.ts"}],"src/obstacle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Obstacle = void 0;
var Obstacle = /** @class */function () {
  function Obstacle(center, radius) {
    this.center = center;
    this.radius = radius;
  }
  Obstacle.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  };
  return Obstacle;
}();
exports.Obstacle = Obstacle;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./styles.css");
var bird_1 = require("./bird");
var boid_1 = require("./boid");
var vector_1 = require("./vector");
var canvas_1 = require("./canvas");
var ui_1 = require("./ui");
var obstacle_1 = require("./obstacle");
var canvas = new canvas_1.Canvas("canvas");
function generateRandomBoid() {
  var MAX_SPEED = 2;
  var MAX_FORCE = 0.05;
  var position = new vector_1.Vector(Math.random() * canvas.width, Math.random() * canvas.height);
  var velocity = new vector_1.Vector(Math.random() - 0.5, Math.random() - 0.5);
  return new boid_1.Boid(position, velocity, MAX_SPEED, MAX_FORCE);
}
function generateBirds(amount) {
  boids = Array.from({
    length: amount
  }, generateRandomBoid);
  birds = boids.map(function (boid) {
    return new bird_1.Bird(boid);
  });
}
var boids;
var birds;
var obstacles;
function generateRandomObstacle() {
  var radius = Math.random() * 50;
  var position = new vector_1.Vector(Math.random() * canvas.width, Math.random() * canvas.height);
  return new obstacle_1.Obstacle(position, radius);
}
function generateObstacles(amount) {
  obstacles = Array.from({
    length: amount
  }, generateRandomObstacle);
}
function runSimulation(frameCount) {
  if (frameCount === void 0) {
    frameCount = 0;
  }
  canvas.clear();
  boids.forEach(function (boid, i) {
    boid.update(boids, (0, ui_1.getCursorPosition)(), obstacles, canvas.width, canvas.height);
    if (boid.isOutside(canvas.width, canvas.height)) {
      boids[i] = generateRandomBoid();
      birds[i] = new bird_1.Bird(boids[i]);
    }
    birds[i].draw(canvas.context, frameCount);
  });
  obstacles.forEach(function (obstacle) {
    obstacle.draw(canvas.context);
  });
  drawCursor();
  requestAnimationFrame(function () {
    return runSimulation(frameCount + 1);
  });
}
function drawCursor() {
  var cursorPosition = (0, ui_1.getCursorPosition)();
  if (cursorPosition) {
    var size = 10;
    canvas.context.strokeStyle = "blue";
    canvas.context.beginPath();
    canvas.context.moveTo(cursorPosition.x - size, cursorPosition.y - size);
    canvas.context.lineTo(cursorPosition.x + size, cursorPosition.y + size);
    canvas.context.moveTo(cursorPosition.x + size, cursorPosition.y - size);
    canvas.context.lineTo(cursorPosition.x - size, cursorPosition.y + size);
    canvas.context.stroke();
  }
}
(0, ui_1.onBirdCountChange)(function (birdCount) {
  generateBirds(birdCount);
});
generateObstacles(10);
generateBirds(300);
runSimulation();
},{"./styles.css":"src/styles.css","./bird":"src/bird.ts","./boid":"src/boid.ts","./vector":"src/vector.ts","./canvas":"src/canvas.ts","./ui":"src/ui.ts","./obstacle":"src/obstacle.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52934" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map