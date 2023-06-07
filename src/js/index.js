import Scene from "./lib/Scene";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");



canvas.style.cursor = "none";

let [ w, h ] = [document.documentElement.clientWidth, document.documentElement.clientHeight];
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
    x: 0.17,
}

let pos = {
    x: w * 0.5,
    y: h * 0.5,
}

let mx = Math.PI / (scene.width * 0.5);
let my = (Math.PI * 0.5) / (scene.height * 0.5);

canvas.addEventListener("click", () => {
    canvas.requestPointerLock({
        unadjustedMovement: true,
    });
});

canvas.addEventListener("mousemove", (e) => {
    const { movementX, movementY } = e;

    let x = ((pos.x + movementX) % w);
    let y = pos.y + movementY;
    pos.x = (x < 0) ? w : x;
    pos.y = (y < 0 || y > h) ? ((y > h) ? h : 0) : y;

    rotation.x = (pos.y * my) - (Math.PI * 0.5);
    rotation.y = -(pos.x * mx);
});

canvas.addEventListener("click", () => {
    if (!scene.selected) return;
    const { block, face } = scene.selected;
    switch (face) {
        case 0:
            scene.add_block(block.x, block.y, block.z - 50);
            break;
        case 1:
            scene.add_block(block.x, block.y - 50, block.z);
            break;
        case 2:
            scene.add_block(block.x + 50, block.y, block.z);
            break;
        case 3:
            scene.add_block(block.x, block.y + 50, block.z);
            break;
        case 4:
            scene.add_block(block.x - 50, block.y, block.z);
            break;
        case 5:
            scene.add_block(block.x, block.y, block.z + 50);
            break;
    }
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

let [ x_pos, y_pos, z_pos ] = Array(3);

setInterval(() => {
    if (controls.front) scene.camera.velocity.z = 5;
    else if (controls.back) scene.camera.velocity.z = -5;
    else scene.camera.velocity.z = 0;

    if (controls.right) scene.camera.velocity.x = 5;
    else if (controls.left) scene.camera.velocity.x = -5;
    else scene.camera.velocity.x = 0;

    if (controls.jump && scene.camera.velocity.y == 0) scene.camera.velocity.y = -17;

    scene.camera.rotation.y = rotation.y;
    scene.camera.rotation.x = rotation.x;


    scene.render();
    x_pos = Math.round(scene.camera.position.x - (scene.camera.position.x % 50));
    y_pos = Math.round(Math.abs(scene.camera.position.y));
    z_pos = Math.round(scene.camera.position.z - (scene.camera.position.z % 50));

    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.font = "20px monospace";

    ctx.fillText(`X: ${x_pos}`, 50, 50);
    ctx.fillText(`Y: ${z_pos}`, 50, 100);
    ctx.fillText(`Z: ${y_pos - 90}`, 50, 150);
    ctx.closePath();
}, 40);

scene.render();