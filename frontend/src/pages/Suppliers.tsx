import { useState, useEffect } from 'react';
import { Plus, Building2, Loader, Truck } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Modal from '../components/Modal';
import './Inventory.css';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const fetchSuppliers = () => {
    fetch('/api/operations/suppliers')
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/operations/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setName(''); setContact('');
        fetchSuppliers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout 
      title="Suppliers" 
      description="Manage raw materials, bottling partners, and juice concentrate vendors."
      actionButton={
        <button className="btn-primary flex align-center gap-2" onClick={() => setIsModalOpen(true)}>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Supplier">
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label>Supplier Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Fresh Farms Ltd" />
          </div>
          <div className="modal-form-group">
            <label>Contact Details (Phone/Email)</label>
            <input type="text" value={contact} onChange={e => setContact(e.target.value)} required placeholder="john@freshfarms.com" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader size={18} className="spin" /> : 'Save Supplier'}
            </button>
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
}
