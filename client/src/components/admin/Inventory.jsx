import React, { useState } from 'react';

const InventoryView = () => {
  const [supplies, setSupplies] = useState([
    { item: 'Gloves (Latex)', cat: 'PPE', qty: 500, unit: 'Pairs', updated: '2026-05-28' },
    { item: 'Syringes 5ml', cat: 'Medical', qty: 250, unit: 'Pcs', updated: '2026-05-27' },
    { item: 'Test Tubes', cat: 'Lab', qty: 1200, unit: 'Pcs', updated: '2026-05-25' },
  ]);

  const updateQuantity = (itemName, currentQty) => {
    const input = prompt(`Update stock count balance configuration for ${itemName}:`, currentQty);
    if (input !== null && !isNaN(input)) {
      setSupplies(supplies.map(s => s.item === itemName ? { ...s, qty: parseInt(input, 10), updated: '2026-06-01' } : s));
    }
  };

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <h2 className="text-2xl font-bold">📦 Logistics Supply & Materials Inventory</h2>
      <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-[#1f242c]/30 font-semibold">
              <th className="p-4">Material Description</th>
              <th className="p-4">Category</th>
              <th className="p-4">In-Stock Quantity</th>
              <th className="p-4">Packaging Unit</th>
              <th className="p-4">Audit Timestamp</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {supplies.map((s, idx) => (
              <tr key={idx} className="hover:bg-[#1f242c]/20">
                <td className="p-4 font-bold text-slate-200">{s.item}</td>
                <td className="p-4 text-slate-400">{s.cat}</td>
                <td className="p-4 font-mono font-bold text-slate-100">{s.qty}</td>
                <td className="p-4 text-slate-400">{s.unit}</td>
                <td className="p-4 text-slate-500 font-mono">{s.updated}</td>
                <td className="p-4">
                  <button onClick={() => updateQuantity(s.item, s.qty)} className="px-3 py-1 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-600/30">
                    Modify Counts
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

export default InventoryView;