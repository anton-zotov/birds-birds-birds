parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"D9Nj":[function(require,module,exports) {

},{}],"CMmP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Bird=void 0;var i=function(){function i(i,t){void 0===t&&(t=10),this.greenValue=255,this.boid=i,this.wingSpan=t}return i.prototype.draw=function(i,t){var o=Math.atan2(this.boid.velocity.y,this.boid.velocity.x),e=this.boid.position,n=e.x,s=e.y,a=this.wingSpan+Math.sin(t/10)*this.wingSpan/4;i.save(),i.translate(n,s),i.rotate(o),i.beginPath(),i.moveTo(a,0),i.lineTo(-a/2,a/2),i.lineTo(-a/2,-a/2),i.closePath();var r="rgb(0, ".concat(this.greenValue,", 0)");i.fillStyle=r,this.greenValue=Math.max(this.greenValue-2,0),i.fill(),i.restore()},i.prototype.printBoidForces=function(i){i.save(),i.font="10px Arial",i.fillStyle="black",i.fillText("".concat(this.boid.alignmentForce.x.toFixed(2),", ").concat(this.boid.alignmentForce.y.toFixed(2)),this.boid.position.x+10,this.boid.position.y-10),i.fillStyle="red",i.fillText("".concat(this.boid.cohesionForce.x.toFixed(2),", ").concat(this.boid.cohesionForce.y.toFixed(2)),this.boid.position.x+10,this.boid.position.y),i.fillStyle="blue",i.fillText("".concat(this.boid.separationForce.x.toFixed(2),", ").concat(this.boid.separationForce.y.toFixed(2)),this.boid.position.x+10,this.boid.position.y+10),i.restore()},i}();exports.Bird=i;
},{}],"ixmL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Vector=void 0;var t=function(){function t(t,i){void 0===t&&(t=0),void 0===i&&(i=0),this.x=t,this.y=i}return t.prototype.add=function(i){return new t(this.x+i.x,this.y+i.y)},t.prototype.sub=function(i){return new t(this.x-i.x,this.y-i.y)},t.prototype.mult=function(i){return new t(this.x*i,this.y*i)},t.prototype.div=function(i){return new t(this.x/i,this.y/i)},t.prototype.normalize=function(){var t=this.mag();return 0!==t?this.div(t):this},t.prototype.limit=function(t){return this.mag()>t?this.normalize().mult(t):this},t.prototype.mag=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},t.dist=function(t,i){return t.sub(i).mag()},t}();exports.Vector=t;
},{}],"W7yP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Boid=void 0;var e=require("./vector"),t=function(){function t(t,i,o,n){this.position=t,this.velocity=i,this.maxSpeed=o,this.maxForce=n,this.alignmentForce=new e.Vector(0,0),this.cohesionForce=new e.Vector(0,0),this.separationForce=new e.Vector(0,0),this.acceleration=new e.Vector(0,0),this.seekForceMultiplier=1.5,this.edgeAvoidanceDistance=20,this.edgeAvoidanceStrength=1,this.obstacleAvoidanceDistance=20,this.obstacleAvoidanceStrength=.5}return t.prototype.update=function(e,t,i,o,n){this.applyFlockingBehaviors(e),t&&this.applyCursorForce(t),this.applyEdgeAvoidanceForce(o,n),this.applyObstacleAvoidanceForce(i),this.updateVelocity(),this.updatePosition(),this.resetAcceleration()},t.prototype.isOutside=function(e,t){return this.position.x<0||this.position.y<0||this.position.x>e||this.position.y>t},t.prototype.seek=function(e){return e.sub(this.position).normalize().mult(this.maxSpeed).sub(this.velocity).limit(this.maxForce)},t.prototype.applyFlockingBehaviors=function(e){this.alignmentForce=this.calculateAlignmentForce(e,50),this.cohesionForce=this.calculateCohesionForce(e,50),this.separationForce=this.calculateSeparationForce(e,50),this.applySteerForce(this.separationForce),this.applySteerForce(this.alignmentForce),this.applySteerForce(this.cohesionForce)},t.prototype.applyCursorForce=function(e){var t=this.seek(e).mult(this.seekForceMultiplier);this.applyForce(t)},t.prototype.applyEdgeAvoidanceForce=function(e,t){var i=this.calculateEdgeAvoidanceForce(e,t);this.applyForce(i)},t.prototype.applyObstacleAvoidanceForce=function(e){var t=this.calculateObstacleAvoidanceForce(e);this.applyForce(t)},t.prototype.getBoidsInRange=function(t,i){var o=this;return t.filter(function(t){return e.Vector.dist(o.position,t.position)>0&&e.Vector.dist(o.position,t.position)<i})},t.prototype.calculateSeparationForce=function(t,i){var o=this,n=this.getBoidsInRange(t,i).map(function(t){return o.position.sub(t.position).normalize().div(e.Vector.dist(o.position,t.position))});return this.getAverageVector(n)},t.prototype.calculateAlignmentForce=function(e,t){var i=this.getBoidsInRange(e,t).map(function(e){return e.velocity});return this.getAverageVector(i)},t.prototype.calculateCohesionForce=function(e,t){var i=this.getBoidsInRange(e,t).map(function(e){return e.position});return this.getAverageVector(i)},t.prototype.calculateEdgeAvoidanceForce=function(t,i){var o=new e.Vector(0,0),n=this.position.x,c=t-this.position.x,s=this.position.y,a=i-this.position.y;return n<this.edgeAvoidanceDistance?o.x=(this.edgeAvoidanceDistance-n)/this.edgeAvoidanceDistance*this.edgeAvoidanceStrength:c<this.edgeAvoidanceDistance&&(o.x=-(this.edgeAvoidanceDistance-c)/this.edgeAvoidanceDistance*this.edgeAvoidanceStrength),s<this.edgeAvoidanceDistance?o.y=(this.edgeAvoidanceDistance-s)/this.edgeAvoidanceDistance*this.edgeAvoidanceStrength:a<this.edgeAvoidanceDistance&&(o.y=-(this.edgeAvoidanceDistance-a)/this.edgeAvoidanceDistance*this.edgeAvoidanceStrength),o},t.prototype.calculateObstacleAvoidanceForce=function(t){for(var i=new e.Vector(0,0),o=0,n=t;o<n.length;o++){var c=n[o],s=this.position.sub(c.center),a=s.mag();if(a<this.obstacleAvoidanceDistance+c.radius){var r=(this.obstacleAvoidanceDistance+c.radius-a)/this.obstacleAvoidanceDistance*this.obstacleAvoidanceStrength;i=i.add(s.normalize().mult(r))}}return i},t.prototype.getAverageVector=function(t){var i=t.reduce(function(e,t){return e.add(t)},new e.Vector(0,0)),o=t.length;return o>0?i.div(o):new e.Vector(0,0)},t.prototype.applyForce=function(e){this.acceleration=this.acceleration.add(e)},t.prototype.applySteerForce=function(e){if(e.mag()>0){var t=e.normalize().mult(this.maxSpeed).sub(this.velocity).limit(this.maxForce);this.applyForce(t)}},t.prototype.updateVelocity=function(){this.velocity=this.velocity.add(this.acceleration).limit(this.maxSpeed)},t.prototype.updatePosition=function(){this.position=this.position.add(this.velocity)},t.prototype.resetAcceleration=function(){this.acceleration=new e.Vector(0,0)},t}();exports.Boid=t;
},{"./vector":"ixmL"}],"qKVu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Canvas=void 0;var e=function(){function e(e){var t,n=this;if(this.element=document.getElementById(e),this.context=null===(t=this.element)||void 0===t?void 0:t.getContext("2d"),!this.context)throw new Error("Could not get canvas context");this.updateSize(),window.addEventListener("resize",function(){return n.updateSize()})}return Object.defineProperty(e.prototype,"width",{get:function(){return this.element.width},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.element.height},enumerable:!1,configurable:!0}),e.prototype.updateSize=function(){this.element.width=window.innerWidth,this.element.height=window.innerHeight},e.prototype.clear=function(){this.context.clearRect(0,0,this.element.width,this.element.height)},e}();exports.Canvas=e;
},{}],"dNJe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.onBirdCountChange=exports.getCursorPosition=void 0;var e=require("./vector"),n=new e.Vector(0,0),t=!1;function o(t){t instanceof TouchEvent?n=new e.Vector(t.touches[0].clientX,t.touches[0].clientY):t instanceof MouseEvent&&(n=new e.Vector(t.clientX,t.clientY))}function i(){t=!1}function r(){t=!0}function d(){return t?n:null}window.addEventListener("mousemove",o),window.addEventListener("touchmove",o),window.addEventListener("mousedown",r),window.addEventListener("touchstart",r),window.addEventListener("mouseup",i),window.addEventListener("touchend",i),exports.getCursorPosition=d;var u=document.getElementById("birdCount");function s(e){u.addEventListener("change",function(){e(parseInt(u.value))})}exports.onBirdCountChange=s;
},{"./vector":"ixmL"}],"SnAw":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Obstacle=void 0;var e=function(){function e(e,t){this.center=e,this.radius=t}return e.prototype.draw=function(e){e.save(),e.beginPath(),e.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI),e.closePath(),e.fillStyle="red",e.fill(),e.restore()},e}();exports.Obstacle=e;
},{}],"B6dB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),require("./styles.css");var e,t,n,r=require("./bird"),o=require("./boid"),i=require("./vector"),a=require("./canvas"),c=require("./ui"),u=require("./obstacle"),h=new a.Canvas("canvas");function d(){var e=new i.Vector(Math.random()*h.width,Math.random()*h.height),t=new i.Vector(Math.random()-.5,Math.random()-.5);return new o.Boid(e,t,2,.05)}function s(n){e=Array.from({length:n},d),t=e.map(function(e){return new r.Bird(e)})}function f(){var e=50*Math.random(),t=new i.Vector(Math.random()*h.width,Math.random()*h.height);return new u.Obstacle(t,e)}function m(e){n=Array.from({length:e},f)}function w(o){void 0===o&&(o=0),h.clear(),e.forEach(function(i,a){i.update(e,(0,c.getCursorPosition)(),n,h.width,h.height),i.isOutside(h.width,h.height)&&(e[a]=d(),t[a]=new r.Bird(e[a])),t[a].draw(h.context,o)}),n.forEach(function(e){e.draw(h.context)}),x(),requestAnimationFrame(function(){return w(o+1)})}function x(){var e=(0,c.getCursorPosition)();if(e){h.context.strokeStyle="blue",h.context.beginPath(),h.context.moveTo(e.x-10,e.y-10),h.context.lineTo(e.x+10,e.y+10),h.context.moveTo(e.x+10,e.y-10),h.context.lineTo(e.x-10,e.y+10),h.context.stroke()}}(0,c.onBirdCountChange)(function(e){s(e)}),m(10),s(300),w();
},{"./styles.css":"D9Nj","./bird":"CMmP","./boid":"W7yP","./vector":"ixmL","./canvas":"qKVu","./ui":"dNJe","./obstacle":"SnAw"}]},{},["B6dB"], null)
//# sourceMappingURL=src.848b1f19.js.map