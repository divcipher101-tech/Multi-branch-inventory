import { Plus, Search, UserCog, Edit, Trash2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import '../pages/Inventory.css';

const mockUsers = [
  { id: 'USR-001', name: 'Super Admin', email: 'admin@nectar.com', role: 'System Administrator', status: 'Active' },
  { id: 'USR-002', name: 'Oluwaseun B.', email: 'oluwaseun@nectar.com', role: 'Warehouse Manager', status: 'Active' },
  { id: 'USR-003', name: 'Chioma E.', email: 'chioma@nectar.com', role: 'Branch Manager', status: 'Active' },
  { id: 'USR-004', name: 'David K.', email: 'david@nectar.com', role: 'Cashier / POS', status: 'Inactive' },
];

export default function Roles() {
  return (
    <PageLayout 
      title="Users & Roles" 
      description="Manage employee access, assign roles, and revoke permissions."
      actionButton={
        <button className="btn-primary">
          <Plus size={18} />
          <span>Add User</span>
        </button>
      }
    >
      <div className="card-view">
        <div className="toolbar">
          <div className="search-bar">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search users or roles..." />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Email Address</th>
                <th>Assigned Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="font-semibold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <UserCog size={16} className="text-muted" />
                      {u.name}
                    </div>
                    <div className="text-muted font-mono" style={{ fontSize: '0.8rem', marginLeft: '1.5rem' }}>{u.id}</div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className="status-badge neutral" style={{ backgroundColor: 'var(--surface-hover)', color: 'var(--text-main)' }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${u.status === 'Active' ? 'in-stock' : 'out-of-stock'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn-small" title="Edit"><Edit size={16} /></button>
                      <button className="icon-btn-small danger" title="Revoke Access"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
