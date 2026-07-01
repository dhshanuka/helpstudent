'use client';

import { useActionState } from 'react';
import { loginAdminAction } from '../../actions';
import { AlertCircle, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const initialState = {
  error: null,
};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, initialState);

  return (
    <div className="flex-1 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between mb-8 animate-fade-in-up">
        <Link 
          href="/" 
          className="btn btn-sm bg-transparent border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900/60 hover:border-zinc-700 tracking-wider flex items-center gap-1.5 uppercase rounded-xl transition-all duration-300 font-mono text-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Student Portal
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest font-mono">Helpstudent Admin Portal</span>
        </div>
      </header>

      {/* Login Box */}
      <main className="max-w-md w-full mx-auto my-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-serif-header bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Administrator Login
          </h1>
          <p className="mt-2 text-zinc-400 text-xs tracking-wider">
            Authenticate to access the student issue management dashboard.
          </p>
        </div>

        {/* Card Panel */}
        <div className="glass-panel border-zinc-800/60 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl bg-zinc-950/60">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {/* Error Banner */}
          {state?.error && (
            <div className="alert bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 rounded-xl mb-6 animate-fade-in-up">
              <AlertCircle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold uppercase tracking-wider font-mono text-rose-400">Login Failed</p>
                <p className="text-rose-250 mt-1 font-mono leading-relaxed">{state.error}</p>
              </div>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
                Username
              </label>
              <div className="relative font-mono">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-550">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="input w-full bg-slate-950/60 border border-zinc-800/80 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs rounded-xl placeholder-zinc-650 focus:outline-none transition-all py-3 pl-10 pr-4"
                  placeholder="Enter admin username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-550 font-mono">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input w-full bg-slate-950/60 border border-zinc-800/80 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs rounded-xl placeholder-zinc-650 focus:outline-none transition-all py-3 pl-10 pr-4"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="btn w-full tracking-widest text-xs uppercase rounded-xl font-bold cursor-pointer transition-all duration-300 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white border-none disabled:bg-zinc-900 disabled:text-zinc-650 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 active:scale-[0.98] py-3 mt-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                  Authenticating Operator...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Seeded tip */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80 text-center">
            <span className="inline-block px-3 py-2.5 rounded-xl bg-slate-950/45 border border-zinc-850/50 text-[9px] text-zinc-400 text-left font-mono leading-relaxed">
              <strong className="text-indigo-400 font-bold uppercase tracking-wider">Dev Credentials:</strong>
              <br />
              User: admin | Pass: admin12345
            </span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 text-[10px] text-zinc-500 uppercase tracking-widest animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <p>© 2026 Helpstudent Admin. Closed portal.</p>
      </footer>
    </div>
  );
}
