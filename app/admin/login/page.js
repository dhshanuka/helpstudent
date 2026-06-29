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
    <div className="flex-1 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative bg-white text-black selection:bg-black selection:text-white font-sans">
      
      {/* Top Navbar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between mb-8 animate-fade-in-up">
        <Link 
          href="/" 
          className="btn btn-sm btn-outline tracking-wider flex items-center gap-1.5 uppercase rounded-xl border-zinc-300 hover:bg-black hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Student Portal
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest font-mono">Helpstudent Admin Portal</span>
        </div>
      </header>

      {/* Login Box */}
      <main className="max-w-md w-full mx-auto my-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black font-serif-header">
            Administrator Login
          </h1>
          <p className="mt-2 text-zinc-500 text-xs tracking-wider">
            Authenticate to access the student issue management dashboard.
          </p>
        </div>

        {/* Card Panel */}
        <div className="card bg-base-100 border border-zinc-200 p-6 sm:p-8 rounded-2xl shadow-sm relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-black rounded-t-2xl" />
          
          {/* Error Banner */}
          {state?.error && (
            <div className="alert bg-zinc-50 border border-zinc-300 text-black text-xs flex items-start gap-2.5 rounded-xl mb-6 animate-fade-in-up">
              <AlertCircle className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold uppercase tracking-wider font-mono">Login Failed</p>
                <p className="text-zinc-650 mt-1 font-mono leading-relaxed">{state.error}</p>
              </div>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-[10px] font-bold text-zinc-550 uppercase tracking-widest mb-2 font-mono">
                Username
              </label>
              <div className="relative font-mono">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="input input-bordered w-full pl-10 pr-4 py-3 rounded-xl text-xs placeholder-zinc-400"
                  placeholder="Enter admin username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[10px] font-bold text-zinc-550 uppercase tracking-widest mb-2 font-mono">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 font-mono">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input input-bordered w-full pl-10 pr-4 py-3 rounded-xl text-xs placeholder-zinc-400"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-neutral w-full tracking-widest text-xs uppercase rounded-xl font-bold cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                  Authenticating...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Seeded tip */}
          <div className="mt-6 pt-5 border-t border-zinc-200 text-center">
            <span className="inline-block px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[9px] text-zinc-500 text-left font-mono leading-relaxed">
              <strong className="text-zinc-500 font-bold uppercase tracking-wider">Dev Credentials:</strong>
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
