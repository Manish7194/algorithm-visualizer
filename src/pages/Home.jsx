import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    const categories = [
        {
            title: 'Sorting Algorithms',
            description: 'Visualize how different sorting algorithms organize data',
            algorithms: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort'],
            icon: '📊',
            path: '/sorting',
            gradient: 'var(--gradient-primary)'
        },
        {
            title: 'Pathfinding Algorithms',
            description: 'Watch algorithms find the shortest path through obstacles',
            algorithms: ['Dijkstra', 'A*', 'BFS', 'DFS'],
            icon: '🗺️',
            path: '/pathfinding',
            gradient: 'var(--gradient-accent)'
        }
    ]

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content animate-fadeIn">
                        <h1 className="hero-title">
                            Visualize Algorithms
                            <br />
                            <span className="gradient-text">Like Never Before</span>
                        </h1>
                        <p className="hero-description">
                            Interactive, beautiful, and intuitive algorithm visualizations
                            to help you understand how they work under the hood.
                        </p>
                        <div className="hero-actions">
                            <Link to="/sorting" className="btn btn-primary">
                                Start Exploring
                            </Link>
                            <a
                                href="#features"
                                className="btn btn-secondary"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <h2 className="section-title gradient-text">
                        Algorithm Categories
                    </h2>
                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <Link
                                to={category.path}
                                key={index}
                                className="category-card glass-card animate-fadeIn"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="category-icon">{category.icon}</div>
                                <h3 className="category-title">{category.title}</h3>
                                <p className="category-description">{category.description}</p>
                                <div className="category-algorithms">
                                    {category.algorithms.map((algo, i) => (
                                        <span key={i} className="algorithm-tag">
                                            {algo}
                                        </span>
                                    ))}
                                </div>
                                <div className="category-cta">
                                    <span>Explore</span>
                                    <span className="arrow">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="info-section">
                <div className="container">
                    <div className="info-grid">
                        <div className="info-card glass-card">
                            <div className="info-icon">⚡</div>
                            <h3>Interactive Controls</h3>
                            <p>Play, pause, and step through algorithms at your own pace</p>
                        </div>
                        <div className="info-card glass-card">
                            <div className="info-icon">🎨</div>
                            <h3>Beautiful Animations</h3>
                            <p>Smooth, color-coded visualizations make learning intuitive</p>
                        </div>
                        <div className="info-card glass-card">
                            <div className="info-icon">📱</div>
                            <h3>Fully Responsive</h3>
                            <p>Works seamlessly on desktop, tablet, and mobile devices</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
