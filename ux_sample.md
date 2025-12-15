import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Search, 
  Twitter, 
  Github, 
  Linkedin, 
  ArrowLeft,
  Calendar,
  Send,
  Menu,
  X
} from 'lucide-react';

/**
 * ThuH - Personal Vault & Digital Garden
 * A faithful recreation of the mattpalmer.io aesthetic.
 * * DESIGN PILLARS:
 * 1. Immersive Home: Full-screen oil painting background, mixed typography.
 * 2. Activity Ticker: "ThuH is [educating, building, hiking]" animation.
 * 3. Minimalist Navigation: Bottom-aligned, column-based on Home.
 * 4. Content Focus: Clean, readable typography for the Vault.
 */

// --- ASSETS & CONFIG ---
// A moody, oil-painting style landscape for the background
const HERO_BG = "https://images.unsplash.com/photo-1504609773096-104ff104870d?q=80&w=2070&auto=format&fit=crop"; 
const AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg?seed=ThuH";

// --- DATA ---
const ACTIVITIES = ["building", "educating", "hiking", "writing", "thinking"];

const MOCK_NOTES = [
  {
    id: '1',
    title: 'The Art of Digital Gardening',
    slug: 'digital-gardening',
    date: 'Oct 15, 2025',
    category: 'Thinking',
    preview: 'Why we should treat our websites like gardens, not streams.',
    content: `
      <p>The internet was originally designed as a library—an archive of linked documents. Over the last decade, it has transformed into a stream.</p>
      <p>Digital gardening is a return to the library, but with a twist. It's not just about archiving; it's about <em>cultivating</em>.</p>
      <h3>The Principles</h3>
      <ul>
        <li><strong>Topography over Timeline:</strong> Organize by context, not just by when you wrote it.</li>
        <li><strong>Continuous Growth:</strong> Edit old posts. Refine ideas over years.</li>
      </ul>
    `
  },
  {
    id: '2',
    title: 'System vs. Goals',
    slug: 'systems-goals',
    date: 'Sep 28, 2025',
    category: 'Productivity',
    preview: 'Winners and losers have the same goals. The difference is the system.',
    content: `
      <p>Goal: Write a book.</p>
      <p>System: Write 500 words every morning at 8 AM.</p>
      <p>Goals provide direction, but systems provide progress. In this vault, I focus on the systems that allow knowledge to compound over time.</p>
    `
  },
  {
    id: '3',
    title: 'Statement on AI Safety',
    slug: 'ai-safety',
    date: 'Aug 10, 2025',
    category: 'Engineering',
    preview: 'Thoughts on the recent developments in autonomous agents.',
    content: `
      <p>We are moving from "chatbots" to "agents". The distinction is agency. A chatbot waits for you to speak. An agent acts on your behalf.</p>
      <p>The security implications of this shift are massive and largely unexplored.</p>
    `
  }
];

const GUESTBOOK_MESSAGES = [
  { id: 1, name: "Bryce Cole", message: "hiiii", time: "31 minutes ago" },
  { id: 2, name: "Rudy", message: "Yooo! I miss guestbook on a website. This is nice!", time: "3 hours ago" },
  { id: 3, name: "Riley Brown", message: "hoo rah", time: "4 hours ago" },
  { id: 4, name: "Matt Hall", message: "Bold choice to have a public guestbook", time: "5 hours ago" },
];

// --- COMPONENTS ---

// 1. Text Cycle Effect for "ThuH is [activity]"
const ActivityTicker = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setFade(true); // Fade in new word
      }, 500); // Wait for fade out to finish
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`font-handwriting text-[#ffba75] ml-3 transition-opacity duration-500 inline-block ${fade ? 'opacity-100' : 'opacity-0'}`}
      style={{ fontFamily: '"Kaushan Script", cursive', transform: 'rotate(-2deg)' }}
    >
      {ACTIVITIES[index]}
    </span>
  );
};

// 2. Navigation Link (Hover underline effect)
const NavLink = ({ children, onClick, active }) => (
  <button 
    onClick={onClick}
    className={`text-sm tracking-wide transition-all duration-200 border-b border-transparent hover:border-white/50 pb-0.5 ${
      active ? 'text-white border-white' : 'text-zinc-300 hover:text-white'
    }`}
  >
    {children}
  </button>
);

// 3. Vault Card
const NoteCard = ({ note, onClick }) => (
  <div 
    onClick={() => onClick(note)}
    className="group cursor-pointer block py-8 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors px-4 -mx-4 rounded-lg"
  >
    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
      <h3 className="text-xl font-bold text-zinc-100 group-hover:text-[#ffba75] transition-colors">
        {note.title}
      </h3>
      <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">{note.date}</span>
    </div>
    <p className="text-zinc-400 leading-relaxed max-w-2xl">
      {note.preview}
    </p>
  </div>
);

// --- VIEWS ---

const HomeView = ({ onNavigate }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 animate-slow-pan"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col h-full justify-between py-12 md:py-24">
        
        {/* Spacer for vertical centering */}
        <div className="hidden md:block"></div> 

        {/* Hero Text */}
        <div className="flex flex-col items-center justify-center text-center mt-20 md:mt-0">
          <h1 className="text-5xl md:text-7xl font-bold text-white/90 tracking-tight drop-shadow-lg">
            ThuH is 
            <ActivityTicker />
          </h1>
        </div>

        {/* Footer Navigation Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 mt-auto w-full">
          
          {/* Left Column: Links */}
          <div className="space-y-8">
            <nav className="flex flex-col items-start gap-4 text-lg">
              <button onClick={() => onNavigate('about')} className="text-zinc-300 hover:text-white transition-colors">about</button>
              <button onClick={() => onNavigate('vault')} className="text-zinc-300 hover:text-white transition-colors">writing</button>
              <button onClick={() => onNavigate('guestbook')} className="text-zinc-300 hover:text-white transition-colors">guestbook</button>
            </nav>
            
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Right Column: Newsletter */}
          <div className="flex flex-col items-start md:items-end justify-end space-y-4">
            <span className="text-sm font-medium text-zinc-400">newsletter</span>
            <div className="w-full max-w-md">
              <div className="flex border-b border-zinc-500 focus-within:border-white transition-colors pb-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-transparent border-none outline-none text-white placeholder-zinc-500 w-full"
                />
                <button className="text-zinc-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-wider flex items-center gap-1">
                  Join <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const VaultView = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')} 
            className="text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} /> Back to home
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Writing</h1>
        </header>

        <div className="space-y-2">
          {MOCK_NOTES.map(note => (
            <NoteCard key={note.id} note={note} onClick={() => onNavigate('note', note)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const NoteDetailView = ({ note, onNavigate }) => {
  useEffect(() => window.scrollTo(0,0), []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button 
          onClick={() => onNavigate('vault')} 
          className="text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-2 mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> writing
        </button>

        <article className="prose prose-invert prose-zinc max-w-none">
          <h1 className="text-3xl font-bold text-white mb-2">{note.title}</h1>
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-8 font-mono">
            <span>{note.date}</span>
            <span>/</span>
            <span className="text-[#ffba75]">{note.category}</span>
          </div>
          
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </article>

        <hr className="my-12 border-zinc-800" />

        <div className="flex items-center justify-between text-sm text-zinc-500">
          <p>Thanks for reading.</p>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
};

const GuestbookView = ({ onNavigate }) => {
  const [messages, setMessages] = useState(GUESTBOOK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !name.trim()) return;
    
    const msg = {
      id: Date.now(),
      name: name,
      message: newMessage,
      time: "Just now"
    };
    
    setMessages([msg, ...messages]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
             <span className="text-2xl">✍️</span>
             <h1 className="text-2xl font-bold">ThuH's Guestbook</h1>
          </div>
          <button 
            onClick={() => onNavigate('home')}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-1.5 rounded text-sm transition-colors"
          >
            home
          </button>
        </div>

        <p className="text-zinc-500 mb-12">say hi or drop a note ✌️</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Form Column */}
          <div className="md:col-span-1">
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 sticky top-6">
              <h3 className="font-bold text-lg mb-4 text-white">sign the guestbook</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="your name"
                    className="w-full bg-black/50 border border-zinc-800 rounded p-2 text-sm focus:border-zinc-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">message</label>
                  <textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="your message"
                    rows={4}
                    className="w-full bg-black/50 border border-zinc-800 rounded p-2 text-sm focus:border-zinc-600 outline-none transition-colors resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-2 rounded font-medium transition-colors shadow-lg shadow-purple-900/20"
                >
                  sign guestbook
                </button>
              </form>
            </div>
          </div>

          {/* Messages Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-lg mb-4 text-white">messages</h3>
            {messages.map(msg => (
              <div key={msg.id} className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-zinc-200">{msg.name}</span>
                  <span className="text-xs text-zinc-600">{msg.time}</span>
                </div>
                <p className="text-zinc-400 text-sm">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- MAIN LAYOUT ---

const App = () => {
  const [view, setView] = useState('home'); // home, vault, note, guestbook, about
  const [activeNote, setActiveNote] = useState(null);

  // Load Google Font for the script text
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Inter:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const navigate = (newView, note = null) => {
    if (note) setActiveNote(note);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    switch(view) {
      case 'home': return <HomeView onNavigate={navigate} />;
      case 'vault': return <VaultView onNavigate={navigate} />;
      case 'note': return <NoteDetailView note={activeNote} onNavigate={navigate} />;
      case 'guestbook': return <GuestbookView onNavigate={navigate} />;
      case 'about': return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-white mb-4">About ThuH</h1>
            <p className="mb-6">Just a builder trying to make sense of the world through code and prose.</p>
            <button onClick={() => navigate('home')} className="text-[#ffba75] hover:underline">Return home</button>
          </div>
        </div>
      );
      default: return <HomeView onNavigate={navigate} />;
    }
  };

  return (
    <div className="font-sans antialiased text-zinc-900 bg-black min-h-screen selection:bg-[#ffba75] selection:text-black">
      {renderView()}
      
      {/* Global styles for animation */}
      <style>{`
        @keyframes slow-pan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.05) translate(-1%, -1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-slow-pan {
          animation: slow-pan 60s infinite alternate ease-in-out;
        }
        .font-handwriting {
          font-family: 'Kaushan Script', cursive;
        }
      `}</style>
    </div>
  );
};

export default App;