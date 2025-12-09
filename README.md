# 🚀 Algorithm Visualizer

An interactive, beautiful algorithm visualization tool built with React and Vite. Perfect for learning and understanding how different algorithms work through stunning visual animations.

![Algorithm Visualizer](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Premium glass-like effects with vibrant gradients
- **Dark Mode**: Eye-friendly dark theme with beautiful color schemes
- **Smooth Animations**: Buttery-smooth transitions and micro-interactions
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile

### 📊 Sorting Algorithms
- **Bubble Sort** - O(n²) time complexity
- **Quick Sort** - O(n log n) average case
- **Merge Sort** - O(n log n) guaranteed
- **Heap Sort** - O(n log n) in-place sorting

**Features:**
- Adjustable array size (10-100 elements)
- Variable animation speed (1x-100x)
- Color-coded visualization (comparing, swapping, sorted)
- Play, pause, step-through controls
- Real-time complexity information

### 🗺️ Pathfinding Algorithms
- **Dijkstra's Algorithm** - Guaranteed shortest path
- **A* Algorithm** - Heuristic-based pathfinding
- **Breadth-First Search (BFS)** - Level-by-level exploration
- **Depth-First Search (DFS)** - Deep exploration

**Features:**
- Interactive grid (click & drag to draw walls)
- Adjustable animation speed
- Visual path highlighting
- Multiple algorithm comparison
- Start/end node customization

## 🛠️ Technologies Used

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Vanilla CSS** - Custom design system
- **Generator Functions** - Step-by-step algorithm execution

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/algorithm-visualizer.git
cd algorithm-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to Netlify

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📁 Project Structure

```
algorithm-visualizer/
├── src/
│   ├── algorithms/           # Algorithm implementations
│   │   ├── sorting.js       # Sorting algorithms
│   │   └── pathfinding.js   # Pathfinding algorithms
│   ├── components/          # React components
│   │   ├── Layout/         # Header, Footer
│   │   └── Visualizers/    # Algorithm visualizers
│   ├── pages/              # Route pages
│   │   ├── Home.jsx
│   │   ├── SortingPage.jsx
│   │   └── PathfindingPage.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles & design system
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies
```

## 🎯 Usage

### Sorting Visualizer
1. Select an algorithm from the dropdown
2. Adjust array size and speed
3. Click "Play" to start visualization
4. Use "Step" for step-by-step execution
5. Click "Reset" to restart or "New Array" for different data

### Pathfinding Visualizer
1. Select a pathfinding algorithm
2. Click and drag on the grid to draw walls
3. Adjust animation speed
4. Click "Visualize" to see the algorithm in action
5. Use "Clear Walls" to remove walls or "Clear All" to reset

## 🎨 Design System

The project uses a comprehensive design system with:
- CSS Custom Properties for theming
- Glassmorphism effects
- Vibrant gradient color palette
- Smooth animation utilities
- Responsive typography scale

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Manish kumar**

- Portfolio: https://manish7194.github.io/Portfolio/
- LinkedIn: https://www.linkedin.com/in/manish-kumar1108/
- GitHub: [@Manish7194](https://github.com/Manish7194)

## 🙏 Acknowledgments

- Inspired by various algorithm visualization tools
- Built with modern web technologies
- Designed for educational purposes

## 📸 Screenshots



---

Made with ❤️ by Manish Kumar
