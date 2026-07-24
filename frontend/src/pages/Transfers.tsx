import { useState, useEffect } from 'react';
import { ArrowRightLeft, Truck, Loader } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Modal from '../components/Modal';
import { useBranch } from '../context/BranchContext';
import './Inventory.css';

export default function Transfers() {
  const [transfers, setTransfers] = useState<any[]>([]);
  const { branches } = useBranch();
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [productId, setProductId] = useState('');
  const [fromBranchId, setFromBranchId] = useState('');
  const [toBranchId, setToBranchId] = useState('');
  const [quantity, setQuantity] = useState('');

  const fetchData = () => {
    fetch('/api/operations/transfers')
      .then(res => res.json())
      .then(data => setTransfers(data))
      .catch(err => console.error(err));
      
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        if (data.length > 0) setProductId(data[0].id);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fromBranchId === toBranchId) {
      alert("Source and Destination branches cannot be the same");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/operations/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, fromBranchId, toBranchId, quantity })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setQuantity('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout 
      title="Stock Transfers" 
      description="Track inventory moving between the main warehouse and retail branches."
      actionButton={
        <button className="btn-primary flex align-center gap-2" onClick={() => setIsModalOpen(true)}>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Stock Transfer">
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label>Product</label>
            <select value={productId} onChange={e => setProductId(e.target.value)} required>
              {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}
            </select>
          </div>
          <div className="modal-form-group">
            <label>Source Branch</label>
            <select value={fromBranchId} onChange={e => setFromBranchId(e.target.value)} required>
              <option value="">Select Origin...</option>
              {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="modal-form-group">
            <label>Destination Branch</label>
            <select value={toBranchId} onChange={e => setToBranchId(e.target.value)} required>
              <option value="">Select Destination...</option>
              {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="modal-form-group">
            <label>Quantity to Transfer</label>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} required placeholder="e.g. 50" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader size={18} className="spin" /> : 'Initiate Transfer'}
            </button>
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
}
