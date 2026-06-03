import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. PUBLIC WEBSITE / PATIENT COMPONENT IMPORTS
import MainLayout from '../components/layout/MainLayout'; 
import Home from '../components/home/Home'; 
// NOTE: Import your other existing application features (e.g., Pharmacy, Appointments) here as needed.

// 2. PHLEBOTOMIST DASHBOARD COMPONENT IMPORTS
import DashboardLayout from '../components/layout/DashboardLayout';
import Profile from '../pages/Phlebo/Profile';
import Wallet from '../pages/Phlebo/Wallet';
import TasksList from '../pages/Phlebo/TasksList';
import ActiveTask from '../pages/Phlebo/ActiveTask';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ==========================================================
            SECTION A: PATIENT SIDE CORE INTERFACE SYSTEM 
            Description: Standard customer-facing routes utilizing 
                         global Main Layout (Header, Body Content, Footer).
           ========================================================== */}
        <Route path="/" element={<MainLayout />}>
          {/* Default entry point displaying standard home panel */}
          <Route index element={<Home />} /> 
          
          {/* Placeholder: Register your existing user application modules here 
            Example structure:
            <Route path="appointments" element={<Appointments />} />
            <Route path="pharmacy" element={<Pharmacy />} />
          */}
        </Route>

        {/* ==========================================================
            SECTION B: PHLEBOTOMIST SECURE DASHBOARD MANAGEMENT PORTAL
            Description: Restricted workflows using custom dashboard layouts 
                         (Sidebar navigation and Live Shift Switcher TopBar).
           ========================================================== */}
        <Route path="/phlebo" element={<DashboardLayout />}>
          {/* Automated path correction forcing entry straight into user profile module */}
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="tasks" element={<TasksList />} />
          <Route path="active-task" element={<ActiveTask />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;