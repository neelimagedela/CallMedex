import React, { useState } from 'react';

const PhlebotomistsView = () => {
  const [team, setTeam] = useState([
    { id: 'PH-001', name: 'Suresh Rajan', zone: 'North Zone', shift: 'Morning', phone: '9876543210', coll: 12, pend: 3, status: 'Active' },
    { id: 'PH-002', name: 'Divya Menon', zone: 'South Zone', shift: 'Morning', phone: '9988776655', coll: 8, pend: 2, status: 'Active' },
    { id: 'PH-003', name: 'Arjun Nair', zone: 'East Zone', shift: 'Evening', phone: '9012345678', coll: 5, pend: 5, status: 'On Leave' },
  ]);

  const handleDeleteStaff = (id) => {
    if (window.confirm(`Remove staff ID [${id}] from live routing registry?`)) {
      setTeam(team.filter(t => t.id !== id));
    }
  };

  const triggerShiftChange = (id) => {
    setTeam(team.map(t => t.id === id ? { ...t, shift: t.shift === 'Morning' ? 'Evening' : 'Morning' } : t));
  };

  // Calculate dynamic data tallies directly based on the modified array state
  const runningCollections = team.reduce((acc, current) => acc + current.coll, 0);

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">💉 Phlebotomist Registry</h2>
        <button onClick={() => alert('Onboard phlebotomist modal opening...')} className="bg-blue-600 text-xs font-semibold px-4 py-2 rounded-lg">+ Add Phlebotomist</button>
      </div>

      {/* Counters Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-[#161b22] p-4 rounded-xl border border-orange-500/20">
          <p className="text-slate-400 font-bold mb-1">TOTAL STAFF REGISTRY</p>
          <p className="text-2xl font-bold text-orange-500">{team.length}</p>
        </div>
        <div className="bg-[#161b22] p-4 rounded-xl border border-emerald-500/20">
          <p className="text-slate-400 font-bold mb-1">COLLECTIONS COUNT</p>
          <p className="text-2xl font-bold text-emerald-400">{runningCollections}</p>
        </div>
      </div>

      <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase bg-[#1f242c]/30 font-semibold">
              <th className="p-4">Emp ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Zone</th>
              <th className="p-4">Shift Rotation</th>
              <th className="p-4 text-emerald-400">Completed</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {team.map((p) => (
              <tr key={p.id} className="hover:bg-[#1f242c]/20">
                <td className="p-4 text-slate-500 font-mono">{p.id}</td>
                <td className="p-4 font-bold">{p.name}</td>
                <td className="p-4 text-slate-400">{p.zone}</td>
                <td className="p-4"><button onClick={() => triggerShiftChange(p.id)} className="text-blue-400 hover:underline">{p.shift} ⇆</button></td>
                <td className="p-4 text-emerald-400 font-semibold">{p.coll}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => alert(`Full summary file profile trace for ${p.name}`)} className="px-2 py-1 bg-slate-800 rounded">View</button>
                  <button onClick={() => handleDeleteStaff(p.id)} className="px-2 py-1 bg-red-600/10 text-red-400 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhlebotomistsView;