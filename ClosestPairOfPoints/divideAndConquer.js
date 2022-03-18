// [0] = p0
// [1] = p1
// [2] = d
// [3] = execution time
// [4] = relational operations
// [5] = distance calculations
function closestDivideAndConquer(unsortedPoints, startIndex, endIndex, melhoria) {
    if (!startIndex) { startIndex = 0; }
    if (!endIndex) { endIndex = unsortedPoints.length - 1; }

    let time = new Date().getTime();
    let sortedPoints = unsortedPoints.sort((a, b) => (a.x > b.x) ? 1 : -1)
    let minWidth = sortedPoints[startIndex].x;
    let maxWidth = sortedPoints[endIndex].x;

    let result = divideAndConquer(sortedPoints, startIndex, endIndex, minWidth, maxWidth, melhoria);

    time = new Date().getTime() - time;
    return [result[0], result[1], result[2], time, result[4], result[5]];
}


function divideAndConquer(P, i, n, s0, s1, melhoria) {
    let partitionSize = n - i + 1;
    if (partitionSize < 2) return [null, null, Infinity, 0, 1, 0];
    if (partitionSize == 2) return [P[i], P[n], dist(P[i], P[n]), 0, 2, 1];

    let comparisons = 2;

    let half = (s0 + s1) / 2;
    let m = 0;
    for (m = i; P[m].x < half; m++) { comparisons++; } comparisons++;

    let closestP1 = divideAndConquer(P, i, m, s0, half, melhoria);
    let closestP2 = divideAndConquer(P, m + 1, n, half, s1, melhoria);

    let closest = closestP1[2] < closestP2[2] ? closestP1 : closestP2; comparisons++;

    let P3i, P3n, closestP3;
    for (P3i = m; P3i >= i && half - P[P3i].x < closest[2]; P3i--) { comparisons += 2; } P3i++; comparisons += 2;
    for (P3n = m + 1; P3n <= n && P[P3n].x - half < closest[2]; P3n++) { comparisons += 2; } P3n--; comparisons += 2;

    if (melhoria)
        closestP3 = divideAndConquer(P, P3i, P3n, P[P3i].x, P[P3n].x, melhoria); // Recursão infinita, ainda não pensei em como fazer funcionar
    else
        closestP3 = bruteForceMelhorado(P, P3i, P3n);

    closest = closestP3[2] < closest[2] ? closestP3 : closest; comparisons++;

    closest[4] = closestP1[4] + closestP2[4] + comparisons + closestP3[4];
    closest[5] = closestP1[5] + closestP2[5] + closestP3[5];
    return closest;
}
