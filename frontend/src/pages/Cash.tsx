import { useState, useEffect } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Inventory.css';

export default function Cash() {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/operations/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageLayout 
      title="Cash Management" 
      description="Track cash drops, operational expenses, and bank reconciliations."
      actionButton={
        <div className="flex gap-2">
          <button className="btn-secondary flex align-center gap-2">
            <ArrowDownRight size={18} /> Record Expense
          </button>
          <button className="btn-primary flex align-center gap-2">
            <ArrowUpRight size={18} /> Cash Drop
          </button>
        </div>
      }
    >
      <div className="inventory-container fade-in">
        <div className="stats-grid mb-6">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(15, 140, 86, 0.1)', color: 'var(--primary)' }}><Wallet size={24} /></div>
            <div className="stat-info">
              <h3>Expected Cash in Till</h3>
              <p className="stat-value">₦0.00</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}><ArrowDownRight size={24} /></div>
            <div className="stat-info">
              <h3>Today's Expenses</h3>
              <p className="stat-value">₦0.00</p>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Branch</th>
                <th>Amount</th>
                <th>Logged By</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                    <Wallet size={48} style={{ color: 'var(--border-color)', margin: '0 auto 1rem' }} />
                    <p>No cash logs found. All tills are balanced.</p>
                  </td>
                </tr>
              ) : (
                expenses.map((e, i) => (
                  <tr key={i}>
                    <td>{new Date(e.createdAt).toLocaleString()}</td>
                    <td><span className="badge">{e.category}</span></td>
                    <td>{e.description}</td>
                    <td>{e.branch?.name}</td>
                    <td className="text-danger font-bold">-₦{e.amount}</td>
                    <td>{e.user?.name}</td>
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
