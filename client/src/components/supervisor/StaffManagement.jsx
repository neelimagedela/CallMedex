import React, { useState } from 'react';

export default function StaffManagement() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Priya Nair', role: 'Doctor', department: 'General', shift: 'Morning', status: 'Active' },
    { id: 2, name: 'Rajesh Pillai', role: 'Lab Tech', department: 'General', shift: 'Morning', status: 'Active' },
    { id: 3, name: 'Suresh Rajan', role: 'Phlebotomist', department: 'General', shift: 'Morning', status: 'Active' },
    { id: 4, name: 'Anita Shah', role: 'Pharmacist', department: 'General', shift: 'Morning', status: 'Pending' },
    { id: 5, name: 'Lata Varma', role: 'Nurse', department: 'General', shift: 'Morning', status: 'Inactive' },
  ]);

  const [search, setSearch] = useState('');
  const [activeWorkspace, setActiveWorkspace] = useState(null);

  const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (member) => {
    setActiveWorkspace({ mode: 'edit', data: { ...member } });
  };

  const handleView = (member) => {
    setActiveWorkspace({ mode: 'view', data: member });
  };

  const saveMemberData = (e) => {
    e.preventDefault();
    setStaff(prev => prev.map(item => item.id === activeWorkspace.data.id ? activeWorkspace.data : item));
    setActiveWorkspace({ mode: 'view', data: activeWorkspace.data });
  };

  return (
    <div className="p-6 bg-[#0f1319] text-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">👥 Staff Management</h1>
        <p className="text-xs text-gray-400">Supervisor Panel &gt; Staff Management</p>
      </div>

      <div className="flex gap-3 mb-6">
        <input 
          type="text" 
          placeholder="Search staff..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          className="flex-1 bg-[#161b22] border border-[#21262d] rounded-lg px-4 py-2 text-xs text-gray-100 focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={() => setActiveWorkspace({ mode: 'create', data: { id: Date.now(), name: '', role: '', department: 'General', shift: 'Morning', status: 'Active' } })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all"
        >
          + Add Staff
        </button>
      </div>

      {/* Screen Monitor Space */}
      {activeWorkspace && (
        <div className="mb-6 bg-[#1a1f26] border border-blue-500/40 p-5 rounded-xl shadow-xl">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
            <h3 className="font-bold text-sm text-blue-400">🖥️ Screen Output: Staff Profile Monitor</h3>
            <button onClick={() => setActiveWorkspace(null)} className="text-xs text-gray-400 hover:text-white">✕ Clear</button>
          </div>

          {activeWorkspace.mode === 'view' && (
            <div className="bg-[#12161a] p-4 rounded-lg flex flex-wrap gap-6 text-xs">
              <div><span className="text-gray-400 block">Full Name</span><span className="text-sm font-bold text-gray-100">{activeWorkspace.data.name}</span></div>
              <div><span className="text-gray-400 block">Designated Role</span><span className="text-sm">{activeWorkspace.data.role}</span></div>
              <div><span className="text-gray-400 block">Department</span><span>{activeWorkspace.data.department}</span></div>
              <div><span className="text-gray-400 block">Assigned Shift</span><span>{activeWorkspace.data.shift}</span></div>
              <div><span className="text-gray-400 block">Status Pool</span><span>{activeWorkspace.data.status}</span></div>
            </div>
          )}

          {(activeWorkspace.mode === 'edit' || activeWorkspace.mode === 'create') && (
            <form onSubmit={activeWorkspace.mode === 'edit' ? saveMemberData : (e) => { e.preventDefault(); setStaff([...staff, activeWorkspace.data]); setActiveWorkspace(null); }} className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <input type="text" placeholder="Full Name" value={activeWorkspace.data.name} onChange={e => setActiveWorkspace({...activeWorkspace, data: {...activeWorkspace.data, name: e.target.value}})} className="bg-[#12161a] border border-gray-700 p-2 rounded text-white" required />
              <input type="text" placeholder="Role (e.g. Doctor)" value={activeWorkspace.data.role} onChange={e => setActiveWorkspace({...activeWorkspace, data: {...activeWorkspace.data, role: e.target.value}})} className="bg-[#12161a] border border-gray-700 p-2 rounded text-white" required />
              <select value={activeWorkspace.data.shift} onChange={e => setActiveWorkspace({...activeWorkspace, data: {...activeWorkspace.data, shift: e.target.value}})} className="bg-[#12161a] border border-gray-700 p-2 rounded text-white">
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
              <select value={activeWorkspace.data.status} onChange={e => setActiveWorkspace({...activeWorkspace, data: {...activeWorkspace.data, status: e.target.value}})} className="bg-[#12161a] border border-gray-700 p-2 rounded text-white">
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="md:col-span-4 flex justify-end gap-2 mt-2">
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 rounded text-white text-xs hover:bg-emerald-700">Save Changes</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Roster Grid Table */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#21262d] text-gray-400 bg-[#1c2128]">
                <th className="p-4">NAME</th>
                <th className="p-4">ROLE</th>
                <th className="p-4">DEPARTMENT</th>
                <th className="p-4">SHIFT</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-[#1c2128]/40 transition">
                  <td className="p-4 font-bold text-gray-200">{member.name}</td>
                  <td className="p-4 text-gray-300">{member.role}</td>
                  <td className="p-4 text-gray-400">{member.department}</td>
                  <td className="p-4 text-gray-300">{member.shift}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${member.status === 'Active' ? 'bg-emerald-950 text-emerald-400' : member.status === 'Pending' ? 'bg-amber-950 text-amber-400' : 'bg-gray-800 text-gray-400'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(member)} className="px-3 py-1 border border-blue-500/80 text-blue-400 rounded hover:bg-blue-500/10 transition">Edit</button>
                    <button onClick={() => handleView(member)} className="px-3 py-1 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition">View</button>
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