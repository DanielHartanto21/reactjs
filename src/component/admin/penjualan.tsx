import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface Pesanan {
    _id: string;
    user_id: {
        _id: string;
        nama_user: string;
        email_user: string;
        nomor_telepon: string;
        alamat: string;
        jenis_kelamin: string;
    };
    total_harga: string;
    status: string;
    tanggal: string;
}

const ListPenjualan: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<Pesanan[]>([]);
    useEffect(() => {
        const listingPenjualan = async () => {
            if (!token) {
                console.error('Token is not available');
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/penjualan`, {
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

                if (Array.isArray(fetchedData.pesanan)) {
                    setData(fetchedData.pesanan);
                } else {
                    console.error('Fetched data is not an array:', fetchedData);
                    setData([]);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        listingPenjualan();
    }, [token, navigate]);
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    return (
        <center>
            <div className='order-wrapper'>
                <div className='order-container'>

                    <table >
                        <thead>
                            <tr>
                                <th>Tanggal Pemesanan</th>
                                <th>Status</th>
                                <th>Total Harga</th>
                                <th>Deskripsi Pesanan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{formatDate(item.tanggal)}</td>
                                    <td>{item.status}</td>
                                    <td>{item.total_harga}</td>
                                    <td><button onClick={() => navigate(`/detail_penjualan/${item._id}`)}>Rincian Pesanan</button></td>
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

export default ListPenjualan;
