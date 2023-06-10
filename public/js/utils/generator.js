const Vector3D = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}


class Block {
    constructor(x, y, z, size = 50) {
        Vector3D.call(this, x, y, z);
        this.color = "#005f00";

        this.vertices = [new Vector3D(x, y, z),
        new Vector3D(x + size, y, z),
        new Vector3D(x + size, y + size, z),
        new Vector3D(x, y + size, z),
        new Vector3D(x, y, z + size),
        new Vector3D(x + size, y, z + size),
        new Vector3D(x + size, y + size, z + size),
        new Vector3D(x, y + size, z + size)];

        this.faces = [[0, 1, 2, 3], // South face
        [0, 4, 5, 1], // Top face
        [1, 5, 6, 2], // East Face
        [3, 2, 6, 7], // Bottom face
        [0, 3, 7, 4], // West Face
        [4, 7, 6, 5]]; // North face

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

addEventListener("message", (message) => {
    let { blocks, block } = message.data;
    
    if (message.data.command === "add") {
        addBlock(block, blocks);
    } else if (message.data.command === "remove") {
        removeBlock(blocks, block);
    } else if (message.data.command == "update") {
        update_neighbours(blocks);
    }
});

function removeBlock(blocks, block) {
    const { x, y, z } = block;
    let n_blocks = blocks.filter((v) => {
        return !(x == v.x && y == v.y && z == v.z);
    });

    postMessage({blocks: n_blocks, update: true});
}

function addBlock(block, blocks) {
    const { x, y, z, color } = block;
    let n_b = new Block(x, y, z);
    n_b.color = color;

    postMessage(n_b);
}

function update_neighbours(blocks) {
    let n_blocks = [];
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        block.neighbours = {
            south: blocks.find((v) => v.z == block.z - 50 && v.x == block.x && v.y == block.y && v !== block),
            north: blocks.find((v) => v.z == block.z + 50 && v.x == block.x && v.y == block.y && v !== block),
            bottom: blocks.find((v) => v.x == block.x && v.y + 50 == block.y && v.z == block.z && v !== block),
            top: blocks.find((v) => v.x == block.x && v.y - 50 == block.y && v.z == block.z && v !== block),
            west: blocks.find((v) => v.x == block.x - 50 && v.y == block.y && v.z == block.z && v !== block),
            east: blocks.find((v) => v.x == block.x + 50 && v.y == block.y && v.z == block.z && v !== block)
        }
        n_blocks.push(block);
    }
    postMessage(n_blocks);
}

