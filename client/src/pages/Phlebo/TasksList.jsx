import React, { useState } from 'react';
import { usePhlebo } from '../../context/PhleboContext';
import {
  User,
  Phone,
  FileText,
  MapPin,
  Navigation
} from 'lucide-react';
const TasksList = () => {
  // Extracting navigation controls globally from context without passing drill-down props
  const { setPage } = usePhlebo(); 
  
  const [requests, setRequests] = useState([
    { 
      id: 'JOB-9921', 
      diagnosticCenter: 'CallMedex Central Lab Vizag', 
      patientName: 'K. Satish Narayana', 
      phone: '+91 98480 22334',
      address: 'Flat 402, Sri Sai Towers, Lawsons Bay Colony, Visakhapatnam',
      prescribedTests: ['Complete Blood Count (CBC)', 'HbA1c (Glycated Haemoglobin)'],
      baseFare: 50, 
      distance: '4.2 km' 
    }
  ]);

  const handleAccept = (jobId) => {
    alert(`Job ${jobId} accepted! Shifting execution tracker pipeline metrics.`);
    setPage('phlebo-active'); // Triggers state navigation smoothly via context
  };

  const handleReject = (jobId) => {
    setRequests(requests.filter(req => req.id !== jobId));
    alert('Job notification alert rejected successfully.');
  };

  return (
    <div style={{ fontFamily: 'inherit', padding: '12px 0' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>
        Incoming Duty Alerts (Part-Time Options)
      </h2>
      
      {requests.length === 0 ? (
        <div style={{ padding: '20px', background: '#f1f5f9', borderRadius: '8px', textAlign: 'center' }}>
          No live jobs requests matching coordinates at this moment.
        </div>
      ) : (
        requests.map(job => (
          <div key={job.id} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', maxWidth: '700px' }}>
            
            {/* CARD HEADER METRICS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '12px', marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold', color: '#334155' }}>ID: {job.id}</span>
              <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '16px' }}>Base Payout: ₹{job.baseFare}</span>
            </div>
            
            {/* LOGISTICS CENTER INFO */}
            <div style={{ marginBottom: '16px', fontSize: '15px', color: '#1e293b' }}>
              <p style={{ margin: '0 0 6px 0' }}>
                <strong>Diagnostic Hub:</strong> {job.diagnosticCenter}
              </p>
              <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} /> Estimated Radius: {job.distance} away from current node location.
              </p>
            </div>

            {/* NEW ENHANCED DETAILS CONTAINER BOX */}
            <div style={{ 
              background: '#f8fafc', 
              borderRadius: '12px', 
              padding: '16px', 
              border: '1px solid #e2e8f0',
              marginBottom: '20px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              {/* Left Column: Patient & Contact details */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <User size={15} style={{ color: '#64748b' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>PATIENT NAME</span>
                </div>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                  {job.patientName}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Phone size={14} style={{ color: '#64748b' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>CONTACT PHONE</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#475569', fontWeight: '500' }}>
                  {job.phone}
                </p>
                <div
  style={{
    marginTop: '12px'
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px'
    }}
  >
    <MapPin
      size={14}
      style={{ color: '#ef4444', marginTop: '2px' }}
    />

    <div>
      <div
        style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#64748b'
        }}
      >
        PATIENT ADDRESS
      </div>

      <div
        style={{
          fontSize: '13px',
          color: '#334155'
        }}
      >
        {job.address}
      </div>
    </div>
  </div>
</div>
              </div>

              {/* Right Column: Dynamic Prescribed Medical Tests */}
              <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FileText size={15} style={{ color: '#2563eb' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#2563eb' }}>PRESCRIBED TESTS</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#334155', fontWeight: '600', lineHeight: '1.5' }}>
                  {job.prescribedTests.map((test, index) => (
                    <li key={index}>{test}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div
  style={{
    display: 'flex',
    gap: '10px',
    marginBottom: '15px'
  }}
>
  <button
    onClick={() =>
      window.location.href = `tel:${job.phone}`
    }
   style={{
  flex: 1,
  padding: '10px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px'
}}
  >
    <>
  <Phone size={16} />
Call Patient
</>
  </button>

  <button
    onClick={() =>
    window.open(
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`,
  '_blank'
)
    }
    style={{
  flex: 1,
  padding: '10px',
  background: '#059669',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px'
}}
  >
<Navigation size={16} />
Navigate
  </button>
</div>
            {/* CONTROLLER ACTION BUTTON MATRIX */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button onClick={() => handleAccept(job.id)} style={{ flex: 1, padding: '12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
                Accept Job
              </button>
              <button onClick={() => handleReject(job.id)} style={{ padding: '12px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
                Reject
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default TasksList;