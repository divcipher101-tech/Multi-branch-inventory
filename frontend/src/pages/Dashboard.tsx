import { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertTriangle, ArrowUpRight, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageLayout from '../components/PageLayout';

const chartData = [
  { name: 'Mon', sales: 4000, revenue: 2400 },
  { name: 'Tue', sales: 3000, revenue: 1398 },
  { name: 'Wed', sales: 2000, revenue: 9800 },
  { name: 'Thu', sales: 2780, revenue: 3908 },
  { name: 'Fri', sales: 1890, revenue: 4800 },
  { name: 'Sat', sales: 2390, revenue: 3800 },
  { name: 'Sun', sales: 3490, revenue: 4300 },
];

export default function Dashboard() {
  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    productsCount: 0,
    lowStockCount: 0,
    totalSales: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/kpis')
      .then(res => res.json())
      .then(data => {
        setKpis(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch KPIs', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <PageLayout 
      title="Overview" 
      subtitle="Welcome back to your Nectar Dashboard."
    >
      {/* KPI Cards */}
      <div className="kpi-grid mb-8">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(15, 140, 86, 0.1)', color: 'var(--primary)' }}>
            <DollarSign size={24} />
          </div>
          <div className="kpi-details">
            <h3 className="kpi-title">Total Revenue</h3>
            <p className="kpi-value">{isLoading ? '...' : `₦${kpis.totalRevenue.toLocaleString()}`}</p>
            <span className="kpi-trend positive"><ArrowUpRight size={14} /> 12% vs last week</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <TrendingUp size={24} />
          </div>
          <div className="kpi-details">
            <h3 className="kpi-title">Total Sales (Tx)</h3>
            <p className="kpi-value">{isLoading ? '...' : kpis.totalSales.toLocaleString()}</p>
            <span className="kpi-trend positive"><ArrowUpRight size={14} /> 8% vs last week</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <Package size={24} />
          </div>
          <div className="kpi-details">
            <h3 className="kpi-title">Active Products</h3>
            <p className="kpi-value">{isLoading ? '...' : kpis.productsCount}</p>
            <span className="kpi-trend text-muted">Across all categories</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="kpi-details">
            <h3 className="kpi-title">Low Stock Alerts</h3>
            <p className="kpi-value">{isLoading ? '...' : kpis.lowStockCount}</p>
            <span className="kpi-trend negative">Requires attention</span>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Main Chart */}
        <div className="card">
          <div className="card-header flex justify-between align-center mb-6">
            <h3 className="card-title">Revenue Overview</h3>
            <button className="btn-secondary text-sm">This Week</button>
          </div>
          <div className="chart-container" style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₦${value}`} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header flex justify-between align-center mb-6">
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <div className="activity-feed space-y-4">
            <div className="activity-item flex align-center gap-3">
              <div className="activity-icon" style={{ background: 'rgba(15, 140, 86, 0.1)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '50%' }}>
                <TrendingUp size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm">New POS Sale</p>
                <p className="text-muted text-xs">Admin sold 3 items • Just now</p>
              </div>
            </div>
            
            <div className="activity-item flex align-center gap-3">
              <div className="activity-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.5rem', borderRadius: '50%' }}>
                <AlertTriangle size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm">Low Stock Alert</p>
                <p className="text-muted text-xs">Citrus Zing dropped below 200 • 1hr ago</p>
              </div>
            </div>

            <div className="activity-item flex align-center gap-3">
              <div className="activity-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.5rem', borderRadius: '50%' }}>
                <Package size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm">Inventory Received</p>
                <p className="text-muted text-xs">1,250 units of Mango Burst • 2hrs ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
