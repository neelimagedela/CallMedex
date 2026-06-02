import React, { useState } from 'react';

export default function UserVerifications() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Sandeep Kumar', role: 'Doctor', date: '2026-05-26', icon: '👨‍⚕️' },
    { id: 2, name: 'Kavitha Lakshmi', role: 'Pharmacist', date: '2026-05-25', icon: '💊' },
    { id: 3, name: 'Mohan Das', role: 'Patient', date: '2026-05-25', icon: '👱' },
    { id: 4, name: 'Prakash Menon', role: 'Staff', date: '2026-05-24', icon: '👤' },
  ]);

  const [activeDisplay, setActiveDisplay] = useState(null);

  const handleViewDocs = (user) => {
    setActiveDisplay({
      type: 'view',
      title: `Document Portfolio: ${user.name}`,
      content: {
        'License Number': `LIC-${user.role.toUpperCase()}-2026-${user.id}`,
        'Issued Date': user.date,
        'Verification Status': 'Awaiting Supervisor Signoff',
        'Attached Files': ['Identity_Proof.pdf', 'Certification_Degree.pdf']
      }
    });
  };

  const handleStatusChange = (user, newStatus) => {
    setActiveDisplay({
      type: 'status',
      title: `Decision Filed: ${user.name}`,
      content: {
        'Action Selected': newStatus,
        'Effective Timestamp': new Date().toLocaleString(),
        'User Group Target': user.role,
        'Result': `Account successfully shifted into status pool: [${newStatus}]`
      }
    });
  };

  return (
    <div className="p-6 bg-[#0f1319] text-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">✅ User Verifications</h1>
        <p className="text-xs text-gray-400">Supervisor Panel &gt; User Verifications</p>
      </div>

      {/* Screen Interactive Render Engine Area */}
      {activeDisplay && (
        <div className="mb-6 bg-[#1c2128] border-2 border-emerald-500/40 p-5 rounded-xl shadow-xl animate-fade-in">
          <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
            <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              🖥️ Screen Content Display Monitor
            </h2>
            <button 
              onClick={() => setActiveDisplay(null)}
              className="px-3 py-1 bg-gray-800 text-xs text-gray-300 rounded hover:bg-gray-700 transition"
            >
              ✕ Clear Screen Output
            </button>
          </div>
          
          <div className="bg-[#12161a] p-4 rounded-lg border border-gray-800">
            <h3 className="text-sm text-blue-400 font-semibold uppercase tracking-wider mb-2">{activeDisplay.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {Object.entries(activeDisplay.content).map(([key, val]) => (
                <div key={key} className="bg-[#161b22] p-2.5 rounded border border-gray-800">
                  <span className="text-gray-400 font-medium block mb-0.5">{key}</span>
                  {Array.isArray(val) ? (
                    <div className="flex gap-2 mt-1">
                      {val.map((f, i) => <span key={i} className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded text-[11px] border border-blue-800">📄 {f}</span>)}
                    </div>
                  ) : (
                    <span className="text-gray-100 font-mono text-sm">{val}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main List Body */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 space-y-3 shadow-md">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#1c2128] rounded-xl border border-[#2d333b] transition-all hover:border-gray-700 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center text-2xl shadow-inner">
                {user.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-100 tracking-wide">{user.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{user.role} · Registered: {user.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button 
                onClick={() => handleViewDocs(user)}
                className="px-4 py-1.5 bg-[#161b22] hover:bg-[#21262d] border border-gray-600 rounded-lg text-xs font-medium text-gray-300 transition"
              >
                View Docs
              </button>
              <button 
                onClick={() => handleStatusChange(user, 'APPROVED')}
                className="w-8 h-8 flex items-center justify-center border border-emerald-500/40 rounded-lg text-emerald-500 hover:bg-emerald-500/10 text-xs transition"
              >
                ✓
              </button>
              <button 
                onClick={() => handleStatusChange(user, 'REJECTED')}
                className="w-8 h-8 flex items-center justify-center border border-rose-500/40 rounded-lg text-rose-500 hover:bg-rose-500/10 text-xs transition"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}