import { supabase } from '@/lib/supabase'
export const revalidate = 0; // Wichtig: Damit neue Syncs sofort erscheinen

export default async function fflineCareers() {
  // Wir holen uns die aktuellsten 4-6 Jobs für den Feed am Ende
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', {ascending: false })
    .limit(10);

  return (

    <div className="relative min-h-screen bg-[#04080f] font-sans text-slate-300 selection:bg-teal-500/30 overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-900/10 blur-[120px] pointer-events-none"></div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#04080f]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg shadow-lg shadow-teal-500/10"></div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 text-nowrap">Offline Careers</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-teal-500/30 rounded-full bg-teal-500/5">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-teal-500">Launching 2026</span>
        </div>
      </nav>

      <div className="bg-yellow-100 text-yellow-800 text-center py-2 text-xs font-bold uppercase tracking-widest">
  🚧 Testumgebung: Diese Seite ist nicht öffentlich und befindet sich im privaten Aufbau 🚧
    </div>
    

        <section className="relative pt-24 pb-16 px-8 max-w-5xl mx-auto">
    <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight mb-12">
      {/* Stable Jobs: Kräftiges Weiß, sehr präsent */}
      <span className="text-white font-bold">Stable jobs</span> 
      <br />
      
      <span className="text-slate-500 font-light text-4xl md:text-6xl">in an </span>
      <br />
      
      {/* Ever-accelerating world: Das Highlight in Teal, modern & leuchtend */}
      <span className="text-white font-bold">ever-accelerating world.</span> 
      <br />
    </h1>

    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl">
    Jobs designed for your life <span className="text-teal-500/50">—</span> and everyone in it.
    </p>


        {/* Search Bar & Filters */}
        <div className="max-w-2xl mb-20">
          <div className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-2xl p-2 mb-6 shadow-2xl">
            <input 
              type="text" 
              placeholder="Role, skill, or keyword..." 
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-slate-600"
            />
            <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-all hover:opacity-90">
              Find work
            </button>
          </div>

          {/* Filter Pillen mit Logos */}
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mr-2">Quick Filters:</span>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[12px] hover:border-teal-500/40 hover:text-teal-400 transition-all">
              <svg className="w-3.5 h-3.5 stroke-teal-500/70 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Family-friendly
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[12px] hover:border-teal-500/40 hover:text-teal-400 transition-all">
            <svg className="w-3.5 h-3.5 stroke-teal-500/70 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Ein Zelt/Hideaway Symbol für Isolation */}
              <path d="M10 10l-6 8h16l-6-8" />
              <path d="M14 14l-2 4-2-4" />
              <path d="M2 20h20" />
            </svg>
            No-human-contact
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[12px] hover:border-teal-500/40 hover:text-teal-400 transition-all">
            <svg className="w-3.5 h-3.5 stroke-teal-500/70 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Drei Personen / Zusammenhalt Symbol */}
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Community
          </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[12px] hover:border-teal-500/40 hover:text-teal-400 transition-all">
              <svg className="w-3.5 h-3.5 stroke-teal-500/70 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 2.261C8.17 12.943 10 14.283 10 17"/><path d="M14 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 2.261C15.83 12.943 14 14.283 14 17"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
              Pet-friendly
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[12px] hover:border-teal-500/40 hover:text-teal-400 transition-all">
              <svg className="w-3.5 h-3.5 stroke-teal-500/70 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Hybrid living
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-12 pt-4">
          <div>
            <div className="font-serif text-3xl text-white">2,400+</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-600 mt-1">Listed Roles</div>
          </div>
          <div>
            <div className="font-serif text-3xl text-white">0</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-600 mt-1">Video Calls</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-8 max-w-5xl mx-auto border-t border-white/5">
        <h2 className="font-serif text-3xl text-white mb-10 tracking-tight">Discover AI-Safe Jobs in the <span className="italic opacity-60">Real World.</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Forestry & Land', 'Healthcare', 'Trades & Craft'].map((cat) => (
            <div key={cat} className="group p-6 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-teal-500/[0.03] hover:border-teal-500/20 transition-all cursor-pointer">
              <div className="text-slate-200 font-medium">{cat}</div>
              <div className="text-[9px] font-mono text-teal-500/40 uppercase mt-2">AI Exposure: Very Low</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Aktuelle Offline-Chancen</h2>
              <p className="text-slate-500 mt-1">Frisch aus der Datenbank für Deutschland</p>
            </div>
            <div className="hidden md:block h-1 w-24 bg-emerald-500 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs?.map((job) => (
              <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase">
                      {job.tags?.[0] || 'Handwerk'}
                    </span>
                    <span className="text-xs text-slate-400">📍 {job.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">{job.company}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <span className="font-bold text-slate-900 text-sm">{job.salary_range || 'Auf Anfrage'}</span>
                  <a 
                    href={job.redirect_url} 
                    target="_blank" 
                    className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 underline tracking-wide"
                  >
                    DETAILS ANSEHEN →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {(!jobs || jobs.length === 0) && (
            <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
              Gerade werden neue Jobs synchronisiert...
            </div>
          )}
        </div>
      </section>


      {/* Footer */}
      <footer className="px-8 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-700">© 2026 Offline Careers</div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-800 italic">Built for humans.</div>
      </footer>
    </div>
  );
}