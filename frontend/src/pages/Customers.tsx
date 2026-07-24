import { useState, useEffect } from 'react';
import { Plus, Users, Mail, Phone, Loader } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Modal from '../components/Modal';
import './Inventory.css';

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('RETAIL');

  const fetchCustomers = () => {
    fetch('/api/operations/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/operations/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, type })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setName(''); setEmail(''); setPhone(''); setType('RETAIL');
        fetchCustomers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout 
      title="Customers" 
      description="Manage retail loyalty and wholesale B2B juice clients."
      actionButton={
        <button className="btn-primary flex align-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Customer
        </button>
      }
    >
      <div className="inventory-container fade-in">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                    <Users size={48} style={{ color: 'var(--border-color)', margin: '0 auto 1rem' }} />
                    <p>No customers found in CRM. Start selling to build your database.</p>
                  </td>
                </tr>
              ) : (
                customers.map((c, i) => (
                  <tr key={i}>
                    <td className="font-medium">{c.name}</td>
                    <td><span className={`badge ${c.type === 'WHOLESALE' ? 'primary' : ''}`}>{c.type}</span></td>
                    <td>
                      <div className="flex align-center gap-2 text-muted">
                        <Mail size={14} /> {c.email || 'N/A'}
                      </div>
                    </td>
                    <td>
                      <div className="flex align-center gap-2 text-muted">
                        <Phone size={14} /> {c.phone || 'N/A'}
                      </div>
                    </td>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label>Customer Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. John Doe or Acme Corp" />
          </div>
          <div className="modal-form-group">
            <label>Customer Type</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="RETAIL">Retail (Individual)</option>
              <option value="WHOLESALE">Wholesale (B2B)</option>
            </select>
          </div>
          <div className="modal-form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" />
          </div>
          <div className="modal-form-group">
            <label>Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234..." />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader size={18} className="spin" /> : 'Save Customer'}
            </button>
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
}
