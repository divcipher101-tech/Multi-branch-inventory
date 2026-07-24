import { Search, ShieldCheck, Download } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import '../pages/Inventory.css';

const mockLogs = [
  { id: 'LOG-441', timestamp: '2023-10-24 14:05:22', user: 'Admin (System)', action: 'Updated Product PRD-002 price to ₦800', ip: '192.168.1.5' },
  { id: 'LOG-440', timestamp: '2023-10-24 11:30:00', user: 'Chioma E. (Branch Mgr)', action: 'Approved Stock Transfer TRF-1029', ip: '192.168.1.12' },
  { id: 'LOG-439', timestamp: '2023-10-24 09:15:10', user: 'Oluwaseun B. (WH Mgr)', action: 'Logged In', ip: '192.168.1.8' },
  { id: 'LOG-438', timestamp: '2023-10-23 18:00:05', user: 'System Auto', action: 'Daily Database Backup Completed', ip: 'localhost' },
];

export default function AuditLogs() {
  return (
    <PageLayout 
      title="System Audit Logs" 
      description="Track every action performed within the system for maximum security and accountability."
      actionButton={
        <button className="btn-secondary">
          <Download size={18} />
          <span>Export Logs</span>
        </button>
      }
    >
      <div className="card-view">
        <div className="toolbar">
          <div className="search-bar">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search logs by user, action, or date..." />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>User / System</th>
                <th>Action Performed</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map(log => (
                <tr key={log.id}>
                  <td className="font-mono text-muted">{log.id}</td>
                  <td className="font-mono">{log.timestamp}</td>
                  <td className="font-semibold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={16} className={log.user.includes('System') ? 'text-primary' : 'text-muted'} />
                    {log.user}
                  </td>
                  <td>{log.action}</td>
                  <td className="font-mono text-muted">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
