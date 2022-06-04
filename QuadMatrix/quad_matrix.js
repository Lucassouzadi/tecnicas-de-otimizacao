function generateQuadTree(depth) {
    depth--
    return {
        id: "0",
        nw: generateQuadTree_("1", depth),
        ne: generateQuadTree_("2", depth),
        sw: generateQuadTree_("3", depth),
        se: generateQuadTree_("4", depth)
    }
}

function generateQuadTree_(id, depth) {
    depth--
    if (depth <= 0)
        return { id }
    else
        return {
            id,
            nw: generateQuadTree_(id + ".1", depth),
            ne: generateQuadTree_(id + ".2", depth),
            sw: generateQuadTree_(id + ".3", depth),
            se: generateQuadTree_(id + ".4", depth)
        }
}



function quadtreeToMatrix(tree, callback) {
    const depth = getDepth(tree)
    const length = Math.pow(2, depth - 1)
    const matrix = new Array(length)
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(length);
    }

    quadtreeToMatrix_(tree, matrix, 0, 0, length, 1, callback)

    return matrix
}

function quadtreeToMatrix_(tree, matrix, currentRow, currentColumn, length, depth, callback) {
    callback(tree.id, currentRow, currentColumn, length, depth)
    if (tree.nw == null) {
        matrix[currentRow][currentColumn] = tree.id
        return
    }
    const step = length / 2;
    depth++
    quadtreeToMatrix_(tree.nw, matrix, currentRow, currentColumn, step, depth, callback)
    quadtreeToMatrix_(tree.ne, matrix, currentRow, currentColumn + step, step, depth, callback)
    quadtreeToMatrix_(tree.sw, matrix, currentRow + step, currentColumn, step, depth, callback)
    quadtreeToMatrix_(tree.se, matrix, currentRow + step, currentColumn + step, step, depth, callback)
}

function getDepth(tree) {
    let temp = tree
    let depth = 0
    while (temp != null) {
        depth++;
        temp = temp.nw
    }
    return depth
}
