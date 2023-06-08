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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Scene */ \"./src/js/lib/Scene.js\");\n\n\nlet canvas = document.getElementById(\"game\");\nlet ctx = canvas.getContext(\"2d\");\n\n\n\ncanvas.style.cursor = \"none\";\n\nlet [ w, h ] = [document.documentElement.clientWidth, document.documentElement.clientHeight];\nlet scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.documentElement.clientWidth, document.documentElement.clientHeight, ctx);\n\nscene.camera.position.x = 200;\nscene.camera.position.y = -90;\nscene.camera.position.z = 200;\n\nlet controls = {\n    left: false,\n    right: false,\n    front: false,\n    back: false,\n    jump: false,\n};\n\nlet rotation = {\n    y: -(Math.PI * 0.25),\n    x: 0.17,\n}\n\nlet pos = {\n    x: w * 0.5,\n    y: h * 0.5,\n}\n\nlet mx = Math.PI / (scene.width * 0.5);\nlet my = (Math.PI * 0.5) / (scene.height * 0.5);\n\nlet [ x_pos, y_pos, z_pos ] = Array(3);\n\n\n\ncanvas.addEventListener(\"click\", () => {\n    canvas.requestPointerLock({\n        unadjustedMovement: true,\n    });\n});\n\ncanvas.addEventListener(\"mousemove\", (e) => {\n    const { movementX, movementY } = e;\n\n    let x = ((pos.x + movementX) % w);\n    let y = pos.y + movementY;\n    pos.x = (x < 0) ? w : x;\n    pos.y = (y < 0 || y > h) ? ((y > h) ? h : 0) : y;\n\n    rotation.x = (pos.y * my) - (Math.PI * 0.5);\n    rotation.y = -(pos.x * mx);\n});\n\ncanvas.addEventListener(\"mousedown\", (e) => {\n    if (!scene.selected) return;\n    const { block, face } = scene.selected;\n    \n    if (e.buttons == 1)\n        switch (face) {\n            case 0:\n                if ((block.x != x_pos || block.z - 50 != z_pos) || -(y_pos - 90) < block.y - 50) {\n                    scene.add_block(block.x, block.y, block.z - 50);\n                }\n                break;\n            case 1:\n                if ((block.x != x_pos || block.z != z_pos) || -(y_pos - 90) < block.y - 50) {\n                    scene.add_block(block.x, block.y - 50, block.z);\n                }\n                break;\n            case 2:\n                if ((block.x + 50 != x_pos || block.z != z_pos) || -(y_pos - 90) < block.y - 50) {\n                    scene.add_block(block.x + 50, block.y, block.z);\n                }\n                break;\n            case 3:\n                scene.add_block(block.x, block.y + 50, block.z);\n                break;\n            case 4:\n                if ((block.x - 50 != x_pos || block.z != z_pos) || -(y_pos - 90) < block.y - 50) {\n                    scene.add_block(block.x - 50, block.y, block.z);\n                }\n                break;\n            case 5:\n                if ((block.x != x_pos || block.z + 50 != z_pos) || -(y_pos - 90) < block.y - 50) {\n                    scene.add_block(block.x, block.y, block.z + 50);\n                }\n                break;\n        } else if (e.buttons == 2) {\n            scene.remove_block(block.x, block.y, block.z);\n        }\n});\n\nwindow.addEventListener(\"keydown\", (e) => {\n    let { key } = e;\n\n    if (key == \"d\") controls.right = true;\n    if (key == \"a\") controls.left = true;\n    if (key == \"w\") controls.front = true;\n    if (key == \"s\") controls.back = true;\n    if (key == \" \") controls.jump = true;\n});\n\nwindow.addEventListener(\"keyup\", (e) => {\n    let { key } = e;\n\n    if (key == \"d\") controls.right = false;\n    if (key == \"a\") controls.left = false;\n    if (key == \"w\") controls.front = false;\n    if (key == \"s\") controls.back = false;\n    if (key == \" \") controls.jump = false;\n});\n\nfor (let i = 2; i < 12; i++) {\n    for (let j = 2; j < 12; j++) scene.add_block(i * 50, 0, j * 50);\n}\n\n\n\nsetInterval(() => {\n    if (controls.front) scene.camera.velocity.z = 5;\n    else if (controls.back) scene.camera.velocity.z = -5;\n    else scene.camera.velocity.z = 0;\n\n    if (controls.right) scene.camera.velocity.x = 5;\n    else if (controls.left) scene.camera.velocity.x = -5;\n    else scene.camera.velocity.x = 0;\n\n    if (controls.jump && scene.camera.velocity.y == 0) scene.camera.velocity.y = -17;\n\n    scene.camera.rotation.y = rotation.y;\n    scene.camera.rotation.x = rotation.x;\n\n\n    scene.render();\n    x_pos = Math.round(scene.camera.position.x - (scene.camera.position.x % 50));\n    y_pos = Math.round(Math.abs(scene.camera.position.y));\n    z_pos = Math.round(scene.camera.position.z - (scene.camera.position.z % 50));\n\n    ctx.beginPath();\n    ctx.fillStyle = \"#00ff00\";\n    ctx.font = \"20px monospace\";\n\n    ctx.fillText(`X: ${x_pos}`, 50, 50);\n    ctx.fillText(`Y: ${z_pos}`, 50, 100);\n    ctx.fillText(`Z: ${y_pos - 90}`, 50, 150);\n    ctx.closePath();\n}, 40);\n\nscene.render();\n\n//# sourceURL=webpack://sample_block/./src/js/index.js?");

/***/ }),

/***/ "./src/js/lib/Block.js":
/*!*****************************!*\
  !*** ./src/js/lib/Block.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/js/lib/Vector.js\");\n\n\n\nclass Block {\n    constructor(x, y, z, size = 50) {\n        _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D.call(this, x, y, z);\n        \n        this.vertices = [new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x, y, z),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y, z),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y + size, z),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x, y + size, z),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x, y , z + size),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y , z + size),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + size, y + size, z + size),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x , y + size, z + size)];\n            \n        this.faces = [[0, 1, 2, 3], // North face\n                [0, 4, 5, 1], // Top face\n                [1, 5, 6, 2], // East Face\n                [3, 2, 6, 7], // Bottom face\n                [0, 3, 7, 4], // West Face\n                [4, 7, 6, 5]]; // South face\n\n        this.neighbours = {\n            top: false,\n            bottom: false,\n            east: false,\n            west: false,\n            north: false,\n            south: false,\n        }\n    }   \n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);\n\n//# sourceURL=webpack://sample_block/./src/js/lib/Block.js?");

/***/ }),

/***/ "./src/js/lib/Camera.js":
/*!******************************!*\
  !*** ./src/js/lib/Camera.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/js/lib/Vector.js\");\n\n\nclass Camera {\n    constructor(x, y, z, focal_length = 200) {\n        this.position = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x, y, z);\n        this.rotation = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector2D(0, 0, 0);\n        this.velocity = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(0, 0, 0);\n        this.focal_length = focal_length;\n    }\n\n    project = (vectors, w, h) => {\n        let project2D = Array(vectors.length);\n        \n        let focal_length = this.focal_length;\n        \n        let v = vectors.slice().map((v) => {\n            if (v.z < this.position.z) {\n                return {...v,\n                    z: this.position.z\n                }\n            } else return v;\n        });\n        \n        for (let i = 0; i < vectors.length; i++) {\n            let vector = v[i];\n\n            let vz = vector.z - this.position.z || 1;\n            let m = (focal_length / vz);\n            \n            let x = (vector.x - this.position.x) * m + w;\n            let y = (vector.y - this.position.y) * m + h;\n\n            project2D[i] = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector2D(x, y);\n        }\n    \n        return project2D;\n    }\n\n    rotateY = (vectors) => {\n        let b = Array(vectors);\n\n        for (let i = 0; i < vectors.length; i++) {\n            let v = vectors[i];\n            \n            let x = (v.x - this.position.x) * Math.cos(this.rotation.y) + (v.z - this.position.z) * Math.sin(this.rotation.y);\n            let z = (v.z - this.position.z) * Math.cos(this.rotation.y) - (v.x - this.position.x) * Math.sin(this.rotation.y);\n    \n            \n            b[i] = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(x + this.position.x, v.y, z + this.position.z);\n        }\n\n        return b;\n    }\n\n    rotateX = (vectors) => {\n        let b = Array(vectors);\n\n        for (let i = 0; i < vectors.length; i++) {\n            let v = vectors[i];\n\n            let y = (v.y - this.position.y) * Math.cos(this.rotation.x) - (v.z - this.position.z) * Math.sin(this.rotation.x);\n            let z = (v.z - this.position.z) * Math.cos(this.rotation.x) + (v.y - this.position.y) * Math.sin(this.rotation.x);\n            \n            b[i] = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(v.x, y + this.position.y, z + this.position.z);\n        }\n\n        return b;\n    }\n\n    is_collide = (blocks, x, y, z) => {\n        \n        let x_pos = Math.round(x - (x % 50));\n        let y_pos = Math.round(y);\n        \n        let b = blocks.slice().find((v) => {\n            return ((v.x <= x + 15 && v.x + 50 >= x - 15) && (v.z <= z + 15 && v.z + 50 >= z - 15)) \n                    && ((v.y < (y_pos + 90) && v.y > y_pos) || ((v.y + 40) < (y_pos + 90) && (v.y + 40) > y_pos));\n        });\n\n        return (b) ? b : false;\n    }\n\n    update_position = (blocks, width, height) => {\n        let r = this.rotateY([new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(this.position.x, 0, this.position.z + 100)]);\n        let vector = r[0];\n        \n        let vz = vector.z - this.position.z;\n        let m = (this.focal_length / vz) || 50;\n\n        let n = {...r[0], x: r[0].x - this.position.x, z: (r[0].z - this.position.z)};\n\n        r[0].x = -(vector.x - this.position.x) * Math.abs(m) + (width * 0.5);\n        r[0].y = (vector.y - this.position.y) * Math.abs(m) + (height * 0.5);\n        \n        let prop_z = n.z / 100;\n        let prop_x = -n.x / 100;\n        \n\n        let [n_cam_zz, n_cam_xx, n_cam_zx, n_cam_xz] = [this.velocity.z * (prop_z), \n                                    -this.velocity.x * (prop_x), \n                                    this.velocity.z * (prop_x), \n                                    this.velocity.x * (prop_z)];\n        let v_x = n_cam_zx + n_cam_xz;\n        let v_z = n_cam_zz + n_cam_xx;\n\n        let z_col = this.is_collide(blocks, this.position.x, this.position.y, this.position.z + v_z);\n                    \n        let x_col = this.is_collide(blocks, this.position.x + v_x, this.position.y, this.position.z);\n\n        this.position.z += (!z_col) ? v_z: 0;\n        this.position.x += (!x_col) ? v_x: 0;\n\n\n        let bottom = this.is_collide(blocks, this.position.x, this.position.y + this.velocity.y + 1, this.position.z);\n\n        if (bottom && this.velocity.y >= 0) this.velocity.y = 0;\n        else this.velocity.y += (this.velocity.y < 100) ? 2 : 0;\n\n        \n\n        if (!bottom) {\n            this.position.y += this.velocity.y;\n        } else {\n            if (this.velocity.y == 0) this.position.y = bottom.y - 90;\n            else this.velocity.y = 2;\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Camera);\n\n//# sourceURL=webpack://sample_block/./src/js/lib/Camera.js?");

/***/ }),

/***/ "./src/js/lib/Scene.js":
/*!*****************************!*\
  !*** ./src/js/lib/Scene.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/js/lib/Vector.js\");\n/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Block */ \"./src/js/lib/Block.js\");\n/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Camera */ \"./src/js/lib/Camera.js\");\n\n\n\n\nclass Scene {\n    constructor(w, h, ctx) {\n        this.blocks = [];\n        this.grid = [];\n        this.width = w;\n        this.height = h;\n        this.ctx = ctx;\n        this.camera = new _Camera__WEBPACK_IMPORTED_MODULE_2__[\"default\"](0, 0, 0, (this.width * 0.5));\n        this.ctx.canvas.width = w;\n        this.ctx.canvas.height = h;\n        this.projection = [];\n        this.selected = null;\n    }\n\n    update_neighbour = () => {\n        for (let i = 0; i < this.blocks.length; i++) {\n            let block = this.blocks[i];\n\n            block.neighbours = {\n                top: this.blocks.find((v) => v.x == block.x && v.y + 50 == block.y && v.z == block.z && v !== block) || false,\n                bottom: this.blocks.find((v) => v.x == block.x && v.y - 50 == block.y && v.z == block.z && v !== block) || false,\n                east: this.blocks.find((v) => v.x == block.x + 50 && v.y == block.y && v.z == block.z && v !== block) || false,\n                west: this.blocks.find((v) => v.x == block.x - 50 && v.y == block.y && v.z == block.z && v !== block) || false,\n                north: this.blocks.find((v) => v.z == block.z - 50 && v.x == block.x && v.y == block.y && v !== block) || false,\n                south: this.blocks.find((v) => v.z == block.z + 50 && v.x == block.x && v.y == block.y && v !== block) || false,\n            }\n        }\n    }\n\n    add_block = (x, y, z, size = 50) => {\n        let block = new _Block__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y, z, size);        \n        this.blocks.push(block);\n        this.update_neighbour();\n        \n    }\n\n    remove_block = (x, y, z) => {\n        this.blocks = this.blocks.filter((v) => {\n            return !(x == v.x && y == v.y && z == v.z);\n        });\n        this.update_neighbour();\n    }\n\n    draw_face = (face, color = \"#005f00\") => {\n        this.ctx.beginPath();\n        this.ctx.fillStyle = color;\n        this.ctx.strokeStyle = \"#ffffff\";\n        this.ctx.moveTo(face[0].x, face[0].y);\n        this.ctx.lineTo(face[1].x, face[1].y);\n        this.ctx.lineTo(face[2].x, face[2].y);\n        this.ctx.lineTo(face[3].x, face[3].y);\n        this.ctx.closePath();\n        this.ctx.fill();\n        this.ctx.stroke();\n    }\n\n    project_block = (block) => {\n        let w = (this.width * 0.5);\n        let h = (this.height * 0.5);\n        let vertices = this.camera.project(block.vertices, w, h);\n\n        for (let i = 0; i < block.faces.length; i++) {\n            let face = block.faces[i];\n\n            if ((i == 0 && block.neighbours.north)\n                || (i == 1 && block.neighbours.top)  \n                || (i == 2 && block.neighbours.east)\n                || (i == 3 && block.neighbours.bottom)\n                || (i == 4 && block.neighbours.west)\n                || (i == 5 && block.neighbours.south)) continue;\n            \n            let p1 = block.vertices[face[0]];\n            let p2 = block.vertices[face[1]];\n            let p3 = block.vertices[face[2]];\n\n            let v1 = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);\n            let v2 = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);\n    \n            let n = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);\n            \n            const { x, y, z } = this.camera.position;\n\n\n            if ((x-p1.x) * n.x + (y-p1.y) * n.y + (z-p1.z) * n.z <= 0 && p1.z >= this.camera.position.z) {\n                this.projection.push({vertices: [vertices[face[0]],\n                                                vertices[face[1]],\n                                                vertices[face[2]],\n                                                vertices[face[3]]]});\n\n                if (this.is_center(vertices, face)) {\n                    this.selected = { block, face: i, i: this.projection.length - 1 };\n                }\n            }\n        }\n    }\n\n    is_center = (vertices, face) => {\n        let lines = [[1, 2], [0, 3], [0, 1], [3, 2]];\n        let counter = 0;\n        for (let i = 0; i < lines.length; i++) {\n            let line = lines[i];\n            let v1 = vertices[face[line[0]]];\n            let v2 = vertices[face[line[1]]];\n\n            v1 = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector2D((this.width*0.5) - v1.x, (this.height*0.5) - v1.y);\n            v2 = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector2D(v2.x - (this.width*0.5), v2.y - (this.height*0.5));\n\n            let n = (v2.x * v1.y) - (v1.x * v2.y);\n\n            if ((i % 2 == 0 && n > 0) || (i % 2 != 0 && n < 0)) {\n                counter++;\n            }\n        }\n\n        return counter == 4;\n    }\n\n    render = () => {\n        let pos_x = this.camera.position.x - (this.camera.position.x % 50);\n        let pos_y = this.camera.position.y - (this.camera.position.y % 50) - 50;\n        let pos_z = this.camera.position.z - (this.camera.position.z % 50);\n\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.camera.update_position(this.blocks, this.width * 0.5, this.height * 0.5);\n        \n\n        let bl = this.blocks.slice().map((v) => {\n            let tmp = this.camera.rotateX(this.camera.rotateY(v.vertices));\n\n            return {...v, vertices: tmp};\n        }).filter((v) => {\n            return v.vertices[0].z > this.camera.position.z;\n        });\n\n        bl = bl.sort((a, b) => {\n            if (pos_y < a.y || pos_y < b.y) return (a.y < b.y) ? 1 : -1;\n            else return (a.y > b.y) ? 1 : -1;\n        }).sort((a, b) => {\n            if (a.y == b.y) {\n                if (b.z > pos_z || a.z > pos_z) {\n                    return b.z - a.z;\n                } else {\n                    return a.z - b.z;\n                }\n            }\n        }).sort((a, b) => {\n            if (a.y == b.y && b.z == a.z) {\n                if (a.x > pos_x || b.x > pos_x) {\n                    return b.x - a.x;\n                } else {\n                    return a.x - b.x;\n                }\n            }\n        });\n\n        \n\n        this.projection = [];\n        this.selected = null;\n        for (let i = 0; i < bl.length; i++) {\n            let block = bl[i];\n\n            this.project_block(block);\n        }\n        \n        for (let i = 0; i < this.projection.length; i++) {\n            let project = this.projection[i];\n            \n            this.draw_face(project.vertices, (this.selected && this.selected.i == i) ? \"#0000ff\": \"#005f00\");\n        }\n        \n        this.ctx.fillStyle = \"#000000\";\n        this.ctx.fillRect((this.width * 0.5) - 2, (this.height * 0.5) - 15, 4, 30);\n        this.ctx.fillRect((this.width * 0.5) - 15, (this.height * 0.5) - 2, 30, 4);\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene);\n\n//# sourceURL=webpack://sample_block/./src/js/lib/Scene.js?");

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