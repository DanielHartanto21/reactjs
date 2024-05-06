import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface Produk {
    _id: string;
    nama_produk: string;
    kategori: string;
    merk: string;
    deskripsi: string;
    harga: number;
    stok: number;
}

const ListProduk: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<Produk[]>([]);

    useEffect(() => {
        const listingAdmin = async () => {
            if (!token) {
                console.error('Token is not available');
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/produk`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const fetchedData = await response.json();
                if (Array.isArray(fetchedData.produk)) {
                    setData(fetchedData.produk);
                } else {
                    console.error('Fetched data is not an array:', fetchedData);
                    setData([]);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        listingAdmin();
    }, [token, navigate]);
    return (
        <center>
            <div className='order-wrapper'>
                <div className='order-container'>

                    <table >
                        <thead>
                            <tr>
                                <th>Nama Produk</th>
                                <th>Kategori</th>
                                <th>Merk</th>
                                <th>Deskripsi Barang</th>
                                <th>Harga</th>
                                <th>Stok</th>
                                <th>Ubah Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nama_produk}</td>
                                    <td>{item.kategori}</td>
                                    <td>{item.merk}</td>
                                    <td>{item.deskripsi}</td>
                                    <td>{item.harga}</td>
                                    <td>{item.stok}</td>
                                    <td><button onClick={() => navigate(`/update_produk/${item._id}`)}>Ubah Data</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => navigate('/dashboard_admin')}>
                        back to dashboard
                    </button>
                </div>
            </div>
        </center>
    );
};

export default ListProduk;
