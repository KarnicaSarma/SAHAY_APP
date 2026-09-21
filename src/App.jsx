import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SahayAssistDrawer } from './components/layout/SahayAssistDrawer';
import { ToastContainer } from './components/common/Toast';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { OfficerDashboard } from './pages/OfficerDashboard';
import { LiveAssessmentPage } from './pages/LiveAssessmentPage';
import { CaseManagementPage } from './pages/CaseManagementPage';
import { SihDemoBoard } from './pages/SihDemoBoard';
import { FollowUpTimeline } from './pages/FollowUpTimeline';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { FairnessMonitor } from './pages/FairnessMonitor';
import { PrivacyPage } from './pages/PrivacyPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { VictimFacingPage } from './pages/VictimFacingPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { WellbeingExplorer } from './pages/WellbeingExplorer';
import { CounsellorSessionPage } from './pages/CounsellorSessionPage';
import { CounsellingQueuePage } from './pages/CounsellingQueuePage';
import { UserMeetingPortalPage } from './pages/UserMeetingPortalPage';

const AppContent = () => {
  const { activePage, setActivePage, isDiscreetMode, accessibility } = useApp();

  useEffect(() => {
    if (isDiscreetMode) {
      document.body.classList.add('discreet-mode');
    } else {
      document.body.classList.remove('discreet-mode');
    }

    if (accessibility.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isDiscreetMode, accessibility.highContrast]);

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <OfficerDashboard />;
      case 'assessment':
      case 'live-assessment':
        return <LiveAssessmentPage />;
      case 'user-meeting':
        return <UserMeetingPortalPage />;
      case 'counselling-queue':
        return <CounsellingQueuePage />;
      case 'counsellor-session':
      case 'counsellor':
        return <CounsellorSessionPage />;
      case 'cases':
      case 'case-management':
        return <CaseManagementPage />;
      case 'sih-demo':
      case 'demo':
        return <SihDemoBoard />;
      case 'wellbeing':
      case 'wellbeing-explorer':
        return <WellbeingExplorer />;
      case 'timeline':
        return <FollowUpTimeline />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'fairness':
        return <FairnessMonitor />;
      case 'privacy':
        return <PrivacyPage />;
      case 'audit':
        return <AuditLogsPage />;
      case 'victim':
        return <VictimFacingPage />;
      case 'settings':
        return <SettingsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <OfficerDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#1E3A8A] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Body Area with Sidebar and Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <ErrorBoundary onNavigateDashboard={() => setActivePage('dashboard')}>
            {renderPage()}
          </ErrorBoundary>
        </main>
      </div>

      {/* Floating AI Assistant Drawer */}
      <SahayAssistDrawer />

      {/* Floating Toast Alerts */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
