import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GraduationCap, Apple, Heart } from 'lucide-react';
import NavBarra from './components/NavBarra';
import EducaMais from './pages/EducaMais';
import FomeZero from './pages/FomeZero';
import ConectSus from './pages/ConectSus';
import SistemaCard from './components/SistemaCard';

function App() {
  const systems = [
    { id: 'educa', name: 'Educa Mais', title: "LOGO"},
    { id: 'fome', name: 'Fome 0', title: "LOGO"},
    { id: 'sus', name: 'Conect SUS', title: "LOGO"}
  ];
  // const systems = [
  //   { id: 'educa', name: 'Educa Mais', icon: GraduationCap, color: 'blue' },
  //   { id: 'fome', name: 'Fome 0', icon: Apple, color: 'green' },
  //   { id: 'sus', name: 'Conect SUS', icon: Heart, color: 'red' }
  // ];
              
  return (
    <>
      <Router>
      <div className="container">
        <NavBarra />
        <main className="main-content">
          <div className="systems-grid">
            {systems.map((system) => (
              <SistemaCard key={system.id} system={system} />
            ))}
          </div>

          <div className="system-content">
            <Routes>
              <Route path="/" element={<Navigate to="/educa" replace />} />
              <Route path="/educa" element={<EducaMais />} />
              <Route path="/fome" element={<FomeZero />} />
              <Route path="/sus" element={<ConectSus />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
    </>
  )
}

export default App
