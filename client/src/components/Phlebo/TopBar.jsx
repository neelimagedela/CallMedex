import React, { useState } from 'react';
import { Bell, ShieldAlert, LogOut } from 'lucide-react';

const TopBar = ({ setPage }) => {
  // Local state tracking the phlebotomist presence availability status toggle
  const [isOnline, setIsOnline] = useState(true);

  return (
    <header style={{
      height: '70px',
      background: '#fff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)'
    }}>
      {/* Left Segment: Duty Duty Switcher Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>
          Duty Status:
        </span>
        <button 
          onClick={() => setIsOnline(!isOnline)}
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            background: isOnline ? '#dcfce7' : '#fee2e2',
            color: isOnline ? '#15803d' : '#b91c1c',
            transition: 'all 0.2s'
          }}
        >
          {isOnline ? '● Active & Online' : '○ Offline / Off-Duty'}
        </button>
      </div>

      {/* Right Segment: System Alerts & Exit Gateway */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Notifications Icon Button */}
        <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', position: 'relative' }}>
          <Bell size={22} />
          {isOnline && (
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
          )}
        </button>

        <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }}></div>

        {/* Action Button to safely route execution back to the public website home */}
        <button 
          onClick={() => setPage('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            padding: '6px 12px',
            borderRadius: '6px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={18} style={{ color: '#ef4444' }} />
          <span style={{ color: '#475569' }}>Exit Console</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;