export default function HumanFirstStealth() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 font-sans selection:bg-orange-500 text-slate-300">
      <div className="max-w-4xl w-full"> {/* Breite etwas erhöht für die lange Zeile */}
        
        <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-amber-400 rounded-xl mb-14 shadow-2xl shadow-orange-600/10 border border-orange-500/10"></div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
          Crisis-proof. <span className="text-orange-500">AI-safe.</span> <span className="text-slate-200">Inclusive.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-20 max-w-2xl">
          Jobs designed for your life — and everyone in it. 
          <span className="text-sm tracking-[0.4em] uppercase mt-6 block text-slate-600 font-semibold italic tracking-widest">Launching 2026</span>
        </p>

        <div className="flex flex-wrap gap-8 text-[11px] text-slate-700 uppercase tracking-[0.25em] font-bold border-t border-slate-900 pt-10">
          <span>DE / USA</span>
          <span>•</span>
          <span>Careers</span>
          <span>•</span>
          <span>Stealth</span>
        </div>
      </div>
    </div>
  )
}