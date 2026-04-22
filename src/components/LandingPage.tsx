import React from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, Sparkles, Layout, Users, 
  Cpu, FileText, Layers, 
  Key, Brain, LayoutDashboard,
  GraduationCap, Briefcase, Heart, ShieldCheck
} from "lucide-react";
import { cn } from "../lib/utils";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 px-6 md:px-12 flex items-center justify-between backdrop-blur-md bg-white/40 border-b border-white/60">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="MailMind Logo" className="w-10 h-10 rounded-xl object-contain shadow-sm bg-emerald-50" />
          <span className="font-bold text-xl tracking-tight text-gray-900 font-sans">MailMind</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <button onClick={() => scrollTo('how-it-works')} className="hover:text-emerald-600 transition-colors">How it works</button>
          <button onClick={() => scrollTo('features')} className="hover:text-emerald-600 transition-colors">Features</button>
          <button onClick={() => scrollTo('use-cases')} className="hover:text-emerald-600 transition-colors">Use Cases</button>
        </div>

        <button 
          onClick={onGetStarted}
          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-sm shadow-lg shadow-emerald-200 transition-all active:scale-95"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto grid lg:grid-cols-2 items-center gap-16 min-h-[90vh]">
        
        {/* Left Side: Content */}
        <div className="flex flex-col items-start gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 w-fit">
              <Sparkles className="w-3 h-3" />
              <span>BY ALIEN</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] font-sans">
              Organize <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Smarter</span>.<br />
              Build Faster.
            </h1>
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed font-medium">
              AI-powered, high-converting mail management for fast-moving founders. 
              Turn your chaotic inbox into a structured daily schedule in seconds.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-200 hover:shadow-2xl hover:shadow-emerald-300 transition-all flex items-center gap-2 group active:scale-95"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mt-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                >
                  <img 
                    src={`https://picsum.photos/seed/${i}/40/40`} 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-500">100+ Happy Customers</p>
          </motion.div>
        </div>

        {/* Right Side: 3D Visual Focus */}
        <div className="relative flex items-center justify-center -right-4 md:-right-12">
          {/* Main 3D Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full aspect-square flex items-center justify-center transform hover:scale-105 transition-transform duration-700"
          >
            {/* Background Glows */}
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-[150px] animate-pulse pointer-events-none scale-150" />
            <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none scale-150" />
            
            {/* The Glass Envelope (logo.png) */}
            <motion.div
              animate={{ 
                rotateY: [0, 8, -8, 0],
                rotateX: [0, 4, -4, 0],
                y: [0, -30, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-20 w-full flex justify-center items-center pointer-events-none"
            >
              <div className="relative group w-[120%] sm:w-auto mt-6 md:mt-0 pointer-events-auto">
                {/* Mirroring/Reflection effect */}
                <div className="absolute -inset-10 bg-gradient-to-br from-emerald-400/40 to-cyan-400/40 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src="/logo.png" 
                  alt="3D Glass Envelope" 
                  className="w-[95vw] sm:w-[600px] lg:w-[800px] h-[95vw] sm:h-[600px] lg:h-[800px] max-w-none object-contain drop-shadow-[0_40px_80px_rgba(16,185,129,0.5)] filter contrast-125 brightness-110"
                />
              </div>
            </motion.div>

            {/* Attached Status Box */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-10 sm:bottom-0 right-0 z-30 glass-modal px-6 py-5 rounded-2xl flex items-center gap-4 border border-white/60 shadow-2xl backdrop-blur-xl sm:scale-110 origin-bottom-right"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Layout className="w-5 h-5 text-emerald-600 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Assistant</span>
                <p className="text-sm font-bold text-gray-900">Generating schedule</p>
              </div>
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Floating Orbs for extra "3D" feel */}
            <motion.div 
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-1/4 -left-10 w-8 h-8 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-xl"
            />
            <motion.div 
              animate={{ y: [0, -40, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute bottom-1/4 left-10 w-12 h-12 rounded-full bg-emerald-400/20 border border-white shadow-xl flex items-center justify-center backdrop-blur-md"
            >
              <Users className="w-5 h-5 text-emerald-600" />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto scroll-mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 font-sans mb-4">How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">works</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">Three simple steps to transform your chaotic inbox into a structured daily schedule.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[40%] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-200 via-cyan-200 to-emerald-200 -z-10 transform -translate-y-1/2 opacity-50" />
          {[
            { icon: Key, title: "Connect via App Password", desc: "Securely authenticate your mail account using an industry-standard app-specific password." },
            { icon: Brain, title: "AI Context Analysis", desc: "Our models process your unread mail, categorizing importance and extracting calendar events." },
            { icon: LayoutDashboard, title: "Automated Dashboard Generation", desc: "Instantly view your curated agenda, summaries, and categorized priorities in a glass UI." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-8 flex flex-col items-center text-center rounded-[32px] group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-100 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 relative scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-50/50 -skew-y-2 transform origin-top-left -z-10" />
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:w-1/2"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-sans mb-4">Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Features</span></h2>
            <p className="text-gray-500 font-medium text-lg">Powerful AI capabilities wrapped in a frictionless, highly responsive interface.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "AI Smart-Sort", desc: "Automatically groups incoming mail into predefined categories like Appointments, Orders, School/Class, and Private." },
              { icon: FileText, title: "Daily Intelligence Brief", desc: "Condenses long, convoluted threads into 2-sentence summaries so you can read faster and act quicker." },
              { icon: Layers, title: "Interactive Emerald UI", desc: "A beautifully crafted glassmorphic dashboard built to reduce cognitive load and visual clutter." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 border-l-4 border-l-emerald-400 hover:-translate-y-1 transition-transform duration-300"
              >
                  <feature.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto scroll-mt-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 font-sans mb-4">Who is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">MailMind</span> for?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">Built for anyone drowning in a sea of unread context.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: "Academic Organization for Students", desc: "Filter out university noise. Never miss an assignment, schedule change, or professor's announcement again." },
              { icon: Briefcase, title: "Prioritization for Founders", desc: "Cut through the noise of investor updates, customer support emails, and software billing alerts effortlessly." },
              { icon: Heart, title: "Anxiety-free Email Summaries", desc: "Stop fearing your inbox. Get automated, stress-free overviews of what needs your attention right now." }
            ].map((useCase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10"
              >
                <div className="bg-emerald-100/50 p-5 rounded-full mb-6 text-emerald-600 ring-4 ring-white shadow-sm">
                  <useCase.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Subtle Bottom Section */}
      <section className="px-6 md:px-12 py-20 bg-white/40 border-t border-white/60 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Launch in Minutes - Not Weeks.</h2>
            <p className="text-gray-500 font-medium">Get your mail organized with zero friction. MailMind is designed for simplicity, so you can focus on your work — not your inbox.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6 text-gray-400">
             <div className="flex gap-8">
               <span className="flex items-center gap-2 font-bold tracking-widest uppercase text-[10px]"><ShieldCheck className="w-4 h-4"/> GDPR Ready</span>
               <span className="flex items-center gap-2 font-bold tracking-widest uppercase text-[10px]"><Key className="w-4 h-4"/> End-to-End Encrypted</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
