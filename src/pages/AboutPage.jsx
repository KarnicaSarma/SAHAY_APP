import React from 'react';
import { Shield, CheckCircle2, Info } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-xs text-center space-y-3">
        <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center mx-auto shadow-xs font-bold">
          <Shield className="w-6 h-6 text-slate-100" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          SAHAY Platform — System Architecture & Purpose
        </h1>
        <p className="text-xs text-slate-500">
          Developed for <strong>Smart India Hackathon (SIH 2026)</strong> • Problem Statement Overview
        </p>
      </div>

      {/* Problem Statement Card */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3 text-xs">
        <h2 className="font-bold text-base text-slate-900 border-b border-slate-200 pb-2">
          Official SIH 2026 Problem Statement Scope
        </h2>

        <p className="text-sm font-semibold text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-200">
          “AI-Based Real-Time Stress and Trauma Assessment Module for Victims/Complainants Accessing NHAA (14566) and Integrated Portal”
        </p>

        <p className="text-slate-600 leading-relaxed">
          The National Helpline for Alleviating Abuse (NHAA 14566) and integrated public welfare portals receive high call volumes from individuals reporting distress. SAHAY introduces a responsible decision-support layer that assists authorized helpline officers, counsellors, and social welfare personnel in identifying signs of distress, fear, intimidation, and immediate vulnerability during first contact.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        
        <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-xs">
          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Strictly Non-Medical Framing</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            SAHAY does not diagnose psychiatric conditions (such as PTSD or depression) or score victim credibility. It provides indicator strength signals to organize narrative data for human professional review.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-xs">
          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Human-in-the-Loop Safeguards</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            All AI outputs are advisory. Authorized helpline officers and trained counsellors retain complete authority to verify, modify, or dismiss flags according to established clinical and institutional protocols.
          </p>
        </div>

      </div>

      {/* Technical Workflow Overview */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3 text-xs">
        <h2 className="font-bold text-base text-slate-900 border-b border-slate-200 pb-2">
          Technical Workflow Pipeline
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">1. Multilingual Capture</div>
            <p className="text-slate-600">Voice recording or text input in 6 core languages and regional script handling.</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">2. Post-Analyze Translation</div>
            <p className="text-slate-600">Original text remains intact. English translation generated upon clicking Analyze.</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">3. Clinician Triage Output</div>
            <p className="text-slate-600">Calculates SVI (0-100), immediate safety flag, and suggested referral pathways.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
