import React, { useState } from 'react';
import '../Styles/Login.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Mensagem de feedback
  const [loading, setLoading] = useState(false); // Estado de carregamento


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Limpa a mensagem de feedback a cada tentativa

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Se você estiver usando cookies de sessão, deixe essa linha. Caso contrário, pode remover.
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Cadastro realizado com sucesso!');
        console.log('Cadastro realizado com sucesso:', data);
        // Limpar os campos do formulário após sucesso
        setName('');
        setEmail('');
        setPassword('');
      } else {
        const errorData = await response.json();
        setMessage(`Erro no cadastro: ${errorData.message || 'Ocorreu um erro.'}`);
        console.error('Erro no cadastro:', errorData);
      }
    } catch (error) {
      // Exibe erro detalhado se disponível
      setMessage(`Erro ao tentar se cadastrar. Verifique sua conexão. Erro: ${error.message || error}`);
      console.error('Erro ao tentar se cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Cadastre-se 🚀</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Nome */}
          <div className="input-container">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Nome</label>
          </div>

          {/* Campo Email */}
          <div className="input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Campo Senha */}
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Senha</label>
          </div>

          {/* Botão de Cadastrar */}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        {/* Mensagem de Feedback */}
        {message && <p className="feedback-message">{message}</p>}

        {/* Links para login */}
        <div className="login-footer">
          <a href="/login">Já tem uma conta? Faça login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
