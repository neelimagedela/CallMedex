import React, { useState } from 'react';

export default function PhlebotomistManagement() {
  const [phlebList, setPhlebList] = useState([
    { id: 'PH-001', name: 'Suresh Rajan', zone: 'North Zone', shift: 'Morning', phone: '9876543210', collections: 12, pending: 3, status: 'Active' },
    { id: 'PH-002', name: 'Divya Menon', zone: 'South Zone', shift: 'Morning', phone: '9988766555', collections: 8, pending: 2, status: 'Active' },
    { id: 'PH-003', name: 'Arjun Nair', zone: 'East Zone', shift: 'Evening', phone: '9012345678', collections: 5, pending: 5, status: 'On Leave' },
    { id: 'PH-004', name: 'Rekha Pillai', zone: 'West Zone', shift: 'Morning', phone: '9123456789', collections: 14, pending: 1, status: 'Active' },
  ]);

  const [search, setSearch] = useState('');
  const [activeScreenWorkspace, setActiveScreenWorkspace] = useState(null);

  const filtered = phlebList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    const backupItem = phlebList.find(p => p.id === id);
    setPhlebList(prev => prev.filter(p => p.id !== id));
    setActiveScreenWorkspace({
      mode: 'alert',
      title: 'Destructive Event Register Output',
      body: `Phlebotomist reference ${id} (${backupItem?.name}) has been dropped from state storage safely.`
    });
  };

  return (
    <div className="p-6 bg-[#0f1319] text-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">💉 Phlebotomist Management</h1>
        <p className="text-xs text-gray-400">Supervisor Panel &gt; Phlebotomist Management</p>
      </div>

      {/* KPI Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'TOTAL PHLEBOTOMISTS', val: phlebList.length, c: 'text-amber-500' },
          { label: 'ACTIVE TODAY', val: phlebList.filter(p => p.status === 'Active').length, c: 'text-emerald-500' },
          { label: 'TOTAL COLLECTIONS', val: 39, c: 'text-yellow-500' },
          { label: 'PENDING', val: 11, c: 'text-blue-500' },
        ].map((k, idx) => (
          <div key={idx} className="bg-[#161b22] p-4 rounded-xl border border-[#21262d]">
            <span className="text-[10px] text-gray-400 tracking-wider block font-bold">{k.label}</span>
            <span className={`text-2xl font-black block mt-2 ${k.c}`}>{k.val}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <input 
          type="text" 
          placeholder="Search phlebotomists..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-[#161b22] border border-[#21262d] rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={() => setActiveScreenWorkspace({ mode: 'create', title: 'Provision Field Asset', data: { id: `PH-00${phlebList.length+1}`, name: '', zone: 'North Zone', shift: 'Morning', phone: '', collections: 0, pending: 0, status: 'Active' } })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all"
        >
          + Add Phlebotomist
        </button>
      </div>

      {/* Dynamic Screen Area */}
      {activeScreenWorkspace && (
        <div className="mb-6 bg-[#1a1f26] border border-rose-500/40 p-5 rounded-xl shadow-xl">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">🖥️ Screen Workspace Monitor</h4>
            <button onClick={() => setActiveScreenWorkspace(null)} className="text-gray-400 text-xs hover:text-white">✕ Clear</button>
          </div>
          {activeScreenWorkspace.mode === 'alert' && <p className="text-xs text-gray-200 bg-[#12161a] p-3 rounded font-mono">{activeScreenWorkspace.body}</p>}
          {activeScreenWorkspace.mode === 'view' && (
            <div className="text-xs grid grid-cols-2 gap-2 bg-[#12161a] p-3 rounded">
              <div><span className="text-gray-400">Asset:</span> {activeScreenWorkspace.data.name}</div>
              <div><span className="text-gray-400">Zone Grid:</span> {activeScreenWorkspace.data.zone}</div>
              <div><span className="text-gray-400">Mobile Node:</span> {activeScreenWorkspace.data.phone}</div>
            </div>
          )}
          {activeScreenWorkspace.mode === 'edit' && (
            <div className="flex gap-2 text-xs">
              <input type="text" value={activeScreenWorkspace.data.name} onChange={e => setActiveScreenWorkspace({...activeScreenWorkspace, data: {...activeScreenWorkspace.data, name: e.target.value}})} className="bg-black border border-gray-700 p-1 text-white rounded" />
              <button onClick={() => { setPhlebList(prev => prev.map(p => p.id === activeScreenWorkspace.data.id ? activeScreenWorkspace.data : p)); setActiveScreenWorkspace(null); }} className="bg-emerald-600 px-3 py-1 rounded text-white">Save Changes</button>
            </div>
          )}
        </div>
      )}

      {/* Assets Grid Table */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#21262d] text-gray-400 bg-[#1c2128]">
              <th className="p-4">EMP ID</th>
              <th className="p-4">NAME</th>
              <th className="p-4">ZONE</th>
              <th className="p-4">SHIFT</th>
              <th className="p-4">PHONE</th>
              <th className="p-4 text-emerald-500">COLLECTIONS</th>
              <th className="p-4 text-amber-500">PENDING</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {filtered.map((phleb) => (
              <tr key={phleb.id} className="hover:bg-[#1c2128]/30 transition">
                <td className="p-4 font-mono text-gray-400">{phleb.id}</td>
                <td className="p-4 font-bold text-gray-200">{phleb.name}</td>
                <td className="p-4 text-gray-300">{phleb.zone}</td>
                <td className="p-4 text-gray-300">{phleb.shift}</td>
                <td className="p-4 text-gray-400">{phleb.phone}</td>
                <td className="p-4 font-bold text-emerald-500">{phleb.collections}</td>
                <td className="p-4 font-bold text-amber-500">{phleb.pending}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${phleb.status === 'Active' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                    {phleb.status}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-1.5">
                  <button onClick={() => setActiveScreenWorkspace({ mode: 'edit', data: phleb })} className="px-2.5 py-1 border border-blue-500 text-blue-400 rounded text-[11px] hover:bg-blue-500/10">Edit</button>
                  <button onClick={() => setActiveScreenWorkspace({ mode: 'view', data: phleb })} className="px-2.5 py-1 border border-gray-600 text-gray-300 rounded text-[11px] hover:bg-gray-700">View</button>
                  <button onClick={() => handleDelete(phleb.id)} className="px-2.5 py-1 border border-rose-500 text-rose-500 rounded text-[11px] hover:bg-rose-500/10">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}