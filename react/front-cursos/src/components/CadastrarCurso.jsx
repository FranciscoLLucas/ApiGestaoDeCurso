import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CadastrarCurso() {
  const navigate = useNavigate();
  
  
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [horas, setHoras] = useState('');
  const [professor, setProfessor] = useState('');
  const [gestorId, setGestorId] = useState('');
  
  
  const [gestores, setGestores] = useState([]);

  
  useEffect(() => {
    api.get('/gestores')
      .then(response => setGestores(response.data))
      .catch(error => console.error("Erro ao carregar gestores:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!gestorId) {
      alert("Por favor, selecione um gestor responsável!");
      return;
    }

    const novoCurso = {
      nome,
      local,
      horas: parseInt(horas), 
      professor
    };


    api.post(`/cursos/gestor/${gestorId}`, novoCurso)
      .then(() => {
        alert("Curso cadastrado com sucesso!");
        navigate('/');
      })
      .catch(error => {
        console.error("Erro ao cadastrar curso:", error);
        alert("Erro ao cadastrar. Verifique o console.");
      });
  };

  const inputStyle = {
    width: '100%', 
    padding: '10px', 
    marginBottom: '15px', 
    borderRadius: '4px', 
    border: '1px solid #ccc', 
    color: '#000', 
    boxSizing: 'border-box',
    backgroundColor: '#e9ecef' // <-- Adicione esta linha com a cor que desejar
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#000', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Cadastrar Novo Curso</h2>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label style={{ fontWeight: 'bold', color: '#000' }}>Nome do Curso:</label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={inputStyle} />

        <label style={{ fontWeight: 'bold', color: '#000' }}>Local (Sala/Laboratório):</label>
        <input type="text" value={local} onChange={e => setLocal(e.target.value)} required style={inputStyle} />

        <label style={{ fontWeight: 'bold', color: '#000' }}>Carga Horária (horas):</label>
        <input type="number" value={horas} onChange={e => setHoras(e.target.value)} required style={inputStyle} />

        <label style={{ fontWeight: 'bold', color: '#000' }}>Professor Responsável:</label>
        <input type="text" value={professor} onChange={e => setProfessor(e.target.value)} required style={inputStyle} />

        <label style={{ fontWeight: 'bold', color: '#000' }}>Gestor do Curso:</label>
        <select value={gestorId} onChange={e => setGestorId(e.target.value)} required style={inputStyle}>
          <option value="">-- Selecione um Gestor --</option>
          {gestores.map(gestor => (
            <option key={gestor.id} value={gestor.id}>
              {gestor.nome}
            </option>
          ))}
        </select>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ background: '#28a745', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar Curso
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ background: '#dc3545', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}