import { supabase } from '@/lib/supabase'
import { Trees, ShieldCheck, MapPin, ExternalLink } from 'lucide-react'

export const revalidate = 0;

export default async function OfflineCareers() {
  // Wir holen nur die bereits veredelten Jobs
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_processed', true) // WICHTIG: Nur veredelte Jobs zeigen
    .order('created_at', { ascending: false })
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
          <span className="text-white font-bold">Stable jobs</span> 
          <br />
          <span className="text-slate-500 font-light text-4xl md:text-6xl">in an </span>
          <br />
          <span className="text-white font-bold">ever-accelerating world.</span> 
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl">
          Jobs designed for your life <span className="text-teal-500/50">—</span> and everyone in it.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-12 pt-4">
          <div>
            <div className="font-serif text-3xl text-white">100% Local</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-600 mt-1">Processed by M4</div>
          </div>
          <div>
            <div className="font-serif text-3xl text-white">0</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-600 mt-1">Video Calls</div>
          </div>
        </div>
      </section>

      {/* Main Jobs Feed */}
      <section className="bg-white py-24 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Veredelte Chancen</h2>
              <p className="text-slate-500 mt-2 text-lg">Vom Algorithmus analysiert, für Menschen gemacht.</p>
            </div>
            <div className="hidden md:block h-1 w-24 bg-teal-500 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs?.map((job) => (
              <div key={job.id} className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col relative overflow-hidden">
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-0 transition-colors group-hover:bg-teal-50/50"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {job.country_code || 'DE'}
                    </span>
                    <div className="flex gap-2 text-slate-400">
                      <MapPin size={14} />
                      <span className="text-xs font-medium">{job.location || 'Remote/Local'}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors leading-tight">
                    {job.title}
                  </h3>

                  {/* Techie Summary - Der emotionale Hook */}
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium border-l-4 border-teal-500/20 pl-4 py-1 italic">
                    "{job.techie_summary || 'Keine Zusammenfassung verfügbar.'}"
                  </p>

                  {/* Scores Area */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {/* Nature Score */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-green-700">
                        <Trees size={14} /> Nature Factor
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-1000" 
                          style={{ width: `${(job.nature_score || 0) * 10}%` }}
                        />
                      </div>
                    </div>

                    {/* AI Safety Score */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                        <ShieldCheck size={14} /> AI Resistance
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-1000" 
                          style={{ width: `${(job.ai_resistance_score || 0) * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* AI Reasoning - Kleingedrucktes für die Logik */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-8">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-bold text-slate-700 uppercase text-[9px] block mb-1">KI-Analyse:</span>
                      {job.ai_reasoning}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-slate-400">
                    {job.salary_range || 'Salary on request'}
                  </span>
                  <a 
                    href={job.redirect_url} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-teal-600 transition-all shadow-lg shadow-slate-200"
                  >
                    View Details <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {(!jobs || jobs.length === 0) && (
            <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400">
              <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              Gerade werden neue Jobs vom KI-Agenten veredelt...
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-700">© 2026 Offline Careers</div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-800 italic">Built for humans on M4 Silicon.</div>
      </footer>
    </div>
  );
}