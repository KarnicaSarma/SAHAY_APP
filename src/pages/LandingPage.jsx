import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield, Languages, Mic, UserCheck, ArrowRight, Activity, Lock, Scale,
  Wifi, HeartHandshake, PhoneCall, Sparkles, AlertCircle, FileText, CheckCircle2
} from 'lucide-react';

export const LandingPage = () => {
  const { setActivePage, startSihGuidedDemo } = useApp();

  const assessmentSteps = [
    {
      num: "01",
      title: "Patient Narrative Input",
      desc: "Patient or complainant describes what happened via spoken voice recording or direct text entry in their native language."
    },
    {
      num: "02",
      title: "Statement Capture",
      desc: "Statement is captured verbatim in original script without immediate alteration or auto-translation."
    },
    {
      num: "03",
      title: "English Translation",
      desc: "Upon clicking Analyze, an English translation is generated for standardized officer and clinical review."
    },
    {
      num: "04",
      title: "Information Extraction",
      desc: "Key details—reported incident type, distress indicators, affected context, and urgency markers—are extracted."
    },
    {
      num: "05",
      title: "Preliminary Risk Scoring",
      desc: "Calculates the Stress Vulnerability Index (SVI 0-100) and highlights immediate safety flags if present."
    },
    {
      num: "06",
      title: "Clinician & Officer Review",
      desc: "Authorized professional inspects structured output to assign counselling, legal aid, or emergency protection."
    }
  ];

  const systemCapabilities = [
    {
      title: "Multilingual Input Handling",
      desc: "Processes statements in 6 core demo languages (Hindi, Assamese, Bengali, Marathi, Kannada, English) and 12 regional dialects.",
      icon: Languages
    },
    {
      title: "Voice & Speech Dynamics",
      desc: "Analyzes acoustic speech rate, pause patterns, and pitch tremor to identify silent distress alongside narrative text.",
      icon: Mic
    },
    {
      title: "Structured Risk Indicators",
      desc: "Generates explainable factors and multi-dimensional indicator profiles (fear, distress, intimidation, urgency).",
      icon: Activity
    },
    {
      title: "Human-in-the-Loop Safeguards",
      desc: "All automated indicators are advisory. Final triage decisions are strictly performed by authorized caseworkers.",
      icon: UserCheck
    },
    {
      title: "Low-Bandwidth Optimization",
      desc: "Designed to operate reliably on low-connectivity district helpline workstations with minimal data overhead.",
      icon: Wifi
    },
    {
      title: "Privacy & Consent Layer",
      desc: "Role-based access control, encryption in transit, and configurable retention periods protect patient data.",
      icon: Lock
    }
  ];

  return (
    <div className="space-y-12 py-4 max-w-6xl mx-auto">
      
      {/* Hero Overview Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-slate-700" />
              <span>NHAA 14566 • SIH 2026 Assessment Prototype</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Convert Patient Statements into Structured Triage Assessments
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              SAHAY captures spoken or written descriptions of distress and injuries, translates statements when needed, and organizes key symptoms and risk indicators for clinician review.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setActivePage('assessment')}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Launch Live Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={startSihGuidedDemo}
              className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Run Guided Demo</span>
            </button>
          </div>
        </div>

        {/* Quick System Summary Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
            <div className="text-xs text-slate-500 font-medium">Input Support</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">Voice & Text</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Microphone + Transcript</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
            <div className="text-xs text-slate-500 font-medium">Language Scope</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">6 Core Demo Languages</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Hindi, Assamese, Bengali, etc.</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
            <div className="text-xs text-slate-500 font-medium">Translation Flow</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">Post-Analyze Output</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Original script preserved</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
            <div className="text-xs text-slate-500 font-medium">Decision Support</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">Human-in-the-Loop</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Caseworker oversight required</div>
          </div>
        </div>
      </section>

      {/* Structured Process Section: How the Assessment Works */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">How the Assessment Works</h2>
          <p className="text-xs text-slate-500 mt-1">
            Step-by-step workflow from patient statement capture to clinical decision support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessmentSteps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                  {step.num}
                </span>
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Structured Assessment Matters */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-5 h-5 text-slate-800" />
            <h2 className="text-base font-bold text-slate-900">Why Structured Assessment Matters</h2>
          </div>
          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <p>
              In trauma helpline scenarios, victims often describe complex incidents while experiencing high stress. Unstructured narratives can lead to missing vital safety risks during handoffs between agencies.
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span><strong>Reduces Re-traumatization:</strong> Minimizes repetitive questioning across helpline workers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span><strong>Standardizes Triage:</strong> Organizes symptoms, threats, and isolation context into clear indicators.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span><strong>Speeds Referral:</strong> Routes high-risk cases immediately to authorized legal or medical cells.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <AlertCircle className="w-5 h-5 text-amber-700" />
            <h2 className="text-base font-bold text-slate-900">Healthcare Safety & Clinical Scope</h2>
          </div>
          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <p className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-900">
              SAHAY is designed strictly as a preliminary decision-support tool for intake operators. It does not provide medical diagnoses or replace emergency services.
            </p>
            <div className="space-y-2 text-slate-600">
              <div><strong>Emergency Escalation:</strong> Active physical violence or life-threatening threats trigger immediate human verification alerts.</div>
              <div><strong>Auditability:</strong> Every SVI score calculation includes explainable factors that caseworkers can verify or override.</div>
            </div>
          </div>
        </div>

      </section>

      {/* System Capabilities Matrix */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Platform Features & Architecture</h2>
          <p className="text-xs text-slate-500 mt-1">
            Built specifically to solve SIH 2026 requirements for trauma assessment and helpline support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemCapabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-md bg-white border border-slate-200 text-slate-800 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Callout Section */}
      <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-xl shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white">Ready to test the live assessment workflow?</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Select a language, record voice or enter text, inspect the original statement, and click Analyze Statement to view the English translation and preliminary triage metrics.
          </p>
        </div>
        <button
          onClick={() => setActivePage('assessment')}
          className="px-6 py-3 rounded-lg bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold cursor-pointer shrink-0 transition-colors shadow-xs"
        >
          Open Live Assessment Workspace
        </button>
      </section>

    </div>
  );
};
