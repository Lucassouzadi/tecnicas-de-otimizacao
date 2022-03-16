function dist(p0, p1) {
    return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
}
var lalala = 0;
var lalala1 = 0;
var lalala2 = 0;
function closestDivideAndConquer(unorderedPoints) {
    let time = new Date().getTime();
    let orderedPoints = unorderedPoints.sort((a, b) => (a.x > b.x) ? 1 : -1)
    let length = orderedPoints.length;
    let minWidth = orderedPoints[0].x;
    let maxWidth = orderedPoints[length - 1].x;

    let result = divideAndConquer(orderedPoints, 0, length - 1, minWidth, maxWidth);

    time = new Date().getTime() - time;
    return [result[0], result[1], result[2], time, result[4]];
}

function divideAndConquer(P, i, n, s0, s1) {
    let partitionSize = n - i + 1;
    if (partitionSize < 2) return [null, null, Infinity, 0, 1];
    if (partitionSize == 2) return [P[i], P[n], dist(P[i], P[n]), 0, 2];

    let comparisons = 2;

    let half = (s0 + s1) / 2;
    let m = 0;
    for (m = i; P[m].x < half; m++) { comparisons++; }
    m--;

    let closestP1 = divideAndConquer(P, i, m, s0, half);
    let closestP2 = divideAndConquer(P, m + 1, n, half, s1);

    let closest = closestP1[2] < closestP2[2] ? closestP1 : closestP2; comparisons++;

    let P3 = [];
    for (let j = m; j >= i && half - P[j].x < closest[2]; j--) {
        P3[P3.length] = P[j]; comparisons++;
    }
    //P3 = P3.reverse();
    for (let j = m + 1; j <= n && P[j].x - half < closest[2]; j++) {
        P3[P3.length] = P[j]; comparisons++;
    }
    let closestP3 = bruteForceMelhorado(P3)

    closest = closestP3[2] < closest[2] ? closestP3 : closest; comparisons++;

    closest[4] = closestP1[4] + closestP2[4] + closestP3[4] + comparisons;
    return closest;
}