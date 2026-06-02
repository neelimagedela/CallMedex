import React, { useState } from 'react';

export default function GenerateReports() {
  const [reportType, setReportType] = useState('Revenue Report');
  const [fromDate, setFromDate] = useState('2026-05-01');
  const [toDate, setToDate] = useState('2026-05-29');
  
  const [compiledReportOutput, setCompiledReportOutput] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const executeReportCompilation = () => {
    setIsCompiling(true);
    setCompiledReportOutput(null);

    // Dynamic generation simulation displaying results directly to screen inside canvas
    setTimeout(() => {
      setCompiledReportOutput({
        meta: {
          generatedOn: new Date().toLocaleString(),
          scope: reportType,
          duration: `From ${fromDate} to ${toDate}`,
          checksum: `MD5-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        },
        dataRecords: [
          { segmentId: 'SEG-ALPHA', transactionVolume: '412 Hits', computedYield: '₹8,42,500' },
          { segmentId: 'SEG-BETA', transactionVolume: '632 Hits', computedYield: '₹6,00,000' },
          { segmentId: 'SEG-GAMMA', transactionVolume: '203 Hits', computedYield: '₹4,00,000' },
        ],
        aggregateSummary: 'Total consolidated system throughput balancing correctly against ledger definitions.'
      });
      setIsCompiling(false);
    }, 850);
  };

  return (
    <div className="p-6 bg-[#0f1319] text-gray-100 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">📊 Reports & Analytics</h1>
        <p className="text-xs text-gray-400">Supervisor Panel &gt; Reports</p>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#161b22] border-t-2 border-blue-500 p-5 rounded-xl">
          <span className="text-[10px] text-gray-400 tracking-wider block font-bold">MONTHLY REVENUE</span>
          <span className="text-2xl font-black block mt-2 text-blue-400">₹18,42,500</span>
        </div>
        <div className="bg-[#161b22] border-t-2 border-emerald-500 p-5 rounded-xl">
          <span className="text-[10px] text-gray-400 tracking-wider block font-bold">TESTS THIS MONTH</span>
          <span className="text-2xl font-black block mt-2 text-emerald-400">1,247</span>
        </div>
        <div className="bg-[#161b22] border-t-2 border-purple-500 p-5 rounded-xl">
          <span className="text-[10px] text-gray-400 tracking-wider block font-bold">NEW PATIENTS</span>
          <span className="text-2xl font-black block mt-2 text-purple-400">183</span>
        </div>
      </div>

      {/* Control Rig parameters */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">📝 Generate Report Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-[10px] text-gray-400 block mb-1.5 font-bold uppercase">REPORT TYPE</label>
            <select 
              value={reportType} 
              onChange={e => setReportType(e.target.value)}
              className="w-full bg-[#1c2128] border border-[#2d333b] p-2.5 rounded-lg text-xs text-gray-100 focus:outline-none focus:border-blue-500"
            >
              <option value="Revenue Report">Revenue Report Matrix</option>
              <option value="Staff Attendance Overview">Staff Attendance Overview</option>
              <option value="Phlebotomy Efficiency Analytics">Phlebotomy Efficiency Analytics</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-gray-400 block mb-1.5 font-bold uppercase">FROM DATE</label>
            <input 
              type="date" 
              value={fromDate} 
              onChange={e => setFromDate(e.target.value)}
              className="w-full bg-[#1c2128] border border-[#2d333b] p-2.5 rounded-lg text-xs text-gray-100 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <label className="text-[10px] text-gray-400 block mb-1.5 font-bold uppercase">TO DATE</label>
              <input 
                type="date" 
                value={toDate} 
                onChange={e => setToDate(e.target.value)}
                className="w-full bg-[#1c2128] border border-[#2d333b] p-2.5 rounded-lg text-xs text-gray-100 focus:outline-none focus:border-blue-500" 
              />
            </div>
            <button 
              onClick={executeReportCompilation}
              disabled={isCompiling}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow h-[38px] flex items-center justify-center disabled:opacity-40"
            >
              {isCompiling ? 'Compiling...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>

      {/* Screen Presentation Layer (Directly displays runtime analytical results) */}
      {compiledReportOutput && (
        <div className="bg-[#1c2128] border border-blue-500/30 rounded-xl p-5 shadow-2xl animate-fade-in">
          <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-blue-400">📊 Production Quality Live View Screen Output</h2>
              <p className="text-[10px] text-gray-400 mt-0.5">{compiledReportOutput.meta.duration}</p>
            </div>
            <button 
              onClick={() => setCompiledReportOutput(null)} 
              className="text-xs bg-[#161b22] px-3 py-1 rounded text-gray-400 hover:text-white border border-gray-700"
            >
              Clear Screen Output
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs font-mono bg-[#12161a] p-3 rounded border border-gray-800">
            <div><span className="text-gray-500">Target Manifest Class:</span> {compiledReportOutput.meta.scope}</div>
            <div><span className="text-gray-500">Cryptographic Seal Trace:</span> {compiledReportOutput.meta.checksum}</div>
          </div>

          <div className="border border-gray-800 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#12161a] text-gray-400">
                <tr>
                  <th className="p-3">DATA SEGMENT TARGET</th>
                  <th className="p-3">DENSITY MATRIX LEVEL</th>
                  <th className="p-3 text-right">COMPUTED YIELD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                {compiledReportOutput.dataRecords.map((rec, i) => (
                  <tr key={i} className="hover:bg-gray-800/30">
                    <td className="p-3 text-blue-300">{rec.segmentId}</td>
                    <td className="p-3">{rec.transactionVolume}</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">{rec.computedYield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-950/30 text-blue-300 p-3 rounded-lg border border-blue-800/30 text-xs">
            <span className="font-bold">System Auditor Synopsis:</span> {compiledReportOutput.aggregateSummary}
          </div>
        </div>
      )}
    </div>
  );
}