// [0] = p0
// [1] = p1
// [2] = d
// [3] = execution time
// [4] = relational operations
// [5] = distance calculations
function bruteForce(points) {
    let length = points.length;

    if (length < 2) return [null, null, Infinity, 0, 1, 0];
    if (length == 2) return [points[0], points[1], dist(points[0], points[1]), 0, 2, 1];

    let minDist = Infinity;
    let closest = [points[0], points[1]];
    let time = new Date().getTime();
    let comparisons = 2;
    let calculated = 0;

    for (let i = 0; i < length; i++) {
        comparisons++;
        for (let j = 0; j < length; j++) {
            comparisons += 2;
            if (i == j) continue;
            let p = points[i], q = points[j];
            let d = dist(p, q); calculated++;
            if (d < minDist) {
                comparisons++;
                minDist = d;
                closest[0] = p;
                closest[1] = q;
            }
        } comparisons++;

    } comparisons++;

    time = new Date().getTime() - time;
    return [closest[0], closest[1], minDist, time, comparisons, calculated];
}

function bruteForceMelhorado(points, startIndex, endIndex) {
    if (!startIndex) { startIndex = 0; }
    if (!endIndex) { endIndex = points.length - 1; }
    let length = endIndex - startIndex + 1;

    if (length < 2) return [null, null, Infinity, 0, 1, 0];
    if (length == 2) return [points[startIndex], points[startIndex + 1], dist(points[startIndex], points[startIndex + 1]), 0, 2, 1];

    let minDist = Infinity;
    let closest = [points[startIndex], points[startIndex + 1]];
    let time = new Date().getTime();
    let comparisons = 2;
    let calculated = 0;

    for (let i = startIndex; i <= endIndex; i++) {
        comparisons++;
        for (let j = i + 1; j <= endIndex; j++) {
            comparisons++;
            let p = points[i], q = points[j];
            let d = dist(p, q); calculated++;
            if (d < minDist) {
                comparisons++;
                minDist = d;
                closest[0] = p;
                closest[1] = q;
            }
        } comparisons++;
    } comparisons++;

    time = new Date().getTime() - time;
    return [closest[0], closest[1], minDist, time, comparisons, calculated];
}

