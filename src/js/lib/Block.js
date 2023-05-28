import { Vector3D } from "./Vector";

let Block = function (x, y, z, size = 50) {
    Vector3D.call(this, x, y, z);

    size *= 0.5;

    this.vertices = [new Vector3D(x - size, y - size, z - size),
                    new Vector3D(x + size, y - size, z - size),
                    new Vector3D(x + size, y + size, z - size),
                    new Vector3D(x - size, y + size, z - size),
                    new Vector3D(x - size, y - size, z + size),
                    new Vector3D(x + size, y - size, z + size),
                    new Vector3D(x + size, y + size, z + size),
                    new Vector3D(x - size, y + size, z + size)];
                    
    this.faces = [[0, 1, 2, 3], // Front face
                    [0, 4, 5, 1], // Top face
                    [1, 5, 6, 2], // East Face
                    [3, 2, 6, 7], // Bottom face
                    [0, 3, 7, 4], // West Face
                    [4, 7, 6, 5]]; // Back face
}

Block.prototype.rotateX = function (radian) {
    for (let i = 0; i < this.vertices.length; i++) {
        let v = this.vertices[i];

        let y = (v.y - this.y) * Math.cos(radian) - (v.z - this.z) * Math.sin(radian);
        let z = (v.y - this.y) * Math.sin(radian) + (v.z - this.z) * Math.cos(radian);

        v.y = y + this.y;
        v.z = z + this.z;
    }
}

Block.prototype.rotateY = function (radian) {
    for (let i = 0; i < this.vertices.length; i++) {
        let v = this.vertices[i];

        let x = (v.x - this.x) * Math.cos(radian) + (v.z - this.z) * Math.sin(radian);
        let z = (v.z - this.z) * Math.cos(radian) - (v.x - this.x) * Math.sin(radian);

        v.x = x + this.x;
        v.z = z + this.z;
    }
}

Block.prototype.rotateZ = function (radian) {
    for (let i = 0; i < this.vertices.length; i++) {
        let v = this.vertices[i];

        let x = (v.x - this.x) * Math.cos(radian) - (v.y - this.y) * Math.sin(radian);
        let y = (v.x - this.x) * Math.sin(radian) + (v.y - this.y) * Math.cos(radian);

        v.x = x + this.x;
        v.y = y + this.y;
    }
}

export default Block;