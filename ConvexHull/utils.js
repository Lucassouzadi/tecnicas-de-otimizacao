function formatDecimal(n, casas) {
    return n.toFixed(casas)
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
function dist(p1, p2, p) {
    return ((p2.x - p1.x) * (p1.y - p.y) - (p1.x - p.x) * (p2.y - p1.y)) / Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}
function ccw(p1, p2, p3) {
    // ccw > 0: counter-clockwise; ccw < 0: clockwise; ccw = 0: collinear
    return (p2.x - p1.x) * (p3.y - p1.y)
        - (p2.y - p1.y) * (p3.x - p1.x);
}
function polarAngle(p) {
    let angle;
    if (p.x == 0)
        angle = 0
    else
        angle = Math.atan(p.y / p.x) * 180 / Math.PI;
    if (angle < 0) {
        angle = 180 + angle
    }
    return angle;
}
function dotProduct(vec1, vec2) {
    return (vec1.x * vec2.x + vec1.y * vec2.y);
}
function norm(vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}
function computeAngle(v1, v2) {
    var ac = dotProduct(v1, v2);
    return Math.acos(ac / (norm(v1) * norm(v2))) * ONE_RADIAN;
}
