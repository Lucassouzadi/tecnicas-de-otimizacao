function bruteForce(points) {
    let minDist = dist(points[0], points[1]);
    let closest = [points[0], points[1]];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let p = points[i], q = points[j];
            let d = dist(p, q); // distância euclidiana
            if (d < minDist) {
                minDist = d;
                closest[0] = p;
                closest[1] = q;
            }
        }
    }

    return closest;
}

function dist(p0, p1) {
    return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2))
}
