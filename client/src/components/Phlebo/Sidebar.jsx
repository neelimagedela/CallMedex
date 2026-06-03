import React from 'react';
import {
  User,
  Wallet,
  ClipboardList,
  Activity,
  LogOut,
  CheckCircle
} from 'lucide-react';

const Sidebar = ({ currentTab, setPage }) => {
  const menuItems = [
    { name: 'My Profile', value: 'phlebo-profile', icon: <User size={20} /> },
    { name: 'Earnings Wallet', value: 'phlebo-wallet', icon: <Wallet size={20} /> },
    { name: 'Job Requests', value: 'phlebo-tasks', icon: <ClipboardList size={20} /> },
    { name: 'Active Collection', value: 'phlebo-active', icon: <Activity size={20} /> },
    {
    name: 'Completed Tasks',
    value: 'phlebo-completed',
    icon: <CheckCircle size={20} />
  }
  ];

  return (
    <aside style={{ width: '260px', background: '#0f172a', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h3 style={{ color: '#ef4444', margin: 0 }}>CALLMEDEX</h3>
        <small style={{ color: '#94a3b8' }}>Phlebo Portal</small>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {menuItems.map((item, index) => {
          const isActive = currentTab === item.value;
          return (
            <button
              key={index}
              onClick={() => setPage(item.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                color: isActive ? '#fff' : '#94a3b8',
                background: isActive ? '#1e293b' : 'transparent',
                borderRadius: '6px',
                border: 'none',
                textAlign: 'left',
                width: '100%',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          );
        })}
        
        {/* Core exit sequence returning users straight to home page layout wrapper view states */}
        <button
          onClick={() => setPage('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            color: '#ef4444',
            background: 'transparent',
            borderRadius: '6px',
            border: 'none',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer',
            fontSize: '14px',
            marginTop: 'auto'
          }}
        >
          <LogOut size={20} />
          <span>Exit Portal</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;