function triangulationSetup(P) {

    let reflexive = [];
    let convex = [];
    let ear = [];

    let activePoints = Array(P.length).fill().map((_, idx) => idx)

    for (let i = 0; i < P.length; i++) {
        if (isConvex(P, activePoints, i))
            convex.push(i)
        else
            reflexive.push(i)
    }
    for (let i = 0; i < convex.length; i++) {
        if (isEar(P, activePoints, convex[i]))
            ear.push(convex[i])
    }
    return [convex, reflexive, ear, activePoints]
}

function triangulationStep(P, activePoints, convex, reflexive, ear, triangles) {

    if (activePoints.length <= 3) {
        if (activePoints.length == 3) {
            triangles.push([...activePoints])
            activePoints.splice(0, activePoints.length)
            convex.splice(0, convex.length)
            ear.splice(0, ear.length)
        }
        return
    }

    let p1 = ear[0];

    let indexOfP1 = activePoints.indexOf(p1);

    let p0 = activePoints[(indexOfP1 - 1 + activePoints.length) % activePoints.length];
    let p2 = activePoints[(indexOfP1 + 1) % activePoints.length];

    clippedTriangle = [p0, p1, p2]

    triangles.push(clippedTriangle)
    remove(activePoints, p1)
    remove(convex, p1)
    ear.shift()

    reEvaluatePoint(P, activePoints, convex, reflexive, ear, p0, true)
    reEvaluatePoint(P, activePoints, convex, reflexive, ear, p2, false)
}

function reEvaluatePoint(P, activePoints, convex, reflexive, ear, p, previous) {
    const addEar = () => previous ? ear.push(p) : ear.splice(0, 0, p)

    if (contains(ear, p)) remove(ear, p)

    if (contains(convex, p)) {
        if (isEar(P, activePoints, p)) addEar()
    } else {
        if (isConvex(P, activePoints, p)) {
            addOrdered(convex, p);
            remove(reflexive, p);
            if (isEar(P, activePoints, p)) addEar()
        }
    }
}

function isEar(P, active, p) {
    let indexOfP = active.indexOf(p)
    const p0 = active[(indexOfP - 1 + active.length) % active.length];
    const p1 = p;
    const p2 = active[(indexOfP + 1) % active.length];

    var isEar = true;
    for (let j = 0; isEar && j < active.length; j++) {
        let tested = active[j];
        if (tested == p0 || tested == p1 || tested == p2) continue;
        isEar = clockwise ? !pointInTriangle(P[p2], P[p1], P[p0], P[tested]) : !pointInTriangle(P[p0], P[p1], P[p2], P[tested])
    }
    return isEar;
}

function isConvex(P, active, p) {
    let indexOfP = active.indexOf(p)
    const p0 = active[(indexOfP - 1 + active.length) % active.length];
    const p1 = p;
    const p2 = active[(indexOfP + 1) % active.length];
    return clockwise ? isAngleConvex(P[p2], P[p1], P[p0]) : isAngleConvex(P[p0], P[p1], P[p2])
}

function addOrdered(array, elem) {
    for (let i = 0; i < array.length; i++) {
        if (elem <= array[i]) {
            array.splice(i, 0, elem)
            return array
        }
    }
    array.push(elem)
    return array
}

function remove(array, elem) {
    array.splice(array.indexOf(elem), 1)
}

function contains(array, elem) {
    return array.indexOf(elem) != -1;
}