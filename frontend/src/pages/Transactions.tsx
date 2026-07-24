import { Search, Download, FileText } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import '../pages/Inventory.css';

const mockTransactions = [
  { id: 'TXN-8821', date: '2023-10-24 14:05', customer: 'Walk-in', amount: 4500, method: 'Cash', status: 'Success' },
  { id: 'TXN-8820', date: '2023-10-24 13:42', customer: 'SuperMart Ltd', amount: 125000, method: 'Bank Transfer', status: 'Success' },
  { id: 'TXN-8819', date: '2023-10-24 11:15', customer: 'Walk-in', amount: 800, method: 'POS', status: 'Failed' },
  { id: 'TXN-8818', date: '2023-10-24 09:30', customer: 'Fresh Grocers', amount: 45000, method: 'Credit', status: 'Pending' },
];

export default function Transactions() {
  return (
    <PageLayout 
      title="Transactions Ledger" 
      description="View all sales, POS receipts, and payment history across the company."
      actionButton={
        <button className="btn-secondary">
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      }
    >
      <div className="card-view">
        <div className="toolbar">
          <div className="search-bar">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search by TXN ID or Customer..." />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date & Time</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map(t => (
                <tr key={t.id}>
                  <td className="font-mono font-semibold text-primary">{t.id}</td>
                  <td className="text-muted">{t.date}</td>
                  <td className="font-semibold">{t.customer}</td>
                  <td>₦{t.amount.toLocaleString()}</td>
                  <td>{t.method}</td>
                  <td>
                    <span className={`status-badge ${t.status === 'Success' ? 'in-stock' : t.status === 'Pending' ? 'low-stock' : 'out-of-stock'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <button className="icon-btn-small"><FileText size={16} /></button>
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
