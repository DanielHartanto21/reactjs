import React, { useState } from 'react';
import Navbar from './component/navbar';
import AdminLogin from './component/admin/adminLogin';
import DashboardUser from './component/user/dashboard';
import DashboardAdmin from './component/admin/dashboard_admin';
import UserLogin from './component/user/userLogin';
import AddUser from './component/user/addUser';
import ListAdmin from './component/admin/listAdmin';
import InputAdmin from './component/admin/inputAdmin';
import InputProduk from './component/admin/input_produk';
import ListProduk from './component/admin/listProduk';
import InfoUser from './component/user/info_user';
import ChangePassword from './component/user/change_password';
import Pesananan from './component/user/pesan';
import ListPesanan from './component/user/listPesanan';
import DetailPesanan from './component/user/detailPesanan';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pembayaran from './component/user/pembayaran';
import ListPenjualan from './component/admin/penjualan';
import DetailPenjualan from './component/admin/detail_penjualan';
import UpdateProduk from './component/admin/update_produk';
import './global.css';
const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const handleLogin = (token: string) => {
    setToken(token);
  };
  const handleLogout = () => {
    setToken(null);
  };
  return (
    <div>
      {token ? (
        <>
          <Navbar onLogout={handleLogout} />
          <Router>
            <Routes>
              <Route path='/dashboard' element={<DashboardUser token={token} />} />
              <Route path='/dashboard_admin' element={<DashboardAdmin token={token} />} />
              <Route path='/list_admin' element={<ListAdmin token={token} />} />
              <Route path='/input_admin' element={<InputAdmin token={token} />} />
              <Route path='/input_produk' element={<InputProduk token={token} />} />
              <Route path='/stok_produk' element={<ListProduk token={token} />} />
              <Route path='/info_user' element={<InfoUser token={token} />} />
              <Route path='/change_password' element={<ChangePassword token={token} />} />
              <Route path='/pesan' element={<Pesananan token={token} />} />
              <Route path='/list_pesanan' element={<ListPesanan token={token} />} />
              <Route path='/rincian_pesanan/:id' element={<DetailPesanan token={token} />} />
              <Route path='/pembayaran/:id' element={<Pembayaran token={token} />} />
              <Route path='/list_penjualan' element={<ListPenjualan token={token} />} />
              <Route path='/detail_penjualan/:id' element={<DetailPenjualan token={token} />} />
              <Route path='/update_produk/:id' element={<UpdateProduk token={token} />} />
            </Routes>
          </Router>
        </>
      ) : (
        <>
          <Router>
            <Routes>
              <Route path='/new_user' element={<AddUser />} />
              <Route path='/admin_login' element={<AdminLogin onLogin={handleLogin} />} />
              <Route path='*' element={<UserLogin onLogin={handleLogin} />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
};

export default App;
