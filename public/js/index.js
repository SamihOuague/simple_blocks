import Scene from "./lib/Scene";
import Block from "./lib/Block";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

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

scene.generate_world();


let mx = Math.PI / (scene.width * 0.5);
let my = (Math.PI * 0.5) / (scene.height * 0.5);

let [ x_pos, y_pos, z_pos ] = Array(3);

const controls_down = (e) => {
    let { key } = e;

    if (key == "d") controls.right = true;
    if (key == "a") controls.left = true;
    if (key == "w") controls.front = true;
    if (key == "s") controls.back = true;
    if (key == " ") controls.jump = true;
};

const controls_up = (e) => {
    let { key } = e;

    if (key == "d") controls.right = false;
    if (key == "a") controls.left = false;
    if (key == "w") controls.front = false;
    if (key == "s") controls.back = false;
    if (key == " ") controls.jump = false;
};

const rotation_control = (e) => {
    const { movementX, movementY } = e;

    let x = ((pos.x + movementX) % w);
    let y = pos.y + movementY;
    pos.x = (x < 0) ? w : x;
    pos.y = (y < 0 || y > h) ? ((y > h) ? h : 0) : y;

    rotation.x = (pos.y * my) - (Math.PI * 0.5);
    rotation.y = -(pos.x * mx);
}



let colors = ["#341f97", "#5f27cd", "#48dbfb", "#10ac84", "#f368e0", "#ff9f43", "#ee5253"];
let selected_color = 0;


let draw_color_select = () => {
    for (let i = 0; i < colors.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = colors[i];
        ctx.rect((w * 0.5 - ((colors.length * 0.5) * 20)) + (i * 20 + (5 * i)), h - 60, 20, 20);
        ctx.fill();
        if (i == selected_color) ctx.stroke();
        ctx.closePath();
    }
}

let select_color = (e) => {
    if (e.deltaY > 0) {
        selected_color += -1;
        if (selected_color < 0) selected_color = colors.length - 1;
    } else {
        selected_color += 1;
        if (selected_color >= colors.length) selected_color = 0;
    }
}

const mouse_down = (e) => {


    if (e.buttons == 1) {
        scene.add_block(colors[selected_color]);
    } else if (e.buttons == 2) {
        scene.delete_block();
        
    }
}

let update_scene = () => {
    
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
    draw_color_select();
    if (scene.camera.position.y > 1000) {
        scene.camera.position.x = 200;
        scene.camera.position.y = -1000;
        scene.camera.position.z = 200;
    }
    
}





let animation = null;

function play() {
    canvas.addEventListener("mousemove", rotation_control);
    
    canvas.addEventListener("mousedown", mouse_down);
    
    window.addEventListener("keydown", controls_down);
    
    window.addEventListener("keyup", controls_up);
    
    document.addEventListener("wheel", select_color);

    
    animation = setInterval(update_scene, 40);
}

ctx.beginPath();
ctx.fillStyle = "#00ff00";
ctx.font = "20px monospace";

ctx.fillText("CLICK TO PLAY", w * 0.5 - 100, h * 0.5 - 50);
ctx.closePath();

let play_trigger = () => {
    canvas.requestPointerLock({
        unadjustedMovement: true,
    });
    play();
};

canvas.addEventListener("click", play_trigger);

document.addEventListener("pointerlockchange", (e) => {
    if (document.pointerLockElement) {
        canvas.removeEventListener("click", play_trigger);
        canvas.style.cursor = "none";
    } else {
        canvas.addEventListener("click", play_trigger);
        canvas.style.cursor = "pointer";
        ctx.beginPath();
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#00ff00";
        ctx.font = "20px monospace";

        ctx.fillText("CLICK TO PLAY", w * 0.5 - 100, h * 0.5 - 50);
        ctx.closePath();
        
        clearInterval(animation);
        animation = null;
        canvas.removeEventListener("mousemove", rotation_control);
        canvas.removeEventListener("mousedown", mouse_down);
        window.removeEventListener("keydown", controls_down);
        window.removeEventListener("keyup", controls_up);
    }
});