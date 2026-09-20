# SAHAY (Smart AI-Assisted Humanitarian Assessment & Yielding Support System)
### *AI-Based Real-Time Stress and Trauma Assessment Module for Victims Accessing NHAA 14566 & Integrated Portal*

**Smart India Hackathon (SIH) 2026 Official Prototype**  
Tagline: **“Listen. Understand. Support.”**  
Secondary line: **AI-assisted, human-led support for victims and complainants.**

---

## Executive Summary & Non-Medical Framing

SAHAY is an integrated public service platform designed for authorized National Helpline for Alleviating Abuse (**NHAA 14566**) personnel, counsellors, protection officers, and welfare administrators. It assists in identifying signs of distress, fear, intimidation, and immediate vulnerability during first contact.

> [!IMPORTANT]
> **Strict Non-Medical Policy:**  
> The system does **NOT** claim to medically diagnose depression, PTSD, or any psychiatric disorder, nor does it evaluate victim credibility or predict guilt. All AI outputs are non-diagnostic indicator scores (**Stress Vulnerability Index - SVI 0–100**) with confidence and uncertainty metrics that explicitly require **Human-in-the-Loop** verification.

---

## 🎨 Visual Identity & Palette

Designed strictly as a serious, institutional Indian public-service platform:
- **Backgrounds:** Warm Ivory (`#F7F4EE`), Soft Cream (`#FCFAF6`), Charcoal (`#24221F`)
- **Primary Accent:** Deep Maroon (`#7A1F2B`), Burgundy (`#651925`)
- **Secondary Accents:** Terracotta (`#B85C38`), Muted Saffron (`#C88A32`), Forest Green (`#355C45`)
- **Typography:** Inter (sans-serif) + Merriweather (serif headings) + Noto Sans Devanagari & Bengali.

---

## 🚀 Key Prototype Features

1. **Guided 2-3 Minute SIH Jury Demo Mode:**  
   Single-click automated 19-step demonstration that walks judges through the complete flow: Incoming Call → Language Detection → Transcript & Code-Switching → Acoustic Signals → Silent Distress Detection → Multimodal Fusion → Trauma Fingerprint Radar → Dynamic SVI → Explainable AI → Trauma-Safe Dialogue → Safety Check Alert → Human Verification → Support Recommendation → Follow-up Milestone → Audit Trail.

2. **Multimodal Assessment Engine:**  
   Simulates 3 input channels (Voice Acoustics, Threat NLP Text, Contextual Urgency) to compute multi-dimensional **Trauma Fingerprints** and **Dynamic SVI** scores.

3. **Bharat Language Layer & Code-Switching:**  
   Supports 12 Indian regional languages (Hindi, Assamese, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Odia, Punjabi, Gujarati, English) with preserved emotional context during code-switching (e.g. Assamese + Hindi, Hindi + English).

4. **Silent Distress Detection Module:**  
   Identifies non-verbal cues (prolonged response pauses, pitch spikes, trembling speech, sentence fragmentation) with mandatory human verification alerts.

5. **Adaptive Trauma-Safe Dialogue & Minimum Questioning Engine:**  
   Adaptive minimal questioning protocol that tracks skipped repetitive questions ("68% info already recorded") to prevent victim re-traumatization.

6. **Role-Based Access Control (RBAC):**  
   Instant role switcher for NHAA Officer, Counsellor, District Officer, Social Welfare Officer, and Administrator with tailored privileges.

7. **Discreet Mode & Victim Portal:**  
   One-click Safe Exit / Discreet Mode hiding risk scores and sensitive terminology, alongside a calm, simplified victim-facing portal with audio read-aloud support.

8. **Privacy Architecture & Audit Trail:**  
   Consent-first checkboxes, configurable data retention sliders (voice purge, transcript hold), and immutable timestamped audit logs.

---

## 💻 Local Quickstart Installation & Run

This prototype runs 100% locally with zero external API dependencies.

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Steps to Run Locally

```bash
# 1. Navigate to the project directory
cd D:\Practice\Apps\sahay-app

# 2. Install dependencies (if not already installed)
npm install

# 3. Launch local Vite development server
npm run dev
```

Open your browser and navigate to:  
`http://localhost:5173`

---

## 🏛️ Project Structure

```
sahay-app/
├── src/
│   ├── components/
│   │   ├── common/           # Risk & Status Badges, Toast container
│   │   └── layout/           # Navbar, Sidebar, Footer, SAHAY Assist Floating AI Drawer
│   ├── context/
│   │   └── AppContext.jsx    # Global state management & SIH Demo step runner
│   ├── pages/
│   │   ├── LandingPage.jsx        # Public home & USP strip
│   │   ├── LoginPage.jsx          # Official ID secure login & SIH demo presets
│   │   ├── OfficerDashboard.jsx   # Priority attention queue & active stats
│   │   ├── LiveAssessmentPage.jsx # MAIN SIH DEMO view with interactive simulator
│   │   ├── CaseManagementPage.jsx # Case files & SVI trend over time line chart
│   │   ├── FollowUpTimeline.jsx   # Day 0 to 30 support milestone schedule
│   │   ├── AnalyticsPage.jsx      # Anonymized aggregate demographic & risk charts
│   │   ├── FairnessMonitor.jsx    # AI equity & linguistic bias monitor
│   │   ├── PrivacyPage.jsx        # Privacy architecture & data retention controls
│   │   ├── AuditLogsPage.jsx      # Immutable case compliance log table
│   │   ├── VictimFacingPage.jsx   # Calm simplified victim interface ("I Need Help")
│   │   ├── SettingsPage.jsx       # SVI risk thresholds & low-bandwidth queue
│   │   └── AboutPage.jsx          # SIH 2026 problem statement context
│   ├── services/
│   │   ├── assessmentEngine.js # Multimodal fusion algorithm & SVI calculator
│   │   ├── mockDatabase.js     # 25+ fictional cases, audit events, follow-ups
│   │   └── aiAssistant.js      # SAHAY Assist Q&A rules
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 📜 SIH 2026 Jury Presentation Flow (2-3 Minutes)

1. Click **"Run Full Assessment Demo"** in the top navigation bar.
2. Observe the step-by-step progress toast as the system automatically demonstrates all 19 workflow stages from intake to audit log recording.
3. Switch roles using the top-right **Role Switcher** to demonstrate privilege-restricted views for Officers, Counsellors, and Administrators.
4. Open **SAHAY Assist** floating drawer to ask operational Q&A regarding SVI scores or regional translations.
