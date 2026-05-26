import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function DetalhesCurso() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  // Criamos uma função separada para carregar os dados, assim podemos chamá-la de novo ao desvincular um aluno
  const carregarCurso = () => {
    api.get(`/cursos/${id}`)
      .then(response => {
        setCurso(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarCurso();
  }, [id]);

  // Função para excluir o curso
  const handleDeleteCurso = () => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      api.delete(`/cursos/${id}`)
        .then(() => {
          alert("Curso excluído com sucesso!");
          navigate('/'); // Volta para a tela inicial
        })
        .catch(error => {
          console.error("Erro ao excluir curso:", error);
          alert("Erro ao excluir o curso.");
        });
    }
  };

  // Função para desvincular aluno
  const handleDesvincular = (matricula) => {
    if (window.confirm("Remover este aluno do curso?")) {
      api.put(`/alunos/${matricula}/desvincular`)
        .then(() => {
          alert("Aluno removido do curso!");
          carregarCurso(); // Recarrega a lista de alunos na tela automaticamente
        })
        .catch(error => {
          console.error("Erro ao desvincular:", error);
          alert("Erro ao remover o aluno.");
        });
    }
  };

  if (loading) return <p>Carregando detalhes do curso...</p>;
  if (!curso) return <p>Curso não encontrado.</p>;

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
        &larr; Voltar para a lista de cursos
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h2 style={{ margin: 0 }}>{curso.nome}</h2>
        {/* Botão de Excluir Curso */}
        <button onClick={handleDeleteCurso} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Excluir Curso
        </button>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '25px', color: '#000', marginTop: '15px' }}>
        <p><strong>Professor:</strong> {curso.professor}</p>
        <p><strong>Local:</strong> {curso.local}</p>
        <p><strong>Carga Horária:</strong> {curso.horas}h</p>
      </div>

      <h3>Alunos Matriculados ({curso.alunos.length})</h3>
      
      {curso.alunos.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhum aluno matriculado neste curso ainda.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ background: '#e9ecef', textAlign: 'left', color: '#000' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Matrícula</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Nome</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>E-mail</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6', textAlign: 'center' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {curso.alunos.map(aluno => (
              <tr key={aluno.matricula} style={{ borderBottom: '1px solid #dee2e6', color: '#ffffff' }}>
                <td style={{ padding: '12px' }}>{aluno.matricula}</td>
                <td style={{ padding: '12px' }}>{aluno.nome}</td>
                <td style={{ padding: '12px' }}>{aluno.email}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  {/* Botão de Desvincular Aluno */}
                  <button 
                    onClick={() => handleDesvincular(aluno.matricula)} 
                    style={{ background: '#ffc107', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}