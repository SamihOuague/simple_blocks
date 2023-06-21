import Block from "./lib/Block";
import Scene from "./lib/Scene";


let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

const [ w, h ] = [document.documentElement.clientWidth, document.documentElement.clientHeight]

ctx.canvas.width = w;
ctx.canvas.height = h;


//function create_square(x, y, size = 50) {
//    return [
//        {x: -size + x, y: size + y},
//        {x: -size + x, y: -size + y},
//        {x: size + x, y: -size + y},
//        {x: size + x, y: size + y},
//    ]
//}
//
//let square = create_square(w * 0.5, h * 0.5);
//ctx.beginPath();
//ctx.strokeStyle = "#ffffff";
//for (let i = 0; i < square.length; i++) {
//    let { x, y } = square[i];
//    if (i == 0) ctx.moveTo(x, y);
//    else ctx.lineTo(x, y);
//}
//ctx.lineTo(square[0].x, square[0].y)
//ctx.stroke();
//ctx.closePath();


let scene = new Scene(w, h, ctx);

scene.camera.rotation.x = 0;
scene.camera.rotation.y = 0;

scene.camera.position.z = 0;
scene.camera.position.x = 0;
scene.camera.position.y = 0;
scene.blocks = [ new Block(-25, -100, 200) ];

//scene.render();
let p = scene.camera.project([{x: -1, y: -1, z: 10, w: 1}, {x: -1, y: -1, z: 50, w: 1}], w, h);
ctx.beginPath();
ctx.strokeStyle = "#ffffff";
for (let i = 0; i < p.length; i++) {
    let { x, y } = p[i];
    console.log(x, y);
    if (i == 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
}
ctx.stroke();
ctx.closePath();
