import React, { useState } from 'react';

const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([
    { id: 'A-001', pt: 'Kiran Reddy', doc: 'Dr. Kavitha Menon', date: '2026-05-29', time: '10:00 AM', type: 'Consultation', status: 'Confirmed' },
    { id: 'A-002', pt: 'Arun Das', doc: 'Dr. Priya Nair', date: '2026-05-29', time: '11:30 AM', type: 'Follow-up', status: 'Confirmed' },
    { id: 'A-003', pt: 'Sita Devi', doc: 'Dr. Kavitha Menon', date: '2026-05-29', time: '02:00 PM', type: 'Lab Review', status: 'Pending' },
  ]);

  const cancelAppointmentTask = (id) => {
    if (window.confirm("Mark this appointment reservation file path as Cancelled?")) {
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    }
  };

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📅 Live Outpatient Consultation Schedules</h2>
        <button onClick={() => alert('New reservation booking initialization form popup...')} className="bg-blue-600 text-xs px-4 py-2 rounded-lg">+ New Appointment</button>
      </div>
      <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-[#1f242c]/30 font-semibold">
              <th className="p-4">Patient Case Name</th>
              <th className="p-4">Assigned Practitioner</th>
              <th className="p-4">Scheduled Date & Time</th>
              <th className="p-4">Classification</th>
              <th className="p-4">Status Flag</th>
              <th className="p-4">Actions Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {appointments.map((a) => (
              <tr key={a.id} className="hover:bg-[#1f242c]/20">
                <td className="p-4 font-bold text-slate-200">{a.pt}</td>
                <td className="p-4 text-slate-400">{a.doc}</td>
                <td className="p-4 text-slate-400">{a.date} <span className="text-slate-500 font-mono ml-1">({a.time})</span></td>
                <td className="p-4 text-slate-400">{a.type}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${a.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/20' : a.status === 'Pending' ? 'bg-amber-950 text-amber-400 border-amber-500/20' : 'bg-red-950 text-red-400 border-red-500/20'}`}>
                    {a.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button onClick={() => alert(`Reschedule file trace routing setup for slot code ${a.id}`)} className="px-2.5 py-1 bg-blue-600/10 text-blue-400 rounded hover:bg-blue-600/20">Edit</button>
                  {a.status !== 'Cancelled' && (
                    <button onClick={() => cancelAppointmentTask(a.id)} className="px-2.5 py-1 bg-red-600/10 text-red-400 rounded hover:bg-red-600/20">
                      Cancel
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

export default AppointmentsView;s