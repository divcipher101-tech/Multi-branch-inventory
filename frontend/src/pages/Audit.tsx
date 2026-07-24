import { useState, useEffect } from 'react';
import { Search, ShieldCheck, Activity } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Inventory.css';

export default function Audit() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/operations/audit-logs')
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageLayout 
      title="Audit Logs" 
      description="Enterprise security logging. Monitor all staff activities and system changes in real-time."
    >
      <div className="inventory-container fade-in">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                    <ShieldCheck size={48} style={{ color: 'var(--border-color)', margin: '0 auto 1rem' }} />
                    <p>System is secure. No recent audit logs found.</p>
                  </td>
                </tr>
              ) : (
                logs.map((log, i) => (
                  <tr key={i}>
                    <td className="text-muted">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="font-medium">{log.user?.name}</td>
                    <td><span className="badge">{log.user?.role}</span></td>
                    <td className="font-bold text-primary">{log.action}</td>
                    <td className="text-muted">{log.details}</td>
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
