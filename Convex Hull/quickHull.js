var solutionCharCode;

function quickHull(P) {
    solutionCharCode = 65; // String.fromCharCode(65) == "A"
    let solution = []

    P.sort((a, b) => (a.x > b.x) ? 1 : -1)

    let first = { ...P[0], name: String.fromCharCode(solutionCharCode++) }
    let last = { ...P[P.length - 1], name: String.fromCharCode(solutionCharCode++) }

    solution = [
        first,
        ..._quickHull(P, 0, P.length - 1),
        last,
        ..._quickHull(P, P.length - 1, 0)
    ]

    return solution
}

function _quickHull(P, i, n) {
    let ccwToLine = P.filter(p => ccw(P[i], P[n], p) > 0)
    if (ccwToLine.length == 0) return

    let farthestPoint = ccwToLine.reduce((prev, current) => {
        d0 = dist(P[i], P[n], prev)
        d1 = dist(P[i], P[n], current)
        return (d0 < d1) ? prev : current
    })

    let farthestPointInex = P.indexOf(farthestPoint)

    return [
        ...checkUndefined(_quickHull(P, i, farthestPointInex)),
        { ...farthestPoint, name: String.fromCharCode(solutionCharCode++) },
        ...checkUndefined(_quickHull(P, farthestPointInex, n))
    ]
}

function checkUndefined(input) {
    return input ? input : []
}