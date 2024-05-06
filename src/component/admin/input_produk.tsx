import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputProduk: React.FC<{ token: string | null }> = ({ token }) => {
  const [nama, setName] = useState('');
  const [kategori, setCategory] = useState('');
  const [merk, setMerk] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState(0);
  const [stok, setStock] = useState(0);
  const navigate = useNavigate();
  const inputProdukBaru = async () => {
    if (!token) {
      console.error('Token is not available');
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/produk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({
          nama_produk: nama,
          kategori: kategori,
          merk: merk,
          deskripsi: deskripsi,
          harga: harga,
          stok: stok
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.json();
      console.log(data);
      navigate('/dashboard_admin');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <center>
      <div className='login-wrapper'>
        <div className='login-container'>
          <h2>Input Produk Baru</h2>
          <label htmlFor="nama">Nama Barang</label><br />
          <input type="text" placeholder="nama" value={nama} onChange={(e) => setName(e.target.value)} />
          <br />
          <label htmlFor="kategori">Kategori</label><br />
          <input type="text" placeholder="kategori" value={kategori} onChange={(e) => setCategory(e.target.value)} />
          <br />
          <label htmlFor="merk">Merk</label><br />
          <input type="text" placeholder="merk" value={merk} onChange={(e) => setMerk(e.target.value)} />
          <br />
          <label htmlFor="deskripsi">Deskripsi Barang</label><br />
          <input type="text" placeholder="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
          <br />
          <label htmlFor="harga">Harga</label><br />
          <input type="number" placeholder="harga" value={harga} onChange={(e) => setHarga(Number(e.target.value))} />
          <br />
          <label htmlFor="stok">Stock</label><br />
          <input type="number" placeholder="stok" value={stok} onChange={(e) => setStock(Number(e.target.value))} />
          <br />
          <button onClick={inputProdukBaru}>input produk</button>
          <br />
          <button onClick={() => navigate('/dashboard_admin')}>
            back to dashboard
          </button>
        </div>
      </div>
    </center>
  );
};

export default InputProduk;