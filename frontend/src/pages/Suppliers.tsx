import { useState, useEffect } from 'react';
import { Search, Plus, Truck, Building2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Inventory.css';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/operations/suppliers')
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageLayout 
      title="Suppliers" 
      description="Manage raw materials, bottling partners, and juice concentrate vendors."
      actionButton={
        <button className="btn-primary flex align-center gap-2">
          <Plus size={18} /> Add Supplier
        </button>
      }
    >
      <div className="inventory-container fade-in">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Contact Info</th>
                <th>Relationship Started</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '3rem' }}>
                    <Truck size={48} style={{ color: 'var(--border-color)', margin: '0 auto 1rem' }} />
                    <p>No vendors found. Add your supply chain partners.</p>
                  </td>
                </tr>
              ) : (
                suppliers.map((s, i) => (
                  <tr key={i}>
                    <td className="font-medium">
                      <div className="flex align-center gap-2">
                        <Building2 size={16} className="text-muted" />
                        {s.name}
                      </div>
                    </td>
                    <td className="text-muted">{s.contact || 'N/A'}</td>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td><span className="status-badge success">Active</span></td>
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
