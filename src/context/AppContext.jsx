import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_CASES, INITIAL_CASE_QUEUE, INITIAL_AUDIT_LOGS, INITIAL_FOLLOW_UPS } from '../services/mockDatabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('NHAA Officer');
  const [userName, setUserName] = useState('Officer P. Verma (ID: NHAA-8942)');
  
  // Active Assessment State
  const [currentCase, setCurrentCase] = useState(DEMO_CASES["SAHAY-004"] || INITIAL_CASE_QUEUE[0]);
  const [caseQueue, setCaseQueue] = useState(INITIAL_CASE_QUEUE);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [followUps, setFollowUps] = useState(INITIAL_FOLLOW_UPS);
  
  // Toggles & Settings
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [isDiscreetMode, setIsDiscreetMode] = useState(false);

  // Counselling Queue State
  const [counsellingQueue, setCounsellingQueue] = useState([
    {
      sessionId: 'COUNSELLOR-ROOM-101',
      caseId: 'LIVE-001',
      patientName: 'Live Intake Complainant',
      language: 'Assamese',
      svi: 72,
      riskCategory: 'HIGH',
      requestTime: '10 mins ago',
      status: 'Waiting for Counsellor',
      narrative: 'মোক বাৰে বাৰে ভাবুকি দিয়া হৈছে আৰু এতিয়া মোৰ ভয় লাগিছে।'
    },
    {
      sessionId: 'COUNSELLOR-ROOM-102',
      caseId: 'SAHAY-004',
      patientName: 'Sunita D. (Complainant)',
      language: 'Kannada',
      svi: 88,
      riskCategory: 'CRITICAL',
      requestTime: '2 mins ago',
      status: 'Waiting for Counsellor',
      narrative: 'ನನಗೆ ಪದೇ ಪದೇ ಬೆದರಿಕೆಗಳು ಬರುತ್ತಿವೆ ಮತ್ತು ಈಗ ನನಗೆ ಮನೆಯಿಂದ ಹೊರಗೆ ಹೋಗಲು ಭಯವಾಗುತ್ತಿದೆ'
    }
  ]);
  const [activeCounsellingSession, setActiveCounsellingSession] = useState(null);
  const [accessibility, setAccessibility] = useState({
    fontSize: 'normal', // normal, large, x-large
    highContrast: false,
    reducedMotion: false,
    screenReader: false
  });
  const [selectedLanguage, setSelectedLanguage] = useState('Auto Detect');
  const [isSahayAssistOpen, setIsSahayAssistOpen] = useState(false);
  
  // Consent state for current case
  const [consent, setConsent] = useState({
    voice: true,
    text: true,
    shareCounsellor: true,
    emergencyEscalation: true
  });

  // SIH Guided Demo State
  const [isSihDemoRunning, setIsSihDemoRunning] = useState(false);
  const [sihDemoStep, setSihDemoStep] = useState(0);

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const addAuditLog = (action, details, caseId = currentCase?.id) => {
    const newLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      caseId: caseId || "SYSTEM",
      role: `${userName} (${userRole})`,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const loadDemoCase = (caseKey) => {
    let targetCase = null;
    if (typeof caseKey === 'object' && caseKey !== null) {
      targetCase = caseKey;
    } else if (DEMO_CASES[caseKey]) {
      targetCase = DEMO_CASES[caseKey];
    } else if (caseKey === 'CASE_1') {
      targetCase = DEMO_CASES["SAHAY-001"];
    } else if (caseKey === 'CASE_2') {
      targetCase = DEMO_CASES["SAHAY-002"];
    } else if (caseKey === 'CASE_3') {
      targetCase = DEMO_CASES["SAHAY-003"];
    } else if (caseKey === 'CASE_4') {
      targetCase = DEMO_CASES["SAHAY-004"];
    }

    if (targetCase) {
      setCurrentCase(targetCase);
      addToast(`Loaded ${targetCase.id} (${targetCase.languageDisplay || targetCase.language})`, 'success');
      addAuditLog('Demo Case Loaded', `Case ${targetCase.id} loaded for analysis.`);
    }
  };

  const addCaseToQueue = (newCase) => {
    setCaseQueue(prev => {
      // Avoid duplicate IDs
      const filtered = prev.filter(c => c.id !== newCase.id);
      return [newCase, ...filtered];
    });
    setCurrentCase(newCase);
    addToast(`Saved Case ${newCase.id} to Case Management Queue!`, 'success');
    addAuditLog('Live Case Created & Saved', `New live assessment case ${newCase.id} saved to Case Queue.`);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    let name = "Officer P. Verma";
    if (role === 'Counsellor') name = "Dr. S. Sharma (Senior Counsellor)";
    else if (role === 'Patient / Complainant') name = "Sunita D. (Complainant / Patient)";
    else if (role === 'District Officer') name = "District Protection Off. R. Patil";
    else if (role === 'Welfare Officer') name = "Social Welfare Off. N. Rao";
    else if (role === 'Authorized Administrator') name = "System Administrator (Master Access)";
    setUserName(name);
    addToast(`Switched role to ${role}`, 'info');
    addAuditLog('Role Switch', `User context updated to ${role}`);
    if (role === 'Patient / Complainant') {
      setActivePage('user-meeting');
    }
  };

  // Request new Counselling Session (Invoked by Patient/Victim)
  const requestCounsellorSession = (caseData = null) => {
    const targetCase = caseData || currentCase || {};
    const newSessionId = `COUNSELLOR-ROOM-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newRequest = {
      sessionId: newSessionId,
      caseId: targetCase.id || 'LIVE-REQ',
      patientName: targetCase.victimSpeaker || 'Live Complainant',
      language: targetCase.language || 'Assamese',
      svi: targetCase.svi || 75,
      riskCategory: targetCase.riskCategory || 'HIGH',
      requestTime: 'Just now',
      status: 'Waiting for Counsellor',
      narrative: targetCase.victimNarrative || targetCase.translatedText || 'Victim requested confidential counselling session.'
    };

    setCounsellingQueue(prev => [newRequest, ...prev.filter(c => c.sessionId !== newSessionId)]);
    setActiveCounsellingSession(newRequest);
    addToast(`Counselling request created (${newSessionId}). Added to Counsellor Queue.`, 'success');
    addAuditLog('Counselling Requested', `Case ${newRequest.caseId} queued for Counsellor session ${newSessionId}.`);
    setActivePage('counsellor-session');
  };

  // Join Counselling Session (Invoked by Counsellor from Queue)
  const joinCounsellingSession = (sessionItem) => {
    // Update session status in queue to 'In Session'
    setCounsellingQueue(prev => prev.map(item => {
      if (item.sessionId === sessionItem.sessionId) {
        return { ...item, status: 'In Session' };
      }
      return item;
    }));

    const updatedSession = { ...sessionItem, status: 'In Session' };
    setActiveCounsellingSession(updatedSession);
    addToast(`Counsellor joined WebRTC Room ${sessionItem.sessionId}`, 'success');
    addAuditLog('Counsellor Joined Session', `Dr. S. Sharma joined session ${sessionItem.sessionId} for Case ${sessionItem.caseId}.`);
    setActivePage('counsellor-session');
  };

  // End Counselling Session
  const endCounsellingSession = (sessionId) => {
    if (sessionId) {
      setCounsellingQueue(prev => prev.map(item => {
        if (item.sessionId === sessionId) {
          return { ...item, status: 'Completed' };
        }
        return item;
      }));
    }
    setActiveCounsellingSession(null);
    addToast('Counselling session ended.', 'info');
  };

  // Run Guided 2-3 Minute SIH Demo
  const startSihGuidedDemo = () => {
    setIsSihDemoRunning(true);
    setSihDemoStep(1);
    setActivePage('assessment');
    addToast("Starting SIH Guided Assessment Demonstration (19 Steps)...", "success");
    addAuditLog("SIH Demo Started", "Automated 19-step SIH judging flow initiated.");
  };

  const stopSihGuidedDemo = () => {
    setIsSihDemoRunning(false);
    setSihDemoStep(0);
    addToast("SIH Demo completed or stopped.", "info");
  };

  // Step advancement timer for SIH Demo
  useEffect(() => {
    if (isSihDemoRunning && sihDemoStep > 0 && sihDemoStep < 19) {
      const timer = setTimeout(() => {
        setSihDemoStep(prev => prev + 1);
      }, 2500); // 2.5 seconds per step
      return () => clearTimeout(timer);
    } else if (sihDemoStep === 19) {
      addToast("SIH Demonstration completed successfully!", "success");
      addAuditLog("SIH Demo Completed", "Full workflow verified: Listen -> Assess -> Support.");
      setIsSihDemoRunning(false);
    }
  }, [isSihDemoRunning, sihDemoStep]);

  return (
    <AppContext.Provider value={{
      activePage, setActivePage,
      isAuthenticated, setIsAuthenticated,
      userRole, setUserRole, handleRoleChange,
      userName, setUserName,
      currentCase, setCurrentCase, loadDemoCase, addCaseToQueue,
      caseQueue, setCaseQueue,
      auditLogs, addAuditLog,
      followUps, setFollowUps,
      isLowBandwidth, setIsLowBandwidth,
      isDiscreetMode, setIsDiscreetMode,
      accessibility, setAccessibility,
      selectedLanguage, setSelectedLanguage,
      isSahayAssistOpen, setIsSahayAssistOpen,
      counsellingQueue, setCounsellingQueue,
      activeCounsellingSession, setActiveCounsellingSession,
      requestCounsellorSession, joinCounsellingSession, endCounsellingSession,
      consent, setConsent,
      isSihDemoRunning, sihDemoStep, startSihGuidedDemo, stopSihGuidedDemo,
      toasts, addToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
