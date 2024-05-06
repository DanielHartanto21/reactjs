import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface Pelanggan {
    _id: string;
    nama_user: string;
    email_user: string;
    password: string;
    nomor_telepon: string;
    alamat: string;
    jenis_kelamin: string;
}

const InfoUser: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();

    const [data, setData] = useState<Pelanggan>({
        _id: '',
        nama_user: '',
        email_user: '',
        password: '',
        nomor_telepon: '',
        alamat: '',
        jenis_kelamin: '',
    });

    const [isLocked, setIsLocked] = useState(true);

    const toggleLock = () => {
        setIsLocked(!isLocked);
    };

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/user`, {
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

            navigate('/dashboard');
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                console.error('Token is not available');
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/user`, {
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

                if (fetchedData && fetchedData.User) {
                    setData(fetchedData.User);
                } else {
                    console.error('Fetched data is invalid:', fetchedData);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchUserData();
    }, [token, navigate]);

    return (
        <center>
            <div className="info-user-wrapper">
                <div className="info-user-container">
                    <h2>User Information</h2>
                    <label htmlFor="nama_user">Nama User</label><br />
                    <input type="text" placeholder="Name" disabled={isLocked} value={data.nama_user} onChange={(e) => setData({ ...data, nama_user: e.target.value })} />
                    <br />
                    <label htmlFor="email_user">Email</label><br />
                    <input type="text" placeholder="Email" disabled={isLocked} value={data.email_user} onChange={(e) => setData({ ...data, email_user: e.target.value })} />
                    <br />
                    <label htmlFor="nomor_telepon">Nomor Telepon</label><br />
                    <input type="text" placeholder="Phone Number" disabled={isLocked} value={data.nomor_telepon} onChange={(e) => setData({ ...data, nomor_telepon: e.target.value })} />
                    <br />
                    <label htmlFor="alamat">Alamat</label><br />
                    <input type="text" placeholder="Address" disabled={isLocked} value={data.alamat} onChange={(e) => setData({ ...data, alamat: e.target.value })} />
                    <br />
                    <label htmlFor="jenis_kelamin">Jenis Kelamin</label><br />
                    <select value={data.jenis_kelamin} disabled={isLocked} onChange={(e) => setData({ ...data, jenis_kelamin: e.target.value })}>
                        {data.jenis_kelamin === "Pria" ? (
                            <>
                                <option value="Pria">Male</option>
                                <option value="Wanita">Female</option>
                            </>
                        ) : (
                            <>
                                <option value="Wanita">Female</option>
                                <option value="Pria">Male</option>
                            </>
                        )}
                    </select>
                    <br />
                    {isLocked ? (
                        <button onClick={toggleLock}>
                            Edit Data
                        </button>
                    ) : (
                        <button onClick={handleUpdateUser}>
                            Save Data
                        </button>
                    )}
                    <button onClick={() => navigate('/change_password')}>Change Password</button>
                    <br />
                    <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                </div>
            </div>
        </center>
    );
};

export default InfoUser;