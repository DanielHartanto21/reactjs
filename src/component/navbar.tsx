
import React from 'react';
interface NavbarProps {
  onLogout: () => void;

}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };
  return (
    <nav>
      <button onClick={handleLogout} className='logout'>Logout</button>
    </nav>
  );
};

export default Navbar;
