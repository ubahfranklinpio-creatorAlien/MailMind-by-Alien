import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Shield, ArrowRight, Loader2, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { SignInCharacter, CharState } from './SignInCharacter';

interface SignInModalProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function SignInModal({ onSignIn, isLoading, error }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  
  // Character State
  const [charState, setCharState] = useState<CharState>('idle');
  const prevEmailRef = useRef(email);
  const prevPasswordRef = useRef(password);
  const clearTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Focus tracking
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Handle character state based on input changes
  useEffect(() => {
    if (isOpening) return; // Prioritize success state if submitting

    const emailLengthChanged = email.length !== prevEmailRef.current.length;
    const passwordLengthChanged = password.length !== prevPasswordRef.current.length;
    const emailCleared = email.length < prevEmailRef.current.length;
    const passwordCleared = password.length < prevPasswordRef.current.length;

    if (emailCleared || passwordCleared) {
      setCharState('clearing');
      if (clearTimeoutRef.current) clearTimeout(clearTimeoutRef.current);
      // Revert to focused after 1 second
      clearTimeoutRef.current = setTimeout(() => {
        setCharState((isEmailFocused || isPasswordFocused) ? 'focused' : 'idle');
      }, 1000);
    } else if ((emailLengthChanged || passwordLengthChanged) || isEmailFocused || isPasswordFocused) {
      if (charState !== 'clearing') {
        setCharState('focused');
      }
    } else {
      setCharState('idle');
    }

    prevEmailRef.current = email;
    prevPasswordRef.current = password;

    return () => {
      if (clearTimeoutRef.current) clearTimeout(clearTimeoutRef.current);
    };
  }, [email, password, isEmailFocused, isPasswordFocused, isOpening, charState]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsOpening(true);
    setCharState('success');
    
    // Delay sign in slightly to allow the "opening/success" animation to start
    setTimeout(async () => {
      try {
        await onSignIn(email, password);
      } catch (err) {
        setIsOpening(false);
        setCharState('clearing'); // Revert state if error
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-4xl glass-modal relative overflow-hidden flex flex-col md:flex-row"
      >
        {/* Animated Background Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/20 blur-[120px] pointer-events-none" />

        {/* Left Side: 3D Character Avatar */}
        <div className="hidden md:flex flex-1 p-8 border-r border-white/20 relative items-center justify-center bg-black/5">
          <SignInCharacter charState={charState} />
        </div>

        {/* Right Side: Sign In Form */}
        <div className="flex-1 p-10 flex flex-col items-center relative z-10 w-full max-w-md mx-auto">
          
          <div className="text-center mb-10 w-full">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">MailMind</h2>
            <p className="text-gray-500 font-medium">Unlock your world.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-1 relative group w-full">
              <label className="text-xs font-bold text-gray-500 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  className="w-full pl-12 pr-4 py-4 glass rounded-2xl outline-none border-white/40 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1 relative group w-full">
              <label className="text-xs font-bold text-gray-500 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="App Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="w-full pl-12 pr-4 py-4 glass rounded-2xl outline-none border-white/40 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>
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

            <div className="pt-2">
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
            </div>
            
            <div className="pt-2">
              <button 
                type="button" 
                className="w-full py-3 bg-white/50 hover:bg-white text-gray-600 rounded-2xl font-medium border border-white/60 transition-all"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
