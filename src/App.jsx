import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import SortingPage from './pages/SortingPage'
import PathfindingPage from './pages/PathfindingPage'
import './App.css'

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sorting" element={<SortingPage />} />
                        <Route path="/pathfinding" element={<PathfindingPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
