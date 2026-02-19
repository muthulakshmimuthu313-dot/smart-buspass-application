import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BusPass, PassStatus } from '../types';

interface DigitalPassPageProps {
  user: User;
  pass: BusPass | null;
}

const DigitalPassPage: React.FC<DigitalPassPageProps> = ({ user, pass }) => {
  const navigate = useNavigate();
  if (!pass) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col flex-1 bg-pattern min-h-full print:bg-white">
      {/* Header - Hidden on Print */}
      <div className="px-6 py-6 flex items-center justify-between print:hidden">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-dark-blue/5">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="text-lg font-black text-dark-blue uppercase tracking-widest">Smart Pass</h1>
        <button onClick={handlePrint} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 text-primary">
          <span className="material-symbols-outlined">print</span>
        </button>
      </div>

      <div className="flex-1 px-6 pb-12 flex flex-col gap-8 print:p-0">
        <div id="pass-card" className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-dark-blue/5 relative print:shadow-none print:border-2 print:rounded-3xl">
          {/* Official Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-30deg]">
            <span className="text-8xl font-black text-dark-blue">VERIFIED VERIFIED VERIFIED</span>
          </div>

          <div className="bg-dark-blue p-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-4xl font-black">directions_bus</span>
              <div>
                <span className="font-black text-white tracking-tighter text-xl block">METRO PASS</span>
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Digital Transit Identity</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
               <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-[10px] font-black uppercase">Active</span>
               <span className="text-[8px] text-white/30 font-bold mt-1 uppercase">Valid ID</span>
            </div>
          </div>

          <div className="p-8 space-y-10 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-white shrink-0 bg-slate-100">
                <img src={user.photoUrl || `https://ui-avatars.com/api/?name=${user.name}`} alt="Student" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-black text-dark-blue uppercase leading-tight tracking-tighter mb-1 truncate">{user.name}</h2>
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md">ID: {user.studentId}</span>
                </div>
                <p className="text-[11px] font-bold text-dark-blue/30 uppercase tracking-[0.2em] leading-relaxed">{user.college}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-b border-dark-blue/5 py-8">
              <div>
                <p className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest mb-1">Pass Issued For</p>
                <div className="flex items-center gap-2">
                   <span className="text-sm font-black text-dark-blue">{pass.routeFrom}</span>
                   <span className="material-symbols-outlined text-xs text-primary">arrow_forward</span>
                   <span className="text-sm font-black text-dark-blue">{pass.routeTo}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest mb-1">Pass ID</p>
                <p className="text-sm font-mono font-black text-dark-blue">{pass.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest mb-1">Department</p>
                <p className="text-sm font-black text-dark-blue">{user.department}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest mb-1">Expires On</p>
                <p className="text-sm font-black text-red-500">{pass.expiryDate}</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-[2rem] shadow-2xl border border-dark-blue/5 relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-[2rem] scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg width="140" height="140" viewBox="0 0 150 150" className="text-dark-blue relative z-10">
                   <rect x="20" y="20" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6"/>
                   <rect x="100" y="20" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6"/>
                   <rect x="20" y="100" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6"/>
                   <rect x="100" y="100" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6"/>
                   <rect x="40" y="40" width="70" height="70" fill="currentColor" opacity="0.1"/>
                   <rect x="60" y="60" width="30" height="30" fill="currentColor"/>
                   <rect x="50" y="20" width="40" height="10" fill="currentColor" opacity="0.2"/>
                   <rect x="20" y="60" width="10" height="30" fill="currentColor" opacity="0.2"/>
                </svg>
              </div>
              <p className="mt-6 text-[10px] font-black text-dark-blue/20 uppercase tracking-[0.4em]">Encrypted QR Identity</p>
            </div>
          </div>
        </div>

        <div className="print:hidden space-y-4">
           <button 
             onClick={() => {
               alert("Pass saved to gallery (Simulated)");
             }}
             className="w-full h-14 bg-white border border-dark-blue/5 rounded-2xl flex items-center justify-center gap-3 text-sm font-black text-dark-blue shadow-sm active:scale-95 transition-all"
           >
              <span className="material-symbols-outlined text-primary">share</span>
              Share Digital Pass
           </button>
           <p className="text-center text-[10px] font-bold text-dark-blue/30 uppercase tracking-widest">Present this screen to the bus conductor</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalPassPage;