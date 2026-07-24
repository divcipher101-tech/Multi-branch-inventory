import { useState, useEffect } from 'react';
import { Search, Plus, Users, Mail, Phone, ShoppingCart } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Inventory.css';

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/operations/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageLayout 
      title="Customers" 
      description="Manage retail loyalty and wholesale B2B juice clients."
      actionButton={
        <button className="btn-primary flex align-center gap-2">
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
    </PageLayout>
  );
}
