import React, { useState } from 'react';

const UserManagementView = () => {
  const [users, setUsers] = useState([
    { id: '#1', name: 'Dr. Priya Nair', role: 'Doctor', email: 'priya.nair@medi.com', status: 'Active', date: '2026-01-15' },
    { id: '#2', name: 'Rajesh Pillai', role: 'Lab Tech', email: 'rajesh.lab@medi.com', status: 'Active', date: '2026-02-01' },
    { id: '#3', name: 'Suresh Rajan', role: 'Phlebotomist', email: 'suresh.phlebo@medi.com', status: 'Active', date: '2026-03-10' },
    { id: '#4', name: 'Anita Shah', role: 'Pharmacist', email: 'anita.shah@medi.com', status: 'Pending', date: '2026-05-20' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalUser, setActiveModalUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id, name) => {
    if (window.confirm(`Permanently remove entry access permissions for ${name}?`)) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleOpenModal = (user, editMode = false) => {
    setActiveModalUser({ ...user });
    setIsEditing(editMode);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === activeModalUser.id ? activeModalUser : u));
    setActiveModalUser(null);
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">👥 Dynamic User Management</h2>
        <button onClick={() => alert('Add user action triggered')} className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2 rounded-lg">+ Add User</button>
      </div>

      <input 
        type="text" 
        placeholder="Search users dynamic indexing..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-[#161b22] border border-slate-800 rounded-lg px-4 py-2 text-xs text-slate-200 focus:outline-none" 
      />

      <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase bg-[#1f242c]/30 font-semibold">
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#1f242c]/20">
                <td className="p-4 font-bold text-slate-200">{user.name}</td>
                <td className="p-4 text-slate-400">{user.role}</td>
                <td className="p-4 text-slate-400">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${user.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/20' : 'bg-amber-950 text-amber-400 border-amber-500/20'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button onClick={() => handleOpenModal(user, false)} className="px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700">View</button>
                  <button onClick={() => handleOpenModal(user, true)} className="px-2 py-1 bg-blue-600/10 text-blue-400 rounded hover:bg-blue-600/20">Edit</button>
                  <button onClick={() => handleDelete(user.id, user.name)} className="px-2 py-1 bg-red-600/10 text-red-400 rounded hover:bg-red-600/20">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RENDER MODAL CONDITIONAL CARD */}
      {activeModalUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b22] border border-slate-800 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-sm font-bold border-b border-slate-800 pb-2 mb-4">{isEditing ? '📝 Modify User File' : '👁️ Inspection Summary'}</h3>
            {isEditing ? (
              <form onSubmit={handleSaveChanges} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name</label>
                  <input type="text" value={activeModalUser.name} onChange={(e) => setActiveModalUser({...activeModalUser, name: e.target.value})} className="w-full bg-[#0d1117] text-white border border-slate-800 rounded p-2" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email</label>
                  <input type="email" value={activeModalUser.email} onChange={(e) => setActiveModalUser({...activeModalUser, email: e.target.value})} className="w-full bg-[#0d1117] text-white border border-slate-800 rounded p-2" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-blue-600 py-2 rounded font-bold">Save</button>
                  <button type="button" onClick={() => setActiveModalUser(null)} className="flex-1 bg-slate-800 py-2 rounded">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="space-y-2 text-xs">
                <p><span className="text-slate-400">ID:</span> {activeModalUser.id}</p>
                <p><span className="text-slate-400">Name:</span> {activeModalUser.name}</p>
                <p><span className="text-slate-400">Assigned Role:</span> {activeModalUser.role}</p>
                <p><span className="text-slate-400">Email Workspace:</span> {activeModalUser.email}</p>
                <button onClick={() => setActiveModalUser(null)} className="w-full mt-4 bg-slate-800 py-2 rounded">Dismiss</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementView;