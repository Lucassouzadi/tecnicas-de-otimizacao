
function getRoomCenter(scene, roomId) {
    const room = scene.rooms[roomId];
    const firstVertex = scene.vertices[room.vertices[0]];
    let lowestX = firstVertex.x,
        lowestY = firstVertex.y,
        highestX = firstVertex.x,
        highestY = firstVertex.y;
    for (let i = 0; i < room.vertices.length; i++) {
        const vertex = scene.vertices[room.vertices[i]];
        lowestX = vertex.x < lowestX ? vertex.x : lowestX
        lowestY = vertex.y < lowestY ? vertex.y : lowestY
        highestX = vertex.x > highestX ? vertex.x : highestX
        highestY = vertex.y > highestY ? vertex.y : highestY
    }
    return {
        x: (lowestX + highestX) / 2.0,
        y: (lowestY + highestY) / 2.0
    }
}

let portalAB = { room1: "A", room2: "B", vertices: [2, 3] }
let portalAC = { room1: "A", room2: "C", vertices: [4, 5] }
let portalBD = { room1: "B", room2: "D", vertices: [10, 11] }
let portalCE = { room1: "C", room2: "E", vertices: [14, 15] }
let portalDE = { room1: "D", room2: "E", vertices: [18, 19] }

let objects = {
    "a": { x: 50, y: 420, radius: 20 },
    "b": { x: 100, y: 100, radius: 25 },
    "c": { x: 250, y: 480, radius: 15 },
    "d": { x: 300, y: 430, radius: 25 },
    "e": { x: 450, y: 320, radius: 25 },
    "f": { x: 680, y: 430, radius: 25 },
    "g": { x: 270, y: 40, radius: 15 },
    "h": { x: 420, y: 160, radius: 30 },
    "i": { x: 460, y: 230, radius: 15 },
    "j": { x: 620, y: 50, radius: 25 },
    "k": { x: 760, y: 110, radius: 15 },
    "l": { x: 680, y: 260, radius: 30 }
}

var presetScene = {
    vertices: [
        { x: 0, y: 500 },   // 0
        { x: 200, y: 500 }, // 1
        { x: 200, y: 400 }, // 2
        { x: 200, y: 320 }, // 3
        { x: 200, y: 240 }, // 4
        { x: 200, y: 100 }, // 5
        { x: 200, y: 0 },   // 6
        { x: 0, y: 0 },     // 7
        { x: 800, y: 500 }, // 8
        { x: 800, y: 270 }, // 9
        { x: 770, y: 270 }, // 10
        { x: 630, y: 270 }, // 11
        { x: 200, y: 270 }, // 12
        { x: 530, y: 270 }, // 13
        { x: 530, y: 120 }, // 14
        { x: 530, y: 30 },  // 15
        { x: 530, y: 0 },   // 16
        { x: 800, y: 140 }, // 17
        { x: 760, y: 140 }, // 18
        { x: 690, y: 140 }, // 19
        { x: 530, y: 140 }, // 20
        { x: 800, y: 0 }    // 21
    ],
    rooms: {
        "A": {
            color: "#0C9905",
            vertices: [0, 1, 2, 3, 4, 5, 6, 7],
            openings: [3, 5],
            portals: [portalAB, portalAC],
            objects: ["a", "b"]
        },
        "B": {
            color: "#336699",
            vertices: [1, 8, 9, 10, 11, 12, 3, 2],
            openings: [11, 2],
            portals: [portalAB, portalBD],
            objects: ["c", "d", "e", "f", "l"]
        },
        "C": {
            color: "#99CCFF",
            vertices: [12, 13, 14, 15, 16, 6, 5, 4],
            openings: [15, 4],
            portals: [portalAC, portalCE],
            objects: ["g", "h", "i"]
        },
        "D": {
            color: "#FF0B0B",
            vertices: [13, 11, 10, 9, 17, 18, 19, 20],
            openings: [10, 19],
            portals: [portalBD, portalDE],
            objects: ["j", "k"]
        },
        "E": {
            color: "#CF8831",
            vertices: [20, 19, 18, 17, 21, 16, 15, 14],
            openings: [18, 14],
            portals: [portalCE, portalDE],
            objects: ["l"]
        }
    },
    portals: [
        portalAB,
        portalAC,
        portalBD,
        portalCE,
        portalDE
    ],
    objects
}