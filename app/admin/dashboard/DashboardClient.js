'use client';

import { useState } from 'react';
import { logoutAdminAction } from '@/app/actions';
import { Search, Download, LogOut, Calendar, Users, FileText, X, Eye, ShieldCheck, Inbox } from 'lucide-react';

export default function DashboardClient({ submissions, session }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Statistics calculation
  const totalCount = submissions.length;
  
  const todayStr = new Date().toDateString();
  const todayCount = submissions.filter(
    (sub) => new Date(sub.createdAt).toDateString() === todayStr
  ).length;

  const uniqueStudents = new Set(submissions.map((s) => s.idNumber)).size;

  // Filtering submissions based on search query
  const filteredSubmissions = submissions.filter((sub) => {
    const term = searchTerm.toLowerCase();
    return (
      sub.fullName.toLowerCase().includes(term) ||
      sub.idNumber.toLowerCase().includes(term) ||
      sub.registrationNumber.toString().includes(term) ||
      sub.issueDescription.toLowerCase().includes(term)
    );
  });

  // Client-side CSV export
  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) return;

    const headers = ['Registration Number', 'ID/NIC Number', 'Full Name', 'Submitted Date', 'Issue Description'];
    const csvRows = [
      headers.join(','),
      ...filteredSubmissions.map((sub) => [
        sub.registrationNumber,
        `"${sub.idNumber.replace(/"/g, '""')}"`,
        `"${sub.fullName.replace(/"/g, '""')}"`,
        `"${new Date(sub.createdAt).toLocaleString()}"`,
        `"${sub.issueDescription.replace(/"/g, '""')}"`,
      ].join(',')),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Helpstudent_Submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen selection:bg-indigo-500 selection:text-white">
      
      {/* Dashboard Top Header */}
      <header className="glass-panel border-b border-zinc-800/60 px-6 py-4 sticky top-0 z-40 bg-zinc-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-2 uppercase font-serif-header">
                G.C.E. A/L Evaluation Management Console
                <span className="badge bg-zinc-800 border-zinc-700 text-indigo-400 font-mono rounded-full text-[9px] font-bold py-1 px-2.5 uppercase tracking-wider">
                  Admin
                </span>
              </h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-0.5">Department of Examinations · Sri Lanka</p>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto sm:ml-0">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider font-mono">Operator ID</p>
              <p className="text-xs font-bold text-zinc-300 font-mono">{session.username}</p>
            </div>
            <button
              onClick={() => logoutAdminAction()}
              className="btn btn-sm btn-outline tracking-wider flex items-center gap-1.5 uppercase rounded-xl border-zinc-700 hover:bg-white hover:text-black transition-all duration-300 font-mono text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {/* daisyUI Statistics Grid */}
        <section className="glass-panel border-zinc-800/40 rounded-3xl w-full grid grid-cols-1 sm:grid-cols-3 gap-0 bg-zinc-950/45 animate-fade-in-up overflow-hidden shadow-xl">
          
          {/* Card 1: Active Candidate Inquiries */}
          <div className="stat relative p-6 border-b sm:border-b-0 sm:border-r border-zinc-850/60">
            <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-indigo-500" />
            <div className="stat-figure text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div className="stat-title text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Active Inquiries</div>
            <div className="stat-value text-3xl font-black text-white mt-0.5 font-mono">{totalCount}</div>
            <div className="stat-desc text-[9px] text-zinc-500 font-mono mt-0.5">Total registered claims</div>
          </div>

          {/* Card 2: Received Today */}
          <div className="stat relative p-6 border-b sm:border-b-0 sm:border-r border-zinc-850/60">
            <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-violet-500" />
            <div className="stat-figure text-violet-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="stat-title text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Received Today</div>
            <div className="stat-value text-3xl font-black text-white mt-0.5 font-mono">{todayCount}</div>
            <div className="stat-desc text-[9px] text-zinc-500 font-mono mt-0.5">Updates in last 24h</div>
          </div>

          {/* Card 3: Total Candidates */}
          <div className="stat relative p-6">
            <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-pink-500" />
            <div className="stat-figure text-pink-400">
              <Users className="w-5 h-5" />
            </div>
            <div className="stat-title text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Unique Candidates</div>
            <div className="stat-value text-3xl font-black text-white mt-0.5 font-mono">{uniqueStudents}</div>
            <div className="stat-desc text-[9px] text-zinc-500 font-mono mt-0.5">Unique ID references</div>
          </div>

        </section>

        {/* Dashboard Tools & Table Panel */}
        <section className="glass-panel border-zinc-800/60 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Table Header / Action Bar */}
          <div className="p-5 border-b border-zinc-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-950/45">
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search candidates by name, ID, registration..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full bg-slate-950/60 border border-zinc-800/80 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500 text-xs placeholder-zinc-550 focus:outline-none transition-all py-2.5 pl-9 pr-4 font-mono text-zinc-300"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={handleExportCSV}
              disabled={filteredSubmissions.length === 0}
              className="btn btn-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white border-none tracking-widest text-xs uppercase rounded-xl flex items-center gap-1.5 font-bold cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500 transition-all active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              Export to CSV
            </button>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            {filteredSubmissions.length > 0 ? (
              <table className="table w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 font-bold uppercase tracking-widest bg-zinc-950/50 font-mono">
                    <th className="px-6 py-4">Registration No.</th>
                    <th className="px-6 py-4">NIC / ID No.</th>
                    <th className="px-6 py-4">Candidate Name</th>
                    <th className="px-6 py-4">Lodged Timestamp</th>
                    <th className="px-6 py-4">Official Status</th>
                    <th className="px-6 py-4">Declared Discrepancy</th>
                    <th className="px-6 py-4 text-center">Inquiry Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40 text-xs text-zinc-300">
                  {filteredSubmissions.map((sub) => (
                    <tr 
                      key={sub.id} 
                      className="hover:bg-slate-900/35 border-b border-zinc-850/30 transition duration-150 group"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {sub.registrationNumber}
                      </td>
                      <td className="px-6 py-4 font-mono text-zinc-400">
                        {sub.idNumber}
                      </td>
                      <td className="px-6 py-4 font-semibold text-zinc-200 uppercase">
                        {sub.fullName}
                      </td>
                      <td className="px-6 py-4 text-zinc-400 font-mono">
                        {new Date(sub.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="badge badge-sm badge-outline font-mono font-bold text-indigo-400 border-indigo-500/25 py-2.5 rounded-lg uppercase bg-indigo-950/20">
                          LODGED
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-450 max-w-xs truncate">
                        {sub.issueDescription}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="btn btn-xs btn-outline rounded-xl font-bold font-mono tracking-wider border-zinc-700 text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center mb-4">
                  <Inbox className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">No submissions found</h3>
                <p className="text-[10px] text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed font-mono">
                  {searchTerm 
                    ? 'Adjust your query to search for something else.' 
                    : 'Submissions made by Sri Lankan A/L candidates will show up here.'}
                </p>
              </div>
            )}
          </div>

          {/* Table Footer */}
          {filteredSubmissions.length > 0 && (
            <div className="p-4 bg-zinc-950/40 border-t border-zinc-800/60 text-[9px] text-zinc-550 uppercase tracking-widest font-mono flex justify-between items-center">
              <span>Showing {filteredSubmissions.length} of {totalCount} total records</span>
              <span>NETS Systems Module v1.4</span>
            </div>
          )}

        </section>
      </main>

      {/* Details Dialog Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div 
            className="modal-box glass-panel border-zinc-800/60 shadow-2xl max-w-xl w-full p-0 relative bg-zinc-950/90 rounded-3xl overflow-hidden animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800/60 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Official Inquiry Report</h2>
                <p className="text-[9px] text-zinc-500 font-mono mt-0.5">NETS Archive Stamp: {new Date(selectedSubmission.createdAt).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-sm btn-circle btn-ghost text-zinc-450 hover:text-white absolute right-3.5 top-3.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-zinc-350">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/60 border border-zinc-850/50 p-3.5 rounded-xl">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500 font-mono">Registration Key</span>
                  <span className="block text-xs font-mono font-bold text-indigo-400 mt-1">{selectedSubmission.registrationNumber}</span>
                </div>
                
                <div className="bg-slate-950/60 border border-zinc-850/50 p-3.5 rounded-xl">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500 font-mono">NIC / ID Reference</span>
                  <span className="block text-xs font-mono font-bold text-indigo-400 mt-1">{selectedSubmission.idNumber}</span>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-zinc-850/50 p-3.5 rounded-xl">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500 font-mono">Candidate Declared Name</span>
                <span className="block text-xs font-semibold text-zinc-200 uppercase mt-1">{selectedSubmission.fullName}</span>
              </div>

              <div className="bg-slate-950/60 border border-zinc-850/50 p-4 rounded-xl">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500 font-mono mb-2">Detailed Discrepancy Statement</span>
                <p className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto pr-1">
                  {selectedSubmission.issueDescription}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-950/40 border-t border-zinc-800/60 flex justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-sm bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-4 rounded-xl tracking-widest font-mono text-[10px]"
              >
                Close Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
