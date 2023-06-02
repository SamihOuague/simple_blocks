import { Vector2D, Vector3D } from "./Vector";
import Block from "./Block";
import Camera from "./Camera";

class Scene {
    constructor(w, h, ctx) {
        this.blocks = [];
        this.grid = [];
        this.width = w;
        this.height = h;
        this.ctx = ctx;
        this.camera = new Camera(0, 0, 0, (this.width * 0.5));
        this.ctx.canvas.width = w;
        this.ctx.canvas.height = h;
    }

    update_neighbour = () => {
        for (let i = 0; i < this.blocks.length; i++) {
            let block = this.blocks[i];

            block.neighbours = {
                top: this.blocks.find((v) => v.x == block.x && v.y + 50 == block.y && v.z == block.z && v !== block) || false,
                bottom: this.blocks.find((v) => v.x == block.x && v.y - 50 == block.y && v.z == block.z && v !== block) || false,
                east: this.blocks.find((v) => v.x == block.x + 50 && v.y == block.y && v.z == block.z && v !== block) || false,
                west: this.blocks.find((v) => v.x == block.x - 50 && v.y == block.y && v.z == block.z && v !== block) || false,
                north: this.blocks.find((v) => v.z == block.z - 50 && v.x == block.x && v.y == block.y && v !== block) || false,
                south: this.blocks.find((v) => v.z == block.z + 50 && v.x == block.x && v.y == block.y && v !== block) || false,
            }
        }
    }

    add_block = (x, y, z) => {
        let block = new Block(x, y, z, 50);
        this.blocks.push(block);
        this.update_neighbour();
    }


    draw_block = (block, color = "#005f00") => {
        let vertices = this.camera.project(block.vertices, (this.width * 0.5), (this.height * 0.5));

        for (let i = 0; i < block.faces.length; i++) {
    
            let face = block.faces[i];
    
            if (i == 0 && block.neighbours.north) continue;
            else if (i == 1 && block.neighbours.top) continue;
            else if (i == 2 && block.neighbours.east) continue;
            else if (i == 3 && block.neighbours.bottom) continue;
            else if (i == 4 && block.neighbours.west) continue;
            else if (i == 5 && block.neighbours.south) continue;

            let p1 = block.vertices[face[0]];
            let p2 = block.vertices[face[1]];
            let p3 = block.vertices[face[2]];

            let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
            let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
    
            let n = new Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);

            const { x, y, z } = this.camera.position;
            if ((x-p1.x) * n.x + (y-p1.y) * n.y + (z-p1.z) * n.z <= 0 && p1.z >= (this.camera.position.z - 50)) {
                this.ctx.beginPath();
                this.ctx.fillStyle = "#005f00";
                this.ctx.strokeStyle = "#ffffff";
                this.ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);
                this.ctx.lineTo(vertices[face[1]].x, vertices[face[1]].y);
                this.ctx.lineTo(vertices[face[2]].x, vertices[face[2]].y);
                this.ctx.lineTo(vertices[face[3]].x, vertices[face[3]].y);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
            }
        }
    }
    

    render = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.camera.update_position(this.blocks, this.width * 0.5, this.height * 0.5);

        let bl = this.blocks.slice().map((v) => {
            let tmp = this.camera.rotateX(this.camera.rotateY(v.vertices));

            return {...v, vertices: tmp};
        });

        bl = bl.sort((a, b) => {
            if (b.y == a.y) {
                if (this.camera.position.z < b.z) return (b.z < a.z) ? -1 : 1;
                else return (b.z > a.z) ? -1 : 1;
            }
            if (this.camera.position.y < (b.y + 40)) return (b.y < a.y) ? -1 : 1;
            else return (b.y > a.y) ? -1 : 1;
        });

        
        for (let i = 0; i < bl.length; i++) {
            let block = bl[i];

            this.draw_block(block);
        }

        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect((this.width * 0.5) - 2, (this.height * 0.5) - 15, 4, 30);
        this.ctx.fillRect((this.width * 0.5) - 15, (this.height * 0.5) - 2, 30, 4);
    }
}

export default Scene;