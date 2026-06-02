import React, { useState } from 'react';

const PharmacyView = () => {
  const [inventory, setInventory] = useState([
    { id: 'M-001', name: 'Paracetamol 500mg', cat: 'Analgesic', stock: 245, price: '12' },
    { id: 'M-002', name: 'Amoxicillin 250mg', cat: 'Antibiotic', stock: 38, price: '45' },
    { id: 'M-003', name: 'Metformin 500mg', cat: 'Antidiabetic', stock: 180, price: '28' },
    { id: 'M-004', name: 'Atorvastatin 10mg', cat: 'Cardiac', stock: 0, price: '65' },
  ]);

  const executeRestock = (id) => {
    setInventory(inventory.map(m => m.id === id ? { ...m, stock: m.stock + 100 } : m));
  };

  const deleteMedicineRow = (id, name) => {
    if (window.confirm(`Purge formulary record data file for: ${name}?`)) {
      setInventory(inventory.filter(m => m.id !== id));
    }
  };

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">💊 Pharmacy Formulary Inventory</h2>
        <button onClick={() => alert('Opening new pharmaceutical indexing file entry form...')} className="bg-blue-600 text-xs px-4 py-2 rounded-lg">+ Add Medicine</button>
      </div>
      <div className="bg-[#161b22] rounded-xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-[#1f242c]/30 font-semibold">
              <th className="p-4">Formulary Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock Units</th>
              <th className="p-4">Status Tag</th>
              <th className="p-4">Unit Cost</th>
              <th className="p-4">Actions Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {inventory.map((m) => {
              const itemStatus = m.stock === 0 ? 'Out of Stock' : m.stock < 50 ? 'Low Stock' : 'In Stock';
              const statusStyle = m.stock === 0 ? 'bg-red-950 text-red-400 border-red-500/20' : m.stock < 50 ? 'bg-amber-950 text-amber-400 border-amber-500/20' : 'bg-emerald-950 text-emerald-400 border-emerald-500/20';

              return (
                <tr key={m.id} className="hover:bg-[#1f242c]/20">
                  <td className="p-4 font-bold text-slate-200">{m.name}</td>
                  <td className="p-4 text-slate-400">{m.cat}</td>
                  <td className="p-4 font-mono font-bold">{m.stock}</td>
                  <td className="p-4"><span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${statusStyle}`}>{itemStatus}</span></td>
                  <td className="p-4 text-slate-300">₹{m.price}</td>
                  <td className="p-4 space-x-2">
                    <button onClick={() => executeRestock(m.id)} className="px-2 py-1 bg-blue-600/10 text-blue-400 rounded hover:bg-blue-600/20">Restock (+100)</button>
                    <button onClick={() => deleteMedicineRow(m.id, m.name)} className="px-2 py-1 bg-red-600/10 text-red-400 rounded hover:bg-red-600/20">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacyView;