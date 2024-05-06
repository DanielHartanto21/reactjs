import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface Pelanggan {
    _id: string;
    nama: string;
    username: string;
    password: string;
}

const ListAdmin: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<Pelanggan[]>([]);

    useEffect(() => {
        const listingAdmin = async () => {
            if (!token) {
                console.error('Token is not available');
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/admin`, {
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

                if (Array.isArray(fetchedData.admin)) {
                    setData(fetchedData.admin);
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
                                <th>Nama</th>
                                <th>Username</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nama}</td>
                                    <td>{item.username}</td>

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

export default ListAdmin;
