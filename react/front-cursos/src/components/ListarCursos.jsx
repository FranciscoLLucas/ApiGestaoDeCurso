import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function ListarCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chama o endpoint GET /api/cursos do Spring Boot
    api.get('/cursos')
      .then(response => {
        setCursos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar cursos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando cursos...</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Cursos Disponíveis</h2>
      
      {cursos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nenhum curso cadastrado ainda.</p>
      ) : (
        <div className="grid-cursos">
          {cursos.map(curso => (
            
            <div key={curso.id} className="card-curso">
              
             
              <div className="card-conteudo">
                <h3 style={{ textAlign: 'center' }}>{curso.nome}</h3>
                <p><strong>Local:</strong> {curso.local}</p>
                <p><strong>Carga Horária:</strong> {curso.horas}h</p>
                <p><strong>Professor:</strong> {curso.professor}</p>
              </div>
              
            
              <Link to={`/cursos/${curso.id}`} className="card-acao" style={{ textDecoration: 'none' }}>
                <button className="botao-detalhes">
                  Ver Detalhes e Alunos
                </button>
              </Link>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}