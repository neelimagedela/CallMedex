import React, { useState } from 'react';

export default function ClientApprovals() {
  const [clients, setClients] = useState([
    { id: 'CR-001', name: 'LifeCare Pharmacy', type: 'Pharmacy', contact: 'Anita Shah', phone: '9876543210', status: 'Pending' },
    { id: 'CR-002', name: 'City Diagnostics', type: 'Lab', contact: 'Rohit Mehta', phone: '9988766555', status: 'Approved' },
    { id: 'CR-003', name: 'Green Valley Hospital', type: 'Hospital', contact: 'Dr. Suresh', phone: '9012345678', status: 'Approved' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [screenDisplay, setScreenDisplay] = useState(null);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openView = (client) => {
    setScreenDisplay({
      mode: 'view',
      title: `Client Structural Profile: ${client.id}`,
      data: client
    });
  };

  const openEdit = (client) => {
    setScreenDisplay({
      mode: 'edit',
      title: `Client Workspace Editor: ${client.id}`,
      data: { ...client }
    });
  };

  const saveEditChanges = (e) => {
    e.preventDefault();
    setClients(prev => prev.map(c => c.id === screenDisplay.data.id ? screenDisplay.data : c));
    setScreenDisplay({
      mode: 'view',
      title: `Changes Committed Successfully`,
      data: screenDisplay.data
    });
  };

  const approveClient = (id) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
    const target = clients.find(c => c.id === id);
    if(target) openView({ ...target, status: 'Approved' });
  };

  return (
    <div className="p-6 bg-[#0f1319] text-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">📋 Client Registrations</h1>
        <p className="text-xs text-gray-400">Supervisor Panel &gt; Client Approvals</p>
      </div>

      {/* Top Search Operations and Global Actions */}
      <div className="flex gap-3 mb-6">
        <input 
          type="text" 
          placeholder="Search clients..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-[#161b22] border border-[#21262d] rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={() => setScreenDisplay({ mode: 'create', title: 'Register New Client Instance', data: { id: `CR-00${clients.length+1}`, name: '', type: 'Pharmacy', contact: '', phone: '', status: 'Pending' } })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all"
        >
          + Register Client
        </button>
      </div>

      {/* Reactive Terminal Screen Monitor Area */}
      {screenDisplay && (
        <div className="mb-6 bg-[#1a1f26] border-2 border-blue-500/40 p-5 rounded-xl shadow-xl">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
            <h3 className="font-bold text-sm text-blue-400">🖥️ Screen Output Context: {screenDisplay.title}</h3>
            <button onClick={() => setScreenDisplay(null)} className="text-xs text-gray-400 hover:text-white">✕ Clear Output</button>
          </div>

          {screenDisplay.mode === 'view' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-[#12161a] p-4 rounded-lg">
              <div><span className="text-gray-400 block">Client Unique ID</span><span className="font-mono text-sm">{screenDisplay.data.id}</span></div>
              <div><span className="text-gray-400 block">Corporate Name</span><span className="text-sm font-bold">{screenDisplay.data.name}</span></div>
              <div><span className="text-gray-400 block">Sector Type</span><span>{screenDisplay.data.type}</span></div>
              <div><span className="text-gray-400 block">Verification Status</span><span className={`px-2 py-0.5 rounded text-[11px] ${screenDisplay.data.status === 'Approved' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>{screenDisplay.data.status}</span></div>
            </div>
          )}

          {(screenDisplay.mode === 'edit' || screenDisplay.mode === 'create') && (
            <form onSubmit={screenDisplay.mode === 'edit' ? saveEditChanges : (e) => {
              e.preventDefault();
              setClients([...clients, screenDisplay.data]);
              setScreenDisplay(null);
            }} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <input type="text" placeholder="Client Name" value={screenDisplay.data.name} onChange={e => setScreenDisplay({...screenDisplay, data: {...screenDisplay.data, name: e.target.value}})} className="bg-[#12161a] border border-gray-700 p-2 rounded text-white" required />
              <input type="text" placeholder="Contact Person" value={screenDisplay.data.contact} onChange={e => setScreenDisplay({...screenDisplay, data: {...screenDisplay.data, contact: e.target.value}})} className="bg-[#12161a] border border-gray-700 p-2 rounded text-white" required />
              <input type="text" placeholder="Phone Number" value={screenDisplay.data.phone} onChange={e => setScreenDisplay({...screenDisplay, data: {...screenDisplay.data, phone: e.target.value}})} className="bg-[#12161a] border border-gray-700 p-2 rounded text-white" required />
              <select value={screenDisplay.data.type} onChange={e => setScreenDisplay({...screenDisplay, data: {...screenDisplay.data, type: e.target.value}})} className="bg-[#12161a] border border-gray-700 p-2 rounded text-white">
                <option value="Pharmacy">Pharmacy</option>
                <option value="Lab">Lab</option>
                <option value="Hospital">Hospital</option>
              </select>
              <div className="md:col-span-3 flex justify-end gap-2 mt-2">
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 rounded text-white hover:bg-emerald-700">Commit Save</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Main Inventory Layout Table */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#21262d] text-gray-400 font-medium bg-[#1c2128]">
                <th className="p-4">ID</th>
                <th className="p-4">NAME</th>
                <th className="p-4">TYPE</th>
                <th className="p-4">CONTACT</th>
                <th className="p-4">PHONE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-[#1c2128]/50 transition-colors">
                  <td className="p-4 font-mono text-gray-400">{client.id}</td>
                  <td className="p-4 font-bold text-gray-200">{client.name}</td>
                  <td className="p-4 text-gray-300">{client.type}</td>
                  <td className="p-4 text-gray-300">{client.contact}</td>
                  <td className="p-4 text-gray-400">{client.phone}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide ${client.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-amber-950 text-amber-400 border border-amber-800/40'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => openEdit(client)} className="px-3 py-1 bg-transparent hover:bg-blue-500/10 border border-blue-500 text-blue-400 rounded text-[11px] transition">Edit</button>
                    <button onClick={() => openView(client)} className="px-3 py-1 bg-transparent hover:bg-gray-700 border border-gray-600 text-gray-300 rounded text-[11px] transition">View</button>
                    {client.status === 'Pending' && (
                      <button onClick={() => approveClient(client.id)} className="px-3 py-1 bg-transparent hover:bg-emerald-600/20 border border-emerald-500 text-emerald-400 rounded text-[11px] transition">Approve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}