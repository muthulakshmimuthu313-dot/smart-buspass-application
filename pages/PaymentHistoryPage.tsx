import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentRecord } from '../types';

interface PaymentHistoryPageProps {
  payments: PaymentRecord[];
}

const PaymentHistoryPage: React.FC<PaymentHistoryPageProps> = ({ payments }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'New' | 'Renewal'>('All');

  const filteredPayments = payments.filter(p => filter === 'All' || p.type === filter);

  const downloadReceipt = (p: PaymentRecord) => {
    const content = `
------------------------------------------
       SMARTBUS PASS - PAYMENT RECEIPT
------------------------------------------
Transaction ID: ${p.id}
Pass ID       : ${p.passId}
Date          : ${p.date}
Payment Type  : ${p.type} Pass
Amount Paid   : ₹${p.amount}
Status        : ${p.status}
------------------------------------------
Thank you for using SmartBus!
This is a computer generated receipt.
------------------------------------------
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${p.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col flex-1 pb-20">
      <div className="sticky top-0 z-20 bg-background-light/80 backdrop-blur-md px-6 py-4 flex items-center border-b border-dark-blue/5">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-dark-blue/5">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="ml-2 text-xl font-bold text-dark-blue">Transactions</h1>
      </div>

      <div className="p-6">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scroll-smooth">
          {['All', 'New', 'Renewal'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-8 h-12 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shrink-0 ${filter === f ? 'bg-dark-blue text-white shadow-lg' : 'bg-white text-dark-blue/30 border border-dark-blue/5 shadow-sm'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredPayments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-dark-blue/5 rounded-full flex items-center justify-center text-dark-blue/10 mb-6">
               <span className="material-symbols-outlined text-5xl">receipt_long</span>
            </div>
            <p className="text-sm font-bold text-dark-blue/30 uppercase tracking-widest">No Records Found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPayments.map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-dark-blue/5 flex flex-col gap-4 transition-all group">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${p.type === 'New' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    <span className="material-symbols-outlined text-2xl font-light">{p.type === 'New' ? 'stars' : 'sync'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-black text-dark-blue text-sm uppercase tracking-tight">{p.type} Pass</h4>
                      <span className="text-base font-black text-dark-blue">₹{p.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold text-dark-blue/30 uppercase tracking-widest">{p.date}</p>
                      <div className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                         <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">{p.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => downloadReceipt(p)}
                  className="w-full h-10 bg-dark-blue/5 hover:bg-dark-blue/10 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black text-dark-blue/40 uppercase tracking-[0.15em] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download Receipt
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto p-6">
         <div className="bg-dark-blue rounded-[2.5rem] p-7 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Expense Summary</p>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <p className="text-xs font-bold text-white/30">Total Orders</p>
                  <p className="text-2xl font-black">{filteredPayments.length}</p>
               </div>
               <div className="space-y-1 text-right">
                  <p className="text-xs font-bold text-white/30">Total Paid</p>
                  <p className="text-2xl font-black text-primary">₹{filteredPayments.reduce((acc, curr) => acc + curr.amount, 0)}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;