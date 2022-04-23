class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(element, priority) {
        var entry = {
            element,
            priority
        };
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > entry.priority) {
                this.items.splice(i, 0, entry);
                return;
            }
        }
        this.items.push(entry); // se não se encaixou no meio da fila, coloca no fim
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length == 0;
    }
}

function aStar(graph, startKey, goalKey) {
    let startTime = new Date().getTime()

    let startNode = graph.vertices[startKey]
    let goalNode = graph.vertices[goalKey]

    if (startKey == goalKey || !startNode || !goalNode) return;

    const heuristic = (node) => {
        let dx = node.x - goalNode.x;
        let dy = node.y - goalNode.y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    let frontier = new PriorityQueue();
    frontier.enqueue(startNode, 0)
    let came_from = {}
    let cost_so_far = {}
    came_from[startKey] = null
    cost_so_far[startKey] = 0

    let next, new_cost
    while (!frontier.isEmpty()) {
        let current = frontier.dequeue().element

        if (current == goalNode)
            break

        let neighbourKeys = Object.keys(current.neighbours);
        for (let i = 0; i < neighbourKeys.length; i++) {
            let nextKey = neighbourKeys[i]
            next = graph.vertices[nextKey]
            costToNext = current.neighbours[nextKey]
            new_cost = cost_so_far[current.voronoiId] + costToNext
            if (!cost_so_far[nextKey] || new_cost < cost_so_far[next]) {
                cost_so_far[nextKey] = new_cost
                priority = new_cost + heuristic(next)
                frontier.enqueue(next, priority)
                came_from[nextKey] = current.voronoiId
            }
        }
    }

    let path = [goalKey];
    let distance = cost_so_far[goalKey];
    let parent = came_from[goalKey];
    while (parent != startKey) {
        path.push(parent);
        parent = came_from[parent];
    }
    path.push(startKey);
    path.reverse();

    return {
        path,
        distance,
        time: new Date().getTime() - startTime
    }
}
