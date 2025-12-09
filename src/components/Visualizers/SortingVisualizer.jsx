import { useState, useEffect, useRef } from 'react'
import { sortingAlgorithms } from '../../algorithms/sorting'
import './SortingVisualizer.css'

function SortingVisualizer() {
    const [array, setArray] = useState([])
    const [arraySize, setArraySize] = useState(50)
    const [algorithm, setAlgorithm] = useState('bubble')
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(50)
    const [currentState, setCurrentState] = useState({})

    const generatorRef = useRef(null)
    const animationRef = useRef(null)

    // Generate random array
    const generateArray = () => {
        const newArray = Array.from(
            { length: arraySize },
            () => Math.floor(Math.random() * 400) + 10
        )
        setArray(newArray)
        setCurrentState({})
        setIsPlaying(false)
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }
    }

    useEffect(() => {
        generateArray()
    }, [arraySize])

    // Animation loop
    const animate = () => {
        if (!generatorRef.current) return

        const { value, done } = generatorRef.current.next()

        if (done) {
            setIsPlaying(false)
            return
        }

        if (value) {
            setArray(value.array)
            setCurrentState(value)
        }

        const delay = 1000 / speed
        setTimeout(() => {
            animationRef.current = requestAnimationFrame(animate)
        }, delay)
    }

    // Play/Pause
    const togglePlay = () => {
        if (!isPlaying) {
            if (!generatorRef.current) {
                const sortFunc = sortingAlgorithms[algorithm].function
                generatorRef.current = sortFunc(array)
            }
            setIsPlaying(true)
            animate()
        } else {
            setIsPlaying(false)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }

    // Reset
    const reset = () => {
        setIsPlaying(false)
        generatorRef.current = null
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }
        generateArray()
    }

    // Step through
    const step = () => {
        if (!generatorRef.current) {
            const sortFunc = sortingAlgorithms[algorithm].function
            generatorRef.current = sortFunc(array)
        }

        const { value, done } = generatorRef.current.next()

        if (!done && value) {
            setArray(value.array)
            setCurrentState(value)
        } else {
            setIsPlaying(false)
        }
    }

    // Get bar color
    const getBarColor = (index) => {
        if (currentState.sorted?.includes(index)) {
            return 'var(--gradient-success)'
        }
        if (currentState.swapping?.includes(index)) {
            return 'var(--gradient-secondary)'
        }
        if (currentState.comparing?.includes(index)) {
            return 'var(--gradient-accent)'
        }
        if (currentState.pivot?.includes(index)) {
            return 'var(--gradient-primary)'
        }
        if (currentState.merging?.includes(index)) {
            return 'var(--primary-cyan)'
        }
        return 'var(--glass-bg)'
    }

    const maxValue = Math.max(...array)

    return (
        <div className="sorting-visualizer">
            <div className="container">
                {/* Algorithm Info */}
                <div className="algorithm-info glass-card">
                    <h2 className="gradient-text">{sortingAlgorithms[algorithm].name}</h2>
                    <p className="algorithm-description">
                        {sortingAlgorithms[algorithm].description}
                    </p>
                    <div className="complexity-info">
                        <div className="complexity-item">
                            <span className="complexity-label">Time:</span>
                            <span className="complexity-value">{sortingAlgorithms[algorithm].timeComplexity}</span>
                        </div>
                        <div className="complexity-item">
                            <span className="complexity-label">Space:</span>
                            <span className="complexity-value">{sortingAlgorithms[algorithm].spaceComplexity}</span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="controls glass-card">
                    <div className="control-group">
                        <label>Algorithm</label>
                        <select
                            value={algorithm}
                            onChange={(e) => {
                                setAlgorithm(e.target.value)
                                reset()
                            }}
                            disabled={isPlaying}
                            className="select"
                        >
                            {Object.entries(sortingAlgorithms).map(([key, algo]) => (
                                <option key={key} value={key}>{algo.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="control-group">
                        <label>Array Size: {arraySize}</label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={arraySize}
                            onChange={(e) => setArraySize(Number(e.target.value))}
                            disabled={isPlaying}
                            className="slider"
                        />
                    </div>

                    <div className="control-group">
                        <label>Speed: {speed}x</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="slider"
                        />
                    </div>

                    <div className="control-buttons">
                        <button onClick={togglePlay} className="btn btn-primary">
                            {isPlaying ? '⏸ Pause' : '▶ Play'}
                        </button>
                        <button onClick={step} disabled={isPlaying} className="btn btn-secondary">
                            ⏭ Step
                        </button>
                        <button onClick={reset} className="btn btn-secondary">
                            🔄 Reset
                        </button>
                        <button onClick={generateArray} disabled={isPlaying} className="btn btn-secondary">
                            🎲 New Array
                        </button>
                    </div>
                </div>

                {/* Visualization */}
                <div className="visualization glass-card">
                    <div className="array-container">
                        {array.map((value, index) => (
                            <div
                                key={index}
                                className="array-bar"
                                style={{
                                    height: `${(value / maxValue) * 100}%`,
                                    background: getBarColor(index),
                                    width: `${100 / array.length}%`
                                }}
                            >
                                {arraySize <= 20 && (
                                    <span className="bar-value">{value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="legend glass-card">
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'var(--glass-bg)' }}></div>
                        <span>Unsorted</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'var(--gradient-accent)' }}></div>
                        <span>Comparing</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'var(--gradient-secondary)' }}></div>
                        <span>Swapping</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'var(--gradient-primary)' }}></div>
                        <span>Pivot</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ background: 'var(--gradient-success)' }}></div>
                        <span>Sorted</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SortingVisualizer
