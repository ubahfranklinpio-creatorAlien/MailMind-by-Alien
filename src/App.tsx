import React, { useEffect, useState } from "react";
import { Mail, Sparkles, Loader2, Inbox, AlertCircle, CalendarDays, Search, LogOut } from "lucide-react";
import type { EmailData } from "./lib/imap";
import { processEmails } from "./lib/gemini";
import { MailMindData, Category } from "./lib/types";
import { cn } from "./lib/utils";
import { EmailCard } from "./components/EmailCard";
import { ScheduleView } from "./components/ScheduleView";
import { SignInModal } from "./components/SignInModal";
import { LandingPage } from "./components/LandingPage";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MailMindData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeView, setActiveView] = useState<'inboxes' | 'schedule'>('inboxes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSignIn = async (email: string, appPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/emails", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: email, password: appPassword })
      });
      
      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.message || json.error || "Failed to connect to your mailbox.");
      }

      const rawEmails: EmailData[] = json.emails;
      const processedData = await processEmails(rawEmails);
      setData(processedData);
      setIsAuthenticated(true);
      setShowSignIn(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setData(null);
    setError(null);
    setActiveView('inboxes');
    setShowSignIn(false);
  };

  const categories: (Category | 'All')[] = ['All', 'Appointments', 'Orders', 'School/Class', 'Private', 'Other'];

  const filteredEmails = data?.emails.filter(e => {
    const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = e.subject.toLowerCase().includes(searchLower) || 
                          e.from.toLowerCase().includes(searchLower) ||
                          e.summary.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  }) || [];

  if (!isAuthenticated) {
    if (showSignIn) {
      return (
        <div 
          className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden pointer-events-auto"
        >
          {/* Back to landing button */}
          <button 
            onClick={() => setShowSignIn(false)}
            className="fixed top-8 left-8 z-50 text-gray-400 hover:text-emerald-600 font-bold flex items-center gap-2 group transition-colors"
          >
            ← Back to Landing
          </button>
          <SignInModal onSignIn={handleSignIn} isLoading={loading} error={error} />
        </div>
      );
    }
    
    return <LandingPage onGetStarted={() => setShowSignIn(true)} />;
  }

  return (
    <div 
      className="flex w-full h-screen relative p-6 gap-6 max-w-[1400px] mx-auto pointer-events-auto"
    >
      
      {/* Sidebar */}
      <aside className="w-64 glass rounded-3xl p-6 flex flex-col gap-8 hidden md:flex h-full z-10 transition-shadow hover:shadow-xl hover:shadow-emerald-900/5">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="MailMind Logo" className="w-10 h-10 rounded-xl object-contain bg-emerald-100/50 shadow-sm" />
          <div>
            <h1 className="font-bold text-lg leading-tight text-gray-900">MailMind</h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">By Alien</p>
          </div>
        </div>


        <nav className="flex flex-col gap-2">
          <button 
             onClick={() => setActiveView('inboxes')}
             className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-colors w-full text-left ${activeView === 'inboxes' ? 'bg-white/40 text-emerald-700 border border-white/60 shadow-sm' : 'text-gray-500 hover:bg-white/40 border border-transparent'}`}
          >
            <Inbox className="w-5 h-5" />
            All Inboxes
          </button>
          <button 
             onClick={() => setActiveView('schedule')}
             className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-colors w-full text-left ${activeView === 'schedule' ? 'bg-white/40 text-emerald-700 border border-white/60 shadow-sm' : 'text-gray-500 hover:bg-white/40 border border-transparent'}`}
          >
            <CalendarDays className="w-5 h-5" />
            Daily Schedule
          </button>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="p-4 glass rounded-2xl">
            <p className="text-xs text-gray-400 mb-2">Connected Intelligence</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-xs font-medium text-gray-600 truncate">IMAP Sync Active</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-xs font-medium text-gray-600 truncate">Gemini AI Active</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 h-full overflow-hidden z-10">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:px-2 gap-4">
          
          {/* Mobile View Toggle */}
          <div className="flex md:hidden w-full glass rounded-xl p-1 gap-1">
             <button 
                onClick={() => setActiveView('inboxes')}
                className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'inboxes' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}
             >
                <Inbox className="w-4 h-4" /> Inboxes
             </button>
             <button 
                onClick={() => setActiveView('schedule')}
                className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'schedule' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}
             >
                <CalendarDays className="w-4 h-4" /> Schedule
             </button>
          </div>

          {activeView === 'inboxes' && (
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0 hide-scroll-if-short w-full sm:w-auto flex-1">
              {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition-all shadow-sm border",
                      activeCategory === cat 
                        ? "bg-white border-white text-gray-800" 
                        : "glass border-white/40 text-gray-500 hover:bg-white/40"
                    )}
                  >
                    {cat === 'All' ? 'All Categories' : cat}
                  </button>
                ))}
            </div>
          )}

          {data && (
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-end ml-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  autoFocus={true}
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full glass pl-9 pr-4 py-2 rounded-full text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all border-white/60 placeholder:text-gray-400"
                />
              </div>
            </div>
          )}
        </header>

        {/* Content Area */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center glass rounded-3xl m-2">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-green-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-t-2 border-emerald-400 animate-spin-reverse"></div>
              <Mail className="absolute inset-0 m-auto w-6 h-6 text-green-600 animate-pulse" />
            </div>
            <p className="mt-4 text-green-800 font-medium tracking-wide animate-pulse">Consulting the AI...</p>
          </div>
        ) : (
          <section className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-12 w-full">
            {activeView === 'schedule' ? (
              <ScheduleView items={data?.scheduleItems || []} />
            ) : (
              <div className="grid grid-cols-1 align-content-start gap-4">
                {filteredEmails.length > 0 ? (
                  filteredEmails.map(email => (
                    <EmailCard key={email.id} email={email} />
                  ))
                ) : (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-400 glass rounded-3xl">
                    <Inbox className="w-12 h-12 mb-4 opacity-50" />
                    <p className="font-medium text-lg text-gray-500">No emails found for this specific view.</p>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>

    </div>
  );
}

