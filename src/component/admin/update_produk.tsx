import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
interface Produk {
    _id: string;
    nama_produk: string;
    kategori: string;
    merk: string;
    deskripsi: string;
    harga: number;
    stok: number;
   }
   
   const UpdateProduk: React.FC<{ token: string | null }> = ({ token }) => {
       const navigate = useNavigate();
       const { id } = useParams(); 
   
       const [data, setData] = useState<Produk>({
           _id: '',
           nama_produk: '',
           kategori: '',
           merk: '',
           deskripsi: '',
           harga: 0,
           stok: 0,
       });
   
       const [isLocked, setIsLocked] = useState(true);
   
       const toggleLock = () => {
           setIsLocked(!isLocked);
       };
   
       const handleUpdateProduk = async () => {
           try {
               const response = await fetch(`http://localhost:8080/api/produk`, {
                   method: 'PUT',
                   headers: {
                       'Content-Type': 'application/json',
                       'Authorization': `${token}`,
                   },
                   body: JSON.stringify({
                       data
                   }),
               });
   
               console.log(response);
   
               if (!response.ok) {
                   throw new Error('Failed update');
               }
               navigate('/dashboard_admin');
           } catch (error) {
               console.error('Update failed:', error);
           }
       };
   
       useEffect(() => {
        const fetchUserData = async () => {
            if (!token||!id) {
                console.error('Token is not available');
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/produk?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const fetchedData = await response.json();

                if (fetchedData && fetchedData.produk) {
                    setData(fetchedData.produk);
                    console.log(fetchedData.produk)
                } else {
                    console.error('Fetched data is invalid:', fetchedData);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchUserData();
       }, [token, navigate,id]);
   
       return (
           <center>
               <div className="info-user-wrapper">
                   <div className="info-user-container">
                       <h2>Info Produk</h2>
                       <label htmlFor="nama_produk">Nama Produk</label><br />
                       <input type="text" placeholder="Nama Produk" disabled={isLocked} value={data.nama_produk} onChange={(e) => setData({ ...data, nama_produk: e.target.value })} />
                       <br />
                       <label htmlFor="kategori">Kategori</label><br />
                       <input type="text" placeholder="Kategori" disabled={isLocked} value={data.kategori} onChange={(e) => setData({ ...data, kategori: e.target.value })} />
                       <br />
                       <label htmlFor="merk">Merk</label><br />
                       <input type="text" placeholder="merk" disabled={isLocked} value={data.merk} onChange={(e) => setData({ ...data, merk: e.target.value })} />
                       <br />
                       <label htmlFor="deskripsi">Deskripsi</label><br />
                       <input type="text" placeholder="deskripsi" disabled={isLocked} value={data.deskripsi} onChange={(e) => setData({ ...data, deskripsi: e.target.value })} />
                       <br />
                       <label htmlFor="harga">Harga</label><br />
                        <input type="number" placeholder="harga" disabled={isLocked}  value={data.harga} onChange={(e) => setData({ ...data, harga: Number(e.target.value )})}/>
                        <br />
                       <label htmlFor="stok">Stock</label><br />
                        <input type="number" placeholder="stok"disabled={isLocked}  value={data.stok} onChange={(e) =>setData({ ...data, stok:Number(e.target.value) })}/>
                        <br />

                       <br />
                       {isLocked ? (
                           <button onClick={toggleLock}>
                               Edit Data
                           </button>
                       ) : (
                               <button onClick={handleUpdateProduk}>
                                   Save Data
                               </button>
                           )}
                       <button onClick={() => navigate('/dashboard_admin')}>Back to Dashboard</button>
                   </div>
               </div>
           </center>
       );
   };
   
   export default UpdateProduk;