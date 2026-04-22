import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ThumbsUp, Mail } from 'lucide-react';

export type CharState = 'idle' | 'focused' | 'clearing' | 'success';

interface SignInCharacterProps {
  charState: CharState;
}

export function SignInCharacter({ charState }: SignInCharacterProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates tightly
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // State calculations
  const isClearing = charState === 'clearing';
  const isSuccess = charState === 'success';
  const isFocused = charState === 'focused';

  // Glow color
  const glowColor = isSuccess 
    ? 'bg-emerald-500/50' 
    : isClearing 
      ? 'bg-slate-500/40' 
      : isFocused 
        ? 'bg-emerald-400/30' 
        : 'bg-emerald-500/10';

  // Eye configuration
  const eyeScaleY = isClearing ? 0.8 : isFocused ? 0.9 : isSuccess ? 0.8 : 1;
  const eyebrowRotate = isFocused ? 12 : isClearing ? -15 : isSuccess ? 0 : 0;
  const eyebrowY = isFocused ? 4 : isClearing ? 8 : isSuccess ? -2 : 0;
  
  // Mouth configuration - thinner, more stylized mouth
  const mouthPath = isSuccess 
    ? "M 10 15 Q 25 30 40 15" // grin
    : isClearing 
      ? "M 15 20 Q 25 15 35 20" // frown
      : isFocused 
        ? "M 15 20 Q 25 22 35 20" // slight concentrate
        : "M 15 18 Q 25 24 35 18"; // smug/idle

  // Head movement
  const headRotateX = mousePosition.y * -0.5 + (isFocused ? 5 : isClearing ? -5 : 0);
  const headRotateY = mousePosition.x * 0.8 + (isFocused ? 10 : 0); // Tilt head when focused
  const headRotateZ = isFocused ? -5 : isClearing ? 5 : 0;

  return (
    <div className="relative w-full h-full flex flex-col justify-end items-center min-h-[360px] pb-4">
      {/* Dynamic Ambient Glow */}
      <motion.div 
        className={cn("absolute bottom-1/2 w-64 h-64 rounded-full blur-[80px] transition-colors duration-500", glowColor)}
        animate={{ 
          scale: isSuccess ? 1.3 : 1,
          x: mousePosition.x * 2,
          y: mousePosition.y * 2
        }}
      />

      <div className="relative z-10 w-48 flex flex-col items-center justify-end">
        
        {/* Head Assembly */}
        <motion.div 
          className="relative z-20 flex flex-col items-center origin-bottom"
          animate={{
            rotateX: headRotateX,
            rotateY: headRotateY,
            rotateZ: headRotateZ,
            y: isSuccess ? -10 : isClearing ? 5 : 0
          }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        >
          {/* Postman Hat */}
          <div className="relative z-30 w-32 -mb-4 flex flex-col items-center">
            {/* Top puffy part */}
            <div className="w-32 h-16 bg-[#5c6985] rounded-[50%] border-t-2 border-white/20 shadow-inner translate-y-3" />
            {/* Band/Brim */}
            <div className="w-24 h-6 bg-[#475168] rounded-full relative z-10 shadow-lg border-b-2 border-emerald-500 overflow-hidden">
               {/* Emerald badge/dot */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            {/* Front Bill */}
            <div className="w-20 h-4 bg-[#333b4d] rounded-[50%] -translate-y-2 shadow-md" />
          </div>

          {/* Blonde Hair Tufts (Back) */}
          <div className="absolute top-16 -left-3 w-8 h-10 bg-yellow-300 rounded-full -z-10 -rotate-12 blur-[1px]" />
          <div className="absolute top-16 -right-3 w-8 h-10 bg-yellow-300 rounded-full -z-10 rotate-12 blur-[1px]" />

          {/* The Face/Head Canvas */}
          <div className="relative w-24 h-40 bg-[#f9dbco] bg-[#fad8c3] rounded-[40px] shadow-xl overflow-hidden flex flex-col items-center border border-white/30 backdrop-blur-sm">
            {/* Skin gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-[#e2bca1]/50" />
            
            {/* Eyes area */}
            <motion.div 
              className="absolute top-8 left-0 right-0 flex justify-center gap-2 px-2"
              animate={{
                x: mousePosition.x * 0.4,
                y: mousePosition.y * 0.4,
              }}
            >
              {/* Left Eye */}
              <div className="relative flex flex-col items-center">
                {/* Eyebrow */}
                <motion.div 
                  className="w-7 h-2.5 bg-[#4a3b32] rounded-full mb-1 z-20 origin-right"
                  animate={{ rotate: eyebrowRotate, y: eyebrowY }}
                />
                {/* Eyeball */}
                <div className="w-7 h-9 bg-white rounded-[40%] flex items-center justify-center overflow-hidden border border-gray-200 shadow-inner">
                  {/* Pupil */}
                  <motion.div 
                    className="w-3.5 h-3.5 bg-[#2d3748] rounded-full flex items-center justify-end overflow-hidden"
                    animate={{ scaleY: eyeScaleY, x: mousePosition.x * 0.6, y: mousePosition.y * 0.6 }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full translate-x-[1px] -translate-y-[1px]" />
                  </motion.div>
                </div>
              </div>
              
              {/* Right Eye */}
              <div className="relative flex flex-col items-center">
                {/* Eyebrow */}
                <motion.div 
                  className="w-7 h-2.5 bg-[#4a3b32] rounded-full mb-1 z-20 origin-left"
                  animate={{ rotate: -eyebrowRotate, y: eyebrowY }}
                />
                {/* Eyeball */}
                <div className="w-7 h-9 bg-white rounded-[40%] flex items-center justify-center overflow-hidden border border-gray-200 shadow-inner">
                  {/* Pupil */}
                  <motion.div 
                    className="w-3.5 h-3.5 bg-[#2d3748] rounded-full flex items-center justify-end overflow-hidden"
                    animate={{ scaleY: eyeScaleY, x: mousePosition.x * 0.6, y: mousePosition.y * 0.6 }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full translate-x-[1px] -translate-y-[1px]" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Nose (Prominent, reddish) */}
            <motion.div 
              className="absolute top-[4.5rem] w-8 h-12 bg-[#f0ad90] rounded-full shadow-sm z-10"
              animate={{
                x: mousePosition.x * 0.8,
                y: mousePosition.y * 0.6,
              }}
              style={{
                boxShadow: 'inset 0 -4px 6px rgba(200, 100, 80, 0.2), 0 4px 6px rgba(0,0,0,0.1)'
              }}
            />

            {/* Mouth */}
            <motion.div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
              animate={{
                x: mousePosition.x * 0.3,
                y: mousePosition.y * 0.3,
              }}
            >
              <svg width="50" height="30" viewBox="0 0 50 30">
                <motion.path
                  d={mouthPath}
                  fill="transparent"
                  stroke="#8c5a46"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: mouthPath }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                />
              </svg>
            </motion.div>

          </div>
        </motion.div>

        {/* Lanky Neck */}
        <motion.div 
          className="relative z-10 w-6 h-16 bg-[#e2bca1] -mt-6 border-x border-[#c79f82]/50"
          style={{
             backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%)'
          }}
          animate={{
            rotateY: (mousePosition.x) * 0.3,
          }}
        />

        {/* Postman Uniform / Torso */}
        <div className="relative z-0 w-44 h-28 -mt-8 bg-[#5c6985] rounded-t-[60px] shadow-2xl flex flex-col items-center">
           {/* Collar */}
           <div className="w-20 h-10 -mt-2.5 bg-[#475168] clip-path-collar border-t-2 border-[#5c6985]" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 50% 80%, 20% 100%)' }} />
           
           {/* Coat Line & Buttons */}
           <div className="w-1 h-full bg-[#475168] absolute top-8 shadow-sm">
             <div className="absolute top-2 -left-1.5 w-4 h-4 bg-[#333b4d] rounded-full shadow-inner" />
             <div className="absolute top-10 -left-1.5 w-4 h-4 bg-[#333b4d] rounded-full shadow-inner" />
           </div>

           {/* Shoulders / Epaulettes */}
           <div className="absolute -left-2 top-8 w-8 h-4 bg-[#475168] rounded-full rotate-[-20deg] shadow-sm flex items-center justify-start px-1">
             <div className="w-2 h-2 bg-yellow-400 rounded-full" />
           </div>
           <div className="absolute -right-2 top-8 w-8 h-4 bg-[#475168] rounded-full rotate-[20deg] shadow-sm flex items-center justify-end px-1">
             <div className="w-2 h-2 bg-yellow-400 rounded-full" />
           </div>

           {/* Satchel Strap */}
           <div className="absolute top-0 right-10 w-4 h-32 bg-[#8c5a46] -rotate-12 shadow-md translate-y-6" />
        </div>

        {/* Floating Thumbs Up Hand */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, x: -30, y: 40, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, x: 70, y: 0, rotate: 10 }}
              exit={{ scale: 0, opacity: 0, y: 40 }}
              className="absolute right-0 bottom-12 z-30 drop-shadow-xl"
            >
              {/* Stylized Hand */}
              <div className="relative w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)] border-4 border-white">
                 <ThumbsUp size={32} strokeWidth={2.5} className="text-white fill-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
