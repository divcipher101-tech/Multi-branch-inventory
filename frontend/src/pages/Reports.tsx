import { Download, BarChart2, PieChart, TrendingUp } from 'lucide-react';
import PageLayout from '../components/PageLayout';

export default function Reports() {
  return (
    <PageLayout 
      title="Analytics & Reports" 
      description="Generate and view predictive analytics, sales charts, and inventory forecasts."
      actionButton={
        <button className="btn-secondary">
          <Download size={18} />
          <span>Export Data</span>
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        <div className="card-view" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-muted)' }}>
          <TrendingUp size={48} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Sales Forecast</h3>
          <p>Chart functionality will be implemented in Phase 3 using Recharts.</p>
        </div>
        
        <div className="card-view" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-muted)' }}>
          <PieChart size={48} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Product Distribution</h3>
          <p>Chart functionality will be implemented in Phase 3 using Recharts.</p>
        </div>

        <div className="card-view" style={{ gridColumn: 'span 2', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-muted)' }}>
          <BarChart2 size={48} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Monthly Revenue vs Target</h3>
          <p>Chart functionality will be implemented in Phase 3 using Recharts.</p>
        </div>
      </div>
    </PageLayout>
  );
}
