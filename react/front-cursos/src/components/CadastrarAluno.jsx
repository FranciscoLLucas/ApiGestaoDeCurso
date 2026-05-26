import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CadastrarAluno() {
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cursoId, setCursoId] = useState('');
  
  const [cursos, setCursos] = useState([]);

  // Busca os cursos disponíveis para preencher o select
  useEffect(() => {
    api.get('/cursos')
      .then(response => setCursos(response.data))
      .catch(error => console.error("Erro ao carregar cursos:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cursoId) {
      alert("Por favor, selecione um curso para o aluno!");
      return;
    }

    try {
      // 1. Dispara o POST para cadastrar o aluno
      const responseAluno = await api.post('/alunos', { nome, email });
      const novaMatricula = responseAluno.data.matricula; // Pega o ID gerado pelo banco

      // 2. Dispara o PUT para realizar a matrícula usando as regras de negócio
      await api.put(`/alunos/${novaMatricula}/matricular/${cursoId}`);

      alert("Aluno cadastrado e matriculado com sucesso!");
      // Redireciona o usuário direto para a tela de detalhes do curso escolhido
      navigate(`/cursos/${cursoId}`); 

    } catch (error) {
      console.error("Erro na operação:", error);
      alert("Erro ao realizar o cadastro. Verifique se o e-mail já está em uso.");
    }
  };

  // Mantive a estrutura do inputStyle para manter o padrão visual
  const inputStyle = {
    width: '100%', 
    padding: '10px', 
    marginBottom: '15px', 
    borderRadius: '4px', 
    border: '1px solid #ccc', 
    color: '#000', 
    boxSizing: 'border-box',
    backgroundColor: '#ffffff' // Você pode trocar para o cinza (#e9ecef) que testamos antes
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#000', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Matricular Novo Aluno</h2>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label style={{ fontWeight: 'bold', color: '#000' }}>Nome do Aluno:</label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={inputStyle} />

        <label style={{ fontWeight: 'bold', color: '#000' }}>E-mail:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />

        <label style={{ fontWeight: 'bold', color: '#000' }}>Selecione o Curso:</label>
        <select value={cursoId} onChange={e => setCursoId(e.target.value)} required style={inputStyle}>
          <option value="">-- Selecione um Curso --</option>
          {cursos.map(curso => (
            <option key={curso.id} value={curso.id}>
              {curso.nome} (Prof. {curso.professor})
            </option>
          ))}
        </select>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Finalizar Matrícula
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ background: '#dc3545', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}