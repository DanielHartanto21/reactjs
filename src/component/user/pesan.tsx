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

const Pesananan: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<Produk[]>([]);
    const [orderedItems, setOrderedItems] = useState<{ [key: string]: number }>({});

    const handleInput = (id: string, value: number) => {
        const selectedItem = data.find(item => item._id === id);
        if (selectedItem) {
            if (value > selectedItem.stok || value < 0) {
                value = selectedItem.stok || 0;
            }
            setOrderedItems({ ...orderedItems, [id]: value });
        }
    };

    const decrement = (id: string) => {
        if (orderedItems[id] > 0) {
            setOrderedItems({ ...orderedItems, [id]: orderedItems[id] - 1 });
        }
    };

    const increment = (id: string) => {
        setOrderedItems({ ...orderedItems, [id]: orderedItems[id] ? orderedItems[id] + 1 : 1 });
    };
    const totalPricePerItem = Object.keys(orderedItems).map((id) => {
        const selectedItem = data.find((item) => item._id === id);
        return (selectedItem ? orderedItems[id] * selectedItem.harga : 0);
    });
    const totalPrice = totalPricePerItem.reduce((acc, curr) => acc + curr, 0);
    const handleSubmit = async () => {
        try {
            if (Object.keys(orderedItems).length === 0) {
                alert('Please select at least one item to order');
                return;
            }
            const itemsWithPrice = Object.keys(orderedItems)
                .map((id) => ({
                    _id: id,
                    jumlah: orderedItems[id],
                    totalHarga: orderedItems[id] * (data.find(item => item._id === id)?.harga || 0),
                }))
                .filter((item) => item.jumlah > 0);
            const totalPrice = itemsWithPrice.reduce((total, item) => total + item.totalHarga, 0);
            console.log(totalPrice);
            console.log(itemsWithPrice);
            const response = await fetch(`http://localhost:8080/api/pesanan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`, // Use the token parameter directly
                },
                body: JSON.stringify({ total_harga: totalPrice, items: itemsWithPrice }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to place the order');
            }

            const responseData = await response.json();

            navigate(`/pembayaran/${responseData.savedPesanan._id}`);
        } catch (error) {
            console.error('Failed to place the order:', error);
        }
    };

    useEffect(() => {
        const listingProduk = async () => {
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

        listingProduk();
    }, [token, navigate]);
    return (
        <center>
            <div className='order-wrapper'>
                <div className='order-container'>
                    <h2>Buat Pesanan</h2>
                    <table >
                        <thead>
                            <tr>
                                <th>Nama Produk</th>
                                <th>Kategori</th>
                                <th>Merk</th>
                                <th>deskripsi barang</th>
                                <th>Harga</th>
                                <th>Stok</th>
                                <th>Jumlah Pesan</th>
                                <th>Total Harga</th>
                                {/* <th>Ubah data</th> */}
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
                                    <td>

                                        <button className="quantity-btn" onClick={() => decrement(item._id)}>-</button>
                                        <input
                                            type="number"
                                            min="0"
                                            max={item.stok}
                                            value={orderedItems[item._id] || 0}
                                            onChange={(e) => handleInput(item._id, parseInt(e.target.value))}
                                        />
                                        <button className="quantity-btn" onClick={() => increment(item._id)}>+</button>
                                    </td>
                                    <td>{orderedItems[item._id] ? orderedItems[item._id] * item.harga : 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <div>
                        <strong>Total Price: {totalPrice}</strong>
                    </div>
                    <button onClick={handleSubmit}>Order</button>
                    <button onClick={() => navigate('/dashboard')}>
                        back to dashboard
                    </button>
                </div>
            </div>
        </center>
    );
};

export default Pesananan;
