import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import './Auth.css';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Side: Branding & Value Proposition */}
      <div className="auth-brand-panel">
        {/* Animated Juice Background */}
        <div className="juice-bg-overlay"></div>
        <div className="bubbles-container">
          <div className="bubble b1"></div>
          <div className="bubble b2"></div>
          <div className="bubble b3"></div>
          <div className="bubble b4"></div>
          <div className="bubble b5"></div>
          <div className="bubble b6"></div>
          <div className="bubble b7"></div>
        </div>

        <div className="brand-content">
          <div className="brand-logo-area">
            <img src="/nectar_logo.jpg" alt="Nectar" className="brand-logo" />
            <span className="brand-name">Nectar</span>
          </div>

          <h1 className="brand-headline">
            Enterprise Juice <br /> Distribution <span className="text-highlight">Mastered.</span>
          </h1>
          <p className="brand-description">
            The all-in-one platform to manage your multi-branch inventory, process blazing-fast point-of-sale transactions, and gain real-time sales intelligence.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon"><Zap size={20} /></div>
              <div>
                <h3>Real-time Sync</h3>
                <p>Instant inventory updates across all branches.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><ShieldCheck size={20} /></div>
              <div>
                <h3>Smart Expiry Tracking</h3>
                <p>Automated alerts for perishable juice batches.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><TrendingUp size={20} /></div>
              <div>
                <h3>Advanced Analytics</h3>
                <p>Deep insights to drive your wholesale strategy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="auth-form-panel">
        <div className="form-wrapper">
          <div className="mobile-brand">
            <img src="/nectar_logo.jpg" alt="Nectar Logo" className="mobile-logo" />
            <h2>Nectar</h2>
          </div>

          <div className="form-header">
            <h2>Welcome back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="admin@nectar.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-actions">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary btn-block btn-login" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign in to Dashboard'}
              {!isLoading && <ArrowRight size={18} className="ml-2" />}
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials</p>
            <div className="demo-box">
              <div className="demo-row"><span>Email:</span> <strong>admin@nectar.com</strong></div>
              <div className="demo-row"><span>Password:</span> <strong>password123</strong></div>
            </div>
          </div>
          
          <div className="auth-footer">
            <p>© 2026 Nectar Distribution Limited. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
