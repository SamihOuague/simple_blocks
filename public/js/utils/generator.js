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
            south: blocks.find((v) => v.z == block.z - 50 && v.x == block.x && v.y == block.y),
            north: blocks.find((v) => v.z == block.z + 50 && v.x == block.x && v.y == block.y),
            bottom: blocks.find((v) => v.x == block.x && v.y + 50 == block.y && v.z == block.z),
            top: blocks.find((v) => v.x == block.x && v.y - 50 == block.y && v.z == block.z),
            west: blocks.find((v) => v.x == block.x - 50 && v.y == block.y && v.z == block.z),
            east: blocks.find((v) => v.x == block.x + 50 && v.y == block.y && v.z == block.z)
        }
        n_blocks.push(block);
    }

    n_blocks = [...blocks.filter((v) => {
        return !((v.x >= b.x - 50 && v.y >= b.y - 50 && v.z >= b.z - 50)
                && (v.x <= b.x + 50 && v.y <= b.y + 50 && v.z <= b.z + 50));
    }), ...n_blocks]

    postMessage(n_blocks);
}

