import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddUser: React.FC = () => {
  const [nama_user, setName] = useState('');
  const [email_user, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nomor_telepon, setPhoneNumber] = useState('');
  const [alamat, setAddress] = useState('');
  const [jenis_kelamin, setGender] = useState('');

  const navigate = useNavigate();

  const handleInputUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          nama_user: nama_user,
          email_user: email_user,
          password: password,
          nomor_telepon: nomor_telepon,
          alamat: alamat,
          jenis_kelamin: jenis_kelamin,
        }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Failed input');
      }

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (

    <div className='login-wrapper'>
      <div className='login-container'>
        <h2>Create New User</h2>
        <label htmlFor="nama_user">Nama</label><br />
        <input type="text" placeholder="Nama" value={nama_user} onChange={(e) => setName(e.target.value)} />
        <br />
        <label htmlFor="email_user">Email</label><br />
        <input type="text" placeholder="Email" value={email_user} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor="password">Password</label><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label htmlFor="nomor_telepon">Nomor Telepon</label><br />
        <input type="text" placeholder="Nomor Telepon" value={nomor_telepon} onChange={(e) => setPhoneNumber(e.target.value)} />
        <br />
        <label htmlFor="alamat">Alamat</label><br />
        <input type="text" placeholder="Alamat" value={alamat} onChange={(e) => setAddress(e.target.value)} />
        <br />
        <label htmlFor="jenis_kelamin">Jenis Kelamin</label><br />
        <select name="jenis_kelamin" id="jenis_kelamin" onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
        </select><br />

        <button onClick={handleInputUser}>input new user</button>
        <br />
        <button onClick={() => navigate('/')}>back to login </button>
      </div></div>
  );
};

export default AddUser;