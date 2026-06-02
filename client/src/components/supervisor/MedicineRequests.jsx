import React, { useState } from 'react';

export default function MedicineRequests() {
  const [requests, setRequests] = useState([
    { id: 'MR-001', medicine: 'Amoxicillin 250mg', requester: 'Dr. Kavitha Menon', qty: 100, date: '2026-05-29', status: 'Pending' },
    { id: 'MR-002', medicine: 'Paracetamol 500mg', requester: 'Nurse General Lata', qty: 200, date: '2026-05-28', status: 'Approved' },
  ]);

  const [screenLog, setScreenLog] = useState(null);

  const updateStatus = (id, nextStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: nextStatus } : r));
    setScreenLog({
      targetId: id,
      assertion: `System Registry flag for Request ID: ${id} updated to cluster tier [${nextStatus}]`,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  const viewFullManifest = (req) => {
    setScreenLog({
      targetId: req.id,
      assertion: `Manifest Inspection: ${req.medicine} (Qty: ${req.qty}) safely dispatched under custody of ${req.requester}.`,
      timestamp: 'Historical Log Asset'
    });
  };

  return (
    <div className="p-6 bg-[#0f1319] text-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">💊 Medicine Requests</h1>
        <p className="text-xs text-gray-400">Supervisor Panel &gt; Medicine Requests</p>
      </div>

      {/* Screen Monitor Terminal Interface */}
      {screenLog && (
        <div className="mb-6 bg-[#161b22] border-2 border-emerald-500/30 p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-1">
            <span className="text-xs font-bold text-emerald-400">🖥️ Screen Output Dashboard Engine</span>
            <button onClick={() => setScreenLog(null)} className="text-xs text-gray-500 hover:text-white">✕ Close Output</button>
          </div>
          <div className="font-mono text-xs text-gray-300">
            <div><span className="text-gray-500">Log Scope:</span> {screenLog.targetId}</div>
            <div><span className="text-gray-500">Response String:</span> <span className="text-yellow-400">{screenLog.assertion}</span></div>
            <div><span className="text-gray-500">Hook Time:</span> {screenLog.timestamp}</div>
          </div>
        </div>
      )}

      {/* Request Matrix */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#21262d] text-gray-400 bg-[#1c2128]">
              <th className="p-4">REQUEST ID</th>
              <th className="p-4">MEDICINE</th>
              <th className="p-4">REQUESTED BY</th>
              <th className="p-4">QTY</th>
              <th className="p-4">DATE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-[#1c2128]/30 transition">
                <td className="p-4 font-mono text-gray-400">{req.id}</td>
                <td className="p-4 font-bold text-gray-200">{req.medicine}</td>
                <td className="p-4 text-gray-300">{req.requester}</td>
                <td className="p-4 font-mono text-gray-300">{req.qty}</td>
                <td className="p-4 text-gray-400">{req.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${req.status === 'Approved' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                    {req.status}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  {req.status === 'Pending' ? (
                    <>
                      <button onClick={() => updateStatus(req.id, 'Approved')} className="px-3 py-1 border border-emerald-500 text-emerald-400 rounded text-[11px] hover:bg-emerald-500/10">Approve</button>
                      <button onClick={() => updateStatus(req.id, 'Rejected')} className="px-3 py-1 border border-rose-500 text-rose-500 rounded text-[11px] hover:bg-rose-500/10">Reject</button>
                    </>
                  ) : (
                    <button onClick={() => viewFullManifest(req)} className="px-3 py-1 border border-gray-600 text-gray-300 rounded text-[11px] hover:bg-gray-700">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}