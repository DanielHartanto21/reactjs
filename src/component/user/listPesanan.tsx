import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface Pesanan {
    _id: string;
    user_id: string;
    total_harga: string;
    status: string;
    tanggal: string;
}

const ListPesanan: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<Pesanan[]>([]);
    useEffect(() => {
        const listingAdmin = async () => {
            if (!token) {
                console.error('Token is not available');
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/pesanan`, {
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

        listingAdmin();
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
                                <th>Pembayaran</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{formatDate(item.tanggal)}</td>
                                    <td>{item.status}</td>
                                    <td>{item.total_harga}</td>
                                    <td><button onClick={() => navigate(`/rincian_pesanan/${item._id}`)}>Rincian Pesanan</button></td>

                                    <td><button onClick={() => navigate(`/pembayaran/${item._id}`)} disabled={!(item.status === "pending")}> Lakukan Pembayaran</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => navigate('/dashboard')}>
                        back to dashboard
                    </button>
                </div>
            </div>
        </center>
    );
};

export default ListPesanan;
