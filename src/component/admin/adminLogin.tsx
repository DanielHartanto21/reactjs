import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminLogin: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/login_admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.json();

      const token = data.token;
      onLogin(token);
      navigate('/dashboard_admin');
    } catch (error) {
      console.error('Login failed:', error);
      alert("user/password salah"); 
    }
  };

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <h2>Login Admin</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleLogin}>Login</button>
        <br />
        <button onClick={() => navigate('/')}> login user</button>
      </div></div>
  );
};

export default AdminLogin;