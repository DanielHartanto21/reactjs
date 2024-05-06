import React from 'react';
import { useNavigate } from 'react-router-dom';
const DashboardUser: React.FC<{ token: string; }> = ({ token }) => {

  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <h2>Dashboard User</h2>
      <button onClick={() => navigate('/info_user')}>
        Info User
      </button>
      <button onClick={() => navigate('/pesan')}>
        Buat Pesanan
      </button>
      <button onClick={() => navigate('/list_pesanan')}>
        List Pesanan
      </button>
    </div>
  );
};

export default DashboardUser;