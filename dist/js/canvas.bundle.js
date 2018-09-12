/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

var RainDrop = function () {
    function RainDrop(x, y, velocity, radius, color) {
        _classCallCheck(this, RainDrop);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.gravity = .1;
    }

    _createClass(RainDrop, [{
        key: 'draw',
        value: function draw() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }
    }, {
        key: 'randomIntFromRange',
        value: function randomIntFromRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }, {
        key: 'update',
        value: function update() {
            this.draw();

            if (this.y + this.radius > innerHeight) {
                this.splatter();

                this.x = _utils2.default.randomIntFromRange(0, innerWidth);
                this.y = _utils2.default.randomIntFromRange(-1000, 0);
                this.velocity.y = _utils2.default.randomIntFromRange(5, 15);
            } else {
                this.velocity.y += this.gravity;
            }
            this.y += this.velocity.y;
        }
    }, {
        key: 'splatter',
        value: function splatter() {
            // console.log('splatting')
            for (var i = 0; i < 3; i++) {
                var velocity = {
                    x: _utils2.default.randomIntFromRange(-5, 5),
                    y: _utils2.default.randomIntFromRange(-5, 5)
                };
                // let radius = 1;
                _splatter.push(new Splatter(this.x, this.y, velocity, this.radius / 2, 'white'));
            }
        }
    }]);

    return RainDrop;
}();

;

var Splatter = function () {
    function Splatter(x, y, velocity, radius, color) {
        _classCallCheck(this, Splatter);

        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.color = color;
        this.radius = radius;

        this.friction = 0.8;
        this.gravity = .1;
        this.ttl = 100;
        this.opacity = 1;
    }

    _createClass(Splatter, [{
        key: 'draw',
        value: function draw() {
            c.save();
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
            c.shadowColor = '#E3EAEF';
            c.shadowBlur = 20;
            c.fill();
            c.closePath();
            c.restore();
        }
    }, {
        key: 'update',
        value: function update() {
            this.draw();

            if (this.y + this.radius + this.velocity.y > canvas.height || this.y - this.radius <= 0) {
                this.velocity.y = -this.velocity.y * this.friction;
            } else {
                this.velocity.y += this.gravity;
            }
            this.y += this.velocity.y;
            this.x += this.velocity.x;
            this.ttl -= 1;
            this.opacity -= 1 / this.ttl;
        }
    }]);

    return Splatter;
}();

function randomRainDrop() {

    var x = _utils2.default.randomIntFromRange(0, innerWidth);
    var y = _utils2.default.randomIntFromRange(-5000, 0);
    var velocity = {
        x: 0,
        y: _utils2.default.randomIntFromRange(5, 15)
    };
    var radius = _utils2.default.randomIntFromRange(1, 3);
    var drop = new RainDrop(x, y, velocity, radius, 'white');

    return drop;
}

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Implementation
var rain = void 0;
var _splatter = void 0;
function init() {
    _splatter = [];
    rain = [];
    for (var i = 0; i < 100; i++) {
        rain.push(randomRainDrop(c));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    rain.forEach(function (drop, index) {
        drop.update();
    });

    _splatter.forEach(function (splat, index) {
        //lol @ splat
        splat.update();
        if (splat.ttl == 0) {
            _splatter.splice(index, 1);
        }
    });
    console.log(_splatter.length);
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map