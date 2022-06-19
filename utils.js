// return distance between the line p1_p2 and the points p0 and p1
function dist(p0, p1) {
    return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
}

// return distance between the line p1_p2 and the point p
function distLine(p0, p1, p) {
    return ((p1.x - p0.x) * (p0.y - p.y) - (p0.x - p.x) * (p1.y - p0.y)) / Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2))
}

function formatDecimal(n, decimalPlaces) {
    return n.toFixed(decimalPlaces)
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

// ccw > 0: counter-clockwise; ccw < 0: clockwise; ccw = 0: collinear
function ccw(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y)
        - (p2.y - p1.y) * (p3.x - p1.x);
}

function polarAngle(vec) {
    let angle;
    if (vec.x == 0)
        angle = 0
    else
        angle = Math.atan(vec.y / vec.x) * 180 / Math.PI;

    if (angle < 0)
        angle = 180 + angle

    return angle;
}

function isAngleConvex(p0, p1, p2) {
    let dx1 = p1.x - p0.x
    let dy1 = p1.y - p0.y
    let dx2 = p2.x - p1.x
    let dy2 = p2.y - p1.y
    let crossProductZ = dx1 * dy2 - dy1 * dx2
    return crossProductZ > 0.0;
}

function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
}


function pointInTriangle(p1, p2, p3, p) {
    const v1 = { x: p2.y - p1.y, y: -p2.x + p1.x }  //  left-orthogonal to p1-->p2
    const v2 = { x: p3.y - p2.y, y: -p3.x + p2.x }  //  left-orthogonal to p2-->p3
    const v3 = { x: p1.y - p3.y, y: -p1.x + p3.x }  //  left-orthogonal to p3-->p1
    const v1_ = { x: p.x - p1.x, y: p.y - p1.y }    //  p1-->p
    const v2_ = { x: p.x - p2.x, y: p.y - p2.y }    //  p2-->p
    const v3_ = { x: p.x - p3.x, y: p.y - p3.y }    //  p3-->p
    var dot1 = dot(v1, v1_)
    var dot2 = dot(v2, v2_)
    var dot3 = dot(v3, v3_)
    return 0 >= dot1 && 0 >= dot2 && 0 >= dot3
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function angleToNormalVector(ngle) {
    return { x: Math.cos(degToRad(ngle)), y: Math.sin(degToRad(ngle)) }
}

function sumVectors(v1, v2) {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y
    }
}

function subtractVectors(v1, v2) {
    return {
        x: v1.x - v2.x,
        y: v1.y - v2.y
    }
}

function mulVector(v, n) {
    return {
        x: v.x * n,
        y: v.y * n
    }
}