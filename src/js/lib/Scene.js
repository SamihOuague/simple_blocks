import { Vector2D, Vector3D } from "./Vector";
import Block from "./Block";

class Scene {
    constructor(w, h, ctx) {
        this.blocks = [];
        this.focal_length = 200;
        this.width = w;
        this.height = h;
        this.ctx = ctx;
        this.camera = new Vector3D(0, 0, 0);
        this.rotation = new Vector3D(0, 0, 0);
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

            let x = (vector.x - this.camera.x) * (focal_length / (vector.z - this.camera.z)) + (this.width * 0.5);
            let y = (vector.y - this.camera.y) * (focal_length / (vector.z - this.camera.z)) + (this.height * 0.5);
    
            project2D[i] = new Vector2D(x, y);
        }
    
        return project2D;
    }

    draw_block = (block) => {
        let vertices = this.project(block.vertices);
        
        this.ctx.strokeStyle = "#ffffff";

        for (let i = 0; i < block.faces.length; i++) {
    
            let face = block.faces[i];
    
            let p1 = block.vertices[face[0]];
            let p2 = block.vertices[face[1]];
            let p3 = block.vertices[face[2]];
    
            let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
            let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
    
            let n = new Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);

            const { x, y, z } = this.camera;
            if ((x-p1.x) * n.x + (y-p1.y) * n.y + (z-p1.z) * n.z <= 0 && z < p1.z && z < p2.z && z < p3.z) {
                this.ctx.beginPath();
                this.ctx.fillStyle = "#005f00";
                this.ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);
                this.ctx.lineTo(vertices[face[1]].x, vertices[face[1]].y);
                this.ctx.lineTo(vertices[face[2]].x, vertices[face[2]].y);
                this.ctx.lineTo(vertices[face[3]].x, vertices[face[3]].y);
                this.ctx.closePath();
                this.ctx.stroke();
                this.ctx.fill();
            }
        }
    }

    rotateY = (block) => {
        for (let i = 0; i < block.vertices.length; i++) {
            let v = block.vertices[i];
            
            let x = (v.x - this.camera.x) * Math.cos(this.rotation.y) + (v.z - this.camera.z) * Math.sin(this.rotation.y);
            let z = (v.z - this.camera.z) * Math.cos(this.rotation.y) - (v.x - this.camera.x) * Math.sin(this.rotation.y);
    
            v.x = x + this.camera.x;
            v.z = z + this.camera.z;
        }
    }

    rotateX = (block) => {
        for (let i = 0; i < block.vertices.length; i++) {
            let v = block.vertices[i];

            let y = (v.y - this.camera.y) * Math.cos(this.rotation.x) - (v.z - this.camera.z) * Math.sin(this.rotation.x);
            let z = (v.z - this.camera.z) * Math.cos(this.rotation.x) + (v.y - this.camera.y) * Math.sin(this.rotation.x);
    
            v.y = y + this.camera.y;
            v.z = z + this.camera.z;
        }
    }

    render = () => {
        this.ctx.clearRect(0, 0, 400, 400);
        let blocks = this.blocks.slice().sort((a, b) => {
            if (a.z == b.z) return b.y - a.y;
            return b.z - a.z;
        });

        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i];
            this.rotateY(block);
            block.x = block.vertices[0].x;
            block.y = block.vertices[0].y;
            block.z = block.vertices[0].z;
            this.draw_block(block);
        }
    }
}

export default Scene;