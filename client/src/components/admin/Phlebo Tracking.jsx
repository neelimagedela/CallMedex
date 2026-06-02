import React, { useState } from 'react';

const PhleboTrackingView = () => {
  const [samples, setSamples] = useState([
    { id: 'COL-501', patient: 'Sita Devi', phleb: 'Suresh Rajan', type: 'Blood (5ml)', barcode: 'BC-94501', status: 'Collected' },
    { id: 'COL-502', patient: 'Ramesh Rao', phleb: 'Divya Menon', type: 'Blood (3ml)', barcode: 'BC-94502', status: 'Collected' },
    { id: 'COL-503', patient: 'Kiran Reddy', phleb: 'Suresh Rajan', type: 'Blood (3ml)', barcode: 'BC-94503', status: 'Pending' },
  ]);

  const advanceTrackingStatus = (id) => {
    setSamples(samples.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Pending' ? 'Collected' : s.status === 'Collected' ? 'Sent to Lab' : 'Processed';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <h2 className="text-2xl font-bold">🩸 Live Sample Logistics Tracking</h2>
      <div className="bg-[#161b22] rounded-xl border border-slate-800 p-4 overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-[#1f242c]/30 font-semibold">
              <th className="p-3">Collection ID</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Phlebotomist</th>
              <th className="p-3">Barcode</th>
              <th className="p-3">Status Pipeline</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {samples.map((s) => (
              <tr key={s.id} className="hover:bg-[#1f242c]/20">
                <td className="p-3 text-slate-500 font-mono">{s.id}</td>
                <td className="p-3 font-bold">{s.patient}</td>
                <td className="p-3 text-orange-400 font-medium">{s.phleb}</td>
                <td className="p-3 font-mono text-slate-400">{s.barcode}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${s.status === 'Sent to Lab' ? 'bg-blue-950 text-blue-400 border-blue-500/20' : s.status === 'Collected' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/20' : 'bg-amber-950 text-amber-400 border-amber-500/20'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-3">
                  <button onClick={() => advanceTrackingStatus(s.id)} className="px-2.5 py-1 bg-slate-800 text-slate-200 border border-slate-700 rounded hover:bg-slate-700">
                    Advance Phase ➜
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

export default PhleboTrackingView;