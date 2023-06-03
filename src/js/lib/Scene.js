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

    get_center = (v1, v2) => {
        let p1_x = Math.round(Math.abs(Math.abs(v1[0].x) - Math.abs(v1[1].x)));
        let p1_y = Math.round(Math.abs(Math.abs(v1[0].y) - Math.abs(v1[1].y)));
        let p2_x = Math.round(Math.abs(Math.abs(v2[0].x) - Math.abs(v2[1].x)));
        let p2_y = Math.round(Math.abs(Math.abs(v2[0].y) - Math.abs(v2[1].y)));
        
        if (p1_y < p1_x) {
            console.log({p1_x, p1_y, p2_x, p2_y});
            this.ctx.beginPath();
            this.ctx.moveTo((this.width * 0.5), (this.height * 0.5));
            this.ctx.lineTo(p1_x + (this.width * 0.5), p1_y + (this.height * 0.5));
            this.ctx.moveTo((this.width * 0.5), (this.height * 0.5));
            this.ctx.lineTo(p2_x + (this.width * 0.5), p2_y + (this.height * 0.5));
            this.ctx.strokeStyle = "#ff0000"
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }

    draw_block = (block) => {
        let w = (this.width * 0.5);
        let h = (this.height * 0.5);
        let vertices = this.camera.project(block.vertices, w, h);
        
        for (let i = 0; i < block.faces.length; i++) {
            let color = "#005f00";
            let face = block.faces[i];
    
            if (i == 0) {
                if (block.neighbours.north) continue;
            }
            else if (i == 1) {
                if (block.neighbours.top) continue;                
            } 
            else if (i == 2 && block.neighbours.east) continue;
            else if (i == 3 && block.neighbours.bottom) continue;
            else if (i == 4 && block.neighbours.west) continue;
            else if (i == 5) {
                if (block.neighbours.south) continue;
            }
            let p1 = block.vertices[face[0]];
            let p2 = block.vertices[face[1]];
            let p3 = block.vertices[face[2]];

            let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
            let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
    
            let n = new Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);
            
            const { x, y, z } = this.camera.position;

            //vertices[face[0]].x, vertices[face[0]].y
            //vertices[face[1]].x, vertices[face[1]].y

            if ((x-p1.x) * n.x + (y-p1.y) * n.y + (z-p1.z) * n.z <= 0 && p1.z >= (this.camera.position.z - 50)) {
                this.get_center([vertices[face[0]], vertices[face[1]]], [vertices[face[2]], vertices[face[3]]]);
                this.ctx.beginPath();
                this.ctx.fillStyle = color;
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
            break;
        }

        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect((this.width * 0.5) - 2, (this.height * 0.5) - 15, 4, 30);
        this.ctx.fillRect((this.width * 0.5) - 15, (this.height * 0.5) - 2, 30, 4);
    }
}

export default Scene;