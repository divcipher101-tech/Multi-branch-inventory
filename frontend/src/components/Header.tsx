import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Settings, LogOut, UserCircle, ChevronDown, Store, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useBranch } from '../context/BranchContext';
import './Header.css';

interface HeaderProps {
  onLogout?: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const [user, setUser] = useState<{name?: string, role?: string}>({ name: 'Admin User', role: 'Superadmin' });
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { branches, activeBranchId, setActiveBranchId } = useBranch();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
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
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) {
        setBranchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeBranch = branches.find(b => b.id === activeBranchId);

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
        <div className="branch-selector-container" ref={branchRef} style={{ position: 'relative' }}>
          <button className="branch-selector" onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}>
            <Store size={18} className="text-muted" />
            <span>{activeBranch ? activeBranch.name : 'All Branches'}</span>
            <ChevronDown size={14} className="text-muted" />
          </button>
          
          {branchDropdownOpen && (
            <div className="profile-dropdown slide-down-fade" style={{ top: '100%', left: 0, width: '200px' }}>
              <button 
                className="dropdown-item" 
                onClick={() => { setActiveBranchId(null); setBranchDropdownOpen(false); }}
                style={{ fontWeight: !activeBranchId ? 'bold' : 'normal' }}
              >
                All Branches
              </button>
              {branches.map(branch => (
                <button 
                  key={branch.id} 
                  className="dropdown-item" 
                  onClick={() => { setActiveBranchId(branch.id); setBranchDropdownOpen(false); }}
                  style={{ fontWeight: activeBranchId === branch.id ? 'bold' : 'normal' }}
                >
                  {branch.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="action-divider"></div>

        <div className="theme-toggle-wrapper" title="Toggle Dark Mode">
          <Moon size={16} className={`theme-icon ${isDarkMode ? 'active' : ''}`} />
          <label className="theme-toggle">
            <input type="checkbox" checked={!isDarkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
          <Sun size={16} className={`theme-icon ${!isDarkMode ? 'active' : ''}`} />
        </div>

        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
          <span className="badge pulse">3</span>
        </button>
        
        <button className="icon-btn" title="Settings" onClick={() => navigate('/settings')}>
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
