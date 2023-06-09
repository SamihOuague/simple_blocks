import { Vector3D } from "./Vector";


class Block {
    constructor(x, y, z, size = 50) {
        Vector3D.call(this, x, y, z);
        this.color = "#005f00";

        this.vertices = [new Vector3D(x, y, z),
            new Vector3D(x + size, y, z),
            new Vector3D(x + size, y + size, z),
            new Vector3D(x, y + size, z),
            new Vector3D(x, y , z + size),
            new Vector3D(x + size, y , z + size),
            new Vector3D(x + size, y + size, z + size),
            new Vector3D(x , y + size, z + size)];
            
        this.faces = [[0, 1, 2, 3], // North face
                [0, 4, 5, 1], // Top face
                [1, 5, 6, 2], // East Face
                [3, 2, 6, 7], // Bottom face
                [0, 3, 7, 4], // West Face
                [4, 7, 6, 5]]; // South face

        this.neighbours = {
            top: false,
            bottom: false,
            east: false,
            west: false,
            north: false,
            south: false,
        }
    }   
}

export default Block;