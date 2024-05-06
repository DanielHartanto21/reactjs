import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputAdmin: React.FC<{ token: string | null }> = ({ token }) => {
  const [nama, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const inputAdminBaru = async () => {
    if (!token) {
      console.error('Token is not available');
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({
          nama: nama,
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      await response.json();
      navigate('/dashboard_admin');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <center>
      <div className='login-wrapper'>
        <div className='login-container'>
          <h2>Input Admin</h2>
          <input type="text" placeholder="nama" value={nama} onChange={(e) => setName(e.target.value)} />
          <br />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button onClick={inputAdminBaru}>input admin</button>
          <br />
          <button onClick={() => navigate('/dashboard_admin')}>
            back to dashboard
          </button>
        </div>
      </div>
    </center>
  );
};

export default InputAdmin;