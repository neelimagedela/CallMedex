import React, { useState } from 'react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 'A-001', patient: 'Kiran Reddy', doctor: 'Dr. Kavitha Menon', date: '2026-05-29', time: '10:00 AM', type: 'Consultation', status: 'Confirmed' },
    { id: 'A-002', patient: 'Arun Das', doctor: 'Dr. Priya Nair', date: '2026-05-29', time: '11:30 AM', type: 'Follow-up', status: 'Confirmed' },
    { id: 'A-003', patient: 'Sita Devi', doctor: 'Dr. Kavitha Menon', date: '2026-05-29', time: '02:00 PM', type: 'Lab Review', status: 'Pending' },
    { id: 'A-004', patient: 'Ramesh Rao', doctor: 'Dr. Kavitha Menon', date: '2026-05-30', time: '09:00 AM', type: 'Consultation', status: 'Cancelled' },
  ]);

  const [search, setSearch] = useState('');
  const [screenDisplay, setScreenDisplay] = useState(null);

  const filtered = appointments.filter(a => a.patient.toLowerCase().includes(search.toLowerCase()));

  const triggerCancel = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    setScreenDisplay({
      msg: `Appointment Entry Reference [ ${id} ] processing complete. Status flagged as Cancelled.`,
      color: 'text-rose-400'
    });
  };

  const triggerEdit = (appt) => {
    setScreenDisplay({
      msg: `Editing Window Activated for ${appt.id}. Custom state modification form compiled below.`,
      color: 'text-blue-400',
      editable: appt
    });
  };

  return (
    <div className="p-6 bg-[#0f1319] text-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">🗓️ Appointments</h1>
        <p className="text-xs text-gray-400">Supervisor Panel &gt; Appointments</p>
      </div>

      <div className="flex gap-3 mb-6">
        <input 
          type="text" 
          placeholder="Search appointments..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-[#161b22] border border-[#21262d] rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={() => setScreenDisplay({ msg: 'Instantiation pipeline for new Appointment launched.', color: 'text-emerald-400' })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all"
        >
          + New Appointment
        </button>
      </div>

      {/* Dynamic Matrix Viewscreen */}
      {screenDisplay && (
        <div className="mb-6 bg-[#1a1f26] border border-blue-500/40 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2 pb-1 border-b border-gray-800">
            <span className="text-xs font-bold text-gray-400">🖥️ Active Screen Render Pipeline</span>
            <button onClick={() => setScreenDisplay(null)} className="text-xs text-gray-500 hover:text-white">✕ Clear</button>
          </div>
          <p className={`text-xs font-mono ${screenDisplay.color}`}>{screenDisplay.msg}</p>
          {screenDisplay.editable && (
            <div className="mt-3 flex gap-2">
              <input 
                type="text" 
                defaultValue={screenDisplay.editable.time} 
                onChange={(e) => {
                  const val = e.target.value;
                  setAppointments(p => p.map(a => a.id === screenDisplay.editable.id ? {...a, time: val} : a));
                }}
                className="bg-black text-white p-1 text-xs rounded border border-gray-700" 
              />
              <span className="text-xs text-gray-400 self-center">(Changes auto-save to data grid state live)</span>
            </div>
          )}
        </div>
      )}

      {/* Main Table Structure */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#21262d] text-gray-400 bg-[#1c2128]">
              <th className="p-4">ID</th>
              <th className="p-4">PATIENT</th>
              <th className="p-4">DOCTOR</th>
              <th className="p-4">DATE</th>
              <th className="p-4">TIME</th>
              <th className="p-4">TYPE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {filtered.map((appt) => (
              <tr key={appt.id} className="hover:bg-[#1c2128]/30 transition">
                <td className="p-4 font-mono text-gray-400">{appt.id}</td>
                <td className="p-4 font-bold text-gray-200">{appt.patient}</td>
                <td className="p-4 text-gray-300">{appt.doctor}</td>
                <td className="p-4 text-gray-400">{appt.date}</td>
                <td className="p-4 text-gray-200">{appt.time}</td>
                <td className="p-4 text-gray-400">{appt.type}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${appt.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400' : appt.status === 'Pending' ? 'bg-amber-950 text-amber-400' : 'bg-rose-950 text-rose-400'}`}>
                    {appt.status}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => triggerEdit(appt)} className="px-3 py-1 border border-blue-500 text-blue-400 rounded text-[11px] hover:bg-blue-500/10">Edit</button>
                  <button onClick={() => triggerCancel(appt.id)} className="px-3 py-1 border border-rose-500 text-rose-500 rounded text-[11px] hover:bg-rose-500/10">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}