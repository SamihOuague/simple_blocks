/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Scene */ \"./src/js/lib/Scene.js\");\n\n\nlet canvas = document.getElementById(\"game\");\nlet ctx = canvas.getContext(\"2d\");\n\nlet scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"](400, 400, ctx);\n\n\nscene.add_block(-50, 0, 250);\nscene.add_block(0, -50, 150);\nscene.add_block(0, 0,   150);\nscene.add_block(0, -50, 250);\nscene.add_block(0, 0,   250);\nscene.add_block(0, -50, 350);\nscene.add_block(0, 0,   350);\nscene.add_block(0, -50, 350);\nscene.add_block(0, 0,   350);\n//scene.add_block(50, 0, 150);\n//scene.add_block(50, 0, 250);\n//scene.add_block(-50, 0, 350);\n//scene.add_block(50, 0, 350);\n//scene.add_block(-50, 0, 450);\n//scene.add_block(50, 0, 450);\n//scene.add_block(-50, 0, 550);\n//scene.add_block(50, 0, 550);\n\nscene.camera.x = 0;\nscene.camera.y = -50;\nscene.camera.z = 0;\n\nlet controls = {\n    left: false,\n    right: false,\n    front: false,\n    back: false,\n};\n\nlet rotation = {\n    left: false,\n    right: false,\n    up: false,\n    down: false,\n}\n\nwindow.addEventListener(\"keydown\", (e) => {\n    let { key } = e;\n\n    if (key == \"d\") controls.right = true;\n    if (key == \"a\") controls.left = true;\n    if (key == \"w\") controls.front = true;\n    if (key == \"s\") controls.back = true;\n\n    if (key == \"j\") rotation.left = true;\n    if (key == \"l\") rotation.right = true;\n});\n\nwindow.addEventListener(\"keyup\", (e) => {\n    let { key } = e;\n\n    if (key == \"d\") controls.right = false;\n    if (key == \"a\") controls.left = false;\n    if (key == \"w\") controls.front = false;\n    if (key == \"s\") controls.back = false;\n\n    if (key == \"j\") rotation.left = false;\n    if (key == \"l\") rotation.right = false;\n});\n\nsetInterval(() => {\n    if (controls.front) scene.camera.z += 5;\n    else if (controls.back) scene.camera.z -= 5;\n\n    if (controls.right) scene.camera.x += 5;\n    else if (controls.left) scene.camera.x -= 5;\n    \n    if (rotation.left) scene.rotation.y = 0.05;\n    else if (rotation.right) scene.rotation.y = -0.05;\n    else scene.rotation.y = 0;\n    scene.render();\n}, 50);\n\n//# sourceURL=webpack://sample_block/./src/js/index.js?");

/***/ }),

/***/ "./src/js/lib/Block.js":
/*!*****************************!*\
  !*** ./src/js/lib/Block.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/js/lib/Vector.js\");\n\n\nlet Block = function (x, y, z, size = 50) {\n    _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D.call(this, x, y, z);\n\n    size *= 0.5;\n\n    this.vertices = [new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x - size, y - size, z - size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y - size, z - size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y + size, z - size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x - size, y + size, z - size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x - size, y - size, z + size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y - size, z + size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y + size, z + size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x - size, y + size, z + size)];\n                    \n    this.faces = [[0, 1, 2, 3], // Front face\n                    [0, 4, 5, 1], // Top face\n                    [1, 5, 6, 2], // East Face\n                    [3, 2, 6, 7], // Bottom face\n                    [0, 3, 7, 4], // West Face\n                    [4, 7, 6, 5]]; // Back face\n}\n\nBlock.prototype.rotateX = function (radian) {\n    for (let i = 0; i < this.vertices.length; i++) {\n        let v = this.vertices[i];\n\n        let y = (v.y - this.y) * Math.cos(radian) - (v.z - this.z) * Math.sin(radian);\n        let z = (v.y - this.y) * Math.sin(radian) + (v.z - this.z) * Math.cos(radian);\n\n        v.y = y + this.y;\n        v.z = z + this.z;\n    }\n}\n\nBlock.prototype.rotateY = function (radian) {\n    for (let i = 0; i < this.vertices.length; i++) {\n        let v = this.vertices[i];\n\n        let x = (v.x - this.x) * Math.cos(radian) + (v.z - this.z) * Math.sin(radian);\n        let z = (v.z - this.z) * Math.cos(radian) - (v.x - this.x) * Math.sin(radian);\n\n        v.x = x + this.x;\n        v.z = z + this.z;\n    }\n}\n\nBlock.prototype.rotateZ = function (radian) {\n    for (let i = 0; i < this.vertices.length; i++) {\n        let v = this.vertices[i];\n\n        let x = (v.x - this.x) * Math.cos(radian) - (v.y - this.y) * Math.sin(radian);\n        let y = (v.x - this.x) * Math.sin(radian) + (v.y - this.y) * Math.cos(radian);\n\n        v.x = x + this.x;\n        v.y = y + this.y;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);\n\n//# sourceURL=webpack://sample_block/./src/js/lib/Block.js?");

/***/ }),

/***/ "./src/js/lib/Scene.js":
/*!*****************************!*\
  !*** ./src/js/lib/Scene.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/js/lib/Vector.js\");\n/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Block */ \"./src/js/lib/Block.js\");\n\n\n\nclass Scene {\n    constructor(w, h, ctx) {\n        this.blocks = [];\n        this.focal_length = 200;\n        this.width = w;\n        this.height = h;\n        this.ctx = ctx;\n        this.camera = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(0, 0, 0);\n        this.rotation = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(0, 0, 0);\n    }\n\n    add_block = (x, y, z) => {\n        let block = new _Block__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y, z, 50);\n        this.blocks.push(block);\n    }\n\n    project = (vectors) => {\n        let project2D = Array(vectors.length);\n        let focal_length = this.focal_length;\n    \n        for (let i = 0; i < vectors.length; i++) {\n            let vector = vectors[i];\n\n            let x = (vector.x - this.camera.x) * (focal_length / (vector.z - this.camera.z)) + (this.width * 0.5);\n            let y = (vector.y - this.camera.y) * (focal_length / (vector.z - this.camera.z)) + (this.height * 0.5);\n    \n            project2D[i] = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector2D(x, y);\n        }\n    \n        return project2D;\n    }\n\n    draw_block = (block) => {\n        let vertices = this.project(block.vertices);\n        \n        this.ctx.strokeStyle = \"#ffffff\";\n\n        for (let i = 0; i < block.faces.length; i++) {\n    \n            let face = block.faces[i];\n    \n            let p1 = block.vertices[face[0]];\n            let p2 = block.vertices[face[1]];\n            let p3 = block.vertices[face[2]];\n    \n            let v1 = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);\n            let v2 = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);\n    \n            let n = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);\n\n            const { x, y, z } = this.camera;\n            if ((x-p1.x) * n.x + (y-p1.y) * n.y + (z-p1.z) * n.z <= 0 && z < p1.z && z < p2.z && z < p3.z) {\n                this.ctx.beginPath();\n                this.ctx.fillStyle = \"#005f00\";\n                this.ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);\n                this.ctx.lineTo(vertices[face[1]].x, vertices[face[1]].y);\n                this.ctx.lineTo(vertices[face[2]].x, vertices[face[2]].y);\n                this.ctx.lineTo(vertices[face[3]].x, vertices[face[3]].y);\n                this.ctx.closePath();\n                this.ctx.stroke();\n                this.ctx.fill();\n            }\n        }\n    }\n\n    rotateY = (block) => {\n        for (let i = 0; i < block.vertices.length; i++) {\n            let v = block.vertices[i];\n            \n            let x = (v.x - this.camera.x) * Math.cos(this.rotation.y) + (v.z - this.camera.z) * Math.sin(this.rotation.y);\n            let z = (v.z - this.camera.z) * Math.cos(this.rotation.y) - (v.x - this.camera.x) * Math.sin(this.rotation.y);\n    \n            v.x = x + this.camera.x;\n            v.z = z + this.camera.z;\n        }\n    }\n\n    rotateX = (block) => {\n        for (let i = 0; i < block.vertices.length; i++) {\n            let v = block.vertices[i];\n\n            let y = (v.y - this.camera.y) * Math.cos(this.rotation.x) - (v.z - this.camera.z) * Math.sin(this.rotation.x);\n            let z = (v.z - this.camera.z) * Math.cos(this.rotation.x) + (v.y - this.camera.y) * Math.sin(this.rotation.x);\n    \n            v.y = y + this.camera.y;\n            v.z = z + this.camera.z;\n        }\n    }\n\n    render = () => {\n        this.ctx.clearRect(0, 0, 400, 400);\n        let blocks = this.blocks.slice().sort((a, b) => {\n            if (a.z == b.z) return b.y - a.y;\n            return b.z - a.z;\n        });\n\n        for (let i = 0; i < blocks.length; i++) {\n            let block = blocks[i];\n            this.rotateY(block);\n            block.x = block.vertices[0].x;\n            block.y = block.vertices[0].y;\n            block.z = block.vertices[0].z;\n            this.draw_block(block);\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene);\n\n//# sourceURL=webpack://sample_block/./src/js/lib/Scene.js?");

/***/ }),

/***/ "./src/js/lib/Vector.js":
/*!******************************!*\
  !*** ./src/js/lib/Vector.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector2D: () => (/* binding */ Vector2D),\n/* harmony export */   Vector3D: () => (/* binding */ Vector3D)\n/* harmony export */ });\nconst Vector3D = function (x, y, z) {\n    this.x = x;\n    this.y = y;\n    this.z = z;\n}\n\nconst Vector2D = function (x, y) {\n    this.x = x;\n    this.y = y;\n}\n\n//# sourceURL=webpack://sample_block/./src/js/lib/Vector.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;