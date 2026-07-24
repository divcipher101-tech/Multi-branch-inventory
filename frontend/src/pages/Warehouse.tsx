import { Plus, Search, MapPin, Package } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const mockLocations = [
  { id: 'WH-Main', name: 'Central Hub - Ikeja', capacity: '85%', zones: 4, manager: 'Oluwaseun B.' },
  { id: 'WH-South', name: 'Lekki Distribution Center', capacity: '60%', zones: 2, manager: 'Chioma E.' },
  { id: 'WH-East', name: 'Surulere Local Storage', capacity: '92%', zones: 1, manager: 'Tunde A.' },
];

export default function Warehouse() {
  return (
    <PageLayout 
      title="Warehouse Locations" 
      description="Manage central storage hubs and track overall capacity."
      actionButton={
        <button className="btn-primary">
          <Plus size={18} />
          <span>Add Location</span>
        </button>
      }
    >
      <div className="card-view">
        <div className="toolbar">
          <div className="search-bar">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search warehouses..." />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', padding: '1.5rem' }}>
          {mockLocations.map(loc => (
            <div key={loc.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', backgroundColor: 'var(--background)', transition: 'var(--transition-fast)' }} className="warehouse-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-dark)', fontWeight: 600 }}>
                  <MapPin size={18} />
                  <span>{loc.id}</span>
                </div>
                <span className={`status-badge ${parseInt(loc.capacity) > 90 ? 'out-of-stock' : 'in-stock'}`}>
                  {loc.capacity} Full
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{loc.name}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Storage Zones:</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{loc.zones} Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Manager:</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{loc.manager}</span>
                </div>
              </div>
              
              <button className="btn-secondary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
                <Package size={16} />
                <span>View Inventory</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
