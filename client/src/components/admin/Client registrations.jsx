import React, { useState } from 'react';

const ClientRegistrationsView = () => {
  const [clients, setClients] = useState([
    { id: 'CR-001', name: 'LifeCare Pharmacy', type: 'Pharmacy', contact: 'Anita Shah', status: 'Pending' },
    { id: 'CR-002', name: 'City Diagnostics', type: 'Lab', contact: 'Rohit Mehta', status: 'Approved' },
  ]);

  const executeApproval = (id, name) => {
    setClients(clients.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
    alert(`Registration verified! Approved onboarding for: ${name}`);
  };

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <h2 className="text-2xl font-bold">📋 Corporate Network Registration Pipeline</h2>
      <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-[#1f242c]/30 font-semibold">
              <th className="p-4">Entity Partner Name</th>
              <th className="p-4">Classification</th>
              <th className="p-4">Point of Contact</th>
              <th className="p-4">Status Flag</th>
              <th className="p-4">Action Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-[#1f242c]/20">
                <td className="p-4 font-bold text-slate-200">{c.name}</td>
                <td className="p-4 text-slate-400">{c.type}</td>
                <td className="p-4 text-slate-400">{c.contact}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${c.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/20' : 'bg-amber-950 text-amber-400 border-amber-500/20'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button onClick={() => alert(`Reviewing supporting document files for ${c.name}`)} className="px-2 py-1 bg-slate-800 rounded">View Docs</button>
                  {c.status === 'Pending' && (
                    <button onClick={() => executeApproval(c.id, c.name)} className="px-2 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded hover:bg-emerald-600/40">
                      Approve Partner
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientRegistrationsView;