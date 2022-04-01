function formatDecimal(n) {
    return n.toFixed(20).match(/^-?\d*\.?0*\d{0,3}/)[0]
}

function normalize(vec) {
    const length = Math.hypot(vec.x, vec.y);
    return { x: vec.x / length, y: vec.y / length }
}
function normalizeArray(array) {
    let normalized = []
    for (let i = 0; i < array.length; i++) {
        normalized[i] = normalize(array[i])
    }
    return normalized
}

function normalizePositively(vec) {
    const length = Math.hypot(vec.x, vec.y);
    return { x: (1 + vec.x / length) / 2, y: (1 + vec.y / length) / 2 }
}
function normalizeArrayPositively(array) {
    let normalizedPositively = []
    let length = 0;
    for (let i = 0; i < array.length; i++) {
        length = Math.max(length, Math.hypot(array[i].x, array[i].y));
    }
    for (let i = 0; i < array.length; i++) {
        normalizedPositively[i] = { x: (1 + array[i].x / length) / 2, y: (1 + array[i].y / length) / 2 }
    }
    return normalizedPositively
}

function ccw(p1, p2, p) {
    // ccw > 0: counter-clockwise; ccw < 0: clockwise; ccw = 0: collinear
    return (p2.x - p1.x) * (p.y - p1.y)
        - (p2.y - p1.y) * (p.x - p1.x);
}

function dist(p1, p2, p) {
    return ((p2.x - p1.x) * (p1.y - p.y) - (p1.x - p.x) * (p2.y - p1.y)) / Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}    