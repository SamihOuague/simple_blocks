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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Scene */ \"./src/js/lib/Scene.js\");\n\n\nlet canvas = document.getElementById(\"game\");\nlet ctx = canvas.getContext(\"2d\");\n\n\n\ncanvas.style.cursor = \"none\";\n\nlet scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.documentElement.clientWidth, document.documentElement.clientHeight, ctx);\n\n\nscene.camera.x = 200;\nscene.camera.y = -180;\nscene.camera.z = 200;\n\nlet controls = {\n    left: false,\n    right: false,\n    front: false,\n    back: false,\n};\n\nlet rotation = {\n    y: false,\n    x: false,\n}\n\nlet mx = Math.PI / (scene.width * 0.5);\nlet my = (Math.PI * 0.5) / (scene.height * 0.5);\n\ncanvas.addEventListener(\"mousemove\", (e) => {\n    let x_mouse = (e.clientX - e.target.offsetLeft) - (scene.width * 0.5);\n    let y_mouse = (e.clientY - e.target.offsetTop) - (scene.height * 0.5);\n    \n    rotation.x = (y_mouse * my);\n    rotation.y = -(x_mouse * mx);\n});\n\nwindow.addEventListener(\"keydown\", (e) => {\n    let { key } = e;\n\n    if (key == \"d\") controls.right = true;\n    if (key == \"a\") controls.left = true;\n    if (key == \"w\") controls.front = true;\n    if (key == \"s\") controls.back = true;\n\n    if (key == \"j\") rotation.left = true;\n    if (key == \"l\") rotation.right = true;\n    if (key == \"i\") rotation.up = true;\n    if (key == \"k\") rotation.down = true;\n    \n    if (key == \" \" && scene.velocity.y == 0) scene.velocity.y = -11;\n});\n\nwindow.addEventListener(\"keyup\", (e) => {\n    let { key } = e;\n\n    if (key == \"d\") controls.right = false;\n    if (key == \"a\") controls.left = false;\n    if (key == \"w\") controls.front = false;\n    if (key == \"s\") controls.back = false;\n\n    if (key == \"j\") rotation.left = false;\n    if (key == \"l\") rotation.right = false;\n    if (key == \"i\") rotation.up = false;\n    if (key == \"k\") rotation.down = false;\n});\n\nfor (let i = 2; i < 12; i++) {\n    for (let j = 2; j < 12; j++) scene.add_block(i * 50, 0, j * 50);\n}\n\n\nlet [ x_pos, y_pos, z_pos ] = Array(3);\nsetInterval(() => {\n    if (controls.front) scene.velocity.z = 4;\n    else if (controls.back) scene.velocity.z = -4;\n    else scene.velocity.z = 0;\n\n    if (controls.right) scene.velocity.x = 4;\n    else if (controls.left) scene.velocity.x = -4;\n    else scene.velocity.x = 0;\n\n    scene.rotation.y = rotation.y;\n    scene.rotation.x = rotation.x;\n\n\n    scene.render();\n    x_pos = Math.round(scene.camera.x - (scene.camera.x % 50));\n    y_pos = Math.round(Math.abs(scene.camera.y));\n    z_pos = Math.round(scene.camera.z - (scene.camera.z % 50));\n\n    ctx.beginPath();\n    ctx.fillStyle = \"#00ff00\";\n    ctx.font = \"20px monospace\";\n\n    ctx.fillText(`X: ${x_pos}`, 50, 50);\n    ctx.fillText(`Y: ${z_pos}`, 50, 100);\n    ctx.fillText(`Z: ${y_pos}`, 50, 150);\n    ctx.closePath();\n}, 50);\n\n\n//scene.render();\n\n\n//# sourceURL=webpack://sample_block/./src/js/index.js?");

/***/ }),

/***/ "./src/js/lib/Block.js":
/*!*****************************!*\
  !*** ./src/js/lib/Block.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/js/lib/Vector.js\");\n\n\nlet Block = function (x, y, z, size = 50) {\n    _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D.call(this, x, y, z);\n\n    //size *= 0.5;\n\n    this.vertices = [new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x, y, z),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y, z),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y + size, z),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x, y + size, z),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x, y , z + size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y , z + size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y + size, z + size),\n                    new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x , y + size, z + size)];\n                    \n    this.faces = [[0, 1, 2, 3], // North face\n                    [0, 4, 5, 1], // Top face\n                    [1, 5, 6, 2], // East Face\n                    [3, 2, 6, 7], // Bottom face\n                    [0, 3, 7, 4], // West Face\n                    [4, 7, 6, 5]]; // South face\n    \n    this.neighbours = {\n        top: false,\n        bottom: false,\n        east: false,\n        west: false,\n        north: false,\n        south: false,\n    }\n}\n\nBlock.prototype.rotateX = function (radian) {\n    for (let i = 0; i < this.vertices.length; i++) {\n        let v = this.vertices[i];\n\n        let y = (v.y - this.y) * Math.cos(radian) - (v.z - this.z) * Math.sin(radian);\n        let z = (v.y - this.y) * Math.sin(radian) + (v.z - this.z) * Math.cos(radian);\n\n        v.y = y + this.y;\n        v.z = z + this.z;\n    }\n}\n\nBlock.prototype.rotateY = function (radian) {\n    for (let i = 0; i < this.vertices.length; i++) {\n        let v = this.vertices[i];\n\n        let x = (v.x - this.x) * Math.cos(radian) + (v.z - this.z) * Math.sin(radian);\n        let z = (v.z - this.z) * Math.cos(radian) - (v.x - this.x) * Math.sin(radian);\n\n        v.x = x + this.x;\n        v.z = z + this.z;\n    }\n}\n\nBlock.prototype.rotateZ = function (radian) {\n    for (let i = 0; i < this.vertices.length; i++) {\n        let v = this.vertices[i];\n\n        let x = (v.x - this.x) * Math.cos(radian) - (v.y - this.y) * Math.sin(radian);\n        let y = (v.x - this.x) * Math.sin(radian) + (v.y - this.y) * Math.cos(radian);\n\n        v.x = x + this.x;\n        v.y = y + this.y;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);\n\n//# sourceURL=webpack://sample_block/./src/js/lib/Block.js?");

/***/ }),

/***/ "./src/js/lib/Scene.js":
/*!*****************************!*\
  !*** ./src/js/lib/Scene.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/js/lib/Vector.js\");\n/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Block */ \"./src/js/lib/Block.js\");\n\n\n\nclass Scene {\n    constructor(w, h, ctx) {\n        this.blocks = [];\n        this.grid = [];\n        this.width = w;\n        this.height = h;\n        this.focal_length = this.width * 0.5;\n        this.ctx = ctx;\n        this.camera = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(0, 0, 0);\n        this.rotation = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(0, 0, 0);\n        this.velocity = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(0, 0, 0);\n        this.ctx.canvas.width = w;\n        this.ctx.canvas.height = h;\n        this.create_grid();\n    }\n\n    update_neighbour = () => {\n        for (let i = 0; i < this.blocks.length; i++) {\n            let block = this.blocks[i];\n\n            block.neighbours = {\n                top: this.blocks.find((v) => v.x == block.x && v.y + 50 == block.y && v.z == block.z && v !== block) || false,\n                bottom: this.blocks.find((v) => v.x == block.x && v.y - 50 == block.y && v.z == block.z && v !== block) || false,\n                east: this.blocks.find((v) => v.x == block.x + 50 && v.y == block.y && v.z == block.z && v !== block) || false,\n                west: this.blocks.find((v) => v.x == block.x - 50 && v.y == block.y && v.z == block.z && v !== block) || false,\n                north: this.blocks.find((v) => v.z == block.z - 50 && v.x == block.x && v.y == block.y && v !== block) || false,\n                south: this.blocks.find((v) => v.z == block.z + 50 && v.x == block.x && v.y == block.y && v !== block) || false,\n            }\n        }\n    }\n\n    add_block = (x, y, z) => {\n        let block = new _Block__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y, z, 50);\n        this.blocks.push(block);\n        this.update_neighbour();\n    }\n\n    project = (vectors) => {\n        let project2D = Array(vectors.length);\n        let focal_length = this.focal_length;\n        let v = vectors.slice().map((v) => {\n            if (v.z < this.camera.z) {\n                return {...v,\n                    x: v.x,\n                    y: v.y,\n                    z: this.camera.z\n                }\n            } else return v;\n        });\n        \n        for (let i = 0; i < vectors.length; i++) {\n            let vector = v[i];\n\n            let vz = vector.z - this.camera.z || 1;\n            let m = (focal_length / vz);\n            \n            let x = (vector.x - this.camera.x) * m + (this.width * 0.5);\n            let y = (vector.y - this.camera.y) * m + (this.height * 0.5);\n            \n            \n\n            project2D[i] = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector2D(x, y);\n        }\n    \n        return project2D;\n    }\n\n    create_grid = () => {\n        let size = this.width * 0.5;\n\n        for (let i = -size; i < size + 50; i += 50) {\n            let v1 = [new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(i, 0, -size), new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(i, 0, size)];\n            let v2 = [new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(-size, 0, i), new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(size, 0, i)];\n            this.grid.push([v1, v2]);\n        }\n    }\n\n    draw_grid = () => {\n        let size = this.width * 0.5;\n        for (let i = 0; i < this.grid.length; i++) {\n            let line_x = this.rotateY(this.grid[i][1]);\n            let line_z = this.rotateY(this.grid[i][0]);\n\n\n            //if (line_z[0].z > this.camera.z || line_z[1].z > this.camera.z) {\n            //    line_z = this.project(line_z);\n            //    this.draw_line(line_z[0], line_z[1]);\n            //}\n\n            if (line_z[0].x > this.camera.z || line_z[1].x > (this.camera.z + 50)) {\n                line_x = this.project(line_x);            \n                this.draw_line(line_x[0], line_x[1]);\n            }\n            //console.log(line_z);\n            //break;\n        }\n    }\n\n    draw_line = (from, to) => {\n        this.ctx.beginPath();\n        this.ctx.strokeStyle = \"#ffffff\";\n        this.ctx.moveTo(from.x, from.y);\n        this.ctx.lineTo(to.x, to.y);\n        this.ctx.closePath();\n        this.ctx.stroke();\n    }\n\n    draw_block = (block) => {\n        let n_block = block.vertices;\n        let vertices = this.project(n_block);\n        \n        this.ctx.strokeStyle = \"#ffffff\";\n\n        for (let i = 0; i < block.faces.length; i++) {\n    \n            let face = block.faces[i];\n    \n            if (i == 0 && block.neighbours.north) continue;\n            else if (i == 1 && block.neighbours.top) continue;\n            else if (i == 2 && block.neighbours.east) continue;\n            else if (i == 3 && block.neighbours.bottom) continue;\n            else if (i == 4 && block.neighbours.west) continue;\n            else if (i == 5 && block.neighbours.south) continue;\n\n            let p1 = block.vertices[face[0]];\n            let p2 = block.vertices[face[1]];\n            let p3 = block.vertices[face[2]];\n    \n            let v1 = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);\n            let v2 = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);\n    \n            let n = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);\n\n            const { x, y, z } = this.camera;\n            if ((x-p1.x) * n.x + (y-p1.y) * n.y + (z-p1.z) * n.z <= 0 && n_block[0].z > this.camera.z) {\n                this.ctx.beginPath();\n                this.ctx.fillStyle = \"#005f00\";\n                this.ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);\n                this.ctx.lineTo(vertices[face[1]].x, vertices[face[1]].y);\n                this.ctx.lineTo(vertices[face[2]].x, vertices[face[2]].y);\n                this.ctx.lineTo(vertices[face[3]].x, vertices[face[3]].y);\n                this.ctx.closePath();\n                this.ctx.fill();\n                this.ctx.stroke();\n            }\n        }\n    }\n\n    rotateY = (vectors) => {\n        let b = Array(vectors);\n\n        for (let i = 0; i < vectors.length; i++) {\n            let v = vectors[i];\n            \n            let x = (v.x - this.camera.x) * Math.cos(this.rotation.y) + (v.z - this.camera.z) * Math.sin(this.rotation.y);\n            let z = (v.z - this.camera.z) * Math.cos(this.rotation.y) - (v.x - this.camera.x) * Math.sin(this.rotation.y);\n    \n            \n            b[i] = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + this.camera.x, v.y, z + this.camera.z);\n        }\n\n        return b;\n    }\n\n    rotateX = (vectors) => {\n        let b = Array(vectors);\n\n        for (let i = 0; i < vectors.length; i++) {\n            let v = vectors[i];\n\n            let y = (v.y - this.camera.y) * Math.cos(this.rotation.x) - (v.z - this.camera.z) * Math.sin(this.rotation.x);\n            let z = (v.z - this.camera.z) * Math.cos(this.rotation.x) + (v.y - this.camera.y) * Math.sin(this.rotation.x);\n            \n            b[i] = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(v.x, y + this.camera.y, z + this.camera.z);\n        }\n\n        return b;\n    }\n\n    rotateZ = (block) => {\n        for (let i = 0; i < block.vertices.length; i++) {\n            let v = block.vertices[i];\n\n            let x = (v.x - this.camera.x) * Math.cos(this.rotation.z) - (v.y - this.camera.y) * Math.sin(this.rotation.z);\n            let y = (v.y - this.camera.y) * Math.cos(this.rotation.z) + (v.x - this.camera.x) * Math.sin(this.rotation.z);\n    \n            v.x = x + this.camera.x;\n            v.y = y + this.camera.y;\n        }\n    }\n\n    update_position = () => {\n        let r = this.rotateY([new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(this.camera.x, 0, this.camera.z + 100)]);\n        let vector = r[0];\n        \n        let vz = vector.z - this.camera.z;\n        let m = (this.focal_length / vz) || 50;\n\n        let n = {...r[0], x: r[0].x - this.camera.x, z: (r[0].z - this.camera.z)};\n\n        r[0].x = -(vector.x - this.camera.x) * Math.abs(m) + (this.width * 0.5);\n        r[0].y = (vector.y - this.camera.y) * Math.abs(m) + (this.height * 0.5);\n        \n        let prop_z = n.z / 100;\n        let prop_x = -n.x / 100;\n        \n\n        let x_pos = Math.round(this.camera.x - (this.camera.x % 50));\n        let z_pos = Math.round(this.camera.z - (this.camera.z % 50));\n\n        let f = this.blocks.find((v) => {\n            return v.z == (z_pos + 50) && v.x == x_pos && (v.y <= this.camera.y + 50 && v.y >= this.camera.y - 50);\n        });\n\n        let b = this.blocks.find((v) => {\n            return v.z == (z_pos - 50) && v.x == x_pos && (v.y <= this.camera.y + 50 && v.y >= this.camera.y - 50);\n        });\n\n        let e = this.blocks.find((v) => {\n            return v.x == (x_pos + 50) && v.z == z_pos && (v.y <= this.camera.y + 50 && v.y >= this.camera.y - 50);\n        });\n\n        let w = this.blocks.find((v) => {\n            return v.x == (x_pos - 50) && v.z == z_pos && (v.y <= this.camera.y + 50 && v.y >= this.camera.y - 50);\n        });\n\n\n        let [n_cam_zz, n_cam_xx, n_cam_zx, n_cam_xz] = [this.velocity.z * (prop_z), \n                                    -this.velocity.x * (prop_x), \n                                    this.velocity.z * (prop_x), \n                                    this.velocity.x * (prop_z)];\n\n        if (!(f && n_cam_zz > 0) && !(b && n_cam_zz < 0)) this.camera.z += n_cam_zz;\n        if (!(e && n_cam_zx > 0) && !(w && n_cam_zx < 0)) this.camera.x += n_cam_zx;\n\n        \n        if (!(f && n_cam_xx > 0) && !(b && n_cam_xx < 0)) this.camera.z += n_cam_xx;\n        if (!(e && n_cam_xz > 0) && !(w && n_cam_xz < 0)) this.camera.x += n_cam_xz;\n        let y_pos = Math.round(this.camera.y);\n        let bottom = this.blocks.find((v) => {\n            return (v.x == x_pos && v.z == z_pos) && (v.y - 90) <= y_pos;\n        });\n\n        if (bottom && this.velocity.y >= 0) this.velocity.y = 0;\n        else this.velocity.y += (this.velocity.y < 100) ? 1 : 0;\n\n        \n\n        if (bottom && this.velocity.y == 0) {\n            this.camera.y = bottom.y - 90;\n        } else {\n            this.camera.y += this.velocity.y;\n        }\n    }\n\n    render = () => {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.update_position();\n\n        let bl = this.blocks.slice().map((v) => {\n            let tmp = this.rotateX(this.rotateY(v.vertices));\n            let nb = this.rotateY([v]);\n            return {...v, vertices: tmp, x: nb[0].x, y: nb[0].y, z: nb[0].z}\n        }).filter((v) => {\n            return v.z > this.camera.z;\n        });\n\n        bl = bl.sort((a, b) => {\n\n            if (this.camera.z < b.z) return (b.z < a.z) ? -1 : 1;\n            else return (b.z > a.z) ? -1 : 1;\n        });\n\n        for (let i = 0; i < bl.length; i++) {\n            let block = bl[i];\n            \n            this.draw_block(block);\n            \n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene);\n\n//# sourceURL=webpack://sample_block/./src/js/lib/Scene.js?");

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