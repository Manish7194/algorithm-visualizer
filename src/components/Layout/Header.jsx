import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path ? 'active' : ''
    }

    return (
        <header className="header glass-card">
            <div className="container header-content">
                <Link to="/" className="logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text gradient-text">AlgoViz</span>
                </Link>

                <nav className="nav">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>
                        Home
                    </Link>
                    <Link to="/sorting" className={`nav-link ${isActive('/sorting')}`}>
                        Sorting
                    </Link>
                    <Link to="/pathfinding" className={`nav-link ${isActive('/pathfinding')}`}>
                        Pathfinding
                    </Link>
                </nav>

                <div className="header-actions">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header
