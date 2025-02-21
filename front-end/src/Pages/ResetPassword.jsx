import React, { useState } from 'react';
import '../Styles/Login.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para o reset de senha.
    console.log(`Resetando senha para: ${email}`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Esqueceu sua senha? Redefina 🤫</h2>
        <form onSubmit={handleReset}>
          {/* Email */}
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

          {/* Botão de Resetar Senha */}
          <button type="submit" className="btn">Redefinir Senha</button>
        </form>

        {/* Links */}
        <div className="login-footer">
          <a href="/login">Voltar para login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
