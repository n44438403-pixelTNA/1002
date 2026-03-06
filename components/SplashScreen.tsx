import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

interface Props {
  onComplete: () => void;
  appName?: string;
  appLogo?: string;
}

export const SplashScreen: React.FC<Props> = ({ onComplete, appName = "NSTA", appLogo }) => {
  useEffect(() => {
    // Only show once per session to avoid annoying users on reload
    if (sessionStorage.getItem('nst_splash_shown')) {
      onComplete();
      return;
    }

    sessionStorage.setItem('nst_splash_shown', 'true');
    const timer = setTimeout(onComplete, 2500); // 2.5s duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center space-y-8"
      >
        <div className="relative">
          {/* Logo container with pulse ring */}
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 40px rgba(59, 130, 246, 0)'] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-4 z-10 relative border border-slate-100"
          >
            {appLogo ? (
              <img src={appLogo} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <BrainCircuit className="w-16 h-16 text-blue-600" />
            )}
          </motion.div>
        </div>

        <div className="text-center space-y-2">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-black text-slate-900 tracking-tight uppercase"
          >
            {appName}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-sm font-bold text-blue-600 tracking-widest uppercase"
          >
            Premium Education
          </motion.p>
        </div>
      </motion.div>

      {/* Loading Bar at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-12 left-0 right-0 px-12"
      >
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden max-w-xs mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};
