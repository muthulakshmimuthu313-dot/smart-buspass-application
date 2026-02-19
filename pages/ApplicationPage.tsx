
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BusPass, PassStatus, PaymentRecord } from '../types';

interface ApplicationPageProps {
  user: User;
  setPass: (pass: BusPass) => void;
  setPayments: React.Dispatch<React.SetStateAction<PaymentRecord[]>>;
}

const ApplicationPage: React.FC<ApplicationPageProps> = ({ user, setPass, setPayments }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    routeFrom: '',
    routeTo: '',
    duration: '1', 
    photo: null as string | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, photo: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const calculateExpiry = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + parseInt(formData.duration));
    return d.toLocaleDateString('en-IN');
  };

  const calculateAmount = () => parseInt(formData.duration) * 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const passId = 'SB' + Math.random().toString(36).substring(2, 9).toUpperCase();
      const newPass: BusPass = {
        id: passId,
        userId: user.id,
        routeFrom: formData.routeFrom,
        routeTo: formData.routeTo,
        issueDate: new Date().toLocaleDateString('en-IN'),
        expiryDate: calculateExpiry(),
        status: PassStatus.ACTIVE,
        qrCode: `PASS_${passId}_${user.studentId}`
      };

      const payment: PaymentRecord = {
        id: 'PAY' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        date: new Date().toLocaleDateString('en-IN'),
        amount: calculateAmount(),
        type: 'New',
        status: 'Successful',
        passId: passId
      };

      setPass(newPass);
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
        <h1 className="ml-2 text-xl font-bold text-dark-blue">New Application</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="bg-white p-5 rounded-3xl border border-dark-blue/5 shadow-sm space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
               <span className="material-symbols-outlined text-primary text-2xl">school</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] font-black text-dark-blue/30 uppercase tracking-[0.1em] leading-none mb-1">Affiliated College</p>
              <p className="text-sm font-bold text-dark-blue truncate">{user.college}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-dark-blue/40 uppercase tracking-widest ml-1">Route Origin</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-dark-blue/20">trip_origin</span>
              <input 
                required
                placeholder="Starting Point"
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-dark-blue/5 focus:border-primary outline-none transition-all text-sm font-bold shadow-sm"
                value={formData.routeFrom}
                onChange={(e) => setFormData(prev => ({ ...prev, routeFrom: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-dark-blue/40 uppercase tracking-widest ml-1">Route Destination</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-dark-blue/20">location_on</span>
              <input 
                required
                placeholder="End Point"
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-dark-blue/5 focus:border-primary outline-none transition-all text-sm font-bold shadow-sm"
                value={formData.routeTo}
                onChange={(e) => setFormData(prev => ({ ...prev, routeTo: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-dark-blue/40 uppercase tracking-widest ml-1">Plan Duration</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-dark-blue/20">calendar_today</span>
              <select 
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-dark-blue/5 focus:border-primary outline-none transition-all text-sm font-bold shadow-sm appearance-none"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              >
                <option value="1">Monthly (1 Month)</option>
                <option value="3">Quarterly (3 Months)</option>
                <option value="6">Half Yearly (6 Months)</option>
                <option value="12">Annual (1 Year)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-dark-blue/40 uppercase tracking-widest ml-1">Student Photo</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="photo-upload" />
            <label 
              htmlFor="photo-upload"
              className="w-full h-32 rounded-[2rem] border-2 border-dashed border-dark-blue/5 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-all overflow-hidden"
            >
              {formData.photo ? (
                <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <span className="material-symbols-outlined text-dark-blue/20 text-4xl mb-1">add_a_photo</span>
                  <p className="text-[10px] font-black text-dark-blue/30 uppercase tracking-widest">Select Image</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="bg-dark-blue rounded-[2rem] p-6 text-white space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs font-bold">Expires On</span>
            <span className="font-bold">{calculateExpiry()}</span>
          </div>
          <div className="h-px bg-white/10"></div>
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs font-bold">Total Amount</span>
            <span className="text-2xl font-black text-primary">₹{calculateAmount()}</span>
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full h-16 bg-primary text-dark-blue font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] transition-all"
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-dark-blue/30 border-t-dark-blue rounded-full animate-spin"></div>
          ) : (
            <>
              Proceed to Checkout
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplicationPage;
