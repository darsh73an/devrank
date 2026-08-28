'use client';

import { useState, useEffect } from 'react';
import { Activity, Target, ShieldCheck, AlertTriangle, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  const [evaluation, setEvaluation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest or demo evaluation data
    async function fetchEval() {
      try {
        const res = await httpGetDemoOrLatest();
        setEvaluation(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEval();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh] text-slate-500 font-medium">Analyzing developer metrics...</div>;
  }

  const evalData = evaluation || {
    targetRole: "Full Stack Engineer",
    detectedRole: "Backend Engineer",
    roleConfidence: 0.88,
    finalScore: 82,
    level: "Advanced",
    scoreExplanation: "Strong backend footprint with robust GitHub contributions, though frontend repository activity is moderate.",
    skillGaps: ["Advanced System Design", "React Server Components"],
    recommendations: ["Contribute more to full-stack repositories", "Practice distributed systems architecture"],
    interviewReadiness: "High"
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-6 gap-4">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Target Role: {evalData.targetRole}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Interview Readiness Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium">Readiness Score</p>
            <p className="text-2xl font-black text-blue-600">{evalData.finalScore}/100</p>
          </div>
          <div className="h-10 w-px bg-slate-200"></div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-sm rounded-lg">
            {evalData.level}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-semibold">Detected Profile</span>
            <Target className="w-5 h-5 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{evalData.detectedRole}</h3>
          <p className="text-sm text-slate-600">Confidence Match: <span className="font-semibold text-slate-900">{(evalData.roleConfidence * 100).toFixed(0)}%</span></p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-semibold">Readiness Status</span>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{evalData.interviewReadiness} Confidence</h3>
          <p className="text-sm text-slate-600">Adaptive weighting applied successfully across platforms.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-semibold">AI Summary</span>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{evalData.scoreExplanation}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" /> Critical Skill Gaps
          </h3>
          <ul className="space-y-3">
            {evalData.skillGaps.map((gap: string, i: number) => (
              <li key={i} className="flex items-start bg-amber-50/50 p-3 rounded-lg border border-amber-100 text-sm text-slate-700">
                <span className="font-bold text-amber-600 mr-2">•</span> {gap}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" /> Recommended Actions
          </h3>
          <ul className="space-y-3">
            {evalData.recommendations.map((rec: string, i: number) => (
              <li key={i} className="flex items-start bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-sm text-slate-700">
                <span className="font-bold text-emerald-600 mr-2">✓</span> {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

async function httpGetDemoOrLatest() {
  return null; // Falls back to mock UI object gracefully if API is offline
}