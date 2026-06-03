import React from 'react';
import Sidebar from '../Phlebo/Sidebar';
import TopBar from '../Phlebo/TopBar';

const DashboardLayout = ({ children, currentTab, setPage }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa', width: '100vw' }}>
      {/* Sidebar handles layout navigation states */}
      <Sidebar currentTab={currentTab} setPage={setPage} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* TopBar now receives navigation controls safely */}
        <TopBar setPage={setPage} />
        
        <main style={{ padding: '24px', flex: 1, background: '#f8fafc' }}>
          {children} 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;