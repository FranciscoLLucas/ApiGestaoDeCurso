import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CadastrarAluno() {
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispara apenas o POST para cadastrar o aluno
      await api.post('/alunos', { nome, email });

      alert("Aluno cadastrado com sucesso no sistema! Agora você pode ir até um Curso para matriculá-lo.");
      navigate('/'); // Redireciona para a tela inicial

    } catch (error) {
      console.error("Erro na operação:", error);
      alert("Erro ao realizar o cadastro. Verifique se o e-mail já está em uso.");
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px', marginBottom: '15px', 
    borderRadius: '4px', border: '1px solid #ccc', color: '#000', 
    boxSizing: 'border-box', backgroundColor: '#ffffff'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#000', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Cadastrar Novo Aluno</h2>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label style={{ fontWeight: 'bold', color: '#000' }}>Nome do Aluno:</label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={inputStyle} />

        <label style={{ fontWeight: 'bold', color: '#000' }}>E-mail:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar Aluno
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ background: '#dc3545', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}