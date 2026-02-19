
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentGateway: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 p-8 items-center justify-center text-center bg-white">
      <div className="w-24 h-24 rounded-[2rem] bg-primary/20 flex items-center justify-center mb-8">
        <span className="material-symbols-outlined text-primary text-5xl font-black">verified_user</span>
      </div>
      <h2 className="text-3xl font-black text-dark-blue tracking-tighter">Secure Payment</h2>
      <p className="text-dark-blue/30 text-xs font-bold mt-4 mb-12 uppercase tracking-widest leading-relaxed px-4">
        Simulated Environment<br/>Transactions are processed instantly
      </p>
      
      <div className="w-full space-y-4 text-left mb-12">
        <div className="bg-slate-50 border border-dark-blue/5 p-6 rounded-[2rem]">
          <div className="space-y-6">
            <div className="border-b border-dark-blue/10 pb-4">
              <label className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest block mb-2">Card Holder</label>
              <input readOnly value="JOHN DOE" className="w-full bg-transparent font-black text-dark-blue outline-none" />
            </div>
            <div className="border-b border-dark-blue/10 pb-4">
              <label className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest block mb-2">Card Number</label>
              <input readOnly value="**** **** **** 4242" className="w-full bg-transparent font-bold text-dark-blue outline-none tracking-widest" />
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => navigate(-1)} className="w-full h-16 bg-dark-blue text-white font-black rounded-2xl shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">payments</span>
        Complete Payment
      </button>
      <button onClick={() => navigate(-1)} className="mt-6 text-sm font-black text-red-500 uppercase tracking-widest">Cancel</button>
    </div>
  );
};

export default PaymentGateway;
