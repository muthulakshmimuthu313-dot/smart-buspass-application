import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BusPass, PassStatus } from '../types';

interface DashboardProps {
  user: User;
  pass: BusPass | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, pass, onLogout }) => {
  const navigate = useNavigate();
  const [showChecklist, setShowChecklist] = useState(false);

  const menuItems = [
    { 
      id: 'apply', 
      label: 'Application', 
      sub: 'Apply for a new pass',
      icon: 'add_card', 
      path: '/apply', 
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      id: 'renew', 
      label: 'Renewal', 
      sub: 'Extend current pass',
      icon: 'cached', 
      path: '/renew', 
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      id: 'history', 
      label: 'Payment History', 
      sub: 'View all transactions',
      icon: 'receipt_long', 
      path: '/history', 
      bg: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    { 
      id: 'pass', 
      label: 'Digital Bus Pass', 
      sub: 'Your virtual ID card',
      icon: 'qr_code_2', 
      path: '/pass', 
      bg: 'bg-primary/10',
      iconColor: 'text-dark-blue'
    },
  ];

  const getStatusDisplay = (status: PassStatus) => {
    switch(status) {
      case PassStatus.ACTIVE: return { label: 'Active', classes: 'bg-primary/20 text-emerald-700' };
      case PassStatus.EXPIRED: return { label: 'Expired', classes: 'bg-red-100 text-red-600' };
      case PassStatus.PENDING: return { label: 'Pending', classes: 'bg-yellow-100 text-yellow-700' };
      default: return { label: 'Inactive', classes: 'bg-gray-100 text-gray-500' };
    }
  };

  return (
    <div className="flex flex-col flex-1 pb-10">
      {/* Header */}
      <div className="p-8 pb-4 flex justify-between items-center sticky top-0 bg-background-light/90 backdrop-blur-md z-30 border-b border-dark-blue/5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary shadow-sm bg-white">
              <img src={user.photoUrl || `https://ui-avatars.com/api/?name=${user.name}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary border-2 border-white rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] font-bold text-dark-blue">check</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black text-dark-blue leading-tight">Namaste, {user.name.split(' ')[0]}</h2>
            <p className="text-xs text-dark-blue/30 font-bold uppercase tracking-widest">{user.studentId}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button onClick={() => setShowChecklist(true)} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-dark-blue/5 text-primary flex items-center justify-center hover:bg-primary/5 transition-all">
             <span className="material-symbols-outlined">lightbulb</span>
           </button>
           <button onClick={onLogout} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-dark-blue/5 text-red-500 flex items-center justify-center hover:bg-red-50 transition-all active:scale-90">
             <span className="material-symbols-outlined">logout</span>
           </button>
        </div>
      </div>

      {/* Presentation Checklist Modal */}
      {showChecklist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark-blue/80 backdrop-blur-sm">
          <div className="bg-white w-full rounded-[3rem] p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black text-dark-blue tracking-tighter">Presentation Tips</h3>
               <button onClick={() => setShowChecklist(false)} className="w-10 h-10 rounded-full bg-dark-blue/5 flex items-center justify-center">
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            <div className="space-y-4">
               <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">1</div>
                  <p className="text-sm font-bold text-dark-blue/70">Show the <b>'Application'</b> logic. Explain how the price changes based on months.</p>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">2</div>
                  <p className="text-sm font-bold text-dark-blue/70">Demonstrate the <b>'Download Receipt'</b> in history to show professional documentation.</p>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">3</div>
                  <p className="text-sm font-bold text-dark-blue/70">Open the <b>'Digital Pass'</b> and show the QR code. Explain that conductors scan this.</p>
               </div>
            </div>
            <button onClick={() => setShowChecklist(false)} className="w-full h-14 bg-dark-blue text-white font-black rounded-2xl mt-4">Got it!</button>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="px-6 mt-6">
        <div className="bg-dark-blue rounded-[2.5rem] p-7 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Current Pass Status</p>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-black tracking-tight">{pass ? 'Verified' : 'Unlinked'}</h3>
                {pass && (
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${getStatusDisplay(pass.status).classes}`}>
                    {getStatusDisplay(pass.status).label}
                  </span>
                )}
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_bus</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1">Valid Till</p>
              <p className="text-sm font-bold">{pass ? pass.expiryDate : '-- / -- / --'}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1">Pass ID</p>
              <p className="text-sm font-mono tracking-tighter truncate">{pass ? pass.id : 'N/A'}</p>
            </div>
          </div>
          {pass && (
            <button onClick={() => navigate('/pass')} className="w-full mt-6 py-4 bg-primary text-dark-blue font-black rounded-2xl text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_scanner</span>
              Open Digital Pass
            </button>
          )}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-6 mt-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-lg font-black text-dark-blue tracking-tight">Quick Actions</h3>
          <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-lg uppercase tracking-wider">Services</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => navigate(item.path)} className="bg-white p-5 rounded-[2rem] border border-dark-blue/5 shadow-sm hover:shadow-md transition-all flex items-center gap-5 active:scale-[0.97] group text-left">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.iconColor} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-base font-black text-dark-blue">{item.label}</p>
                <p className="text-xs text-dark-blue/30 font-bold">{item.sub}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-dark-blue/5 flex items-center justify-center text-dark-blue/20 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;