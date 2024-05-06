import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ChangePassword: React.FC<{ token: string | null }> = ({ token }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/change_password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },

        body: JSON.stringify({
          password: password,
          new_password: newPassword
        }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Failed change password');
      }

      navigate('/info_user');
    } catch (error) {
      console.error('failed change password:', error);
    }
  };

  return (

    <div className='login-wrapper'>
      <div className='login-container'>
        <h2>Change Password</h2>
        <label htmlFor="password">Password Lama</label><br />
        <input type="password" placeholder="old password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label htmlFor="newPassword">Password Baru</label><br />
        <input type="password" placeholder="new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <br />
        <button onClick={handleChangePassword}>change password</button>
        <br />
        <button onClick={() => navigate('/dashboard')}>back to dashboard </button>
      </div></div>
  );
};

export default ChangePassword;