import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListarCursos from './components/ListarCursos';
import DetalhesCurso from './components/DetalhesCurso';
import CadastrarCurso from './components/CadastrarCurso';
import CadastrarAluno from './components/CadastrarAluno';
import CadastrarGestor from './components/CadastrarGestor';

import './App.css'; // <-- 1. Importação do CSS!

function App() {
  return (
    <BrowserRouter>
      {/* 2. Usando as classes do CSS em vez de style inline */}
      <div className="container">
        
        <header className="cabecalho">
          <h1>Sistema de Gestão Escolar</h1>
          
          <nav className="navegacao">
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Ver Cursos</Link>
            <Link to="/cadastrar-curso" style={{ textDecoration: 'none', color: '#28a745', fontWeight: 'bold' }}>Novo Curso</Link>
            <Link to="/cadastrar-aluno" style={{ textDecoration: 'none', color: '#a64dff', fontWeight: 'bold' }}>Matricular Aluno</Link>
            <Link to="/cadastrar-gestor" style={{ textDecoration: 'none', color: '#17a2b8', fontWeight: 'bold' }}>Novo Gestor</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ListarCursos />} />
            <Route path="/cursos/:id" element={<DetalhesCurso />} />
            <Route path="/cadastrar-curso" element={<CadastrarCurso />} />
            <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
            <Route path="/cadastrar-gestor" element={<CadastrarGestor />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;