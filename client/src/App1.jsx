import React, { useState } from 'react';

// ==========================================
// 1. IMPORT ADMIN COMPONENTS
// ==========================================
import AdminDashboard from './components/admin/Dashboard.jsx';
import AdminAppointments from './components/admin/Appointments.jsx';
import AdminClientRegistrations from './components/admin/Client registrations.jsx';
import AdminInventory from './components/admin/Inventory.jsx';
import AdminOrganizations from './components/admin/Organizations.jsx';
import AdminPharmacy from './components/admin/Pharmacy.jsx';
import AdminPhleboTracking from './components/admin/Phlebo Tracking.jsx';
import AdminPhlebotomists from './components/admin/Phlebotomists.jsx';
import AdminPortalMonitoring from './components/admin/Portal Monitoring.jsx';
import AdminUserManagement from './components/admin/User Management.jsx';

// ==========================================
// 2. IMPORT SUPERVISOR COMPONENTS
// ==========================================
import SupervisorDashboard from './components/supervisor/Dashboard.jsx';
import SupervisorAppointments from './components/supervisor/Appointments.jsx';
import SupervisorClientApprovals from './components/supervisor/ClientApprovals.jsx';
import SupervisorGenerateReports from './components/supervisor/GenerateReports.jsx';
import SupervisorMedicineRequests from './components/supervisor/MedicineRequests.jsx';
import SupervisorPhlebotomistManagement from './components/supervisor/PhlebotomistManagement.jsx';
import SupervisorStaffManagement from './components/supervisor/StaffManagement.jsx';
import SupervisorUserVerification from './components/supervisor/UserVerification.jsx';

// ==========================================
// 3. IMPORT DOCTOR COMPONENTS
// ==========================================
import DoctorAppointments from './components/doctor/Appointments.jsx';
import DoctorProfile from './components/doctor/doctor profile.jsx';
import DoctorMediCoreDashboard from './components/doctor/MediCoreDashboard.jsx';
import DoctorNotifications from './components/doctor/Notification.jsx';
import DoctorTestOrders from './components/doctor/TestOrders.jsx';

// ==========================================
// 4. IMPORT LAB TECHNICIAN COMPONENTS
// ==========================================
import LabReports from './components/lab technician/LabReports.jsx';
import LabPhlebotomists from './components/lab technician/Phlebotomists.jsx';
import LabQCBatches from './components/lab technician/QCBatches.jsx';
import LabReportsAnalytics from './components/lab technician/ReportsAnalytics.jsx';
import LabResultsEntry from './components/lab technician/ResultsEntry.jsx';
import LabScanOrders from './components/lab technician/ScanOrders.jsx';
import LabTestOrders from './components/lab technician/TestOrders.jsx';

export default function App() {
  // Global states for master portal role selection and sub-view navigation
  const [currentRole, setCurrentRole] = useState('admin');
  const [adminView, setAdminView] = useState('dashboard');
  const [supervisorView, setSupervisorView] = useState('dashboard');
  const [doctorView, setDoctorView] = useState('dashboard');
  const [labView, setLabView] = useState('lab-reports');

  // ==========================================
  // SIDEBAR CONFIGURATIONS PER ROLE
  // ==========================================
  const adminMenu = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
    { id: 'portal-monitoring', name: 'Portal Monitoring', icon: '🖥️' },
    { id: 'user-management', name: 'User Management', icon: '👥' },
    { id: 'phlebotomists', name: 'Phlebotomists', icon: '💉' },
    { id: 'phlebo-tracking', name: 'Phlebo Tracking', icon: '🩸' },
    { id: 'client-registrations', name: 'Client Registrations', icon: '📄' },
    { id: 'organizations', name: 'Organizations', icon: '🏢' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
    { id: 'inventory', name: 'Inventory', icon: '📦' },
    { id: 'appointments', name: 'Appointments', icon: '🗓️' },
  ];

  const supervisorMenu = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
    { id: 'user-verification', name: 'User Verification', icon: '✅' },
    { id: 'client-approvals', name: 'Client Approvals', icon: '📋' },
    { id: 'staff-management', name: 'Staff Management', icon: '👥' },
    { id: 'phlebotomist-management', name: 'Phlebotomists', icon: '💉' },
    { id: 'appointments', name: 'Appointments', icon: '🗓️' },
    { id: 'medicine-requests', name: 'Medicine Requests', icon: '💊' },
    { id: 'generate-reports', name: 'Generate Reports', icon: '📊' },
  ];

  const doctorMenu = [
    { id: 'dashboard', name: 'MediCore Dashboard', icon: '🏥' },
    { id: 'appointments', name: 'Appointments', icon: '🗓️' },
    { id: 'profile', name: 'Doctor Profile', icon: '👤' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'test-orders', name: 'Test Orders', icon: '🧪' },
  ];

  const labMenu = [
    { id: 'lab-reports', name: 'Lab Reports', icon: '📋' },
    { id: 'phlebotomists', name: 'Phlebotomists', icon: '💉' },
    { id: 'qc-batches', name: 'QC Batches', icon: '🧪' },
    { id: 'reports-analytics', name: 'Reports & Analytics', icon: '📊' },
    { id: 'results-entry', name: 'Results Entry', icon: '✍️' },
    { id: 'scan-orders', name: 'Scan Orders', icon: '🖨️' },
    { id: 'test-orders', name: 'Test Orders', icon: '🧪' },
  ];

  // ==========================================
  // VIEW ROUTER ENGINES
  // ==========================================
  const renderAdminView = () => {
    switch (adminView) {
      case 'dashboard': return <AdminDashboard />;
      case 'portal-monitoring': return <AdminPortalMonitoring />;
      case 'user-management': return <AdminUserManagement />;
      case 'phlebotomists': return <AdminPhlebotomists />;
      case 'phlebo-tracking': return <AdminPhleboTracking />;
      case 'client-registrations': return <AdminClientRegistrations />;
      case 'organizations': return <AdminOrganizations />;
      case 'pharmacy': return <AdminPharmacy />;
      case 'inventory': return <AdminInventory />;
      case 'appointments': return <AdminAppointments />;
      default: return <AdminDashboard />;
    }
  };

  const renderSupervisorView = () => {
    switch (supervisorView) {
      case 'dashboard': return <SupervisorDashboard />;
      case 'user-verification': return <SupervisorUserVerification />;
      case 'client-approvals': return <SupervisorClientApprovals />;
      case 'staff-management': return <SupervisorStaffManagement />;
      case 'phlebotomist-management': return <SupervisorPhlebotomistManagement />;
      case 'appointments': return <SupervisorAppointments />;
      case 'medicine-requests': return <SupervisorMedicineRequests />;
      case 'generate-reports': return <SupervisorGenerateReports />;
      default: return <SupervisorDashboard />;
    }
  };

  const renderDoctorView = () => {
    switch (doctorView) {
      case 'dashboard': return <DoctorMediCoreDashboard />;
      case 'appointments': return <DoctorAppointments />;
      case 'profile': return <DoctorProfile />;
      case 'notifications': return <DoctorNotifications />;
      case 'test-orders': return <DoctorTestOrders />;
      default: return <DoctorMediCoreDashboard />;
    }
  };

  const renderLabView = () => {
    switch (labView) {
      case 'lab-reports': return <LabReports />;
      case 'phlebotomists': return <LabPhlebotomists />;
      case 'qc-batches': return <LabQCBatches />;
      case 'reports-analytics': return <LabReportsAnalytics />;
      case 'results-entry': return <LabResultsEntry />;
      case 'scan-orders': return <LabScanOrders />;
      case 'test-orders': return <LabTestOrders />;
      default: return <LabReports />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1319] text-white flex flex-col font-sans antialiased selection:bg-blue-600/40">
      
      {/* GLOBAL MANAGEMENT PORTAL CONTROL HEADER */}
      <header className="bg-[#161b22] border-b border-gray-800 h-16 px-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-blue-500 text-2xl font-black">🏥</span>
          <span className="text-xl font-black tracking-tight font-serif">
            Medi<span className="text-blue-500">Core</span> <span className="text-gray-400 font-sans text-xs uppercase bg-gray-800/60 px-2 py-0.5 rounded ml-2 tracking-widest">Unified Enterprise</span>
          </span>
        </div>

        {/* TOP MASTER ROLE SWITCHER HUB */}
        <div className="flex items-center gap-1.5 bg-[#0f1319] p-1.5 rounded-xl border border-gray-800/80">
          {[
            { id: 'admin', label: 'Admin', color: 'bg-blue-600' },
            { id: 'supervisor', label: 'Supervisor', color: 'bg-purple-600' },
            { id: 'doctor', label: 'Doctor', color: 'bg-rose-600' },
            { id: 'lab', label: 'Lab Tech', color: 'bg-emerald-600' }
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => setCurrentRole(role.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                currentRole === role.id ? `${role.color} text-white shadow-lg` : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* DYNAMIC ADAPTIVE SIDEBAR CONTAINER */}
        <aside className="w-64 bg-[#161b22] border-r border-gray-800 flex flex-col p-4 overflow-y-auto shrink-0 select-none">
          
          {/* Admin Navigation Options */}
          {currentRole === 'admin' && (
            <div className="space-y-0.5">
              <p className="text-[10px] text-gray-500 font-black tracking-wider px-3 mb-2 uppercase">Admin Workspace</p>
              {adminMenu.map((m) => (
                <button key={m.id} onClick={() => setAdminView(m.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all ${adminView === m.id ? 'bg-[#1c2128] text-blue-400 border-gray-800 font-bold' : 'text-gray-400 hover:bg-[#1c2128]/40 border-transparent'}`}>
                  <span>{m.icon}</span> <span>{m.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Supervisor Navigation Options */}
          {currentRole === 'supervisor' && (
            <div className="space-y-0.5">
              <p className="text-[10px] text-gray-500 font-black tracking-wider px-3 mb-2 uppercase">Supervisor Workspace</p>
              {supervisorMenu.map((m) => (
                <button key={m.id} onClick={() => setSupervisorView(m.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all ${supervisorView === m.id ? 'bg-[#1c2128] text-purple-400 border-gray-800 font-bold' : 'text-gray-400 hover:bg-[#1c2128]/40 border-transparent'}`}>
                  <span>{m.icon}</span> <span>{m.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Doctor Navigation Options */}
          {currentRole === 'doctor' && (
            <div className="space-y-0.5">
              <p className="text-[10px] text-gray-500 font-black tracking-wider px-3 mb-2 uppercase">Medical Portal</p>
              {doctorMenu.map((m) => (
                <button key={m.id} onClick={() => setDoctorView(m.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all ${doctorView === m.id ? 'bg-[#1c2128] text-rose-400 border-gray-800 font-bold' : 'text-gray-400 hover:bg-[#1c2128]/40 border-transparent'}`}>
                  <span>{m.icon}</span> <span>{m.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Lab Technician Navigation Options */}
          {currentRole === 'lab' && (
            <div className="space-y-0.5">
              <p className="text-[10px] text-gray-500 font-black tracking-wider px-3 mb-2 uppercase">Diagnostics Engine</p>
              {labMenu.map((m) => (
                <button key={m.id} onClick={() => setLabView(m.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all ${labView === m.id ? 'bg-[#1c2128] text-emerald-400 border-gray-800 font-bold' : 'text-gray-400 hover:bg-[#1c2128]/40 border-transparent'}`}>
                  <span>{m.icon}</span> <span>{m.name}</span>
                </button>
              ))}
            </div>
          )}

        </aside>

        {/* CORE INTERFACE DISPLAY GRID CONTAINER */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0f1319]">
          <div className="animate-fade-in duration-200">
            {currentRole === 'admin' && renderAdminView()}
            {currentRole === 'supervisor' && renderSupervisorView()}
            {currentRole === 'doctor' && renderDoctorView()}
            {currentRole === 'lab' && renderLabView()}
          </div>
        </main>
      </div>

    </div>
  );
}