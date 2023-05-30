import Scene from "./lib/Scene";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//let [ x_pos, y_pos, z_pos ] = document.getElementsByClassName("position");



canvas.style.cursor = "none";

let scene = new Scene(document.documentElement.clientWidth, document.documentElement.clientHeight, ctx);

//scene.add_block(0, -50, 150);
//scene.add_block(0, 0,   150);
//scene.add_block(0, -50, 250);
//scene.add_block(0, 0,   250);

scene.add_block(0, 0,   350);
scene.add_block(50, 0, 350);
scene.add_block(0, 0,  350);
scene.add_block(0, -50,  350);
scene.add_block(50, -50,  350);
scene.add_block(50, 0, 150);
scene.add_block(50, 0, 250);
scene.add_block(-50, 0, 350);
scene.add_block(50, 0, 350);
scene.add_block(-50, 0, 450);
scene.add_block(50, 0, 450);
scene.add_block(-50, 0, 550);
scene.add_block(50, 0, 550);
//
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
    y: false,
    x: false,
}


canvas.addEventListener("mousemove", (e) => {
    let x_mouse = (e.clientX - e.target.offsetLeft) - (scene.width * 0.5);
    let m = (x_mouse == 0) ? 0 : Math.PI / (scene.width * 0.5);

    rotation.y = -(x_mouse * m);
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
    
    if (key == " " && scene.camera.y == -50) scene.velocity.y = -4;
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


setInterval(() => {
    if (controls.front) scene.velocity.z = 4;
    else if (controls.back) scene.velocity.z = -4;
    else scene.velocity.z = 0;

    if (controls.right) scene.velocity.x = 4;
    else if (controls.left) scene.velocity.x = -4;
    else scene.velocity.x = 0;

    if (rotation.y) scene.rotation.y = rotation.y;
    scene.render();
    ctx.font = "20px monospace"
    ctx.fillText(`X: ${Math.round(scene.camera.x)}`, 50, 50);
    ctx.fillText(`Y: ${Math.round(scene.camera.z)}`, 50, 100);
    ctx.fillText(`Z: ${Math.abs(scene.camera.y + 50)}`, 50, 150);
    
}, 50);


//scene.render();
