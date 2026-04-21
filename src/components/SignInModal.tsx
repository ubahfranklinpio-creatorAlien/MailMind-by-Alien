import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Shield, ArrowRight, Loader2, Lock, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          
          {/* App Logo */}
          <motion.div 
            className="relative w-28 h-28 mb-8"
            animate={isOpening ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
            <img 
              src="/logo.png" 
              alt="MailMind Logo" 
              className="w-full h-full object-contain relative z-10 glass rounded-3xl p-2 border-white/40 shadow-xl" 
            />
            
            {/* Inside Glow (Blooms when opening) */}
            <motion.div
              className="absolute inset-0 bg-emerald-400 rounded-full blur-xl z-0"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isOpening ? { opacity: 0.6, scale: 2.5 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </motion.div>

          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">MailMind</h2>
            <p className="text-gray-500 font-medium">Lets organize your Mail for you</p>
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
