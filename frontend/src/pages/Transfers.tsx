import { useState, useEffect } from 'react';
import { ArrowRightLeft, Truck } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Inventory.css';

export default function Transfers() {
  const [transfers, setTransfers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/operations/transfers')
      .then(res => res.json())
      .then(data => setTransfers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageLayout 
      title="Stock Transfers" 
      description="Track inventory moving between the main warehouse and retail branches."
      actionButton={
        <button className="btn-primary flex align-center gap-2">
          <ArrowRightLeft size={18} /> New Transfer
        </button>
      }
    >
      <div className="inventory-container fade-in">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transfers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                    <Truck size={48} style={{ color: 'var(--border-color)', margin: '0 auto 1rem' }} />
                    <p>No stock transfers found. Initiate a transfer to move goods.</p>
                  </td>
                </tr>
              ) : (
                transfers.map((t, i) => (
                  <tr key={i}>
                    <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="font-medium">{t.product?.name} ({t.product?.sku})</td>
                    <td className="font-bold text-primary">+{t.quantity}</td>
                    <td>{t.fromBranch?.name}</td>
                    <td>{t.toBranch?.name}</td>
                    <td><span className="status-badge warning">{t.status}</span></td>
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
