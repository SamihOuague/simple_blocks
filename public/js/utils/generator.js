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
        addBlock(block);
    } else if (message.data.command === "update") {
        update_neighbours(blocks, block);
    } else if (message.data.command === "remove") {
        removeBlock(blocks, block);
    }
});

function removeBlock(blocks, block) {
    const { x, y, z } = block;
    let n_blocks = blocks.filter((v) => {
        return !(x == v.x && y == v.y && z == v.z);
    });

    postMessage({blocks: n_blocks, update: true});
}

function addBlock(block) {
    postMessage({block, update: true});
}

function update_neighbours(blocks, b) {
    let n_blocks = [];

    let bls = blocks.filter((v) => {
        return (v.x >= b.x - 50 && v.y >= b.y - 50 && v.z >= b.z - 50)
                && (v.x <= b.x + 50 && v.y <= b.y + 50 && v.z <= b.z + 50)
    });
  
    for (let i = 0; i < bls.length; i++) {
        let block = bls[i];
        block.neighbours = {
            south: bls.find((v) => v.z == block.z - 50 && v.x == block.x && v.y == block.y),
            north: bls.find((v) => v.z == block.z + 50 && v.x == block.x && v.y == block.y),
            bottom: bls.find((v) => v.x == block.x && v.y + 50 == block.y && v.z == block.z),
            top: bls.find((v) => v.x == block.x && v.y - 50 == block.y && v.z == block.z),
            west: bls.find((v) => v.x == block.x - 50 && v.y == block.y && v.z == block.z),
            east: bls.find((v) => v.x == block.x + 50 && v.y == block.y && v.z == block.z)
        }
        n_blocks.push(block);
    }

    n_blocks = [...blocks.filter((v) => {
        return !((v.x >= b.x - 50 && v.y >= b.y - 50 && v.z >= b.z - 50)
                && (v.x <= b.x + 50 && v.y <= b.y + 50 && v.z <= b.z + 50));
    }), ...n_blocks]

    postMessage(n_blocks);
}

