import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx'
import { ToastContext } from '../context/ToastContext.jsx'
import { logout as logoutAPI } from '../services/authService.js'


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try { await logoutAPI(); } catch (error) { /* optional */ }
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };

  const handleBrandClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand" onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
          <span className="navbar-brand-mark">&lt;/&gt;</span> NxtBuild
        </div>
        <div className="navbar-links">
          <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}>
            My Projects
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-user-badge">
          {user && user.name ? user.name.charAt(0).toUpperCase() : '?'}
        </div>
        <span className="navbar-username">{user && user.name ? user.name : ''}</span>
        <button className="navbar-logout" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}

export default Navbar;