import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function DetalhesCurso() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 1. Novos estados para buscar os alunos disponíveis e guardar qual foi selecionado
  const [todosAlunos, setTodosAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState('');

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

  // 2. Novo método para carregar a lista de todos os alunos do banco
  const carregarTodosAlunos = () => {
    api.get('/alunos')
      .then(response => setTodosAlunos(response.data))
      .catch(error => console.error("Erro ao buscar alunos:", error));
  };

  useEffect(() => {
    carregarCurso();
    carregarTodosAlunos(); // Chama a busca de alunos ao abrir a tela
  }, [id]);

  // 3. Nova função para matricular o aluno a partir do dropdown
  const handleMatricularAlunoExistente = () => {
    if (!alunoSelecionado) {
      alert("Por favor, selecione um aluno na lista.");
      return;
    }

    api.put(`/alunos/${alunoSelecionado}/matricular/${id}`)
      .then(() => {
        alert("Aluno adicionado ao curso com sucesso!");
        setAlunoSelecionado(''); // Limpa a caixa de seleção
        carregarCurso(); // Atualiza a tabela imediatamente
      })
      .catch(error => {
        console.error("Erro ao matricular:", error);
        alert("Erro ao matricular. O aluno já pode estar vinculado a outro curso!");
      });
  };

  const handleDeleteCurso = () => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      api.delete(`/cursos/${id}`)
        .then(() => {
          alert("Curso excluído com sucesso!");
          navigate('/');
        })
        .catch(error => {
          console.error("Erro ao excluir curso:", error);
          alert("Erro ao excluir o curso.");
        });
    }
  };

  const handleDesvincular = (matricula) => {
    if (window.confirm("Remover este aluno do curso?")) {
      api.put(`/alunos/${matricula}/desvincular`)
        .then(() => {
          alert("Aluno removido do curso!");
          carregarCurso();
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
        <button onClick={handleDeleteCurso} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Excluir Curso
        </button>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '25px', color: '#000', marginTop: '15px' }}>
        <p><strong>Professor:</strong> {curso.professor}</p>
        <p><strong>Local:</strong> {curso.local}</p>
        <p><strong>Carga Horária:</strong> {curso.horas}h</p>
      </div>

      {/* 4. Novo bloco de UI para adicionar o aluno ao curso */}
      <div style={{ background: '#e9ecef', padding: '15px', borderRadius: '8px', marginBottom: '20px', color: '#000' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Adicionar Aluno ao Curso</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select 
                value={alunoSelecionado} 
                onChange={e => setAlunoSelecionado(e.target.value)}
                style={{ flex: 1, minWidth: '200px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#000', backgroundColor: '#ffffff' }}
              >
              <option value="">-- Selecione um aluno já cadastrado --</option>
            {todosAlunos.map(aluno => (
              <option key={aluno.matricula} value={aluno.matricula}>
                {aluno.nome} ({aluno.email})
              </option>
            ))}
          </select>
          <button 
            onClick={handleMatricularAlunoExistente}
            style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Matricular
          </button>
        </div>
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