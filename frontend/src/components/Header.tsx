import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Settings, LogOut, UserCircle, ChevronDown, Store } from 'lucide-react';
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
    <header className="top-header glass">
      <div className="header-search-container">
        <div className="search-pill">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search products, invoices, customers..." />
        </div>
      </div>
      
      <div className="header-actions">
        <button className="branch-selector">
          <Store size={18} className="text-muted" />
          <span>All Branches</span>
          <ChevronDown size={14} className="text-muted" />
        </button>

        <div className="action-divider"></div>

        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
          <span className="badge pulse">3</span>
        </button>
        
        <button className="icon-btn" title="Settings">
          <Settings size={20} />
        </button>
        
        <div className="user-profile-container" ref={dropdownRef}>
          <div className="user-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="avatar">
              {user.name?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown slide-down-fade">
              <div className="dropdown-header">
                <div className="avatar large">
                  {user.name?.substring(0, 2).toUpperCase() || 'AD'}
                </div>
                <div className="dropdown-header-text">
                  <p className="dropdown-name">{user.name}</p>
                  <p className="dropdown-email">{user.name?.toLowerCase().replace(' ', '')}@nectar.com</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/settings'); }}>
                <UserCircle size={16} /> My Profile
              </button>
              <button className="dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/settings'); }}>
                <Settings size={16} /> Preferences
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item text-danger" onClick={handleLogoutClick}>
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
