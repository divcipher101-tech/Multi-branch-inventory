import { useState } from 'react';
import { Store, Loader } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Modal from '../components/Modal';
import { useTheme } from '../context/ThemeContext';
import { useBranch } from '../context/BranchContext';

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { refreshBranches } = useBranch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');

  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/operations/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: branchName, address: branchAddress })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setBranchName(''); setBranchAddress('');
        refreshBranches();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <PageLayout 
      title="Global Settings" 
      description="Configure your application, themes, and global company details."
    >
      <div className="card-view" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Company Profile</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '800px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>Company Name</label>
            <input type="text" defaultValue="Nectar Distribution" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface)' }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>Support Email</label>
            <input type="email" defaultValue="support@nectar.com" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface)' }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>Base Currency</label>
            <select style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface)' }}>
              <option value="NGN">NGN (₦)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>

        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', marginTop: '3rem', color: 'var(--text-main)' }}>Appearance</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn-primary" onClick={toggleDarkMode} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
            {!isDarkMode ? 'Enable Dark Mode' : 'Disable Dark Mode'}
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Toggle between light and dark themes.</span>
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', marginTop: '3rem', color: 'var(--text-main)' }}>Branches</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn-secondary" onClick={() => setIsModalOpen(true)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Store size={18} /> Add New Branch
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Create a new physical store location.</span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Branch">
        <form className="modal-form" onSubmit={handleAddBranch}>
          <div className="modal-form-group">
            <label>Branch Name</label>
            <input type="text" value={branchName} onChange={e => setBranchName(e.target.value)} required placeholder="e.g. Downtown Store" />
          </div>
          <div className="modal-form-group">
            <label>Branch Address (Optional)</label>
            <input type="text" value={branchAddress} onChange={e => setBranchAddress(e.target.value)} placeholder="123 Main St" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader size={18} className="spin" /> : 'Create Branch'}
            </button>
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
}
