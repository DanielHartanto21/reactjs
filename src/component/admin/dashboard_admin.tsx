import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DashboardAdmin: React.FC<{ token: string }> = ({ token }) => {

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  useEffect(() => {
    const listingPenjualan = async () => {
      if (!token) {
        console.error('Token is not available');
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/dashboard_admin`, {
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

        setDashboardData(fetchedData);

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    listingPenjualan();
  }, [token, navigate]);
  return (
    <div className="dashboard-container">
      <h2>Dashboard Admin</h2>
      {dashboardData && (
        <div className="dashboard-grid">
          <div className="grid-item">Total Jumlah Penjualan:{dashboardData.totalCountData}</div>
          <div className="grid-item">Total Penjualan Bulan Ini: {dashboardData.currentMonthCount}</div>
          <div className="grid-item">Total Pendapatan: {dashboardData.totalHargaSum}</div>
          <div className="grid-item">Total Pendapatan Bulan Ini:{dashboardData.currentMonthSum}</div>
        </div>
      )}

      <button onClick={() => navigate('/input_admin')}>
        Input Admin Baru
      </button>
      <button onClick={() => navigate('/list_admin')}>
        List Admin
      </button>
      <button onClick={() => navigate('/input_produk')}>
        Input Produk Baru
      </button>
      <button onClick={() => navigate('/stok_produk')}>
        List Produk
      </button>
      <button onClick={() => navigate('/list_penjualan')}>
        Penjualan
      </button>
    </div>
  );
};

export default DashboardAdmin;