import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Warehouse from './pages/Warehouse';
import Transfers from './pages/Transfers';
import Transactions from './pages/Transactions';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Branches from './pages/Branches';
import Settings from './pages/Settings';
import Expenses from './pages/Expenses';
import Cash from './pages/Cash';
import Reports from './pages/Reports';
import AuditLogs from './pages/AuditLogs';
import Roles from './pages/Roles';

// A simple protective wrapper for authenticated routes
const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check localStorage on initial load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}><Dashboard /></Layout>
          </ProtectedRoute>
        } />
        
        {/* Placeholders for other routes */}
        <Route path="/products" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Products /></Layout></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Inventory /></Layout></ProtectedRoute>} />
        <Route path="/warehouse" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Warehouse /></Layout></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Sales /></Layout></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Transactions /></Layout></ProtectedRoute>} />
        <Route path="/transfers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Transfers /></Layout></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Customers /></Layout></ProtectedRoute>} />
        <Route path="/suppliers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Suppliers /></Layout></ProtectedRoute>} />
        <Route path="/branches" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Branches /></Layout></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Expenses /></Layout></ProtectedRoute>} />
        <Route path="/cash" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Cash /></Layout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Reports /></Layout></ProtectedRoute>} />
        <Route path="/audit" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><AuditLogs /></Layout></ProtectedRoute>} />
        <Route path="/roles" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Roles /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout onLogout={handleLogout}><Settings /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
