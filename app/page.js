'use client';

import { useActionState, useState, useEffect } from 'react';
import { submitIssueAction } from './actions';
import { AlertCircle, CheckCircle2, User, FileText, Hash, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const initialState = {
  error: null,
  success: false,
  message: '',
};

export default function StudentSubmissionPage() {
  const [state, formAction, isPending] = useActionState(submitIssueAction, initialState);

  // Live input states for client-side validation feedback
  const [regNum, setRegNum] = useState('');
  const [idNum, setIdNum] = useState('');
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [declared, setDeclared] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Reset form inputs on success
  useEffect(() => {
    if (state?.success) {
      setRegNum('');
      setIdNum('');
      setName('');
      setIssue('');
      setDeclared(false);
      setShowErrors(false);
    }
  }, [state]);

  // Validation functions
  const getRegNumError = () => {
    if (!regNum) return 'Registration number is required';
    const val = Number(regNum);
    if (isNaN(val) || !Number.isInteger(val)) return 'Must be a valid integer';
    if (val < 600000 || val > 900000) return 'Must be between 600000 and 900000';
    if (val % 2 !== 0) return 'Must be an even number (consecutive check)';
    return null;
  };

  const getIdNumError = () => {
    if (!idNum) return 'ID/NIC number is required';
    const cleaned = idNum.trim();
    if (cleaned.length < 9) return 'National Identity Card (NIC) is too short';
    const oldNicRegex = /^[0-9]{9}[vVxX]$/;
    const newNicRegex = /^[0-9]{12}$/;
    if (!oldNicRegex.test(cleaned) && !newNicRegex.test(cleaned)) {
      return 'Format: 9 digits + V/X (e.g. 123456789V) or 12 digits (e.g. 200012345678)';
    }
    return null;
  };

  const getNameError = () => {
    if (!name.trim()) return 'Full name is required';
    if (name.trim().length < 3) return 'Name must match the official candidate registration';
    return null;
  };

  const getIssueError = () => {
    if (!issue.trim()) return 'Issue description is required';
    if (issue.trim().length < 15) return 'Please describe the discrepancy in detail (min 15 characters)';
    return null;
  };

  const regNumError = regNum ? getRegNumError() : null;
  const idNumError = idNum ? getIdNumError() : null;
  const nameError = name ? getNameError() : null;
  const issueError = issue ? getIssueError() : null;

  const isFormValid = !getRegNumError() && !getIdNumError() && !getNameError() && !getIssueError() && declared;

  const handleSubmit = (e) => {
    if (!isFormValid) {
      e.preventDefault();
      setShowErrors(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header Section */}
      <header className="max-w-3xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/60 pb-6 mb-10 animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-xl tracking-tight">LK</span>
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase block font-mono">Department of Examinations · Sri Lanka</span>
            <span className="text-xl font-black tracking-tight text-white block uppercase font-serif-header">National Evaluation & Testing Service</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <Link 
            href="/admin/login" 
            className="btn btn-sm btn-outline tracking-wider flex items-center gap-2 uppercase rounded-xl border-zinc-700 hover:bg-white hover:text-black transition-all duration-300 hover:border-white font-mono text-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Office Login
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl w-full mx-auto my-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        
        {/* Portal Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-serif-header bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Urgent Inquiry Portal
          </h1>
          <p className="text-indigo-400 text-xs tracking-wider uppercase font-bold font-mono mt-1">
            G.C.E. Advanced Level (A/L) Examination – 2026
          </p>
        </div>

        {/* Instructions to Candidates Box */}
        <div className="glass-panel border-zinc-800/40 rounded-2xl mb-8 p-6 hover-scale">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2.5 mb-3.5 font-mono">
            <span className="h-2 w-2 bg-indigo-500 rounded-full inline-block animate-pulse"></span>
            Instructions to Candidates
          </h2>
          <ul className="text-xs text-zinc-400 space-y-3 list-decimal list-inside leading-relaxed">
            <li><strong className="text-zinc-200">Strict Single-Submission Policy:</strong> Candidates are restricted to a single inquiry submission. Duplicate entries using the same Registration or NIC Number will be auto-rejected.</li>
            <li><strong className="text-zinc-200">Official Details Check:</strong> The full name must match the official candidate entry on school records or application receipts.</li>
            <li><strong className="text-zinc-200">Registration Requirement:</strong> Enter your 6-digit number. Only registered even values between <span className="font-mono text-indigo-300 font-semibold">600000</span> and <span className="font-mono text-indigo-300 font-semibold">900000</span> will validate.</li>
          </ul>
        </div>

        {/* Form Container */}
        <div className="glass-panel border-zinc-800/60 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {/* Success Banner */}
          {state?.success && (
            <div className="alert bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3 rounded-xl mb-6 animate-fade-in-up">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider font-mono text-emerald-400">Inquiry Registered Successfully</p>
                <p className="mt-1 text-emerald-200/80 leading-relaxed font-mono">{state.message}</p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {state?.error && (
            <div className="alert bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 rounded-xl mb-6 animate-fade-in-up">
              <AlertCircle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider font-mono text-rose-400">Registration Rejected</p>
                <p className="mt-1 text-rose-200/80 leading-relaxed font-mono">{state.error}</p>
              </div>
            </div>
          )}

          <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
            
            {/* Divider & Section title */}
            <div className="border-b border-zinc-800 pb-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">SECTION 01: Candidate Credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Registration Number */}
              <div>
                <label htmlFor="registrationNumber" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between font-mono">
                  <span>A/L Registration Number</span>
                  <span className="text-[9px] text-indigo-400">Range: 600000 - 900000</span>
                </label>
                <div className="relative font-mono">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-550">
                    <Hash className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="registrationNumber"
                    id="registrationNumber"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value.replace(/\D/g, ''))}
                    className="input w-full bg-slate-950/60 border border-zinc-800/80 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs uppercase rounded-xl placeholder-zinc-650 focus:outline-none transition-all py-3 pl-10 pr-10"
                    placeholder="e.g., 724056"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                    {regNum && (
                      regNumError ? (
                        <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )
                    )}
                  </span>
                </div>
                {(regNumError || (showErrors && getRegNumError())) && (
                  <p className="mt-1.5 text-[10px] text-rose-450 font-mono flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    {regNumError || getRegNumError()}
                  </p>
                )}
              </div>

              {/* ID Number */}
              <div>
                <label htmlFor="idNumber" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between font-mono">
                  <span>National Identity Card (NIC)</span>
                  <span className="text-[9px] text-indigo-400 font-mono">9-digit V/X or 12-digit</span>
                </label>
                <div className="relative font-mono">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-550">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    value={idNum}
                    onChange={(e) => setIdNum(e.target.value)}
                    className="input w-full bg-slate-950/60 border border-zinc-800/80 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs uppercase rounded-xl placeholder-zinc-650 focus:outline-none transition-all py-3 pl-10 pr-10"
                    placeholder="e.g., 200012345678"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                    {idNum && (
                      idNumError ? (
                        <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )
                    )}
                  </span>
                </div>
                {(idNumError || (showErrors && getIdNumError())) && (
                  <p className="mt-1.5 text-[10px] text-rose-450 font-mono flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    {idNumError || getIdNumError()}
                  </p>
                )}
              </div>

            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono">
                Candidate Full Name (in block letters)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-550">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input w-full bg-slate-950/60 border border-zinc-800/80 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs rounded-xl placeholder-zinc-650 focus:outline-none transition-all py-3 pl-10 pr-10"
                  placeholder="e.g., Mohamed Rishan"
                  required
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                  {name && (
                    nameError ? (
                      <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )
                  )}
                </span>
              </div>
              {(nameError || (showErrors && getNameError())) && (
                <p className="mt-1.5 text-[10px] text-rose-450 font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                  {nameError || getNameError()}
                </p>
              )}
            </div>

            {/* Divider & Section title */}
            <div className="border-b border-zinc-800 pb-2 pt-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">SECTION 02: Declaration of Issue</span>
            </div>

            {/* Issue Description */}
            <div>
              <label htmlFor="issueDescription" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono">
                Detailed Description of Administrative Error / Discrepancy
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3.5 text-zinc-555">
                  <FileText className="w-4 h-4" />
                </span>
                <textarea
                  name="issueDescription"
                  id="issueDescription"
                  rows={4}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="textarea w-full bg-slate-950/60 border border-zinc-800/80 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs rounded-xl placeholder-zinc-650 py-2.5 focus:outline-none transition-all pl-10 pr-10"
                  placeholder="State the correct subjects, centers, or medium corrections required..."
                  required
                />
                <span className="absolute top-3 right-3.5">
                  {issue && (
                    issueError ? (
                      <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )
                  )}
                </span>
              </div>
              {(issueError || (showErrors && getIssueError())) && (
                <p className="mt-1.5 text-[10px] text-rose-450 font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                  {issueError || getIssueError()}
                </p>
              )}
            </div>

            {/* Candidate Declaration Checked */}
            <div className="p-4 bg-slate-950/45 border border-zinc-850/50 rounded-2xl">
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  id="candidateDeclaration"
                  checked={declared}
                  onChange={(e) => setDeclared(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm rounded-lg cursor-pointer mt-0.5 focus:ring-1 focus:ring-indigo-500"
                />
                <label htmlFor="candidateDeclaration" className="text-[11px] leading-relaxed text-zinc-400 cursor-pointer select-none">
                  I hereby certify that I am the registered candidate representing the credentials declared above. I declare that the inquiry details submitted are true, accurate, and represent an urgent exam administrative discrepancy.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || !declared}
              className="btn w-full tracking-widest text-xs uppercase rounded-xl gap-2 font-bold cursor-pointer transition-all duration-300 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white border-none disabled:bg-zinc-900 disabled:text-zinc-650 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                  Processing Inquiry...
                </>
              ) : (
                <>
                  Submit Inquiry Form
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

          </form>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="text-center mt-16 pt-6 border-t border-zinc-800/60 text-[10px] text-zinc-500 uppercase tracking-widest font-mono animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p>© G.C.E. Advanced Level unit. national evaluation desk.</p>
          <div className="flex justify-center gap-4 text-zinc-500">
            <span className="hover:text-zinc-300 transition-colors">Ministry of Education</span>
            <span>·</span>
            <span className="hover:text-zinc-300 transition-colors">Terms of Evaluation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
