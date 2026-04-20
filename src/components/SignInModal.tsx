import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Shield, ArrowRight, Loader2, Lock, BrainCircuit } from 'lucide-react';
import { cn } from '../lib/utils';

interface SignInModalProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function SignInModal({ onSignIn, isLoading, error }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpening, setIsOpening] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsOpening(true);
    // Delay sign in slightly to allow the "opening" animation to start
    setTimeout(async () => {
      await onSignIn(email, password);
      // We don't reset isOpening here; if it fails, the error state will show
      // and we might want to reset the animation state if needed.
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg glass-modal relative overflow-hidden"
      >
        {/* Animated Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 p-10 flex flex-col items-center">
          
          {/* Animated Glass Envelope */}
          <div className="relative w-32 h-32 mb-8">
            <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              {/* Envelope Body */}
              <path 
                d="M5 20 L95 20 L95 70 L5 70 Z" 
                fill="rgba(255,255,255,0.05)" 
                stroke="rgba(16,185,129,0.5)" 
                strokeWidth="1.5"
                className="backdrop-blur-md"
              />
              
              {/* Inside Glow (Blooms when opening) */}
              <motion.circle
                cx="50" cy="45" r="5"
                initial={{ opacity: 0, scale: 1 }}
                animate={isOpening ? { opacity: 0.8, scale: 8, fill: '#10b981' } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
                filter="blur(5px)"
              />

              {/* Envelope Flap */}
              <motion.path
                d="M5 20 L50 45 L95 20 Z"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(16,185,129,0.6)"
                strokeWidth="1.5"
                initial={{ d: "M5 20 L50 45 L95 20 Z" }}
                animate={isOpening ? { d: "M5 20 L50 -10 L95 20 Z" } : { d: "M5 20 L50 45 L95 20 Z" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Brain Icon on Flap */}
              <motion.g
                initial={{ y: 28, x: 42, scale: 0.6 }}
                animate={isOpening ? { y: -5, opacity: 1, scale: 0.8 } : { y: 28, x: 42, scale: 0.6 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-emerald-400"
              >
                <BrainCircuit size={20} strokeWidth={2.5} />
              </motion.g>
            </svg>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Access MailMind</h2>
            <p className="text-gray-500 max-w-xs mx-auto">Connect your workspace intelligence to synchronize your agenda.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-2xl outline-none border-white/40 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                placeholder="App Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-2xl outline-none border-white/40 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm"
              >
                <Shield size={16} />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading || isOpening}
              className="w-full py-4 bg-[#22c55e] hover:bg-green-600 disabled:opacity-50 text-white rounded-2xl font-bold shadow-lg shadow-green-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {(isLoading || isOpening) ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest mt-4">Protected by AI Intelligence</p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
