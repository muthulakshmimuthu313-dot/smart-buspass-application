
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ApplicationPage from './pages/ApplicationPage';
import RenewalPage from './pages/RenewalPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';
import DigitalPassPage from './pages/DigitalPassPage';
import PaymentGateway from './pages/PaymentGateway';
import { User, BusPass, PaymentRecord } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sbp_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [pass, setPass] = useState<BusPass | null>(() => {
    const saved = localStorage.getItem('sbp_pass');
    return saved ? JSON.parse(saved) : null;
  });
  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('sbp_payments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem('sbp_user', JSON.stringify(user));
    else localStorage.removeItem('sbp_user');
  }, [user]);

  useEffect(() => {
    if (pass) localStorage.setItem('sbp_pass', JSON.stringify(pass));
    else localStorage.removeItem('sbp_pass');
  }, [pass]);

  useEffect(() => {
    localStorage.setItem('sbp_payments', JSON.stringify(payments));
  }, [payments]);

  const handleLogin = (userData: User) => setUser(userData);
  const handleLogout = () => {
    setUser(null);
    setPass(null);
    setPayments([]);
    localStorage.clear();
  };

  return (
    <div className="flex justify-center min-h-screen bg-slate-100 font-display">
      <div className="w-full max-w-[430px] bg-background-light shadow-2xl relative overflow-hidden flex flex-col h-screen md:h-[844px] md:my-auto md:rounded-[3rem] border-[8px] border-slate-900 overflow-y-auto">
        <Router>
          <Routes>
            {!user ? (
              <>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Dashboard user={user} pass={pass} onLogout={handleLogout} />} />
                <Route path="/apply" element={<ApplicationPage user={user} setPass={setPass} setPayments={setPayments} />} />
                <Route path="/renew" element={<RenewalPage user={user} pass={pass} setPass={setPass} setPayments={setPayments} />} />
                <Route path="/history" element={<PaymentHistoryPage payments={payments} />} />
                <Route path="/pass" element={<DigitalPassPage user={user} pass={pass} />} />
                <Route path="/payment" element={<PaymentGateway />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </Router>
        <div className="mt-auto pb-4 flex justify-center pointer-events-none sticky bottom-0 w-full bg-gradient-to-t from-background-light via-background-light/90 to-transparent">
          <div className="w-32 h-1.5 bg-dark-blue/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
