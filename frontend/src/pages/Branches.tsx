import { useState, useEffect } from 'react';
import { Search, Plus, MapPin, Store, Users, Package } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Inventory.css'; // Reuse inventory table styling

export default function Branches() {
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/operations/branches')
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageLayout 
      title="Branch Operations" 
      description="Manage all retail and warehouse locations across your distribution network."
      actionButton={
        <button className="btn-primary">
          <Plus size={18} /> New Branch
        </button>
      }
    >
      <div className="inventory-container">
        <div className="inventory-header" style={{ marginBottom: '1.5rem', background: 'var(--surface-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search branches by name or location..." />
          </div>
        </div>

        <div className="table-container fade-in">
          <table className="data-table">
            <thead>
              <tr>
                <th>Branch Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>Staff Count</th>
                <th>Inventory Items</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {branches.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    <Store size={48} style={{ color: 'var(--border-color)', margin: '0 auto 1rem' }} />
                    <p>No branches found. Add your first branch location.</p>
                  </td>
                </tr>
              ) : (
                branches.map((b, i) => (
                  <tr key={i}>
                    <td className="font-medium">
                      <div className="flex align-center gap-2">
                        <Store size={16} className="text-muted" />
                        {b.name}
                      </div>
                    </td>
                    <td>
                      <div className="flex align-center gap-2">
                        <MapPin size={16} className="text-muted" />
                        {b.location}
                      </div>
                    </td>
                    <td><span className="badge">{b.type}</span></td>
                    <td>
                      <div className="flex align-center gap-2">
                        <Users size={16} className="text-muted" />
                        {b._count?.users || 0}
                      </div>
                    </td>
                    <td>
                      <div className="flex align-center gap-2">
                        <Package size={16} className="text-muted" />
                        {b._count?.inventory || 0}
                      </div>
                    </td>
                    <td><span className="status-badge success">{b.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
