import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ThumbsUp } from 'lucide-react';

export type CharState = 'idle' | 'focused' | 'clearing' | 'success';

interface SignInCharacterProps {
  charState: CharState;
}

export function SignInCharacter({ charState }: SignInCharacterProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates somewhat to create a subtle tracking effect
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine styles and animations based on state
  const isClearing = charState === 'clearing';
  const isSuccess = charState === 'success';
  const isFocused = charState === 'focused';

  // Glow color
  const glowColor = isSuccess 
    ? 'bg-emerald-500/50' 
    : isClearing 
      ? 'bg-cyan-600/60' 
      : isFocused 
        ? 'bg-emerald-400/30' 
        : 'bg-emerald-500/10';

  // Eye configuration
  const eyeScaleY = isClearing ? 0.8 : isFocused ? 0.9 : isSuccess ? 0.8 : 1;
  const eyebrowRotate = isFocused ? 15 : isClearing ? -15 : isSuccess ? 0 : 0;
  const eyebrowY = isFocused ? 2 : isClearing ? 5 : isSuccess ? -2 : 0;
  
  // Mouth configuration
  const mouthPath = isSuccess 
    ? "M 10 20 Q 25 35 40 20" // big smile
    : isClearing 
      ? "M 15 25 Q 25 20 35 25" // sad/frown
      : isFocused 
        ? "M 15 25 Q 25 25 35 25" // straight/serious
        : "M 15 22 Q 25 28 35 22"; // slight smile

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
      {/* Dynamic Ambient Glow */}
      <motion.div 
        className={cn("absolute w-64 h-64 rounded-full blur-[80px] transition-colors duration-500", glowColor)}
        animate={{ 
          scale: isSuccess ? 1.2 : 1,
          x: mousePosition.x * 2,
          y: mousePosition.y * 2
        }}
      />
      
      {/* 3D Glass Character Body */}
      <motion.div 
        className="relative z-10 w-48 h-56 glass rounded-[40px] flex flex-col items-center justify-center border border-white/40 shadow-2xl overflow-hidden backdrop-blur-xl bg-white/20"
        animate={{
          y: isSuccess ? -10 : isClearing ? 10 : 0,
          rotateX: mousePosition.y * -0.5,
          rotateY: mousePosition.x * 0.5,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Inner 3D highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-50 rounded-[40px] pointer-events-none" />
        
        {/* Face */}
        <div className="relative w-32 h-32 mt-4">
          
          {/* Eyes Container */}
          <motion.div 
            className="absolute top-1/4 left-0 right-0 flex justify-between px-6"
            animate={{
              x: isFocused ? mousePosition.x * 0.5 : mousePosition.x * 0.2,
              y: isFocused ? mousePosition.y * 0.5 : mousePosition.y * 0.2,
            }}
          >
            {/* Left Eye */}
            <div className="relative flex flex-col items-center">
              <motion.div 
                className="w-6 h-2 bg-gray-700 rounded-full mb-1"
                animate={{ rotate: eyebrowRotate, y: eyebrowY }}
              />
              <motion.div 
                className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden"
                animate={{ scaleY: eyeScaleY }}
              >
                <motion.div className="w-2 h-2 bg-white rounded-full absolute top-1 right-1" />
              </motion.div>
            </div>
            
            {/* Right Eye */}
            <div className="relative flex flex-col items-center">
              <motion.div 
                className="w-6 h-2 bg-gray-700 rounded-full mb-1"
                animate={{ rotate: -eyebrowRotate, y: eyebrowY }}
              />
              <motion.div 
                className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden"
                animate={{ scaleY: eyeScaleY }}
              >
                <motion.div className="w-2 h-2 bg-white rounded-full absolute top-1 right-1" />
              </motion.div>
            </div>
          </motion.div>

          {/* Mouth */}
          <motion.div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
            <svg width="50" height="40" viewBox="0 0 50 40">
              <motion.path
                d={mouthPath}
                fill="transparent"
                stroke="#1f2937"
                strokeWidth="4"
                strokeLinecap="round"
                initial={false}
                animate={{ d: mouthPath }}
                transition={{ type: 'spring', bounce: 0.5 }}
              />
            </svg>
          </motion.div>

          {/* Blush (when happy) */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none"
              >
                <div className="w-6 h-4 bg-pink-400/40 blur-md rounded-full" />
                <div className="w-6 h-4 bg-pink-400/40 blur-md rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating elements like the 'Thumbs up' */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, x: -20, y: 20 }}
              animate={{ scale: 1, opacity: 1, x: 50, y: 10 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-0 bottom-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 border-2 border-white text-white z-20"
            >
              <ThumbsUp size={24} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle sigh/steam for clearing state */}
        <AnimatePresence>
          {isClearing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: -20 }}
              exit={{ opacity: 0 }}
              className="absolute left-8 bottom-8 w-6 h-6 bg-cyan-200 blur-xl rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
