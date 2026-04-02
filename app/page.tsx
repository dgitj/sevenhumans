export default function HumanFirstStealth() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 font-sans selection:bg-orange-500 text-slate-300">
      <div className="max-w-2xl w-full">
        <div className="w-12 h-12 bg-gradient-to-tr from-orange-600 to-amber-400 rounded-2xl mb-14 shadow-2xl shadow-orange-600/10 border border-orange-500/10"></div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-8">
          Crisis-proof. <span className="text-orange-500">AI-safe.</span>
          <br />
          <span className="italic font-medium text-slate-200">Inclusive.</span>
        </h1>
        
        <p className="text-2xl text-slate-400 font-light leading-relaxed mb-20 max-w-lg">
          Jobs designed for your life — and everyone in it. 
          <span className="text-sm tracking-[0.4em] uppercase mt-6 block text-slate-600 font-semibold italic tracking-widest">Launching 2026</span>
        </p>

        <div className="flex flex-wrap gap-8 text-[11px] text-slate-700 uppercase tracking-[0.25em] font-bold border-t border-slate-900 pt-10">
          <span>DE / USA</span>
          <span>•</span>
          <span>Adaptive Careers</span>
          <span>•</span>
          <span>Stealth Mode</span>
        </div>
      </div>
    </div>
  )
}