import React, { useState } from 'react';
import '../Styles/Login.css';

// Password reset component
const ResetPassword = () => {
  // State to store the email
  const [email, setEmail] = useState('');

  // Function to handle password reset
  const handleReset = (e) => {
    e.preventDefault();
    // Here you can add the logic for password reset.
    console.log(`Resetting password for: ${email}`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot your password? Reset it 🤫</h2>
        <form onSubmit={handleReset}>
          {/* Input field for email */}
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

          {/* Button to reset password */}
          <button type="submit" className="btn">Reset Password</button>
        </form>

        {/* Link to go back to login */}
        <div className="login-footer">
          <a href="/login">Back to login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
