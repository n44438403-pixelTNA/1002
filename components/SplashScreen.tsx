import React, { useState, useEffect, useRef } from 'react';
import { SystemSettings } from '../types';
import { BrainCircuit, BookOpen, PlayCircle, Headphones, Target, LineChart, Zap } from 'lucide-react';

interface Props {
  settings: SystemSettings;
  onComplete: () => void;
}

export const SplashScreen: React.FC<Props> = ({ settings, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: <Zap size={20} />, text: 'Feature 1: Smart Revision' },
    { icon: <BookOpen size={20} />, text: 'Feature 2: Premium Notes' },
    { icon: <PlayCircle size={20} />, text: 'Feature 3: Video Lectures' },
    { icon: <Headphones size={20} />, text: 'Feature 4: Audio Studio' },
    { icon: <LineChart size={20} />, text: 'Feature 5: Performance Analysis' },
    { icon: <Target size={20} />, text: 'Feature 6: MCQ Practice' },
  ];

  useEffect(() => {
    // 1. Progress Bar Logic (0 to 100 over ~2.5 seconds)
    const duration = 2500;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        setProgress(100);
        // Add a tiny delay at 100% before firing complete
        setTimeout(() => {
           if (onCompleteRef.current) {
               onCompleteRef.current();
           }
        }, 400);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] bg-slate-50 flex flex-col items-center justify-between py-12 px-6 animate-in fade-in duration-500 overflow-hidden">

        {/* TOP SECTION: AI Branding */}
        <div className="flex flex-col items-center justify-center pt-8 animate-in slide-in-from-top-8 duration-700">
             <div className="relative mb-4">
                 <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
                 <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center text-slate-800 shadow-2xl relative z-10 border border-slate-200">
                    {settings.appLogo ? (
                        <img src={settings.appLogo} alt="Logo" className="w-12 h-12 object-contain" />
                    ) : (
                        <BrainCircuit size={40} />
                    )}
                 </div>
             </div>
             <h1 className="text-3xl font-black text-slate-800 text-center tracking-tight">
                 {settings.appName || 'NST App'}
             </h1>
             <p className="text-blue-400 font-bold mt-1 tracking-widest text-sm uppercase">
                 {settings.aiName || 'IIC AI'} Powered
             </p>
        </div>

        {/* MIDDLE SECTION: Features & Loading Bar */}
        <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-8 mt-4">

            {/* All Features Grid */}
            <div className="grid grid-cols-2 gap-3 w-full animate-in zoom-in-95 fade-in duration-700 delay-200">
                {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-600 bg-white/80 px-3 py-2.5 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-sm">
                        <span className="text-blue-500 bg-blue-50 p-1.5 rounded-lg">{feat.icon}</span>
                        <span className="font-bold text-[10px] leading-tight text-slate-700">{feat.text}</span>
                    </div>
                ))}
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-3 mt-4">
                <div className="flex justify-between items-end px-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Features</span>
                    <span className="text-2xl font-black text-slate-800">{progress}%</span>
                </div>

                <div className="w-full h-2 bg-white rounded-full overflow-hidden p-0.5">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-400 rounded-full transition-all duration-75 ease-linear relative"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Shimmer effect on the bar */}
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_1s_infinite]"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* BOTTOM SECTION: Developer Info */}
        <div className="flex flex-col items-center justify-center pb-4 opacity-60">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Developed By</span>
             <span className="text-xs font-black text-slate-500 tracking-wider">
                 {settings.footerText || 'Nadim Anwar'}
             </span>
        </div>

    </div>
  );
};
