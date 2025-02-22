import React, { useState } from 'react';
import '../Styles/Login.css';

const Signup = () => {
  // State variables for form fields and feedback messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Feedback message
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear feedback message on each attempt

    try {
      // Send signup request to the server
      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials if using session cookies
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Cadastro realizado com sucesso!'); // Success message
        console.log('Cadastro realizado com sucesso:', data);
        // Clear form fields on success
        setName('');
        setEmail('');
        setPassword('');
      } else {
        const errorData = await response.json();
        setMessage(`Erro no cadastro: ${errorData.message || 'Ocorreu um erro.'}`); // Error message
        console.error('Erro no cadastro:', errorData);
      }
    } catch (error) {
      // Display detailed error if available
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
          {/* Name field */}
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

          {/* Email field */}
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

          {/* Password field */}
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

          {/* Submit button */}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        {/* Feedback message */}
        {message && <p className="feedback-message">{message}</p>}

        {/* Link to login page */}
        <div className="login-footer">
          <a href="/login">Já tem uma conta? Faça login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
