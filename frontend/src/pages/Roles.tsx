import { useState, useEffect } from 'react';
import { Plus, Search, UserCog, Edit, Trash2, Loader } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Modal from '../components/Modal';
import '../pages/Inventory.css';

export default function Roles() {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STAFF');

  const fetchUsers = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setName(''); setEmail(''); setPassword(''); setRole('STAFF');
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout 
      title="Users & Roles" 
      description="Manage employee access, assign roles, and revoke permissions."
      actionButton={
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
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
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="font-semibold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <UserCog size={16} className="text-muted" />
                      {u.name}
                    </div>
                    <div className="text-muted font-mono" style={{ fontSize: '0.8rem', marginLeft: '1.5rem' }}>{u.id.substring(0, 8)}</div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className="status-badge neutral" style={{ backgroundColor: 'var(--surface-hover)', color: 'var(--text-main)' }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${u.status === 'ACTIVE' ? 'in-stock' : 'out-of-stock'}`}>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Jane Doe" />
          </div>
          <div className="modal-form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="jane@nectar.com" />
          </div>
          <div className="modal-form-group">
            <label>Temporary Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <div className="modal-form-group">
            <label>System Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="STAFF">Staff (POS & Inventory)</option>
              <option value="MANAGER">Branch Manager</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader size={18} className="spin" /> : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
}
