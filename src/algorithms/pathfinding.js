// Grid node class
class Node {
    constructor(row, col) {
        this.row = row
        this.col = col
        this.isWall = false
        this.isStart = false
        this.isEnd = false
        this.distance = Infinity
        this.heuristic = 0
        this.totalCost = Infinity
        this.parent = null
        this.isVisited = false
    }
}

// Create grid
export function createGrid(rows, cols) {
    const grid = []
    for (let row = 0; row < rows; row++) {
        const currentRow = []
        for (let col = 0; col < cols; col++) {
            currentRow.push(new Node(row, col))
        }
        grid.push(currentRow)
    }
    return grid
}

// Get neighbors
function getNeighbors(node, grid) {
    const neighbors = []
    const { row, col } = node
    const rows = grid.length
    const cols = grid[0].length

    if (row > 0) neighbors.push(grid[row - 1][col]) // Up
    if (row < rows - 1) neighbors.push(grid[row + 1][col]) // Down
    if (col > 0) neighbors.push(grid[row][col - 1]) // Left
    if (col < cols - 1) neighbors.push(grid[row][col + 1]) // Right

    return neighbors.filter(neighbor => !neighbor.isWall)
}

// Manhattan distance heuristic
function manhattanDistance(nodeA, nodeB) {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col)
}

// Dijkstra's Algorithm
export function* dijkstra(grid, startNode, endNode) {
    const visitedNodes = []
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid)

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()

        if (closestNode.isWall) continue
        if (closestNode.distance === Infinity) break

        closestNode.isVisited = true
        visitedNodes.push(closestNode)

        yield {
            visitedNodes: [...visitedNodes],
            currentNode: closestNode
        }

        if (closestNode === endNode) {
            const path = getPath(endNode)
            yield {
                visitedNodes: [...visitedNodes],
                path,
                completed: true
            }
            return
        }

        const neighbors = getNeighbors(closestNode, grid)
        for (const neighbor of neighbors) {
            const distance = closestNode.distance + 1
            if (distance < neighbor.distance) {
                neighbor.distance = distance
                neighbor.parent = closestNode
            }
        }
    }

    yield { visitedNodes: [...visitedNodes], completed: true }
}

// A* Algorithm
export function* aStar(grid, startNode, endNode) {
    const visitedNodes = []
    const openSet = [startNode]
    startNode.distance = 0
    startNode.heuristic = manhattanDistance(startNode, endNode)
    startNode.totalCost = startNode.heuristic

    while (openSet.length > 0) {
        sortNodesByTotalCost(openSet)
        const currentNode = openSet.shift()

        if (currentNode.isWall) continue
        if (currentNode.isVisited) continue

        currentNode.isVisited = true
        visitedNodes.push(currentNode)

        yield {
            visitedNodes: [...visitedNodes],
            currentNode,
            openSet: [...openSet]
        }

        if (currentNode === endNode) {
            const path = getPath(endNode)
            yield {
                visitedNodes: [...visitedNodes],
                path,
                completed: true
            }
            return
        }

        const neighbors = getNeighbors(currentNode, grid)
        for (const neighbor of neighbors) {
            if (neighbor.isVisited) continue

            const tentativeDistance = currentNode.distance + 1

            if (tentativeDistance < neighbor.distance) {
                neighbor.distance = tentativeDistance
                neighbor.heuristic = manhattanDistance(neighbor, endNode)
                neighbor.totalCost = neighbor.distance + neighbor.heuristic
                neighbor.parent = currentNode

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor)
                }
            }
        }
    }

    yield { visitedNodes: [...visitedNodes], completed: true }
}

// BFS (Breadth-First Search)
export function* bfs(grid, startNode, endNode) {
    const visitedNodes = []
    const queue = [startNode]
    startNode.isVisited = true

    while (queue.length > 0) {
        const currentNode = queue.shift()

        if (currentNode.isWall) continue

        visitedNodes.push(currentNode)

        yield {
            visitedNodes: [...visitedNodes],
            currentNode
        }

        if (currentNode === endNode) {
            const path = getPath(endNode)
            yield {
                visitedNodes: [...visitedNodes],
                path,
                completed: true
            }
            return
        }

        const neighbors = getNeighbors(currentNode, grid)
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.isVisited = true
                neighbor.parent = currentNode
                queue.push(neighbor)
            }
        }
    }

    yield { visitedNodes: [...visitedNodes], completed: true }
}

// DFS (Depth-First Search)
export function* dfs(grid, startNode, endNode) {
    const visitedNodes = []
    const stack = [startNode]

    while (stack.length > 0) {
        const currentNode = stack.pop()

        if (currentNode.isWall) continue
        if (currentNode.isVisited) continue

        currentNode.isVisited = true
        visitedNodes.push(currentNode)

        yield {
            visitedNodes: [...visitedNodes],
            currentNode
        }

        if (currentNode === endNode) {
            const path = getPath(endNode)
            yield {
                visitedNodes: [...visitedNodes],
                path,
                completed: true
            }
            return
        }

        const neighbors = getNeighbors(currentNode, grid)
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.parent = currentNode
                stack.push(neighbor)
            }
        }
    }

    yield { visitedNodes: [...visitedNodes], completed: true }
}

// Helper functions
function getAllNodes(grid) {
    const nodes = []
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
    return nodes
}

function sortNodesByDistance(nodes) {
    nodes.sort((a, b) => a.distance - b.distance)
}

function sortNodesByTotalCost(nodes) {
    nodes.sort((a, b) => a.totalCost - b.totalCost)
}

function getPath(endNode) {
    const path = []
    let currentNode = endNode
    while (currentNode !== null) {
        path.unshift(currentNode)
        currentNode = currentNode.parent
    }
    return path
}

// Algorithm metadata
export const pathfindingAlgorithms = {
    dijkstra: {
        name: "Dijkstra's Algorithm",
        function: dijkstra,
        description: 'Guarantees the shortest path by exploring nodes in order of their distance from the start.',
        weighted: true,
        guaranteesPath: true
    },
    astar: {
        name: 'A* Algorithm',
        function: aStar,
        description: 'Uses heuristics to find the shortest path more efficiently than Dijkstra.',
        weighted: true,
        guaranteesPath: true
    },
    bfs: {
        name: 'Breadth-First Search',
        function: bfs,
        description: 'Explores nodes level by level, guarantees shortest path in unweighted graphs.',
        weighted: false,
        guaranteesPath: true
    },
    dfs: {
        name: 'Depth-First Search',
        function: dfs,
        description: 'Explores as far as possible along each branch before backtracking.',
        weighted: false,
        guaranteesPath: false
    }
}
