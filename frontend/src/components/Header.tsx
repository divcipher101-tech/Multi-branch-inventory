import { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, LogOut, Settings, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onLogout?: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const [user, setUser] = useState<{name?: string, role?: string}>({ name: 'Admin User', role: 'Superadmin' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        setUser({
          name: u.name || 'Admin User',
          role: u.role || 'Superadmin'
        });
      } catch(e) {}
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <header className="top-header">
      <div className="header-search">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="Search products, branches..." />
      </div>
      
      <div className="header-actions">
        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
          <span className="badge pulse">3</span>
        </button>
        
        <div className="user-profile-container" ref={dropdownRef}>
          <div className="user-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown slide-down-fade">
              <div className="dropdown-header">
                <p className="dropdown-name">{user.name}</p>
                <p className="dropdown-email">{user.name?.toLowerCase().replace(' ', '')}@nectar.com</p>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/settings'); }}>
                <UserCircle size={16} /> My Profile
              </button>
              <button className="dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/settings'); }}>
                <Settings size={16} /> Settings
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item text-danger" onClick={handleLogoutClick}>
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
