import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Archive, Warehouse, ShoppingCart, 
  Receipt, ArrowRightLeft, Users, Truck, Store, 
  DollarSign, Wallet, BarChart3, ShieldCheck, UserCog, Settings, LogOut 
} from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/inventory', label: 'Inventory', icon: Archive },
  { path: '/warehouse', label: 'Warehouse', icon: Warehouse },
  { path: '/sales', label: 'Sales (POS)', icon: ShoppingCart },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/transfers', label: 'Stock Transfers', icon: ArrowRightLeft },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/suppliers', label: 'Suppliers', icon: Truck },
  { path: '/branches', label: 'Branches', icon: Store },
  { path: '/expenses', label: 'Expenses', icon: DollarSign },
  { path: '/cash', label: 'Cash Management', icon: Wallet },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/audit', label: 'Audit Logs', icon: ShieldCheck },
  { path: '/roles', label: 'Users & Roles', icon: UserCog },
  { path: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  onLogout?: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/nectar_logo.jpg" alt="Nectar Logo" className="logo-image" />
          <div className="logo-text">
            <h2>Nectar</h2>
            <p>Ultra-Premium Distribution</p>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                >
                  <Icon className="nav-icon" size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={20} className="nav-icon" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
