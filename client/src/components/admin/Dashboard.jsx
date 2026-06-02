import React, { useState } from 'react';
import { Users, UserRound, Activity, DollarSign, Hourglass, Calendar, BarChart3 } from 'lucide-react';

const DashboardView = () => {
  // Report Form States
  const [reportType, setReportType] = useState('Revenue Report');
  const [fromDate, setFromDate] = useState('2026-05-01');
  const [toDate, setToDate] = useState('2026-05-29');
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic system notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New doctor registration pending approval', time: '10 min ago', unread: true, color: 'text-red-500' },
    { id: 2, text: 'Medicine stock low: Paracetamol 500mg', time: '25 min ago', unread: true, color: 'text-amber-500' },
    { id: 3, text: 'Monthly revenue report generated', time: '1 hr ago', unread: false, color: 'text-emerald-500' },
    { id: 4, text: 'System backup completed successfully', time: '3 hr ago', unread: false, color: 'text-slate-500' },
  ]);

  const stats = [
    { title: 'TOTAL USERS', value: '3,842', color: 'text-blue-500', border: 'border-blue-500/20', icon: Users },
    { title: 'DOCTORS', value: '128', color: 'text-purple-500', border: 'border-purple-500/20', icon: UserRound },
    { title: 'PATIENTS', value: '3,496', color: 'text-emerald-500', border: 'border-emerald-500/20', icon: Users },
    { title: 'MEDICINES', value: '2,104', color: 'text-pink-500', border: 'border-pink-500/20', icon: Activity },
    { title: 'REVENUE', value: '₹18,42,500', color: 'text-amber-500', border: 'border-amber-500/20', icon: DollarSign },
    { title: 'PENDING', value: '14', color: 'text-red-500', border: 'border-red-500/20', icon: Hourglass },
  ];

  const handleGenerateReport = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report compilation complete!\nType: ${reportType}\nRange: ${fromDate} to ${toDate}\nYour compilation download is starting.`);
    }, 1500);
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 bg-[#0d1117] min-h-screen text-slate-100 space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">🏠 Dashboard & Analytics</h2>
      
      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-[#161b22] p-4 rounded-xl border ${stat.border}`}>
            <div className="flex justify-between items-start text-[10px] font-bold text-slate-400 tracking-wider mb-2">
              {stat.title}
              <stat.icon className="w-4 h-4" />
            </div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* REPORT GENERATION PANEL */}
      <div className="bg-[#161b22] border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-slate-300">
          <BarChart3 className="w-4 h-4 text-emerald-500" /> Generate System Report
        </h3>
        <form onSubmit={handleGenerateReport} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">REPORT TYPE</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full bg-[#0d1117] border border-slate-800 rounded-lg p-2.5 text-slate-200">
              <option>Revenue Report</option>
              <option>Patient Activity Log</option>
              <option>Pharmacy Inventory Export</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">FROM DATE</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full bg-[#0d1117] border border-slate-800 rounded-lg p-2 text-slate-200" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">TO DATE</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full bg-[#0d1117] border border-slate-800 rounded-lg p-2 text-slate-200" />
          </div>
          <button type="submit" disabled={isGenerating} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-bold text-white rounded-lg transition-all">
            {isGenerating ? 'Compiling...' : 'Generate'}
          </button>
        </form>
      </div>

      {/* Live System Alerts Display */}
      <div className="bg-[#161b22] p-5 rounded-xl border border-slate-800">
        <h3 className="text-sm font-semibold mb-4 text-slate-300 flex items-center gap-2">
          🔔 Active Alerts ({notifications.filter(n => n.unread).length} Unread)
        </h3>
        <div className="space-y-3 text-xs">
          {notifications.map((n) => (
            <div key={n.id} className="flex justify-between items-center p-3 bg-[#0d1117]/50 rounded-lg border border-slate-800/40">
              <p className="text-slate-300"><span className={`${n.color} mr-2`}>●</span>{n.text}</p>
              <div className="flex items-center gap-4">
                <span className="text-slate-500">{n.time}</span>
                <button onClick={() => dismissNotification(n.id)} className="text-slate-500 hover:text-red-400 transition-colors">Clear</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;