import { useState, useEffect } from 'react';
import { Search, Plus, ArrowDownRight, TrendingDown } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Inventory.css';

export default function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/operations/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageLayout 
      title="Operating Expenses" 
      description="Track and manage daily operational costs across all branches."
      actionButton={
        <button className="btn-primary flex align-center gap-2">
          <Plus size={18} /> Record Expense
        </button>
      }
    >
      <div className="inventory-container fade-in">
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
                    <TrendingDown size={48} style={{ color: 'var(--border-color)', margin: '0 auto 1rem' }} />
                    <p>No expenses recorded yet.</p>
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
