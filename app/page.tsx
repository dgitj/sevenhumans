import { supabase } from '@/lib/supabase'
import { Trees, ShieldCheck, MapPin, ExternalLink, Sparkles, Search, PawPrint, UserPlus, Anchor } from 'lucide-react'
import Image from 'next/image'

export const revalidate = 0;

// Manuelle Unicorn Jobs
const unicornJobs = [
  {
    id: 'u1',
    title: 'Lighthouse Keeper',
    location: 'Patagonia, CL',
    image: '/images/lighthouse.jpg',
    summary: 'Trade pixels for the rhythm of the tides. Solitude and purpose on the edge of the world.',
    isUnicorn: true,
    nature_score: 10,
    ai_resistance_score: 10,
  },
  {
    id: 'u2',
    title: 'Wilderness Ranger',
    location: 'Denali, US',
    image: '/images/ranger.jpg',
    summary: 'Debug ecosystems instead of code. Protect the last wild places untouched by algorithms.',
    isUnicorn: true,
    nature_score: 10,
    ai_resistance_score: 9,
  },
  {
    id: 'u3',
    title: 'Deckhand on a Tall Ship',
    location: 'North Atlantic / Caribbean',
    image: '/images/ship.jpg',
    summary: 'Feel the tension of the ropes and the weight of the wind. A workspace that moves with the ocean, far beyond any signal.',
    isUnicorn: true,
    nature_score: 10,
    ai_resistance_score: 10,
  }
];

export default async function OfflineCareers() {
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_processed', true)
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="relative min-h-screen bg-[#020408] font-sans text-slate-300 selection:bg-teal-500/30">
      
      {/* Sanfter Background-Verlauf */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#0a0f1a] to-[#111827] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white rounded-sm rotate-45" />
          <span className="font-serif text-lg tracking-tight text-white font-medium">Offline Careers</span>
        </div>
        <div className="text-[10px] font-mono tracking-[0.3em] text-slate-500 uppercase">Est. 2026</div>
      </nav>

      {/* Hero & Search */}
      <header className="relative z-10 pt-24 pb-12 px-8 max-w-5xl mx-auto">
        <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tighter leading-none mb-12">
          Stable jobs in an <br />
          <span className="text-slate-500 italic">accelerating world.</span>
        </h1>

        {/* Search & Career Change Filters */}
        <div className="max-w-3xl space-y-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for a physical future..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-teal-500/50 transition-all backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Career Changer', icon: <UserPlus size={14} /> },
              { label: 'Nature', icon: <Trees size={14} /> },
              { label: 'Pet Friendly', icon: <PawPrint size={14} /> },
              { label: 'AI Safe', icon: <ShieldCheck size={14} /> }
            ].map((filter) => (
              <button key={filter.label} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all text-slate-300">
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Job Feed */}
      <main className="relative z-10 px-8 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Unicorns */}
          {unicornJobs.map((job) => (
            <div key={job.id} className="group relative bg-slate-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-500 shadow-2xl flex flex-col h-[500px]">
              <Image src={job.image} alt={job.title} fill className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent" />
              
              <div className="relative mt-auto p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">Unicorn Opportunity</span>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">{job.title}</h3>
                <p className="text-sm text-slate-300 italic line-clamp-2">"{job.summary}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                   <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold"><Trees size={12}/> {job.nature_score}</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-blue-500 font-bold"><ShieldCheck size={12}/> {job.ai_resistance_score}</div>
                   </div>
                   <button className="text-xs font-bold text-white underline">View Adventure</button>
                </div>
              </div>
            </div>
          ))}

          {/* Regular Jobs */}
          {jobs?.map((job) => (
            <div key={job.id} className="group bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.06] transition-all duration-500 flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <span className="text-[10px] font-mono text-slate-500 border border-white/10 px-3 py-1 rounded-full uppercase">
                  {job.country_code || 'INTL'}
                </span>
                <MapPin size={14} className="text-slate-600" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors leading-tight">
                {job.title}
              </h3>

              <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                {job.techie_summary}
              </p>

              <div className="mt-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-500">
                      <span>Nature</span>
                      <span>{job.nature_score}/10</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500/50" style={{ width: `${(job.nature_score || 0) * 10}%` }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-500">
                      <span>AI Safe</span>
                      <span>{job.ai_resistance_score}/10</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500/50" style={{ width: `${(job.ai_resistance_score || 0) * 10}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-xs font-mono text-slate-500">{job.salary_range || 'Competitive'}</span>
                  <a href={job.redirect_url} target="_blank" className="text-white hover:text-teal-400 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 px-8 py-20 border-t border-white/5 text-center">
        <div className="font-serif text-lg text-white mb-4 italic">Offline Careers</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.5em] text-slate-600">Built for the next era of human work.</div>
      </footer>
    </div>
  )
}