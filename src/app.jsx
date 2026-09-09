import './app.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById('root')).render(<App />);
