import Scene from "./lib/Scene";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let scene = new Scene(400, 400, ctx);


scene.add_block(-50, 0, 250);
scene.add_block(0, -50, 150);
scene.add_block(0, 0,   150);
scene.add_block(0, -50, 250);
scene.add_block(0, 0,   250);
scene.add_block(0, -50, 350);
scene.add_block(0, 0,   350);
scene.add_block(0, -50, 350);
scene.add_block(0, 0,   350);
//scene.add_block(50, 0, 150);
//scene.add_block(50, 0, 250);
//scene.add_block(-50, 0, 350);
//scene.add_block(50, 0, 350);
//scene.add_block(-50, 0, 450);
//scene.add_block(50, 0, 450);
//scene.add_block(-50, 0, 550);
//scene.add_block(50, 0, 550);

scene.camera.x = 0;
scene.camera.y = -50;
scene.camera.z = 0;

let controls = {
    left: false,
    right: false,
    front: false,
    back: false,
};

let rotation = {
    left: false,
    right: false,
    up: false,
    down: false,
}

window.addEventListener("keydown", (e) => {
    let { key } = e;

    if (key == "d") controls.right = true;
    if (key == "a") controls.left = true;
    if (key == "w") controls.front = true;
    if (key == "s") controls.back = true;

    if (key == "j") rotation.left = true;
    if (key == "l") rotation.right = true;
});

window.addEventListener("keyup", (e) => {
    let { key } = e;

    if (key == "d") controls.right = false;
    if (key == "a") controls.left = false;
    if (key == "w") controls.front = false;
    if (key == "s") controls.back = false;

    if (key == "j") rotation.left = false;
    if (key == "l") rotation.right = false;
});

setInterval(() => {
    if (controls.front) scene.camera.z += 5;
    else if (controls.back) scene.camera.z -= 5;

    if (controls.right) scene.camera.x += 5;
    else if (controls.left) scene.camera.x -= 5;
    
    if (rotation.left) scene.rotation.y = 0.05;
    else if (rotation.right) scene.rotation.y = -0.05;
    else scene.rotation.y = 0;
    scene.render();
}, 50);