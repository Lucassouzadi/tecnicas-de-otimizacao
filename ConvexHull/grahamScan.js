var solutionCharCode

function grahamScan(P) {
    let time = new Date().getTime()

    sortByAngle(P)

    let solution = []
    solution.push(0)
    solution.push(1)

    let p0 = 0, p1 = 1, p2 = 2

    while (p2 < P.length) {
        if (convex(P[p0], P[p1], P[p2])) {
            p0 = p1
            p1 = p2
            solution.push(p2++)
        } else {
            solution.pop()
            p1 = solution[solution.length - 1]
            p0 = solution[solution.length - 2]
        }
    }

    solutionCharCode = 65; // String.fromCharCode(65) == "A"
    for (let i = 0; i < solution.length; i++) solution[i] = { ...P[solution[i]], name: String.fromCharCode(solutionCharCode++) }

    time = new Date().getTime() - time
    return [solution, time]
}

function sortByAngle(P) {
    let bottomPoint = P.reduce((prev, current) => { return prev.y > current.y ? prev : current })
    for (let i = 0; i < P.length; i++) {
        P[i] = { ...P[i], angle: polarAngle({ x: P[i].x - bottomPoint.x, y: -(P[i].y - bottomPoint.y) }) }
    }
    P.sort((a, b) => (a.angle > b.angle) ? 1 : -1)
}

function convex(p0, p1, p2) {
    let dx1 = p1.x - p0.x
    let dy1 = p1.y - p0.y
    let dx2 = p2.x - p1.x
    let dy2 = p2.y - p1.y
    crossproduct_z = dx1 * dy2 - dy1 * dx2
    return crossproduct_z < 0;
}