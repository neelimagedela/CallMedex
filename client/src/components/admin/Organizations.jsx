import React, { useState } from 'react';

const OrganizationsView = () => {
  const [orgs, setOrgs] = useState([
    { id: 1, name: 'MediCore Central', type: 'Hospital', branches: 3 },
    { id: 2, name: 'North Labs', type: 'Diagnostic', branches: 2 },
  ]);

  const editBranchTally = (id, currentCount) => {
    const updatedCount = prompt("Input revised active structural branch count:", currentCount);
    if (updatedCount && !isNaN(updatedCount)) {
      setOrgs(orgs.map(o => o.id === id ? { ...o, branches: parseInt(updatedCount, 10) } : o));
    }
  };

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <h2 className="text-2xl font-bold">🏢 Managed Institutional Networks</h2>
      <div className="bg-[#161b22] p-5 rounded-xl border border-slate-800 text-xs space-y-3">
        <p className="text-slate-400">Organization node cluster assignments layout:</p>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase">
              <th className="pb-2">Institution Name</th>
              <th className="pb-2">Classification</th>
              <th className="pb-2">Allocated Branches</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-slate-300">
            {orgs.map((o) => (
              <tr key={o.id} className="hover:bg-slate-800/10">
                <td className="py-4 text-blue-400 font-bold">{o.name}</td>
                <td className="py-4 text-slate-400">{o.type}</td>
                <td className="py-4 font-mono font-bold text-slate-100">{o.branches} Nodes</td>
                <td className="py-4">
                  <button onClick={() => editBranchTally(o.id, o.branches)} className="px-3 py-1 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-600/30">
                    Modify Node Tally
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizationsView;