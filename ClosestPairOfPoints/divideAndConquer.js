// [0] = p0
// [1] = p1
// [2] = d
// [3] = execution time
// [4] = relational operations
// [5] = distance calculations
function closestPairOfPointsDivideAndConquer(unsortedPoints, startIndex, endIndex, bruteForceAdaptado) {
    if (!startIndex) { startIndex = 0; }
    if (!endIndex) { endIndex = unsortedPoints.length - 1; }

    let time = new Date().getTime();
    let sortedPoints = unsortedPoints.sort((a, b) => (a.x > b.x) ? 1 : -1)
    let minWidth = sortedPoints[startIndex].x;
    let maxWidth = sortedPoints[endIndex].x;

    let result = divideAndConquer(sortedPoints, startIndex, endIndex, minWidth, maxWidth, bruteForceAdaptado);

    time = new Date().getTime() - time;
    return [result[0], result[1], result[2], time, result[4], result[5]];
}

function divideAndConquer(P, i, n, s0, s1, bruteForceAdaptado) {
    let partitionSize = n - i + 1;
    if (partitionSize < 2) return [null, null, Infinity, 0, 1, 0];
    if (partitionSize == 2) return [P[i], P[n], dist(P[i], P[n]), 0, 2, 1];

    let comparisons = 2;

    let half = (s0 + s1) / 2;
    let m = 0;

    for (m = i; m + 1 <= n && P[m + 1].x < half; m++) { comparisons += 2; } comparisons++;

    let closestP1 = divideAndConquer(P, i, m, s0, half, bruteForceAdaptado);
    let closestP2 = divideAndConquer(P, m + 1, n, half, s1, bruteForceAdaptado);

    let closest = closestP1[2] < closestP2[2] ? closestP1 : closestP2; comparisons++;

    let P2Remainder, P3Remainder, closestP3;

    for (P2Remainder = 0; m - 1 - P2Remainder >= i && half - P[m - 1 - P2Remainder].x < closest[2]; P2Remainder++) { comparisons += 2; } comparisons++;
    for (P3Remainder = 0; m + 1 + P3Remainder <= n && P[m + 1 + P3Remainder].x - half < closest[2]; P3Remainder++) { comparisons += 2; } comparisons++;

    if (bruteForceAdaptado)
        closestP3 = bruteForceAdaptadoDD(P, m - P2Remainder, m, m + P3Remainder);
    else
        closestP3 = bruteForceMelhorado(P, m - P2Remainder, m + P3Remainder);

    closest = closestP3[2] < closest[2] ? closestP3 : closest; comparisons++;

    closest[4] = closestP1[4] + closestP2[4] + comparisons + closestP3[4];
    closest[5] = closestP1[5] + closestP2[5] + closestP3[5];
    return closest;
}


function divideAndConquer_withoutCounters(P, i, n, s0, s1, bruteForceAdaptado) {
    let partitionSize = n - i + 1;
    if (partitionSize < 2) return [null, null, Infinity];
    if (partitionSize == 2) return [P[i], P[n], dist(P[i], P[n])];

    let half = (s0 + s1) / 2;
    let m = 0;

    for (m = i; m + 1 <= n && P[m + 1].x < half; m++) { }

    let closestP1 = divideAndConquer(P, i, m, s0, half, bruteForceAdaptado);
    let closestP2 = divideAndConquer(P, m + 1, n, half, s1, bruteForceAdaptado);

    let closest = closestP1[2] < closestP2[2] ? closestP1 : closestP2;

    let P2Remainder, P3Remainder, closestP3;

    for (P2Remainder = 0; m - 1 - P2Remainder >= i && half - P[m - 1 - P2Remainder].x < closest[2]; P2Remainder++) { }
    for (P3Remainder = 0; m + 1 + P3Remainder <= n && P[m + 1 + P3Remainder].x - half < closest[2]; P3Remainder++) { }

    if (bruteForceAdaptado)
        closestP3 = bruteForceAdaptadoDD(P, m - P2Remainder, m, m + P3Remainder);
    else
        closestP3 = bruteForceMelhorado(P, m - P2Remainder, m + P3Remainder);

    closest = closestP3[2] < closest[2] ? closestP3 : closest;

    return closest;
}