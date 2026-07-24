import { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertTriangle, ArrowUpRight, DollarSign, ArrowDownRight, Store, Activity, ArrowRightLeft } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import PageLayout from '../components/PageLayout';
import './Dashboard.css';

// Mock data for sparklines
const sparkData1 = [{ v: 10 }, { v: 15 }, { v: 13 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 35 }];
const sparkData2 = [{ v: 30 }, { v: 25 }, { v: 35 }, { v: 30 }, { v: 45 }, { v: 40 }, { v: 55 }];
const sparkData3 = [{ v: 50 }, { v: 45 }, { v: 40 }, { v: 35 }, { v: 38 }, { v: 30 }, { v: 25 }]; // Decreasing

const revenueChartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 },
  { name: 'Aug', revenue: 8500 },
  { name: 'Sep', revenue: 7200 },
  { name: 'Oct', revenue: 9000 },
  { name: 'Nov', revenue: 11000 },
  { name: 'Dec', revenue: 13500 },
];

const branchData = [
  { name: 'Lagos HQ', revenue: 4.5 },
  { name: 'Abuja', revenue: 3.2 },
  { name: 'Port Harcourt', revenue: 2.8 },
  { name: 'Kano', revenue: 1.5 },
  { name: 'Enugu', revenue: 1.1 },
  { name: 'Ibadan', revenue: 0.8 },
];

export default function Dashboard() {
  const [kpis] = useState({
    totalRevenue: 842500,
    profit: 231800,
    inventory: 18420,
    productsCount: 0,
    lowStockCount: 14,
    branches: 6,
    monthRevenue: 18650000,
    cashBalance: 5230400,
    pendingTransfers: 5
  });

  useEffect(() => {
    // Simulating API fetch
  }, []);

  return (
    <PageLayout 
      title="Dashboard" 
      subtitle="Overview across all branches, today"
      actionButton={<button className="btn-primary">Generate report</button>}
    >
      {/* 4x2 KPI Grid */}
      <div className="kpi-grid mb-8">
        
        {/* KPI 1 */}
        <div className="glass-card kpi-card">
          <div className="kpi-card-top">
            <div className="kpi-icon-wrapper" style={{ color: 'var(--primary)' }}>
              <TrendingUp size={18} />
            </div>
            <div className="kpi-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData1}>
                  <Line type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2} dot={false} isAnimationActive={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="kpi-label">Today's sales</p>
          <h2 className="kpi-value">₦{kpis.totalRevenue.toLocaleString()}</h2>
          <div className="kpi-trend positive"><ArrowUpRight size={14} /> +12.4% vs last period</div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card kpi-card">
          <div className="kpi-card-top">
            <div className="kpi-icon-wrapper" style={{ color: 'var(--accent)' }}>
              <Activity size={18} />
            </div>
            <div className="kpi-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData2}>
                  <Line type="monotone" dataKey="v" stroke="var(--accent)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="kpi-label">Today's profit</p>
          <h2 className="kpi-value">₦{kpis.profit.toLocaleString()}</h2>
          <div className="kpi-trend positive"><ArrowUpRight size={14} /> +8.1% vs last period</div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card kpi-card">
          <div className="kpi-card-top">
            <div className="kpi-icon-wrapper" style={{ color: 'var(--text-main)' }}>
              <Package size={18} />
            </div>
            <div className="kpi-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sparkData3}>
                  <Bar dataKey="v" fill="var(--text-muted)" radius={[2,2,0,0]} opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="kpi-label">Available inventory</p>
          <h2 className="kpi-value">{kpis.inventory.toLocaleString()}</h2>
          <div className="kpi-trend negative"><ArrowDownRight size={14} /> -3.2% vs last period</div>
        </div>

        {/* KPI 4 */}
        <div className="glass-card kpi-card">
          <div className="kpi-card-top">
            <div className="kpi-icon-wrapper" style={{ color: 'var(--danger)' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <p className="kpi-label">Low stock products</p>
          <h2 className="kpi-value">{kpis.lowStockCount}</h2>
          <div className="kpi-trend negative"><ArrowDownRight size={14} /> -4% vs last period</div>
        </div>

        {/* KPI 5 */}
        <div className="glass-card kpi-card">
          <div className="kpi-card-top">
            <div className="kpi-icon-wrapper" style={{ color: '#8b5cf6' }}>
              <Store size={18} />
            </div>
          </div>
          <p className="kpi-label">Total branches</p>
          <h2 className="kpi-value">{kpis.branches}</h2>
          <div className="kpi-trend neutral">— No change vs last period</div>
        </div>

        {/* KPI 6 */}
        <div className="glass-card kpi-card">
          <div className="kpi-card-top">
            <div className="kpi-icon-wrapper" style={{ color: 'var(--success)' }}>
              <DollarSign size={18} />
            </div>
            <div className="kpi-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData1}>
                  <defs>
                    <linearGradient id="sparkArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--success)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="var(--success)" strokeWidth={2} fillOpacity={1} fill="url(#sparkArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="kpi-label">Month revenue</p>
          <h2 className="kpi-value">₦{kpis.monthRevenue.toLocaleString()}</h2>
          <div className="kpi-trend positive"><ArrowUpRight size={14} /> +5.7% vs last period</div>
        </div>

        {/* KPI 7 */}
        <div className="glass-card kpi-card">
          <div className="kpi-card-top">
            <div className="kpi-icon-wrapper" style={{ color: '#0ea5e9' }}>
              <DollarSign size={18} />
            </div>
            <div className="kpi-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData3}>
                  <Line type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="kpi-label">Cash balance</p>
          <h2 className="kpi-value">₦{kpis.cashBalance.toLocaleString()}</h2>
          <div className="kpi-trend negative"><ArrowDownRight size={14} /> -1.8% vs last period</div>
        </div>

        {/* KPI 8 */}
        <div className="glass-card kpi-card">
          <div className="kpi-card-top">
            <div className="kpi-icon-wrapper" style={{ color: '#f59e0b' }}>
              <ArrowRightLeft size={18} />
            </div>
          </div>
          <p className="kpi-label">Pending transfers</p>
          <h2 className="kpi-value">{kpis.pendingTransfers}</h2>
          <div className="kpi-trend positive"><ArrowUpRight size={14} /> +2% vs last period</div>
        </div>

      </div>

      {/* Main Charts Section */}
      <div className="dashboard-charts-grid">
        
        {/* Revenue Trend Area Chart */}
        <div className="glass-card chart-card flex-2">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Revenue trend</h3>
              <p className="chart-subtitle">Monthly revenue, last 12 months</p>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMainRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--border-solid)" tick={{fill: 'var(--text-muted)', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--border-solid)" tick={{fill: 'var(--text-muted)', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(value) => `₦${(value/1000).toFixed(1)}m`} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-solid)', border: '1px solid var(--border-color)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}
                  itemStyle={{ color: 'var(--text-main)', fontWeight: 600 }}
                  formatter={(value: any) => [`₦${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorMainRev)" activeDot={{r: 6, fill: 'var(--accent)', stroke: 'white', strokeWidth: 2}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Performance Bar Chart */}
        <div className="glass-card chart-card flex-1">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Branch performance</h3>
              <p className="chart-subtitle">Revenue this month</p>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="var(--border-solid)" tick={{fill: 'var(--text-main)', fontSize: 13, fontWeight: 500}} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'var(--background)'}}
                  contentStyle={{ backgroundColor: 'var(--surface-solid)', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                  formatter={(value: any) => [`₦${value}m`, 'Revenue']}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={24}>
                  {
                    branchData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--primary)' : index === 1 ? 'var(--accent)' : 'var(--text-muted)'} opacity={index > 1 ? 0.4 : 1} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
