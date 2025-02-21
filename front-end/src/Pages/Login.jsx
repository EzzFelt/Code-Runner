import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';
import { UserContext } from '../Contexts/UserContext';

const Login = () => {
  const { handleLogin: onLogin } = useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email e senha são obrigatórios.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Resposta da API:', data); // Log para verificar a resposta da API

      if (response.ok) {
        console.log('Login bem-sucedido', data);

        if (data.token) {
          // Agora, apenas verificamos se o token existe
          const userData = {
            name: data.name,
            token: data.token,
            lessonsCompleted: data.lessonsCompleted
          };

          console.log('Usuário para ser salvo:', userData); // Log para verificar o objeto antes de salvar no localStorage
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('token', data.token);
          localStorage.setItem('lessonsCompleted', JSON.stringify(userData.lessonsCompleted))

          // Atualiza o estado do App
          onLogin(userData);

          // Redireciona para a Home
          navigate('/');
        } else {
          setError('Token não encontrado.');
        }
      } else {
        setError(data.msg || 'Erro ao fazer login.');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente mais tarde.');
      console.error(err);
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Entre em sua conta 👋</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <label htmlFor="password">Senha</label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn">Entrar</button>
        </form>

        <div className="login-footer">
          <div className="links-container">
            <Link to="/signup">Criar Conta</Link>
            <span>|</span>
            <Link to="/reset-password">Esqueci a Senha</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
