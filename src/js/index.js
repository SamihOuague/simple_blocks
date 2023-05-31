import Scene from "./lib/Scene";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");



canvas.style.cursor = "none";

let scene = new Scene(document.documentElement.clientWidth, document.documentElement.clientHeight, ctx);


scene.camera.x = 200;
scene.camera.y = -180;
scene.camera.z = 200;

let controls = {
    left: false,
    right: false,
    front: false,
    back: false,
};

let rotation = {
    y: false,
    x: false,
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

    if (key == "j") rotation.left = true;
    if (key == "l") rotation.right = true;
    if (key == "i") rotation.up = true;
    if (key == "k") rotation.down = true;
    
    if (key == " " && scene.velocity.y == 0) scene.velocity.y = -11;
});

window.addEventListener("keyup", (e) => {
    let { key } = e;

    if (key == "d") controls.right = false;
    if (key == "a") controls.left = false;
    if (key == "w") controls.front = false;
    if (key == "s") controls.back = false;

    if (key == "j") rotation.left = false;
    if (key == "l") rotation.right = false;
    if (key == "i") rotation.up = false;
    if (key == "k") rotation.down = false;
});

for (let i = 2; i < 12; i++) {
    for (let j = 2; j < 12; j++) scene.add_block(i * 50, 0, j * 50);
}


let [ x_pos, y_pos, z_pos ] = Array(3);
setInterval(() => {
    if (controls.front) scene.velocity.z = 4;
    else if (controls.back) scene.velocity.z = -4;
    else scene.velocity.z = 0;

    if (controls.right) scene.velocity.x = 4;
    else if (controls.left) scene.velocity.x = -4;
    else scene.velocity.x = 0;

    scene.rotation.y = rotation.y;
    scene.rotation.x = rotation.x;


    scene.render();
    x_pos = Math.round(scene.camera.x - (scene.camera.x % 50));
    y_pos = Math.round(Math.abs(scene.camera.y));
    z_pos = Math.round(scene.camera.z - (scene.camera.z % 50));

    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.font = "20px monospace";

    ctx.fillText(`X: ${x_pos}`, 50, 50);
    ctx.fillText(`Y: ${z_pos}`, 50, 100);
    ctx.fillText(`Z: ${y_pos}`, 50, 150);
    ctx.closePath();
}, 50);


//scene.render();
