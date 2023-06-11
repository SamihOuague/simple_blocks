import { Vector2D, Vector3D } from "./Vector";
import Camera from "./Camera";
import Block from "./Block";

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

    delete_block = () => {
        if (!this.selected) return;
        const { block } = this.selected;

        let worker = new Worker("./js/utils/generator.js");

        worker.addEventListener("message", (message) => {
            const { blocks } = message.data;
            if (message.data.update) {
                worker.postMessage({
                    command: "update",
                    block: block,
                    blocks: blocks,
                });
            } else if (Array.isArray(message.data)) {
                this.blocks = message.data;
            }
        });

        worker.postMessage({
            command: "remove",
            blocks: this.blocks,
            block: block,
        });
    }
    
    add_block = (color = "#efefef") => {
        if (!this.selected) return;
        const { block, face } = this.selected;
        const { position } = this.camera;
        let new_block = new Block(block.x, block.y, block.z);

        let worker = new Worker("./js/utils/generator.js");

        worker.addEventListener("message", (message) => {
            const { block } = message.data;
            if (message.data.update) {
                worker.postMessage({
                    command: "update",
                    block: block,
                    blocks: [...this.blocks, block],
                });
            } else if (Array.isArray(message.data)) {
                this.blocks = message.data;
            }
        });

        switch (face) {
            case 0:
                new_block.z += -50;
                break;
            case 1:
                new_block.y += -50;
                break;
            case 2:
                new_block.x += 50;
                break;
            case 3:
                new_block.y += 50;
                break;
            case 4:
                new_block.x += -50;
                break;
            case 5:
                new_block.z += 50;
                break;
        }

        if (!this.camera.is_collide([new_block], position.x, position.y, position.z)) {
            new_block = new Block(new_block.x, new_block.y, new_block.z);
            new_block.color = color;
            worker.postMessage({
                command: "add",
                blocks: this.blocks,
                block: new_block,
            });
        }
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
            
            if ((i == 0 && block.neighbours.south)
                    || (i == 1 && block.neighbours.bottom)
                    || (i == 2 && block.neighbours.east)
                    || (i == 3 && block.neighbours.top)
                    || (i == 4 && block.neighbours.west)
                    || (i == 5 && block.neighbours.north)) {
                        
                continue;
            }

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
                                                vertices[face[3]]], color: block.color});

                if (this.is_center(vertices, face)) {
                    this.selected = { block, face: i, i: this.projection.length - 1 };
                }
            }
        }
    }
    generate_world = () => {
        let worker = new Worker("./js/utils/generator.js");
        let n = 34;
    
        worker.addEventListener("message", (message) => {
            const { block, blocks } = message.data;
            if (message.data.update) {
                worker.postMessage({
                    command: "update",
                    block: block,
                    blocks: [...this.blocks, block],
                });
            } else {
                this.blocks = [...this.blocks.filter((v) => {
                    return this.blocks.find((r) => r.x == v.x && r.y == v.y && r.z == v.z);
                }), ...message.data];
            }
        });
    
        for (let i = 2; i < n; i++) {
            for (let j = 2; j < n; j++) {
                let block = new Block(i * 50, 0, j * 50);
                block.color = "#2e2e2e";
                worker.postMessage({
                    command: "add",
                    block: block,
                    blocks: [...this.blocks],
                });
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
            if (a.y == b.y) return 0;
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
            let c = project.color;
            if (this.selected && this.selected.i == i) {
                c = "#" + [project.color.slice(1, 3), 
                        project.color.slice(3, 5), 
                        project.color.slice(5, 7)].map((v) => (parseInt(v, 16) + 20 < 255) ? (parseInt(v, 16) + 20).toString(16) : "ff").join('');
            }
            
            this.draw_face(project.vertices, c);
        }
        
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect((this.width * 0.5) - 2, (this.height * 0.5) - 15, 4, 30);
        this.ctx.fillRect((this.width * 0.5) - 15, (this.height * 0.5) - 2, 30, 4);
        
    }
}

export default Scene;