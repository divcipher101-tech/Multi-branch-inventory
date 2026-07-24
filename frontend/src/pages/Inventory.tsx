import { useState, useEffect } from 'react';
import { Search, Plus, Filter, AlertCircle } from 'lucide-react';
import './Inventory.css';

export default function Inventory() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => {
        setInventory(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch inventory', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="inventory-page">
      <div className="page-header">
        <div>
          <h1>Inventory Management</h1>
          <p>View, track, and manage all product stock across the network.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="inventory-card">
        <div className="inventory-toolbar">
          <div className="search-bar">
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search by product name, ID, or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Information</th>
                <th>Category</th>
                <th>Batch #</th>
                <th>Expiry Date</th>
                <th>Stock Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading inventory from Neon Database...</td></tr>
              ) : inventory.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="font-semibold">{item.product.name}</div>
                    <div className="text-muted font-mono" style={{ fontSize: '0.8rem' }}>{item.product.sku}</div>
                  </td>
                  <td>{item.product.category}</td>
                  <td className="font-mono">{item.batchNumber || 'N/A'}</td>
                  <td>
                    {item.isExpiringSoon && <AlertCircle size={14} className="text-danger" style={{ display: 'inline', marginRight: '4px' }}/>}
                    {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="font-semibold">
                    {item.quantity}
                    {item.isLowStock && <span style={{ color: 'var(--danger)', marginLeft: '8px', fontSize: '0.8rem' }}>(Reorder!)</span>}
                  </td>
                  <td>
                    <span className={`status-badge ${item.quantity > item.product.reorderPoint ? 'in-stock' : item.quantity > 0 ? 'low-stock' : 'out-of-stock'}`}>
                      {item.quantity > item.product.reorderPoint ? 'Healthy' : item.quantity > 0 ? 'Low Stock' : 'Depleted'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <span className="text-muted">Showing 1 to 5 of 24 entries</span>
          <div className="page-controls">
            <button className="page-btn disabled">Previous</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
