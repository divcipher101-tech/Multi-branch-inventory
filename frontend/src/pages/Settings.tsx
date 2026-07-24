import PageLayout from '../components/PageLayout';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useTheme();
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
      </div>
    </PageLayout>
  );
}
