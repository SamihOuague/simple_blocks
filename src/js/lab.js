import { Vector2D } from "./lib/Vector";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let [ w, h ] = [document.documentElement.clientWidth, document.documentElement.clientHeight];

ctx.canvas.width = w;
ctx.canvas.height = h;



let v_pos = new Vector2D(w * 0.5 - 100, h * 0.5 - 100);

let vertices = [new Vector2D(0 + v_pos.x, 0 + v_pos.y), 
                new Vector2D(200 + v_pos.x, 50 + v_pos.y), 
                new Vector2D(250 + v_pos.x, 250 + v_pos.y), 
                new Vector2D(-50 + v_pos.x, 200 + v_pos.y)];


let compute_y = (vector, x) => {
    if (!vector.x) return vector.y;
    return Math.round((x * (vector.y / vector.x)) * 10) / 10;
}

let compute_x = (vector, y) => {
    if (!vector.y) return vector.x;
    return Math.round((y * (vector.x / vector.y)) * 10) / 10;
}




let draw = (fill = false) => {
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.moveTo(vertices[0].x, vertices[0].y);
    ctx.lineTo(vertices[1].x, vertices[1].y);
    ctx.lineTo(vertices[2].x, vertices[2].y);
    ctx.lineTo(vertices[3].x, vertices[3].y);
    ctx.closePath();
    if (fill) {
        ctx.fillStyle = "#0000ff";
        ctx.fill();
    }
    ctx.stroke();
}

let lines_y = [[1, 2], [0, 3], [0, 1], [3, 2]];

draw();
canvas.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    
    ctx.clearRect(0, 0, w, h);
    let counter = 0;
    for (let i = 0; i < lines_y.length; i++) {
        let line = lines_y[i];
        let v1 = vertices[line[0]];
        let v2 = vertices[line[1]];
        v1 = new Vector2D(clientX - v1.x, clientY - v1.y);
        v2 = new Vector2D(v2.x - clientX, v2.y - clientY);
        let n = (v2.x * v1.y) - (v1.x * v2.y);
        if ((i % 2 == 0 && n > 0) || (i % 2 != 0 && n < 0)) {
            ctx.beginPath();
            ctx.strokeStyle = "#0000ff";
            ctx.moveTo(vertices[line[0]].x, vertices[line[0]].y);
            ctx.lineTo(clientX, clientY);
            ctx.moveTo(clientX, clientY);
            ctx.lineTo(vertices[line[1]].x, vertices[line[1]].y);
            ctx.closePath();
            ctx.stroke();
            counter++;
        }
    }
    draw(counter == 4);
});