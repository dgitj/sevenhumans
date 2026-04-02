export default function OfflineCareersStealth() {
  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center p-8 font-sans selection:bg-orange-500 text-slate-300 overflow-hidden">
      
      {/* Subtle Depth Glow */}
      <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-900/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl w-full">
        
        {/* Logo Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-500 rounded-lg mb-16 shadow-xl shadow-orange-600/5 border border-white/5"></div>
        
        {/* Main Headline - English Version */}
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-10 italic text-balance">
          Stable jobs <br />
          <span className="text-orange-500 not-italic">in an ever-accelerating </span> <br />
          <span className="text-slate-200 not-italic">world.</span>
        </h1>
        
        {/* Subtext - Professional & Resilient */}
        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-24 max-w-2xl"> 
          Crisis-proof, human-centric, and stressfree.
          <span className="text-[10px] tracking-[0.5em] uppercase mt-8 block text-orange-500/60 font-bold">
            Offline Careers — Launching 2026
          </span>
        </p>

        {/* Footer Elements */}
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-[10px] text-slate-600 uppercase tracking-[0.3em] font-bold border-t border-white/5 pt-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></span>
            <span>Stealth Mode</span>
          </div>
          <span>Community</span>
          <span>Inclusive</span>
          <span className="ml-auto text-slate-800">© 2026</span>
        </div>
      </div>
    </div>
  )
}