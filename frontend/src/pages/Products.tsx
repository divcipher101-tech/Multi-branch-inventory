import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import '../pages/Inventory.css'; // Reuse inventory table styles

const mockProducts = [
  { id: 'PRD-001', name: 'Nectar Gold - Orange 500ml', category: 'Citrus', price: 450, cost: 200, status: 'Active' },
  { id: 'PRD-002', name: 'Nectar Gold - Orange 1L', category: 'Citrus', price: 800, cost: 350, status: 'Active' },
  { id: 'PRD-003', name: 'Nectar Ruby - Apple 500ml', category: 'Berry & Apple', price: 500, cost: 220, status: 'Draft' },
  { id: 'PRD-004', name: 'Nectar Verde - Kiwi/Lime 1L', category: 'Tropical', price: 950, cost: 400, status: 'Active' },
];

export default function Products() {
  return (
    <PageLayout 
      title="Product Catalog" 
      description="Manage your juice product listings, pricing, and categories."
      actionButton={
        <button className="btn-primary">
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      }
    >
      <div className="card-view">
        <div className="toolbar">
          <div className="search-bar">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search products..." />
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
                <th>Product Info</th>
                <th>Category</th>
                <th>Base Cost</th>
                <th>Selling Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
                        {p.name.charAt(7)}
                      </div>
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-muted font-mono" style={{ fontSize: '0.8rem' }}>{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>₦{p.cost}</td>
                  <td className="font-semibold">₦{p.price}</td>
                  <td>
                    <span className={`status-badge ${p.status === 'Active' ? 'in-stock' : 'neutral'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn-small" title="Edit"><Edit size={16} /></button>
                      <button className="icon-btn-small danger" title="Delete"><Trash2 size={16} /></button>
                      <button className="icon-btn-small" title="More"><MoreVertical size={16} /></button>
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
