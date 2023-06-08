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
        this.projection = [];
        this.selected = null;
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

    add_block = (x, y, z, size = 50) => {
        let block = new Block(x, y, z, size);        
        this.blocks.push(block);
        this.update_neighbour();
        
    }

    remove_block = (x, y, z) => {
        this.blocks = this.blocks.filter((v) => {
            return !(x == v.x && y == v.y && z == v.z);
        });
        this.update_neighbour();
    }

    draw_face = (face, color = "#005f00") => {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.moveTo(face[0].x, face[0].y);
        this.ctx.lineTo(face[1].x, face[1].y);
        this.ctx.lineTo(face[2].x, face[2].y);
        this.ctx.lineTo(face[3].x, face[3].y);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    project_block = (block) => {
        let w = (this.width * 0.5);
        let h = (this.height * 0.5);
        let vertices = this.camera.project(block.vertices, w, h);

        for (let i = 0; i < block.faces.length; i++) {
            let face = block.faces[i];

            if ((i == 0 && block.neighbours.north)
                || (i == 1 && block.neighbours.top)  
                || (i == 2 && block.neighbours.east)
                || (i == 3 && block.neighbours.bottom)
                || (i == 4 && block.neighbours.west)
                || (i == 5 && block.neighbours.south)) continue;
            
            let p1 = block.vertices[face[0]];
            let p2 = block.vertices[face[1]];
            let p3 = block.vertices[face[2]];

            let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
            let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
    
            let n = new Vector3D(v1.y * v2.z - v2.y * v1.z, v1.z * v2.x - v2.z * v1.x, v1.x * v2.y - v1.y * v2.x);
            
            const { x, y, z } = this.camera.position;


            if ((x-p1.x) * n.x + (y-p1.y) * n.y + (z-p1.z) * n.z <= 0 && p1.z >= this.camera.position.z) {
                this.projection.push({vertices: [vertices[face[0]],
                                                vertices[face[1]],
                                                vertices[face[2]],
                                                vertices[face[3]]]});

                if (this.is_center(vertices, face)) {
                    this.selected = { block, face: i, i: this.projection.length - 1 };
                }
            }
        }
    }

    is_center = (vertices, face) => {
        let lines = [[1, 2], [0, 3], [0, 1], [3, 2]];
        let counter = 0;
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let v1 = vertices[face[line[0]]];
            let v2 = vertices[face[line[1]]];

            v1 = new Vector2D((this.width*0.5) - v1.x, (this.height*0.5) - v1.y);
            v2 = new Vector2D(v2.x - (this.width*0.5), v2.y - (this.height*0.5));

            let n = (v2.x * v1.y) - (v1.x * v2.y);

            if ((i % 2 == 0 && n > 0) || (i % 2 != 0 && n < 0)) {
                counter++;
            }
        }

        return counter == 4;
    }

    render = () => {
        let pos_x = this.camera.position.x - (this.camera.position.x % 50);
        let pos_y = this.camera.position.y - (this.camera.position.y % 50) - 50;
        let pos_z = this.camera.position.z - (this.camera.position.z % 50);

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.camera.update_position(this.blocks, this.width * 0.5, this.height * 0.5);
        

        let bl = this.blocks.slice().map((v) => {
            let tmp = this.camera.rotateX(this.camera.rotateY(v.vertices));

            return {...v, vertices: tmp};
        }).filter((v) => {
            return v.vertices[0].z > this.camera.position.z;
        });

        bl = bl.sort((a, b) => {
            if (pos_y < a.y || pos_y < b.y) return (a.y < b.y) ? 1 : -1;
            else return (a.y > b.y) ? 1 : -1;
        }).sort((a, b) => {
            if (a.y == b.y) {
                if (b.z > pos_z || a.z > pos_z) {
                    return b.z - a.z;
                } else {
                    return a.z - b.z;
                }
            }
        }).sort((a, b) => {
            if (a.y == b.y && b.z == a.z) {
                if (a.x > pos_x || b.x > pos_x) {
                    return b.x - a.x;
                } else {
                    return a.x - b.x;
                }
            }
        });

        

        this.projection = [];
        this.selected = null;
        for (let i = 0; i < bl.length; i++) {
            let block = bl[i];

            this.project_block(block);
        }
        
        for (let i = 0; i < this.projection.length; i++) {
            let project = this.projection[i];
            
            this.draw_face(project.vertices, (this.selected && this.selected.i == i) ? "#0000ff": "#005f00");
        }
        
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect((this.width * 0.5) - 2, (this.height * 0.5) - 15, 4, 30);
        this.ctx.fillRect((this.width * 0.5) - 15, (this.height * 0.5) - 2, 30, 4);
    }
}

export default Scene;