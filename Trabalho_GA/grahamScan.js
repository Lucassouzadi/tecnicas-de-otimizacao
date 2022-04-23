var solutionCharCode

// [0] = solution hull
// [1] = sorting time
// [2] = processing time
function grahamScan(P) {
    let startTime = new Date().getTime()

    sortByAngle(P)

    let sortingTime = new Date().getTime() - startTime
    startTime = new Date().getTime()

    let solution = []
    solution.push(0)
    solution.push(1)

    let p0 = 0, p1 = 1, p2 = 2

    while (p2 < P.length) {
        if (isAngleConvex(P[p0], P[p1], P[p2])) {
            p0 = p1
            p1 = p2
            solution.push(p2++)
        } else {
            solution.pop()
            p1 = solution[solution.length - 1]
            p0 = solution[solution.length - 2]
        }
    }

    solutionCharCode = 65 // String.fromCharCode(65) == "A"
    for (let i = 0; i < solution.length; i++) solution[i] = { ...P[solution[i]], name: String.fromCharCode(solutionCharCode++) }

    let processingTime = new Date().getTime() - startTime
    return [solution, sortingTime, processingTime]
}

function sortByAngle(P) {
    let bottomPoint = P.reduce((prev, current) => { return prev.y > current.y ? prev : current })
    for (let i = 0; i < P.length; i++) {
        P[i] = {
            ...P[i],
            angle: polarAngle({ x: P[i].x - bottomPoint.x, y: -(P[i].y - bottomPoint.y) })
        }
    }
    P.sort((a, b) => (a.angle > b.angle) ? 1 : -1)
}
