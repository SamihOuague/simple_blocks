import { Vector2D, Vector3D } from "./Vector";
import Block from "./Block";

class Scene {
    constructor(w, h, ctx) {
        this.blocks = [];
        this.grid = [];
        this.width = w;
        this.height = h;
        this.focal_length = this.width * 0.5;
        this.ctx = ctx;
        this.camera = new Vector3D(0, 0, 0);
        this.rotation = new Vector3D(0, 0, 0);
        this.velocity = new Vector3D(0, 0, 0);
        this.ctx.canvas.width = w;
        this.ctx.canvas.height = h;
        this.create_grid();
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

    project = (vectors) => {
        let project2D = Array(vectors.length);
        let focal_length = this.focal_length;
        let v = vectors.slice().map((v) => {
            if (v.z < this.camera.z) {
                return {...v,
                    x: v.x,
                    y: v.y,
                    z: this.camera.z
                }
            } else return v;
        });
        
        for (let i = 0; i < vectors.length; i++) {
            let vector = v[i];

            let vz = vector.z - this.camera.z || 1;
            let m = (focal_length / vz);
            
            let x = (vector.x - this.camera.x) * m + (this.width * 0.5);
            let y = (vector.y - this.camera.y) * m + (this.height * 0.5);
            
            

            project2D[i] = new Vector2D(x, y);
        }
    
        return project2D;
    }

    create_grid = () => {
        let size = this.width * 0.5;

        for (let i = -size; i < size + 50; i += 50) {
            let v1 = [new Vector3D(i, 0, -size), new Vector3D(i, 0, size)];
            let v2 = [new Vector3D(-size, 0, i), new Vector3D(size, 0, i)];
            this.grid.push([v1, v2]);
        }
    }

    draw_grid = () => {
        let size = this.width * 0.5;
        for (let i = 0; i < this.grid.length; i++) {
            let line_x = this.rotateY(this.grid[i][1]);
            let line_z = this.rotateY(this.grid[i][0]);


            //if (line_z[0].z > this.camera.z || line_z[1].z > this.camera.z) {
            //    line_z = this.project(line_z);
            //    this.draw_line(line_z[0], line_z[1]);
            //}

            if (line_z[0].x > this.camera.z || line_z[1].x > (this.camera.z + 50)) {
                line_x = this.project(line_x);            
                this.draw_line(line_x[0], line_x[1]);
            }
            //console.log(line_z);
            //break;
        }
    }

    draw_line = (from, to) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    draw_block = (block) => {
        let n_block = this.rotateY(block.vertices);
        let vertices = this.project(n_block);
        
        this.ctx.strokeStyle = "#ffffff";

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

            const { x, y, z } = this.camera;
            if ((x-p1.x) * n.x + (y-p1.y) * n.y + (z-p1.z) * n.z <= 0 && n_block[0].z > this.camera.z) {
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

    rotateY = (vectors) => {
        let b = Array(vectors);

        for (let i = 0; i < vectors.length; i++) {
            let v = vectors[i];
            
            let x = (v.x - this.camera.x) * Math.cos(this.rotation.y) + (v.z - this.camera.z) * Math.sin(this.rotation.y);
            let z = (v.z - this.camera.z) * Math.cos(this.rotation.y) - (v.x - this.camera.x) * Math.sin(this.rotation.y);
    
            
            b[i] = new Vector3D(x + this.camera.x, v.y, z + this.camera.z);
        }

        return b;
    }

    rotateX = (vectors) => {
        let b = Array(vectors);

        for (let i = 0; i < vectors.length; i++) {
            let v = vectors[i];

            let y = (v.y - this.camera.y) * Math.cos(this.rotation.x) - (v.z - this.camera.z) * Math.sin(this.rotation.x);
            let z = (v.z - this.camera.z) * Math.cos(this.rotation.x) + (v.y - this.camera.y) * Math.sin(this.rotation.x);
            
            b[i] = new Vector3D(v.x, y + this.camera.y, z + this.camera.z);
        }

        return b;
    }

    rotateZ = (block) => {
        for (let i = 0; i < block.vertices.length; i++) {
            let v = block.vertices[i];

            let x = (v.x - this.camera.x) * Math.cos(this.rotation.z) - (v.y - this.camera.y) * Math.sin(this.rotation.z);
            let y = (v.y - this.camera.y) * Math.cos(this.rotation.z) + (v.x - this.camera.x) * Math.sin(this.rotation.z);
    
            v.x = x + this.camera.x;
            v.y = y + this.camera.y;
        }
    }

    update_position = () => {
        let r = this.rotateY([new Vector3D(this.camera.x, 0, this.camera.z + 100)]);
        let vector = r[0];
        
        let vz = vector.z - this.camera.z;
        let m = (this.focal_length / vz) || 50;

        let n = {...r[0], x: r[0].x - this.camera.x, z: (r[0].z - this.camera.z)};

        r[0].x = -(vector.x - this.camera.x) * Math.abs(m) + (this.width * 0.5);
        r[0].y = (vector.y - this.camera.y) * Math.abs(m) + (this.height * 0.5);
        
        let prop_z = n.z / 100;
        let prop_x = -n.x / 100;
        

        this.camera.z += this.velocity.z * (prop_z);
        this.camera.x += this.velocity.z * (prop_x);

        this.camera.x += this.velocity.x * (prop_z);
        this.camera.z += -this.velocity.x * (prop_x);

        if (this.velocity.y < 0 && this.camera.y > -100) this.camera.y += this.velocity.y;
        else if (this.camera.y <= -100 && this.camera.y < -50) this.velocity.y = 0;
            
        if (this.velocity.y == 0 && this.camera.y < -50) this.camera.y += 4;
    }

    render = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.update_position();
        let blocks = this.blocks.slice().sort((a, b) => {
            if (a.z == b.z) {
                if (this.camera.x > b.x) return (a.x < b.x) ? -1 : 1;
                else return (b.x < a.x) ? -1 : 1;
            } else if (a.z == b.z && a.x == b.x) return (b.y < a.y) ? -1 : 1;
            else if (this.camera.z < b.z) return (b.z < a.z) ? -1 : 1;
            else return (b.z > a.z) ? -1 : 1;
        });

        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i];
            
            block.x = block.vertices[0].x;
            block.y = block.vertices[0].y;
            block.z = block.vertices[0].z;
            
            this.draw_block(block);
        }
    }
}

export default Scene;