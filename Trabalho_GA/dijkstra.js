const shortestDistanceNode = (distances, visited) => {
    let shortest = null;

    for (let node in distances) {
        let currentIsShortest =
            shortest === null || distances[node] < distances[shortest];
        if (currentIsShortest && !visited.includes(node)) {
            shortest = node;
        }
    }
    return shortest;
};

const dijkstra = (graph, startNode, endNode) => {
    let startTime = new Date().getTime()

    let vertices = graph.vertices

    // establish object for recording distances from the start node
    let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, vertices[startNode].neighbours);


    // track paths
    let parents = { endNode: null };
    for (let child in vertices[startNode].neighbours) {
        parents[child] = startNode;
    }

    // track nodes that have already been visited
    let visited = [];

    // find the nearest node
    let node = shortestDistanceNode(distances, visited);

    // for that node
    while (node && node != endNode) {
        // find its distance from the start node & its child nodes
        let distance = distances[node];
        let children = vertices[node].neighbours;
        // for each of those child nodes
        for (let child in children) {
            // make sure each child node is not the start node
            if (String(child) === String(startNode)) {
                continue;
            } else {
                // save the distance from the start node to the child node
                let newdistance = distance + children[child];
                // if there's no recorded distance from the start node to the child node in the distances object
                // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
                // save the distance to the object
                // record the path
                if (!distances[child] || distances[child] > newdistance) {
                    distances[child] = newdistance;
                    parents[child] = node;
                }
            }
        }
        // move the node to the visited set
        visited.push(node);
        // move to the nearest neighbour node
        node = shortestDistanceNode(distances, visited);
    }

    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse();

    // return the shortest path from start node to end node & its distance
    let results = {
        distance: distances[endNode],
        path: shortestPath,
        time: new Date().getTime() - startTime
    };

    return results;
};