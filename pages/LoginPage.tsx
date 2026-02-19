import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !password) return;
    performLogin(id);
  };

  const performLogin = (studentId: string) => {
    const mockUser: User = {
      id: 'usr_123',
      name: 'John Doe',
      email: 'john.doe@university.edu',
      studentId: studentId || 'STU102456',
      college: 'Global Institute of Technology',
      department: 'Computer Science',
      photoUrl: 'https://i.pravatar.cc/300?u=john'
    };
    onLogin(mockUser);
    navigate('/');
  };

  return (
    <div className="flex flex-col flex-1 p-8 bg-pattern relative min-h-full animate-in fade-in duration-700">
      <div className="mt-16 flex flex-col items-center mb-10">
        <div className="bg-primary p-5 rounded-[2rem] shadow-2xl shadow-primary/30 mb-6 group transition-transform hover:rotate-12">
          <span className="material-symbols-outlined text-dark-blue text-4xl font-black">directions_bus</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-dark-blue">SmartBus</h1>
        <p className="text-dark-blue/40 mt-2 font-bold uppercase tracking-widest text-[10px]">Student Pass Ecosystem</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-dark-blue/40 uppercase tracking-widest ml-1">Student ID</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-dark-blue/20 group-focus-within:text-primary transition-colors">person</span>
            <input 
              className="w-full h-14 pl-12 pr-4 bg-white border border-dark-blue/5 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm font-bold text-sm" 
              placeholder="Enter your ID" 
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-dark-blue/40 uppercase tracking-widest ml-1">Password</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-dark-blue/20 group-focus-within:text-primary transition-colors">lock</span>
            <input 
              className="w-full h-14 pl-12 pr-12 bg-white border border-dark-blue/5 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm font-bold text-sm" 
              placeholder="••••••••" 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-blue/20 hover:text-dark-blue transition-colors"
            >
              <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full h-16 bg-dark-blue text-white font-black text-lg rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-6"
        >
          Sign In
          <span className="material-symbols-outlined font-black">arrow_forward</span>
        </button>

        <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-dark-blue/5"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-dark-blue/20 uppercase tracking-widest">OR</span>
            <div className="flex-grow border-t border-dark-blue/5"></div>
        </div>

        <button 
          type="button"
          onClick={() => performLogin('DEMO_STUDENT')}
          className="w-full h-14 bg-primary/10 text-dark-blue font-black rounded-2xl border-2 border-primary/20 flex items-center justify-center gap-3 hover:bg-primary/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-primary">rocket_launch</span>
          Quick Presentation Mode
        </button>
      </form>

      <div className="mt-auto py-8 text-center">
        <p className="text-[11px] font-black text-dark-blue/20 uppercase tracking-[0.2em]">
          University Authorized Access Only
        </p>
      </div>
    </div>
  );
};

export default LoginPage;