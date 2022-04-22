var solutionCharCode;

// [0] = solution hull
// [1] = sorting time
// [2] = processing time
function quickHull(P) {
    let startTime = new Date().getTime()

    P.sort((a, b) => (a.x > b.x) ? 1 : -1)

    let sortingTime = new Date().getTime() - startTime
    startTime = new Date().getTime()

    let A = { ...P[0], name: "A" }
    let B = { ...P[P.length - 1], name: "B" }
    solutionCharCode = 67 // String.fromCharCode(67) == "C"

    let upperHalf = [], bottomHalf = []
    for (let i = 1; i < P.length - 1; i++) {
        const p = P[i]
        if (ccw(P[0], P[P.length - 1], p) > 0)
            bottomHalf.push(p)
        else
            upperHalf.push(p)
    }

    let solution = [
        A,
        ..._quickHull(bottomHalf, A, B),
        B,
        ..._quickHull(upperHalf, B, A)
    ]

    let processingTime = new Date().getTime() - startTime
    return [solution, sortingTime, processingTime]
}

function _quickHull(ccwToLine, p0, p1) {

    if (ccwToLine.length == 0) return []
    let farthestPoint = ccwToLine.reduce((prev, current) => {
        d0 = dist(p0, p1, prev)
        d1 = dist(p0, p1, current)
        return (d0 < d1) ? prev : current
    })

    let leftEdge = [], rightEdge = []
    for (let i = 0; i < ccwToLine.length; i++) {
        const p = ccwToLine[i]
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