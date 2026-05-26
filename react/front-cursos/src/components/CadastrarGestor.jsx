import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CadastrarGestor() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    api.post('/gestores', { nome, email })
      .then(() => {
        alert("Gestor cadastrado com sucesso!");
        navigate('/'); // Volta para a tela inicial
      })
      .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao cadastrar. Verifique se o e-mail já existe.");
      });
  };

  const inputStyle = {
    width: '100%', padding: '10px', marginBottom: '15px', 
    borderRadius: '4px', border: '1px solid #ccc', color: '#000', backgroundColor: 'rgb(255, 255, 255)', boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#000', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Cadastrar Gestor</h2>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label style={{ fontWeight: 'bold', color: '#000' }}>Nome do Gestor:</label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={inputStyle} />

        <label style={{ fontWeight: 'bold', color: '#000' }}>E-mail:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ background: '#17a2b8', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar Gestor
          </button>
        </div>
      </form>
    </div>
  );
}