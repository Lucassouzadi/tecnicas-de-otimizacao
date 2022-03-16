function dist(p0, p1) {
    return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2))
}

function bruteForce(points) {
    if (points.length < 2) return [null, null, Infinity, 0, 1];
    if (points.length == 2) return [points[0], points[1], dist(points[0], points[1]), 0, 1];

    let minDist = dist(points[0], points[1]);
    let closest = [points[0], points[1]];
    let time = new Date().getTime();
    let comparisons = 0;

    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i == j) continue;
            let p = points[i], q = points[j];
            let d = dist(p, q); comparisons++;
            if (d < minDist) {
                minDist = d;
                closest[0] = p;
                closest[1] = q;
            }
        }
    }

    time = new Date().getTime() - time;
    return [closest[0], closest[1], minDist, time, comparisons];
}

function bruteForceMelhorado(points) {
    if (points.length < 2) return [null, null, Infinity, 0, 1];
    if (points.length == 2) return [points[0], points[1], dist(points[0], points[1]), 0, 1];

    let minDist = dist(points[0], points[1]);
    let closest = [points[0], points[1]];
    let time = new Date().getTime();
    let comparisons = 0;

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let p = points[i], q = points[j];
            let d = dist(p, q); comparisons++;
            if (d < minDist) {
                minDist = d;
                closest[0] = p;
                closest[1] = q;
            }
        }
    }

    time = new Date().getTime() - time;
    return [closest[0], closest[1], minDist, time, comparisons];
}
