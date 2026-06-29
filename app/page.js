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
    <div className="flex-1 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 text-black selection:bg-black selection:text-white font-sans">
      
      {/* Top Header Section */}
      <header className="max-w-3xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black pb-6 mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-black flex items-center justify-center border border-black shrink-0">
            <span className="text-white font-extrabold text-xl tracking-tight">LK</span>
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase block font-mono">Department of Examinations · Sri Lanka</span>
            <span className="text-lg font-black tracking-tight text-black block uppercase font-serif-header">National Evaluation & Testing Service</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <Link 
            href="/admin/login" 
            className="btn btn-sm btn-outline tracking-wider flex items-center gap-1.5 uppercase rounded-xl border-zinc-300 hover:bg-black hover:text-white"
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
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black font-serif-header">
            Urgent Candidate Inquiry Portal
          </h1>
          <p className="text-zinc-650 text-xs tracking-wide uppercase font-semibold font-mono mt-1">
            G.C.E. Advanced Level (A/L) Examination – 2026
          </p>
        </div>

        {/* Instructions to Candidates Box */}
        <div className="card bg-base-100 border border-zinc-300 rounded-2xl mb-8 p-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2 mb-2.5 font-mono">
            <span className="h-1.5 w-1.5 bg-black rounded-full inline-block"></span>
            Instructions to Candidates
          </h2>
          <ul className="text-[11px] text-zinc-650 space-y-2 list-decimal list-inside leading-relaxed">
            <li><strong>Strict Single-Submission Policy:</strong> Under administrative guidelines, candidates are restricted to a single submission. Double submissions sharing the same Registration Number or Identity Card (NIC) will be auto-flagged and blocked.</li>
            <li><strong>Information Verification:</strong> The full name entered must precisely match the details printed on your school register or private application receipt.</li>
            <li><strong>Registration Number Check:</strong> Enter your official 6-digit registration key. Only registered even integers between <span className="font-mono text-black font-semibold">600000</span> and <span className="font-mono text-black font-semibold">900000</span> will be processed.</li>
          </ul>
        </div>

        {/* Form Container */}
        <div className="card bg-base-100 border border-black p-6 sm:p-8 rounded-2xl shadow-sm relative">
          
          {/* Success Banner */}
          {state?.success && (
            <div className="alert bg-zinc-50 border border-black text-black text-xs flex items-start gap-3 rounded-xl mb-6 animate-fade-in-up">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider font-mono">Inquiry Registered Successfully</p>
                <p className="mt-1 text-zinc-600 leading-relaxed font-mono">{state.message}</p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {state?.error && (
            <div className="alert bg-zinc-50 border border-zinc-300 text-black text-xs flex items-start gap-3 rounded-xl mb-6 animate-fade-in-up">
              <AlertCircle className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider font-mono">Registration Rejected</p>
                <p className="mt-1 text-zinc-655 leading-relaxed font-mono">{state.error}</p>
              </div>
            </div>
          )}

          <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
            
            {/* Divider & Section title */}
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">SECTION 01: Candidate Credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Registration Number */}
              <div>
                <label htmlFor="registrationNumber" className="block text-[10px] font-bold text-zinc-550 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>A/L Registration Number</span>
                  <span className="text-[9px] text-zinc-400 font-mono">Range: 600000 - 900000</span>
                </label>
                <div className="relative font-mono">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                    <Hash className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="registrationNumber"
                    id="registrationNumber"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value.replace(/\D/g, ''))}
                    className="input input-bordered w-full pl-10 pr-10 text-xs uppercase rounded-xl placeholder-zinc-400"
                    placeholder="e.g., 724056"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                    {regNum && (
                      regNumError ? (
                        <AlertCircle className="w-4 h-4 text-black" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-black" />
                      )
                    )}
                  </span>
                </div>
                {(regNumError || (showErrors && getRegNumError())) && (
                  <p className="mt-1.5 text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {regNumError || getRegNumError()}
                  </p>
                )}
              </div>

              {/* ID Number */}
              <div>
                <label htmlFor="idNumber" className="block text-[10px] font-bold text-zinc-550 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>National Identity Card (NIC)</span>
                  <span className="text-[9px] text-zinc-400 font-mono">9-digit V/X or 12-digit</span>
                </label>
                <div className="relative font-mono">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    value={idNum}
                    onChange={(e) => setIdNum(e.target.value)}
                    className="input input-bordered w-full pl-10 pr-10 text-xs uppercase rounded-xl placeholder-zinc-400"
                    placeholder="e.g., 200012345678"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                    {idNum && (
                      idNumError ? (
                        <AlertCircle className="w-4 h-4 text-black" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-black" />
                      )
                    )}
                  </span>
                </div>
                {(idNumError || (showErrors && getIdNumError())) && (
                  <p className="mt-1.5 text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {idNumError || getIdNumError()}
                  </p>
                )}
              </div>

            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-[10px] font-bold text-zinc-550 uppercase tracking-wider mb-2">
                Candidate Full Name (in block letters)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full pl-10 pr-10 text-xs rounded-xl placeholder-zinc-400"
                  placeholder="e.g., Mohamed Rishan"
                  required
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                  {name && (
                    nameError ? (
                      <AlertCircle className="w-4 h-4 text-black" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-black" />
                    )
                  )}
                </span>
              </div>
              {(nameError || (showErrors && getNameError())) && (
                <p className="mt-1.5 text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {nameError || getNameError()}
                </p>
              )}
            </div>

            {/* Divider & Section title */}
            <div className="border-b border-zinc-200 pb-2 pt-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">SECTION 02: Declaration of Issue</span>
            </div>

            {/* Issue Description */}
            <div>
              <label htmlFor="issueDescription" className="block text-[10px] font-bold text-zinc-550 uppercase tracking-wider mb-2">
                Detailed Description of Administrative Error / Discrepancy
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3.5 text-zinc-400">
                  <FileText className="w-4 h-4" />
                </span>
                <textarea
                  name="issueDescription"
                  id="issueDescription"
                  rows={4}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="textarea textarea-bordered w-full pl-10 pr-10 text-xs rounded-xl placeholder-zinc-400 py-2.5"
                  placeholder="State the correct subjects, centers, or medium corrections required..."
                  required
                />
                <span className="absolute top-3 right-3.5">
                  {issue && (
                    issueError ? (
                      <AlertCircle className="w-4 h-4 text-black" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-black" />
                    )
                  )}
                </span>
              </div>
              {(issueError || (showErrors && getIssueError())) && (
                <p className="mt-1.5 text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {issueError || getIssueError()}
                </p>
              )}
            </div>

            {/* Candidate Declaration Checked */}
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="candidateDeclaration"
                  checked={declared}
                  onChange={(e) => setDeclared(e.target.checked)}
                  className="checkbox checkbox-sm rounded cursor-pointer mt-0.5"
                />
                <label htmlFor="candidateDeclaration" className="text-[11px] leading-relaxed text-zinc-650 cursor-pointer select-none">
                  I hereby certify that I am the registered candidate representing the credentials declared above. I declare that the inquiry details submitted are true, accurate, and represent an urgent exam administrative discrepancy.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || !declared}
              className="btn btn-neutral w-full tracking-widest text-xs uppercase rounded-xl gap-2 font-bold cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                  Processing...
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
      <footer className="text-center mt-12 pt-6 border-t border-zinc-200 text-[10px] text-zinc-500 uppercase tracking-widest font-mono animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p>© G.C.E. Advanced Level unit. national evaluation desk.</p>
          <div className="flex justify-center gap-4 text-zinc-400">
            <span className="hover:text-black">Ministry of Education</span>
            <span>·</span>
            <span className="hover:text-black">Terms of Evaluation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
