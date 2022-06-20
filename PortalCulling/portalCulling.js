function portalCulling(scene, camera) {
    camera.frustum = []
    scene.portals.forEach(portal => portal.used = false)
    for (const objectId in scene.objects) scene.objects[objectId].visible = false

    const mainFrustum = camera.getMainFrustum(Number.MAX_SAFE_INTEGER)
    portalCulling_(scene, camera, camera.currentRoom, mainFrustum)
}

function portalCulling_(scene, camera, currentRoomId, fullFrustum) {
    const currentRoom = scene.rooms[currentRoomId]

    camera.frustum.push(trimFrustum(scene, camera, currentRoom, fullFrustum))

    currentRoom.objects.forEach(objectId => {
        const object = scene.objects[objectId];
        const center = { x: object.x, y: object.y }
        object.visible = object.visible || sphereInsideTriangle(fullFrustum[0], fullFrustum[2], fullFrustum[1], center, object.radius)
    })

    for (let i = 0; i < currentRoom.portals.length; i++) {
        const portal = currentRoom.portals[i];
        if (portal.used) continue

        let portalP1 = scene.vertices[portal.vertices[0]]
        let portalP2 = scene.vertices[portal.vertices[1]]

        let isP1Visible = pointInsideTriangle(fullFrustum[0], fullFrustum[2], fullFrustum[1], portalP1)
        let isP2Visible = pointInsideTriangle(fullFrustum[0], fullFrustum[2], fullFrustum[1], portalP2)
        let isEdge1CrossingPortal = doIntersect(fullFrustum[0], fullFrustum[1], portalP1, portalP2)
        let isEdge2CrossingPortal = doIntersect(fullFrustum[0], fullFrustum[2], portalP1, portalP2)

        let narrowedFrustum = [camera.position]

        if (portal.used = isP1Visible && isP2Visible) {
            narrowedFrustum.push(explodeVector(camera.position, currentRoomId == portal.room1 ? portalP1 : portalP2))
            narrowedFrustum.push(explodeVector(camera.position, currentRoomId == portal.room2 ? portalP1 : portalP2))
        }
        else if (portal.used = isEdge1CrossingPortal && isEdge2CrossingPortal) {
            narrowedFrustum.push(fullFrustum[1])
            narrowedFrustum.push(fullFrustum[2])
        }
        else if (portal.used = (isP1Visible || isP2Visible) && !(isP1Visible && isP2Visible)) {
            let visiblePortalPoint = isP1Visible ? portalP1 : portalP2
            if (portal.used = isEdge1CrossingPortal) {
                narrowedFrustum.push(fullFrustum[1])
                narrowedFrustum.push(explodeVector(camera.position, visiblePortalPoint))
            } else if (portal.used = isEdge2CrossingPortal) {
                narrowedFrustum.push(explodeVector(camera.position, visiblePortalPoint))
                narrowedFrustum.push(fullFrustum[2])
            }
        }
        if (portal.used) {
            portalCulling_(scene, camera, getNextRoom(currentRoomId, portal), narrowedFrustum)
        }
    }
}

function explodeVector(p1, p2) {
    return multiplyVector(normalize(subtractVectors(p2, p1)), Number.MAX_SAFE_INTEGER)
}

function getNextRoom(currentRoomId, portal) {
    if (portal.room1 == currentRoomId) return portal.room2
    if (portal.room2 == currentRoomId) return portal.room1
}

function trimFrustum(scene, camera, currentRoom, fullFrustum) {
    let roomFrustumEdge1, roomFrustumEdge2
    let visibleVertices = []

    for (let i = 0; i < currentRoom.vertices.length; i++) {
        const v0 = scene.vertices[currentRoom.vertices[i]];
        const v1 = scene.vertices[currentRoom.vertices[(i + 1) % currentRoom.vertices.length]];
        if (ccw(camera.position, v0, v1) > 0) continue;

        if (doIntersect(v0, v1, fullFrustum[0], fullFrustum[1]))
            roomFrustumEdge1 = lineLineIntersection(v0, v1, fullFrustum[0], fullFrustum[1])
        if (doIntersect(v0, v1, fullFrustum[0], fullFrustum[2]))
            roomFrustumEdge2 = lineLineIntersection(v0, v1, fullFrustum[0], fullFrustum[2])

        if (pointInsideTriangle(fullFrustum[0], fullFrustum[2], fullFrustum[1], v0))
            visibleVertices.push(v0)
    }

    // return [camera.position, roomFrustumEdge1, ...visibleVertices, roomFrustumEdge2]
    return quickHull([camera.position, roomFrustumEdge1, ...visibleVertices, roomFrustumEdge2])[0]
}
