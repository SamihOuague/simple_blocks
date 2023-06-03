import Scene from "./lib/Scene";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");



canvas.style.cursor = "none";

let scene = new Scene(document.documentElement.clientWidth, document.documentElement.clientHeight, ctx);

scene.camera.position.x = 200;
scene.camera.position.y = -90;
scene.camera.position.z = 200;

let controls = {
    left: false,
    right: false,
    front: false,
    back: false,
    jump: false,
};

let rotation = {
    y: -(Math.PI * 0.25),
    x: 0,
}

let mx = Math.PI / (scene.width * 0.5);
let my = (Math.PI * 0.5) / (scene.height * 0.5);

canvas.addEventListener("mousemove", (e) => {
    let x_mouse = (e.clientX - e.target.offsetLeft) - (scene.width * 0.5);
    let y_mouse = (e.clientY - e.target.offsetTop) - (scene.height * 0.5);

    rotation.x = (y_mouse * my);
    rotation.y = -(x_mouse * mx);
});

window.addEventListener("keydown", (e) => {
    let { key } = e;

    if (key == "d") controls.right = true;
    if (key == "a") controls.left = true;
    if (key == "w") controls.front = true;
    if (key == "s") controls.back = true;
    if (key == " ") controls.jump = true;
});

window.addEventListener("keyup", (e) => {
    let { key } = e;

    if (key == "d") controls.right = false;
    if (key == "a") controls.left = false;
    if (key == "w") controls.front = false;
    if (key == "s") controls.back = false;
    if (key == " ") controls.jump = false;
});

for (let i = 2; i < 12; i++) {
    for (let j = 2; j < 12; j++) scene.add_block(i * 50, 0, j * 50);
}

//scene.add_block(300, -50, 300);
//scene.add_block(300, -100, 300);
//scene.add_block(300, -150, 300);
//scene.add_block(300, -200, 300);
//scene.add_block(300, -250, 300);
//
let [ x_pos, y_pos, z_pos ] = Array(3);

//setInterval(() => {
//    if (controls.front) scene.camera.velocity.z = 5;
//    else if (controls.back) scene.camera.velocity.z = -5;
//    else scene.camera.velocity.z = 0;
//
//    if (controls.right) scene.camera.velocity.x = 5;
//    else if (controls.left) scene.camera.velocity.x = -5;
//    else scene.camera.velocity.x = 0;
//
//    if (controls.jump && scene.camera.velocity.y == 0) scene.camera.velocity.y = -17;
//
//    scene.camera.rotation.y = rotation.y;
//    scene.camera.rotation.x = rotation.x;
//
//
//    scene.render();
//    x_pos = Math.round(scene.camera.position.x - (scene.camera.position.x % 50));
//    y_pos = Math.round(Math.abs(scene.camera.position.y));
//    z_pos = Math.round(scene.camera.position.z - (scene.camera.position.z % 50));
//
//    ctx.beginPath();
//    ctx.fillStyle = "#00ff00";
//    ctx.font = "20px monospace";
//
//    ctx.fillText(`X: ${x_pos}`, 50, 50);
//    ctx.fillText(`Y: ${z_pos}`, 50, 100);
//    ctx.fillText(`Z: ${y_pos - 90}`, 50, 150);
//    ctx.closePath();
//}, 40);

import { Vector2D } from "./lib/Vector";

let compute_y = (vector, x) => {
    if (!vector.x) return vector.y;
    return Math.round((x * (vector.y / vector.x)) * 10) / 10;
}

let compute_x = (vector, y) => {
    if (!vector.y) return vector.x;
    return Math.round((y * (vector.x / vector.y)) * 10) / 10;
}


let [ w, h ] = [document.documentElement.clientWidth * 0.5, document.documentElement.clientHeight * 0.5];

let block = [new Vector2D(0, 0), new Vector2D(50, 10), new Vector2D(50, 60), new Vector2D(0, 50)];
let b = block[0];
let v = new Vector2D(10, 0);

ctx.beginPath();
ctx.moveTo(b.x - v.x, b.y - v.y)
for (let i = 1; i < block.length; i++) {
    b = block[i];
    ctx.lineTo(b.x - v.x, b.y - v.y);
    console.log(compute_x(b, v.y), compute_y(b, v.x), b)
}
ctx.strokeStyle = "#ff0000";
ctx.closePath();
ctx.stroke();