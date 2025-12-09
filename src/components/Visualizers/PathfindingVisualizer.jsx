import { useState, useEffect, useRef } from 'react'
import { createGrid, pathfindingAlgorithms } from '../../algorithms/pathfinding'
import './PathfindingVisualizer.css'

const GRID_ROWS = 25
const GRID_COLS = 50

function PathfindingVisualizer() {
    const [grid, setGrid] = useState([])
    const [algorithm, setAlgorithm] = useState('dijkstra')
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(20)
    const [startNode, setStartNode] = useState({ row: 12, col: 10 })
    const [endNode, setEndNode] = useState({ row: 12, col: 40 })
    const [isDrawing, setIsDrawing] = useState(false)
    const [visitedNodes, setVisitedNodes] = useState([])
    const [path, setPath] = useState([])

    const generatorRef = useRef(null)
    const animationRef = useRef(null)

    // Initialize grid
    useEffect(() => {
        resetGrid()
    }, [])

    const resetGrid = () => {
        const newGrid = createGrid(GRID_ROWS, GRID_COLS)
        newGrid[startNode.row][startNode.col].isStart = true
        newGrid[endNode.row][endNode.col].isEnd = true
        setGrid(newGrid)
        setVisitedNodes([])
        setPath([])
        setIsPlaying(false)
        generatorRef.current = null
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }
    }

    // Animation loop
    const animate = () => {
        if (!generatorRef.current) return

        const { value, done } = generatorRef.current.next()

        if (done) {
            setIsPlaying(false)
            return
        }

        if (value) {
            if (value.visitedNodes) {
                setVisitedNodes(value.visitedNodes)
            }
            if (value.path) {
                setPath(value.path)
            }
        }

        const delay = 1000 / speed
        setTimeout(() => {
            animationRef.current = requestAnimationFrame(animate)
        }, delay)
    }

    // Start visualization
    const visualize = () => {
        if (isPlaying) return

        resetVisualization()

        const algoFunc = pathfindingAlgorithms[algorithm].function
        const start = grid[startNode.row][startNode.col]
        const end = grid[endNode.row][endNode.col]

        generatorRef.current = algoFunc(grid, start, end)
        setIsPlaying(true)
        animate()
    }

    const resetVisualization = () => {
        setVisitedNodes([])
        setPath([])
        const newGrid = createGrid(GRID_ROWS, GRID_COLS)

        // Preserve walls
        grid.forEach((row, rowIdx) => {
            row.forEach((node, colIdx) => {
                if (node.isWall) {
                    newGrid[rowIdx][colIdx].isWall = true
                }
            })
        })

        newGrid[startNode.row][startNode.col].isStart = true
        newGrid[endNode.row][endNode.col].isEnd = true
        setGrid(newGrid)
    }

    // Clear walls
    const clearWalls = () => {
        const newGrid = createGrid(GRID_ROWS, GRID_COLS)
        newGrid[startNode.row][startNode.col].isStart = true
        newGrid[endNode.row][endNode.col].isEnd = true
        setGrid(newGrid)
        setVisitedNodes([])
        setPath([])
    }

    // Mouse handlers for drawing walls
    const handleMouseDown = (row, col) => {
        if (isPlaying) return
        if ((row === startNode.row && col === startNode.col) ||
            (row === endNode.row && col === endNode.col)) return

        setIsDrawing(true)
        toggleWall(row, col)
    }

    const handleMouseEnter = (row, col) => {
        if (!isDrawing || isPlaying) return
        if ((row === startNode.row && col === startNode.col) ||
            (row === endNode.row && col === endNode.col)) return

        toggleWall(row, col)
    }

    const handleMouseUp = () => {
        setIsDrawing(false)
    }

    const toggleWall = (row, col) => {
        const newGrid = grid.map(r => r.map(node => ({ ...node })))
        newGrid[row][col].isWall = !newGrid[row][col].isWall
        setGrid(newGrid)
    }

    // Check if node is visited or in path
    const isNodeVisited = (row, col) => {
        return visitedNodes.some(node => node.row === row && node.col === col)
    }

    const isNodeInPath = (row, col) => {
        return path.some(node => node.row === row && node.col === col)
    }

    // Get node class
    const getNodeClass = (node) => {
        const classes = ['grid-node']

        if (node.isStart) classes.push('node-start')
        else if (node.isEnd) classes.push('node-end')
        else if (node.isWall) classes.push('node-wall')
        else if (isNodeInPath(node.row, node.col)) classes.push('node-path')
        else if (isNodeVisited(node.row, node.col)) classes.push('node-visited')

        return classes.join(' ')
    }

    return (
        <div className="pathfinding-visualizer">
            <div className="container">
                {/* Algorithm Info */}
                <div className="algorithm-info glass-card">
                    <h2 className="gradient-text">{pathfindingAlgorithms[algorithm].name}</h2>
                    <p className="algorithm-description">
                        {pathfindingAlgorithms[algorithm].description}
                    </p>
                    <div className="algorithm-properties">
                        <span className="property-badge">
                            {pathfindingAlgorithms[algorithm].weighted ? '⚖️ Weighted' : '📏 Unweighted'}
                        </span>
                        <span className="property-badge">
                            {pathfindingAlgorithms[algorithm].guaranteesPath ? '✅ Guarantees Shortest Path' : '⚠️ Does Not Guarantee Shortest Path'}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="controls glass-card">
                    <div className="control-group">
                        <label>Algorithm</label>
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            disabled={isPlaying}
                            className="select"
                        >
                            {Object.entries(pathfindingAlgorithms).map(([key, algo]) => (
                                <option key={key} value={key}>{algo.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="control-group">
                        <label>Speed: {speed}x</label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="slider"
                        />
                    </div>

                    <div className="control-buttons">
                        <button onClick={visualize} disabled={isPlaying} className="btn btn-primary">
                            🚀 Visualize
                        </button>
                        <button onClick={resetVisualization} disabled={isPlaying} className="btn btn-secondary">
                            🔄 Reset
                        </button>
                        <button onClick={clearWalls} disabled={isPlaying} className="btn btn-secondary">
                            🧹 Clear Walls
                        </button>
                        <button onClick={resetGrid} disabled={isPlaying} className="btn btn-secondary">
                            ♻️ Clear All
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid-container glass-card" onMouseLeave={handleMouseUp}>
                    <div className="grid">
                        {grid.map((row, rowIdx) => (
                            <div key={rowIdx} className="grid-row">
                                {row.map((node, colIdx) => (
                                    <div
                                        key={`${rowIdx}-${colIdx}`}
                                        className={getNodeClass(node)}
                                        onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                                        onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                                        onMouseUp={handleMouseUp}
                                    ></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="legend glass-card">
                    <div className="legend-item">
                        <div className="legend-node node-start"></div>
                        <span>Start Node</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-node node-end"></div>
                        <span>End Node</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-node node-wall"></div>
                        <span>Wall</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-node node-visited"></div>
                        <span>Visited</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-node node-path"></div>
                        <span>Shortest Path</span>
                    </div>
                </div>

                {/* Instructions */}
                <div className="instructions glass-card">
                    <p>💡 <strong>Tip:</strong> Click and drag on the grid to draw walls. Click "Visualize" to see the algorithm in action!</p>
                </div>
            </div>
        </div>
    )
}

export default PathfindingVisualizer
