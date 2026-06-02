import React, { useState } from 'react';

const PortalMonitoringView = () => {
  const [portals, setPortals] = useState([
    { name: 'Admin Portal', users: 3, status: 'Online', load: '12%', color: 'text-blue-400' },
    { name: 'Supervisor Portal', users: 2, status: 'Online', load: '8%', color: 'text-purple-400' },
    { name: 'Lab Portal', users: 5, status: 'Online', load: '34%', color: 'text-emerald-400' },
    { name: 'Doctor Portal', users: 18, status: 'Online', load: '45%', color: 'text-sky-400' },
    { name: 'Phlebotomist Portal', users: 4, status: 'Online', load: '22%', color: 'text-orange-400' },
  ]);

  const viewLogs = (portalName) => {
    alert(`Streaming real-time container records for: [${portalName}]...\nEverything running smoothly.`);
  };

  const configurePortal = (portalName) => {
    const newLoad = prompt(`Configure threshold limit load % for ${portalName}:`, "50%");
    if (newLoad) {
      setPortals(portals.map(p => p.name === portalName ? { ...p, load: newLoad } : p));
    }
  };

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <h2 className="text-2xl font-bold">📡 Portal Monitoring System</h2>
      <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold bg-[#1f242c]/30">
              <th className="p-4">Portal Platform</th>
              <th className="p-4">Active Users</th>
              <th className="p-4">Status</th>
              <th className="p-4">System Load</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {portals.map((portal, i) => (
              <tr key={i} className="hover:bg-[#1f242c]/20">
                <td className={`p-4 font-bold ${portal.color}`}>{portal.name}</td>
                <td className="p-4 font-medium text-slate-200">{portal.users}</td>
                <td className="p-4">
                  <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-500/20">
                    {portal.status}
                  </span>
                </td>
                <td className="p-4 text-slate-300 font-mono">{portal.load}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => viewLogs(portal.name)} className="px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded hover:bg-slate-700">Logs</button>
                  <button onClick={() => configurePortal(portal.name)} className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-600/40">Settings</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortalMonitoringView;