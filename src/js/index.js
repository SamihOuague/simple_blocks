//import { Vector3D, Vector2D } from "./lib/Vector";
//import Block from "./lib/Block";

//let z_pos = 90;
//
//let block = new Block(-50, 0, z_pos, 50);
//let block2 = new Block(50, 0, z_pos, 50);
//let block3 = new Block(-50, 50, z_pos, 50);
//let block4 = new Block(50, 50, z_pos, 50);
//
//const project = (w, h, vectors) => {
//
//    let project2D = Array(vectors.length);
//    let focal_length = 150;
//
//    for (let i = 0; i < vectors.length; i++) {
//        let vector = vectors[i];
//
//        let x = vector.x * (focal_length / vector.z) + (w * 0.5);
//        let y = vector.y * (focal_length / vector.z) + (h * 0.5);
//
//        project2D[i] = new Vector2D(x, y);
//    }
//
//    return project2D;
//}
//
//let canvas = document.getElementById("game");
//let ctx = canvas.getContext("2d");
//
//
//function render(block) {
//    let vertices = project(400, 400, block.vertices);
//
//    ctx.strokeStyle = "#ffffff";
//    //ctx.clearRect(0, 0, 400, 400);
//
//    for (let i = 0; i < block.faces.length; i++) {
//
//        let face = block.faces[i];
//
//        let p1 = block.vertices[face[0]];
//        let p2 = block.vertices[face[1]];
//        let p3 = block.vertices[face[2]];
//
//        let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
//        let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
//
//        let n = new Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);
//        if (!(block.y > 0 && i == 1)) {
//            if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {
//                ctx.beginPath();
//                ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);
//                ctx.lineTo(vertices[face[1]].x, vertices[face[1]].y);
//                ctx.lineTo(vertices[face[2]].x, vertices[face[2]].y);
//                ctx.lineTo(vertices[face[3]].x, vertices[face[3]].y);
//                ctx.closePath();
//                ctx.stroke();
//            }
//        }
//    }
//}

//render(block);
//render(block2);
//render(block3);
//render(block4);

//setInterval(() => {
//    //block.rotateY(0.005);
//    render();
//}, 10);

import Scene from "./lib/Scene";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let scene = new Scene(400, 400, ctx);

scene.add_block(-50, 50, 150);
scene.add_block(-50, 50, 200);

scene.add_block(50, 50, 150);
scene.add_block(50, 50, 200);

scene.add_block(50, 0, 200);
scene.add_block(-50, 0, 200);

scene.add_block(0, 50, 200);

scene.render();