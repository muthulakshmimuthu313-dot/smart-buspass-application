
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BusPass, PassStatus, PaymentRecord } from '../types';

interface RenewalPageProps {
  user: User;
  pass: BusPass | null;
  setPass: (pass: BusPass) => void;
  setPayments: React.Dispatch<React.SetStateAction<PaymentRecord[]>>;
}

const RenewalPage: React.FC<RenewalPageProps> = ({ user, pass, setPass, setPayments }) => {
  const navigate = useNavigate();
  const [passId, setPassId] = useState(pass?.id || '');
  const [duration, setDuration] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleRenew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pass) return;
    setLoading(true);

    setTimeout(() => {
      const d = new Date(pass.expiryDate.split('/').reverse().join('-'));
      if (isNaN(d.getTime())) {
          // Fallback if date parsing fails
          const now = new Date();
          now.setMonth(now.getMonth() + parseInt(duration));
          pass.expiryDate = now.toLocaleDateString('en-IN');
      } else {
          d.setMonth(d.getMonth() + parseInt(duration));
          pass.expiryDate = d.toLocaleDateString('en-IN');
      }
      
      const updatedPass: BusPass = { ...pass, status: PassStatus.ACTIVE };
      const payment: PaymentRecord = {
        id: 'PAY' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        date: new Date().toLocaleDateString('en-IN'),
        amount: parseInt(duration) * 450,
        type: 'Renewal',
        status: 'Successful',
        passId: pass.id
      };

      setPass(updatedPass);
      setPayments(prev => [payment, ...prev]);
      setLoading(false);
      navigate('/pass');
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1 pb-10">
      <div className="sticky top-0 z-20 bg-background-light/80 backdrop-blur-md px-6 py-4 flex items-center border-b border-dark-blue/5">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-dark-blue/5">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="ml-2 text-xl font-bold text-dark-blue">Pass Renewal</h1>
      </div>

      <div className="p-6 space-y-8">
        {!pass ? (
          <div className="bg-white rounded-[2.5rem] p-8 text-center shadow-sm border border-dark-blue/5">
             <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-500 mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">search_off</span>
             </div>
             <h3 className="text-xl font-bold text-dark-blue mb-2">No Active Pass Found</h3>
             <p className="text-xs text-dark-blue/40 font-medium mb-8">You need an existing pass to use the renewal service.</p>
             <button onClick={() => navigate('/apply')} className="w-full h-14 bg-dark-blue text-white font-bold rounded-2xl">Apply New Pass</button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-dark-blue/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest mb-1">Current Pass</p>
                  <h3 className="text-xl font-black text-dark-blue">{pass.id}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest mb-1">Expiry</p>
                  <p className="text-sm font-black text-red-500">{pass.expiryDate}</p>
                </div>
              </div>
              <div className="p-4 bg-primary/10 rounded-2xl text-[11px] font-black text-dark-blue/60 uppercase tracking-widest text-center">
                {pass.routeFrom} ➔ {pass.routeTo}
              </div>
            </div>

            <form onSubmit={handleRenew} className="space-y-6">
              <div className="flex flex-col gap-3">
                <label className="text-[11px] font-black text-dark-blue/40 uppercase tracking-widest ml-1">Extension Period</label>
                <div className="grid grid-cols-2 gap-4">
                  {['1', '3'].map(m => (
                    <button 
                      key={m}
                      type="button"
                      onClick={() => setDuration(m)}
                      className={`h-20 rounded-[1.5rem] font-black text-sm transition-all border-2 flex flex-col items-center justify-center ${duration === m ? 'bg-primary border-primary text-dark-blue shadow-lg shadow-primary/20' : 'bg-white border-dark-blue/5 text-dark-blue/30'}`}
                    >
                      <span className="text-lg">{m}</span>
                      <span className="text-[9px] uppercase tracking-widest">Months</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-dark-blue rounded-[2.5rem] p-7 text-white space-y-4 shadow-2xl">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-white/40">Renewal Fee</span>
                  <span>₹{parseInt(duration) * 500}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-white/40">Student Discount</span>
                  <span className="text-primary">-₹50</span>
                </div>
                <div className="h-px bg-white/10 my-2"></div>
                <div className="flex justify-between items-center text-2xl font-black">
                  <span>Payable</span>
                  <span className="text-primary">₹{parseInt(duration) * 450}</span>
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full h-16 bg-primary text-dark-blue font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] transition-all"
              >
                {loading ? <div className="w-6 h-6 border-3 border-dark-blue/30 border-t-dark-blue rounded-full animate-spin"></div> : 'Confirm & Pay'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenewalPage;
