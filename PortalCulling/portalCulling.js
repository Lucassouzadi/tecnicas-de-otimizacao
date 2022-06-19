function portalCulling(scene, camera) {
    camera.frustum = []
    scene.portals.forEach(portal => portal.used = false)
    for (const objectId in scene.objects)
        scene.objects[objectId].visible = false

    const mainFrustum = camera.getMainFrustum(Number.MAX_SAFE_INTEGER)



    portalCulling_(scene, camera, camera.currentRoom, mainFrustum)
}

function portalCulling_(scene, camera, currentRoomId, fullFrustum) {

    camera.frustum.push(trimFrustum(scene, camera, currentRoomId, fullFrustum))

    const currentRoom = scene.rooms[currentRoomId]
    for (let i = 0; i < currentRoom.portals.length; i++) {
        const portal = currentRoom.portals[i];
        if (portal.used) continue

        let portalP1 = scene.vertices[portal.vertices[0]]
        let portalP2 = scene.vertices[portal.vertices[1]]
        let isP1Visible = pointInTriangle(fullFrustum[0], fullFrustum[2], fullFrustum[1], portalP1)
        let isP2Visible = pointInTriangle(fullFrustum[0], fullFrustum[2], fullFrustum[1], portalP2)
        let isEdge1CrossingPortal = doIntersect(fullFrustum[0], fullFrustum[1], portalP1, portalP2)
        let isEdge2CrossingPortal = doIntersect(fullFrustum[0], fullFrustum[2], portalP1, portalP2)

        let narrowedFrustum = [camera.position]

        if (isP1Visible && isP2Visible) {
            narrowedFrustum.push(explodeVector(camera.position, currentRoomId == portal.room1 ? portalP1 : portalP2))
            narrowedFrustum.push(explodeVector(camera.position, currentRoomId == portal.room2 ? portalP1 : portalP2))
            portal.used = true
            portalCulling_(scene, camera, getOtherRoom(currentRoomId, portal), narrowedFrustum)
            continue
        }
        if (isEdge1CrossingPortal && isEdge2CrossingPortal) {
            narrowedFrustum.push(fullFrustum[1])
            narrowedFrustum.push(fullFrustum[2])
            portal.used = true
            portalCulling_(scene, camera, getOtherRoom(currentRoomId, portal), narrowedFrustum)
            continue
        }
        if ((isP1Visible || isP2Visible) && !(isP1Visible && isP2Visible)) {
            let visiblePortalPoint = isP1Visible ? portalP1 : portalP2
            if (isEdge1CrossingPortal) {
                narrowedFrustum.push(fullFrustum[1])
                narrowedFrustum.push(explodeVector(camera.position, visiblePortalPoint))
                portal.used = true
                portalCulling_(scene, camera, getOtherRoom(currentRoomId, portal), narrowedFrustum)
            } else if (isEdge2CrossingPortal) {
                narrowedFrustum.push(explodeVector(camera.position, visiblePortalPoint))
                narrowedFrustum.push(fullFrustum[2])
                portal.used = true
                portalCulling_(scene, camera, getOtherRoom(currentRoomId, portal), narrowedFrustum)
            }

        }
    };
}

function explodeVector(p1, p2) {
    return mulVector(normalize(subtractVectors(p2, p1)), Number.MAX_SAFE_INTEGER)
}

function getOtherRoom(currentRoomId, portal) {
    if (portal.room1 == currentRoomId) return portal.room2
    if (portal.room2 == currentRoomId) return portal.room1
}

function trimFrustum(scene, camera, currentRoomId, fullFrustum) {
    let roomFrustumEdge1, roomFrustumEdge2
    let visibleVertices = []

    let currentRoom = scene.rooms[currentRoomId]

    for (let i = 0; i < currentRoom.vertices.length; i++) {
        const v0 = scene.vertices[currentRoom.vertices[i]];
        const v1 = scene.vertices[currentRoom.vertices[(i + 1) % currentRoom.vertices.length]];
        if (ccw(camera.position, v0, v1) > 0) continue;

        if (doIntersect(v0, v1, fullFrustum[0], fullFrustum[1]))
            roomFrustumEdge1 = lineLineIntersection(v0, v1, fullFrustum[0], fullFrustum[1])
        if (doIntersect(v0, v1, fullFrustum[0], fullFrustum[2]))
            roomFrustumEdge2 = lineLineIntersection(v0, v1, fullFrustum[0], fullFrustum[2])

        if (pointInTriangle(fullFrustum[0], fullFrustum[2], fullFrustum[1], v0))
            visibleVertices.push(v0)
    }

    // return [camera.position, roomFrustumEdge1, ...visibleVertices, roomFrustumEdge2]
    return quickHull([camera.position, roomFrustumEdge1, ...visibleVertices, roomFrustumEdge2])[0]
}




function lineLineIntersection(A, B, C, D) {
    // Line AB represented as a1x + b1y = c1
    let a1 = B.y - A.y;
    let b1 = A.x - B.x;
    let c1 = a1 * (A.x) + b1 * (A.y);

    // Line CD represented as a2x + b2y = c2
    let a2 = D.y - C.y;
    let b2 = C.x - D.x;
    let c2 = a2 * (C.x) + b2 * (C.y);

    let determinant = a1 * b2 - a2 * b1;

    if (determinant == 0) {
        return "paralell"
    }
    else {
        let x = (b2 * c1 - b1 * c2) / determinant;
        let y = (a1 * c2 - a2 * c1) / determinant;
        return { x, y };
    }
}


// Given three collinear points p, q, r, the function checks if
// point q lies on line segment 'pr'
function onSegment(p, q, r) {
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
        return true;

    return false;
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation_(p, q, r) {

    // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
    // for details of below formula.
    let val = (q.y - p.y) * (r.x - q.x) -
        (q.x - p.x) * (r.y - q.y);

    if (val == 0) return 0; // collinear

    return (val > 0) ? 1 : 2; // clock or counterclock wise
}

function doIntersect(p1, p2, p3, p4) {
    let o1 = orientation_(p1, p2, p3);
    let o2 = orientation_(p1, p2, p4);
    let o3 = orientation_(p3, p4, p1);
    let o4 = orientation_(p3, p4, p2);

    return o1 != o2 && o3 != o4

}