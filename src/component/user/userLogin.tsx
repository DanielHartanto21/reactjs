import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UserLogin: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [email_user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(email_user, password);
      const response = await fetch(`http://localhost:8080/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_user: email_user,
          password: password,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.json();

      const token = data.token;
      onLogin(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <h2>Login User</h2>
        <label htmlFor="email_user">Email</label><br />
        <input type="email_user" placeholder="Email" value={email_user} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password</label><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleLogin}>Login</button>
        <br />
        <button onClick={() => navigate('/new_user')}> create new user</button>
        <br />
        <button onClick={() => navigate('/admin_login')}> login admin</button>
      </div></div>
  );
};

export default UserLogin;