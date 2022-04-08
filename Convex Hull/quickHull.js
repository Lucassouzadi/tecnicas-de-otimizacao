var solutionCharCode;

function quickHull_OLD(P) {
    let solution = []

    let time = new Date().getTime()

    P.sort((a, b) => (a.x > b.x) ? 1 : -1)

    let A = { ...P[0], name: "A" }
    let B = { ...P[P.length - 1], name: "B" }
    solutionCharCode = 67; // String.fromCharCode(67) == "C"

    solution = [
        A,
        ..._quickHull_OLD(P, 0, P.length - 1),
        B,
        ..._quickHull_OLD(P, P.length - 1, 0)
    ]

    time = new Date().getTime() - time;
    return [solution, time]
}

function _quickHull_OLD(P, i, n) {
    let ccwToLine = P.filter(p => ccw(P[i], P[n], p) > 0)
    if (ccwToLine.length == 0) return []

    let farthestPoint = ccwToLine.reduce((prev, current) => {
        d0 = dist(P[i], P[n], prev)
        d1 = dist(P[i], P[n], current)
        return (d0 < d1) ? prev : current
    })

    let farthestPointIndex = P.indexOf(farthestPoint)
    farthestPoint = { ...farthestPoint, name: String.fromCharCode(solutionCharCode++) }

    return [
        ..._quickHull_OLD(P, i, farthestPointIndex),
        farthestPoint,
        ..._quickHull_OLD(P, farthestPointIndex, n)
    ]
}

function quickHull(P) {
    let solution = []

    let time = new Date().getTime()

    P.sort((a, b) => (a.x > b.x) ? 1 : -1)

    let A = { ...P[0], name: "A" }
    let B = { ...P[P.length - 1], name: "B" }
    solutionCharCode = 67; // String.fromCharCode(67) == "C"

    let upperHalf = [], bottomHalf = [];
    for (let i = 1; i < P.length - 1; i++) {
        const p = P[i];
        if (ccw(P[0], P[P.length - 1], p) > 0)
            bottomHalf.push(p)
        else
            upperHalf.push(p)
    }

    solution = [
        A,
        ..._quickHull(bottomHalf, A, B),
        B,
        ..._quickHull(upperHalf, B, A)
    ]

    time = new Date().getTime() - time;
    return [solution, time]
}

function _quickHull(ccwToLine, p0, p1) {

    if (ccwToLine.length == 0) return []
    let farthestPoint = ccwToLine.reduce((prev, current) => {
        d0 = dist(p0, p1, prev)
        d1 = dist(p0, p1, current)
        return (d0 < d1) ? prev : current
    })

    let leftEdge = [], rightEdge = [];
    for (let i = 0; i < ccwToLine.length; i++) {
        const p = ccwToLine[i];
        if (ccw(p0, farthestPoint, p) > 0)
            leftEdge.push(p)
        if (ccw(farthestPoint, p1, p) > 0)
            rightEdge.push(p)
    }

    farthestPoint = { ...farthestPoint, name: String.fromCharCode(solutionCharCode++) }

    return [
        ..._quickHull(leftEdge, p0, farthestPoint),
        farthestPoint,
        ..._quickHull(rightEdge, farthestPoint, p1)
    ]
}