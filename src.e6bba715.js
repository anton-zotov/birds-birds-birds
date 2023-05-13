parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"D9Nj":[function(require,module,exports) {

},{}],"CMmP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Bird=void 0;var i=function(){function i(i,t){void 0===t&&(t=10),this.greenValue=0,this.boid=i,this.wingSpan=t}return i.prototype.draw=function(i,t){var o=Math.atan2(this.boid.velocity.y,this.boid.velocity.x),e=this.boid.position,n=e.x,s=e.y,a=this.wingSpan+Math.sin(t/10)*this.wingSpan/4;i.save(),i.translate(n,s),i.rotate(o),i.beginPath(),i.moveTo(a,0),i.lineTo(-a/2,a/2),i.lineTo(-a/2,-a/2),i.closePath();"rgb(255, ".concat(this.greenValue,", 255)");i.fillStyle="#EDF2F4",this.greenValue=Math.min(this.greenValue+2,255),i.fill(),i.restore()},i.prototype.printBoidForces=function(i){i.save(),i.font="10px Arial",i.fillStyle="black",i.fillText("".concat(this.boid.alignmentForce.x.toFixed(2),", ").concat(this.boid.alignmentForce.y.toFixed(2)),this.boid.position.x+10,this.boid.position.y-10),i.fillStyle="red",i.fillText("".concat(this.boid.cohesionForce.x.toFixed(2),", ").concat(this.boid.cohesionForce.y.toFixed(2)),this.boid.position.x+10,this.boid.position.y),i.fillStyle="blue",i.fillText("".concat(this.boid.separationForce.x.toFixed(2),", ").concat(this.boid.separationForce.y.toFixed(2)),this.boid.position.x+10,this.boid.position.y+10),i.restore()},i}();exports.Bird=i;
},{}],"ixmL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Vector=void 0;var t=function(){function t(t,i){void 0===t&&(t=0),void 0===i&&(i=0),this.x=t,this.y=i}return t.prototype.add=function(i){return new t(this.x+i.x,this.y+i.y)},t.prototype.sub=function(i){return new t(this.x-i.x,this.y-i.y)},t.prototype.mult=function(i){return new t(this.x*i,this.y*i)},t.prototype.div=function(i){return new t(this.x/i,this.y/i)},t.prototype.normalize=function(){var t=this.mag();return 0!==t?this.div(t):this},t.prototype.limit=function(t){return this.mag()>t?this.normalize().mult(t):this},t.prototype.mag=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},t.dist=function(t,i){return t.sub(i).mag()},t}();exports.Vector=t;
},{}],"W7yP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Boid=void 0;var t=require("./vector"),e=function(){function e(e,i,o,n){this.position=e,this.velocity=i,this.maxSpeed=o,this.maxForce=n,this.alignmentForce=new t.Vector(0,0),this.cohesionForce=new t.Vector(0,0),this.separationForce=new t.Vector(0,0),this.acceleration=new t.Vector(0,0),this.seekForceMultiplier=1.5,this.edgeAvoidanceDistance=20,this.edgeAvoidanceStrength=1,this.obstacleAvoidanceDistance=20,this.obstacleAvoidanceStrength=.5}return e.prototype.update=function(t,e,i,o,n){this.applyFlockingBehaviors(t),e&&this.applyCursorForce(e),this.applyEdgeAvoidanceForce(o,n),this.applyObstacleAvoidanceForce(i),this.updateVelocity(),this.updatePosition(),this.resetAcceleration()},e.prototype.isOutside=function(t,e){return this.position.x<0||this.position.y<0||this.position.x>t||this.position.y>e},e.prototype.seek=function(t){return t.sub(this.position).normalize().mult(this.maxSpeed).sub(this.velocity).limit(this.maxForce)},e.prototype.applyFlockingBehaviors=function(t){this.separationForce=this.calculateSeparationForce(t,50),this.alignmentForce=this.calculateAlignmentForce(t,100),this.cohesionForce=this.calculateCohesionForce(t,100),this.applySteerForce(this.separationForce,1.5*this.maxForce),this.applySteerForce(this.alignmentForce),this.applySteerForce(this.cohesionForce)},e.prototype.applyCursorForce=function(t){var e=this.seek(t).mult(this.seekForceMultiplier);this.applyForce(e)},e.prototype.applyEdgeAvoidanceForce=function(t,e){var i=this.calculateEdgeAvoidanceForce(t,e);this.applyForce(i)},e.prototype.applyObstacleAvoidanceForce=function(t){var e=this.calculateObstacleAvoidanceForce(t);this.applyForce(e)},e.prototype.getBoidsInRange=function(e,i){var o=this;return e.filter(function(e){return t.Vector.dist(o.position,e.position)>0&&t.Vector.dist(o.position,e.position)<i})},e.prototype.calculateSeparationForce=function(e,i){var o=this,n=this.getBoidsInRange(e,i).map(function(e){return o.position.sub(e.position).normalize().div(t.Vector.dist(o.position,e.position))});return this.getAverageVector(n)},e.prototype.calculateAlignmentForce=function(t,e){var i=this.getBoidsInRange(t,e).map(function(t){return t.velocity});return this.getAverageVector(i)},e.prototype.calculateCohesionForce=function(t,e){var i=this,o=this.getBoidsInRange(t,e).map(function(t){return t.position.sub(i.position)});return this.getAverageVector(o)},e.prototype.calculateEdgeAvoidanceForce=function(e,i){var o=new t.Vector(0,0),n=this.position.x,c=e-this.position.x,s=this.position.y,a=i-this.position.y;return n<this.edgeAvoidanceDistance?o.x=(this.edgeAvoidanceDistance-n)/this.edgeAvoidanceDistance*this.edgeAvoidanceStrength:c<this.edgeAvoidanceDistance&&(o.x=-(this.edgeAvoidanceDistance-c)/this.edgeAvoidanceDistance*this.edgeAvoidanceStrength),s<this.edgeAvoidanceDistance?o.y=(this.edgeAvoidanceDistance-s)/this.edgeAvoidanceDistance*this.edgeAvoidanceStrength:a<this.edgeAvoidanceDistance&&(o.y=-(this.edgeAvoidanceDistance-a)/this.edgeAvoidanceDistance*this.edgeAvoidanceStrength),o},e.prototype.calculateObstacleAvoidanceForce=function(e){for(var i=new t.Vector(0,0),o=0,n=e;o<n.length;o++){var c=n[o],s=this.position.sub(c.center),a=s.mag();if(a<this.obstacleAvoidanceDistance+c.radius){var r=(this.obstacleAvoidanceDistance+c.radius-a)/this.obstacleAvoidanceDistance*this.obstacleAvoidanceStrength;i=i.add(s.normalize().mult(r))}}return i},e.prototype.getAverageVector=function(e){var i=e.reduce(function(t,e){return t.add(e)},new t.Vector(0,0)),o=e.length;return o>0?i.div(o):new t.Vector(0,0)},e.prototype.applyForce=function(t){this.acceleration=this.acceleration.add(t)},e.prototype.applySteerForce=function(t,e){if(void 0===e&&(e=this.maxForce),t.mag()>0){var i=t.normalize().mult(this.maxSpeed).sub(this.velocity).limit(e);this.applyForce(i)}},e.prototype.updateVelocity=function(){this.velocity=this.velocity.add(this.acceleration).limit(this.maxSpeed)},e.prototype.updatePosition=function(){this.position=this.position.add(this.velocity)},e.prototype.resetAcceleration=function(){this.acceleration=new t.Vector(0,0)},e}();exports.Boid=e;
},{"./vector":"ixmL"}],"qKVu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Canvas=void 0;var e=function(){function e(e){var t,n=this;if(this.element=document.getElementById(e),this.context=null===(t=this.element)||void 0===t?void 0:t.getContext("2d"),!this.context)throw new Error("Could not get canvas context");this.updateSize(),window.addEventListener("resize",function(){return n.updateSize()})}return Object.defineProperty(e.prototype,"width",{get:function(){return this.element.width},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.element.height},enumerable:!1,configurable:!0}),e.prototype.updateSize=function(){this.element.width=window.innerWidth,this.element.height=window.innerHeight},e.prototype.clear=function(){this.context.clearRect(0,0,this.element.width,this.element.height)},e}();exports.Canvas=e;
},{}],"dNJe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.onObstacleCountChange=exports.onBirdCountChange=exports.getCursorPosition=void 0;var e=require("./vector"),n=new e.Vector(0,0),t=!1;function o(t){t instanceof TouchEvent?n=new e.Vector(t.touches[0].clientX,t.touches[0].clientY):t instanceof MouseEvent&&(n=new e.Vector(t.clientX,t.clientY))}function i(){t=!1}function r(){t=!0}function u(){return t?n:null}window.addEventListener("mousemove",o),window.addEventListener("touchmove",o),window.addEventListener("mousedown",r),window.addEventListener("touchstart",r),window.addEventListener("mouseup",i),window.addEventListener("touchend",i),exports.getCursorPosition=u;var s=document.getElementById("birdCount");function d(e){s.addEventListener("change",function(){e(parseInt(s.value))})}exports.onBirdCountChange=d;var c=document.getElementById("obstacleCount");function a(e){c.addEventListener("change",function(){e(parseInt(c.value))})}exports.onObstacleCountChange=a;
},{"./vector":"ixmL"}],"SnAw":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Obstacle=void 0;var t=function(){function t(t,e){this.center=t,this.radius=e}return t.prototype.draw=function(t){t.save(),t.beginPath(),t.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI),t.closePath(),t.fillStyle="#8D99AE",t.fill(),t.restore()},t}();exports.Obstacle=t;
},{}],"B6dB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),require("./styles.css");var t,e,n,o=require("./bird"),r=require("./boid"),i=require("./vector"),a=require("./canvas"),c=require("./ui"),u=require("./obstacle"),h=new a.Canvas("canvas");function d(){var t=new i.Vector(Math.random()*h.width,Math.random()*h.height),e=new i.Vector(Math.random()-.5,Math.random()-.5);return new r.Boid(t,e,4,.05)}function s(n){t=Array.from({length:n},d),e=t.map(function(t){return new o.Bird(t)})}function f(){var t=50*Math.random(),e=new i.Vector(Math.random()*h.width,Math.random()*h.height);return new u.Obstacle(e,t)}function l(t){n=Array.from({length:t},f)}function x(r){void 0===r&&(r=0),h.clear(),h.context.fillStyle="#2B2D42",h.context.fillRect(0,0,h.width,h.height),t.forEach(function(i,a){i.update(t,(0,c.getCursorPosition)(),n,h.width,h.height),i.isOutside(h.width,h.height)&&(t[a]=d(),e[a]=new o.Bird(t[a])),e[a].draw(h.context,r)}),n.forEach(function(t){t.draw(h.context)}),w(),requestAnimationFrame(function(){return x(r+1)})}function w(){var t=(0,c.getCursorPosition)();if(t){h.context.strokeStyle="#EF233C",h.context.beginPath(),h.context.moveTo(t.x-10,t.y-10),h.context.lineTo(t.x+10,t.y+10),h.context.moveTo(t.x+10,t.y-10),h.context.lineTo(t.x-10,t.y+10),h.context.stroke()}}(0,c.onBirdCountChange)(function(t){s(t)}),(0,c.onObstacleCountChange)(function(t){l(t)}),l(10),s(200),x();
},{"./styles.css":"D9Nj","./bird":"CMmP","./boid":"W7yP","./vector":"ixmL","./canvas":"qKVu","./ui":"dNJe","./obstacle":"SnAw"}]},{},["B6dB"], null)
//# sourceMappingURL=src.e6bba715.js.map