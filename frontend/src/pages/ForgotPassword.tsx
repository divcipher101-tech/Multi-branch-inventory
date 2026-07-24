import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Lock, Zap, ShieldCheck } from 'lucide-react';
import './Auth.css';

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // For code inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to send email
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.join('').length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate code verification
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Side: Branding Panel */}
      <div className="auth-brand-panel">
        <div className="juice-bg-overlay"></div>
        <div className="bubbles-container">
          <div className="bubble b1"></div>
          <div className="bubble b2"></div>
          <div className="bubble b3"></div>
          <div className="bubble b4"></div>
          <div className="bubble b5"></div>
        </div>

        <div className="brand-content">
          <div className="brand-logo-area">
            <img src="/nectar_logo.jpg" alt="Nectar" className="brand-logo" />
            <span className="brand-name">Nectar</span>
          </div>

          <h1 className="brand-headline">
            Secure Password <span className="text-highlight">Recovery.</span>
          </h1>
          <p className="brand-description">
            Get back to managing your ultra-premium juice distribution network in seconds. Your data is protected by enterprise-grade security.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon"><Zap size={20} /></div>
              <div>
                <h3>Fast Recovery</h3>
                <p>Receive your secure reset link instantly.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><ShieldCheck size={20} /></div>
              <div>
                <h3>Bank-grade Security</h3>
                <p>Advanced encryption for your credentials.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form Panel */}
      <div className="auth-form-panel">
        <div className="form-wrapper">
          <Link to="/login" className="back-link mb-4 inline-flex align-center gap-2 text-muted hover-primary transition">
            <ArrowLeft size={16} /> Back to login
          </Link>

          {step === 1 && (
            <div className="form-content fade-in">
              <div className="form-header">
                <h2>Forgot password?</h2>
                <p>No worries, we'll send you reset instructions.</p>
              </div>

              <form className="auth-form" onSubmit={handleSendCode}>
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

                <button type="submit" className="btn-primary btn-block mt-2" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send reset instructions'}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="form-content fade-in">
              <div className="form-header">
                <h2>Check your email</h2>
                <p>We sent a 6-digit verification code to <strong>{email}</strong></p>
              </div>

              {error && <div className="error-alert mb-4 text-danger text-sm">{error}</div>}

              <form className="auth-form" onSubmit={handleVerifyCode}>
                <div className="flex gap-2 justify-between mb-4">
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el: HTMLInputElement | null) => { inputRefs.current[i] = el; }}
                      type="text"
                      className="code-box text-center text-lg font-bold p-3 border rounded focus-primary"
                      style={{ width: '45px', height: '55px', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      maxLength={1}
                    />
                  ))}
                </div>

                <button type="submit" className="btn-primary btn-block" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="form-content fade-in">
              <div className="form-header">
                <h2>Set new password</h2>
                <p>Your new password must be different from previously used passwords.</p>
              </div>

              <form className="auth-form" onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label>New Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required 
                      minLength={8}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary btn-block mt-2" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </div>
          )}

          <div className="auth-footer mt-8 text-center text-sm text-muted">
            <p>© 2026 Nectar Distribution Limited. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
