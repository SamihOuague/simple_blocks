import { Vector2D, Vector3D } from "./Vector";
import Block from "./Block";

class Scene {
    constructor(w, h, ctx) {
        this.blocks = [];
        this.rotation = new Vector3D(0, 0, 0);
        this.focal_length = 200;
        this.width = w;
        this.height = h;
        this.ctx = ctx;
    }

    add_block = (x, y, z) => {
        let block = new Block(x, y, z, 50);
        this.blocks.push(block);
    }

    project = (vectors) => {
        let project2D = Array(vectors.length);
        let focal_length = this.focal_length;
    
        for (let i = 0; i < vectors.length; i++) {
            let vector = vectors[i];
    
            let x = vector.x * (focal_length / vector.z) + (this.width * 0.5);
            let y = vector.y * (focal_length / vector.z) + (this.height * 0.5);
    
            project2D[i] = new Vector2D(x, y);
        }
    
        return project2D;
    }

    draw_block = (block) => {
        let vertices = this.project(block.vertices);
        
        this.ctx.strokeStyle = "#ffffff";
        console.log(vertices);
        for (let i = 0; i < block.faces.length; i++) {
    
            let face = block.faces[i];
    
            let p1 = block.vertices[face[0]];
            let p2 = block.vertices[face[1]];
            let p3 = block.vertices[face[2]];
    
            let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
            let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
    
            let n = new Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);

            if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);
                this.ctx.lineTo(vertices[face[1]].x, vertices[face[1]].y);
                this.ctx.lineTo(vertices[face[2]].x, vertices[face[2]].y);
                this.ctx.lineTo(vertices[face[3]].x, vertices[face[3]].y);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
    }

    render = () => {
        for (let i = 0; i < this.blocks.length; i++) {
            this.draw_block(this.blocks[i]);
        }
    }
}

export default Scene;