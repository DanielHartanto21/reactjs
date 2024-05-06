import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
interface Detail {
    _id: string;
    pesanan_id: string;
    produk_id: {
        _id: string;
        nama_produk: string;
        kategori: string;
        merk: string;
        deskripsi: string;
        harga: number;
        stok: number;
    };
    jumlah: number;
    harga: number;
}
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
const Pembayaran: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<Detail[]>([]);
    const [pesanan, setPesanan] = useState<Pesanan | null>(null);
    const [pembayaran, setPayment] = useState('');
    const formattedDate = pesanan ? new Date(pesanan.tanggal).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }) : '';
    const handleInputPembayaran = async () => {
        try {
            if (pembayaran === '') {
                alert('Pilih Pembayaran sebelum melanjutkan');
                return;
            }
            const response = await fetch(`http://localhost:8080/api/pembayaran`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    pesanan_id: pesanan?._id,
                    metode_pembayaran: pembayaran,
                }),
            });

            console.log(response);
            if (!response.ok) {
                throw new Error('Failed input');
            }

            navigate('/list_pesanan');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    useEffect(() => {
        const query = async () => {
            if (!token || !id) {
                console.error('Token is not available');
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/pesanan?id=${id}`, {
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

                console.log(fetchedData);
                if (fetchedData && fetchedData.pesanan) {
                    setPesanan(fetchedData.pesanan);
                } else {
                    console.error('Fetched data is invalid:', fetchedData);
                }
                if (Array.isArray(fetchedData.detail)) {
                    console.log(fetchedData.detail);
                    setData(fetchedData.detail);
                } else {
                    console.error('Fetched data is not an array:', fetchedData);
                    setData([]);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        query();
    }, [token, navigate, id]);

    return (
        <center>
            <div className='detail-wrapper'>
                <div className='detail-container'>

                    <h2>Detail Pesanan</h2>
                    {pesanan && (
                        <>
                            <p>Total Harga: {pesanan.total_harga}</p>
                            <p>Status: {pesanan.status}</p>
                            <p>Tanggal: {formattedDate}</p>
                        </>
                    )}
                    <table >
                        <thead>
                            <tr>
                                <th>nama produk</th>
                                <th>jumlah</th>
                                <th>Total Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.produk_id.nama_produk}</td>
                                    <td>{item.jumlah}</td>
                                    <td>{item.harga}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table><br />
                    <label htmlFor="pembayaran"><strong>Pilih Pembayaran</strong></label><br />
                    <select name="Pembayaran" id="pembayaran" onChange={(e) => setPayment(e.target.value)}>
                        <option value="">Pilih Pembayaran</option>
                        <option value="Cash">Cash</option>
                        <option value="debit">Debit Card</option>
                        <option value="kredit">Credit Card</option>
                    </select><br />
                    <button onClick={handleInputPembayaran}>Lakukan Pembayaran</button>
                    <button onClick={() => navigate('/list_pesanan')}>
                        Bayar Nanti
                    </button>
                    <button onClick={() => navigate('/dashboard')}>
                        back to dashboard
                    </button>
                </div>
            </div>
        </center>
    );
};

export default Pembayaran;
