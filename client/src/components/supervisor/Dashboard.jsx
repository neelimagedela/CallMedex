import React, { useState } from 'react';

export default function Dashboard() {
  const [verifications, setVerifications] = useState([
    { id: 1, name: 'Dr. Sandeep Kumar', role: 'Doctor', date: '2026-05-26', icon: '👨‍⚕️' },
    { id: 2, name: 'Kavitha Lakshmi', role: 'Pharmacist', date: '2026-05-25', icon: '💊' },
    { id: 3, name: 'Mohan Das', role: 'Patient', date: '2026-05-25', icon: '👱' },
    { id: 4, name: 'Prakash Menon', role: 'Staff', date: '2026-05-24', icon: '👤' },
  ]);

  const [activeWorkspace, setActiveWorkspace] = useState(null);

  const handleAction = (item, type) => {
    setActiveWorkspace({ item, type });
  };

  return (
    <div className="p-6 bg-[#0f1319] text-gray-100 min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">🏠 Dashboard</h1>
          <p className="text-xs text-gray-400">Supervisor Panel &gt; Dashboard</p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { title: 'PENDING VERIFICATIONS', count: verifications.length, color: 'text-amber-500', border: 'border-amber-500/30', icon: '⏳' },
          { title: 'APPROVED TODAY', count: 12, color: 'text-emerald-500', border: 'border-emerald-500/30', icon: '✅' },
          { title: 'REJECTED TODAY', count: 2, color: 'text-rose-500', border: 'border-rose-500/30', icon: '❌' },
          { title: 'PENDING REPORTS', count: 5, color: 'text-purple-500', border: 'border-purple-500/30', icon: '📊' },
          { title: 'STAFF ON DUTY', count: 24, color: 'text-blue-500', border: 'border-blue-500/30', icon: '👥' },
          { title: 'OPEN TICKETS', count: 7, color: 'text-yellow-500', border: 'border-yellow-500/30', icon: '🎫' },
        ].map((card, idx) => (
          <div key={idx} className={`bg-[#161b22] border-t-4 ${card.border} p-4 rounded-xl shadow-md`}>
            <div className="text-xl mb-1">{card.icon}</div>
            <div className="text-[10px] tracking-wider text-gray-400 uppercase font-semibold">{card.title}</div>
            <div className={`text-2xl font-black mt-1 ${card.color}`}>{card.count}</div>
          </div>
        ))}
      </div>

      {/* Action/Display Canvas if active */}
      {activeWorkspace && (
        <div className="mb-6 bg-[#1c2128] border border-blue-500/40 rounded-xl p-4 shadow-lg animate-fade-in">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
            <h3 className="font-bold text-blue-400">⚡ Dynamic Live Canvas (Dashboard Event)</h3>
            <button onClick={() => setActiveWorkspace(null)} className="text-gray-400 hover:text-white text-sm">✕ Close Display</button>
          </div>
          <p className="text-sm">
            Action executed: <span className="font-semibold text-amber-400 uppercase">{activeWorkspace.type}</span> on item <strong>{activeWorkspace.item.name}</strong>.
          </p>
          <div className="mt-2 bg-[#12161a] p-3 rounded text-xs font-mono text-emerald-400">
            Status Sync: Success. Dashboard states updated in real-time.
          </div>
        </div>
      )}

      {/* Main Splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Verifications */}
        <div className="lg:col-span-2 bg-[#161b22] p-5 rounded-xl border border-[#21262d]">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">⏳ Pending Verifications</h2>
          <div className="space-y-3">
            {verifications.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-[#1c2128] rounded-lg border border-[#2d333b]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{user.icon}</span>
                  <div>
                    <h4 className="font-medium text-sm text-gray-200">{user.name}</h4>
                    <p className="text-xs text-gray-400">{user.role} · {user.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAction(user, 'Quick-Approve')} 
                    className="w-8 h-8 flex items-center justify-center border border-emerald-500/40 rounded text-emerald-500 hover:bg-emerald-500/10 text-xs transition-all"
                  >
                    ✓
                  </button>
                  <button 
                    onClick={() => handleAction(user, 'Quick-Reject')} 
                    className="w-8 h-8 flex items-center justify-center border border-rose-500/40 rounded text-rose-500 hover:bg-rose-500/10 text-xs transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full text-center py-2 bg-[#1c2128] hover:bg-[#21262d] border border-[#2d333b] text-xs text-gray-400 rounded-lg mt-4 transition-all">
            View All
          </button>
        </div>

        {/* Activity log */}
        <div className="bg-[#161b22] p-5 rounded-xl border border-[#21262d]">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">📄 My Activity Today</h2>
          <div className="space-y-4 text-xs border-l-2 border-gray-700 pl-4 ml-2">
            {[
              { text: 'Approved Dr. Priya Nair registration', time: '09:22 AM', dot: 'bg-emerald-500' },
              { text: 'Rejected LifeCare Pharmacy client (missing docs)', time: '09:10 AM', dot: 'bg-rose-500' },
              { text: 'Updated Paracetamol stock reorder level', time: '08:55 AM', dot: 'bg-blue-500' },
              { text: 'Generated monthly staff duty report', time: '08:30 AM', dot: 'bg-purple-500' },
              { text: 'Rescheduled Appointment A002', time: '08:15 AM', dot: 'bg-cyan-500' },
            ].map((act, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[21px] top-1 w-2 h-2 rounded-full ${act.dot}`} />
                <p className="text-gray-200 font-medium">{act.text}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{act.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}