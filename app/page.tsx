import { supabase } from '@/lib/supabase'
import { Trees, ShieldCheck, MapPin, ExternalLink, Sparkles, Binary, Waves } from 'lucide-react'
import Image from 'next/image'

export const revalidate = 0;

// 1. MANUELLE UNICORN JOBS
const unicornJobs = [
  {
    id: 'u1',
    title: 'Leuchtturmwärter auf Patagonien',
    location: 'Islotes Evangelistas, Chile',
    country_code: 'CL',
    image: '/images/lighthouse.jpg', // janek-valdsalu-cgQyb2thNWo-unsplash.jpg
    romantic_summary: 'Tausche das digitale Rauschen gegen den Rhythmus der Gezeiten. Ein Leben in rauer Einsamkeit, umgeben von der gewaltigen Kraft des Pazifiks.',
    ai_safe_reason: 'Physische Präsenz in extremen maritimen Umgebungen und die Wartung antiker Linsentechnik erfordern menschliches Handeln und Urteilsvermögen, das keine KI simulieren kann.',
    salary_range: '45k USD + Unterkunft',
    tags: ['Abenteuer', 'Einsamkeit']
  },
  {
    id: 'u2',
    title: 'Nationalpark Ranger',
    location: 'Denali National Park, Alaska',
    country_code: 'US',
    image: '/images/ranger.jpg', // matthew-peters-kcgUrbLPgOU-unsplash.jpg
    romantic_summary: 'Schütze ein Ökosystem, das unberührt von Algorithmen ist. Debugge die Wildnis statt den Code. Die Rückkehr zur ursprünglichsten Form der Arbeit.',
    ai_safe_reason: 'Erfordert instinktive Reaktion auf Wildtiere, komplexe Bergungseinsätze und emotionale Intelligenz in der Naturschutzvermittlung.',
    salary_range: '52k USD',
    tags: ['Natur', 'Schutz']
  }
];

export default async function OfflineCareers() {
  // 2. SCKRAPED JOBS AUS SUPABASE
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_processed', true)
    .order('created_at', { ascending: false })
    .limit(8);

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
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-teal-500">M4 Verified</span>
        </div>
      </nav>

      <div className="bg-yellow-100 text-yellow-800 text-center py-2 text-xs font-bold uppercase tracking-widest">
        🚧 Private Build: Internal Access Only 🚧
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-8 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 text-[10px] font-mono uppercase tracking-widest mb-8">
          <Binary size={12} /> The Digital Antidote
        </div>
        <h1 className="font-serif text-5xl md:text-8xl leading-[1.0] tracking-tight mb-12">
          <span className="text-white font-black italic">Offline</span> 
          <br />
          <span className="text-white font-black">Careers.</span> 
        </h1>

        <p className="text-xl md:text-3xl text-slate-400 font-light leading-relaxed mb-16 max-w-2xl">
          Jobs designed for your life <span className="text-teal-500/50">—</span> and everyone in it. Stable roles in an ever-accelerating world.
        </p>
      </section>

      {/* UNICORN SECTION */}
      <section className="bg-[#020508] py-32 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <Sparkles className="text-amber-500" size={24} />
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">The Unicorn List</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {unicornJobs.map((job) => (
              <div key={job.id} className="group relative flex flex-col bg-slate-950 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-700 shadow-2xl">
                
                {/* Job Image */}
                <div className="h-80 relative overflow-hidden">
                  <Image 
                    src={job.image} 
                    alt={job.title} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                      {job.country_code}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-10 -mt-16 relative z-10 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin size={14} />
                      <span className="text-xs uppercase tracking-widest font-mono">{job.location}</span>
                    </div>
                  </div>

                  <p className="text-lg text-slate-300 italic font-light leading-relaxed border-l-2 border-amber-500/30 pl-6">
                    "{job.romantic_summary}"
                  </p>

                  <div className="bg-amber-500/5 rounded-2xl p-5 border border-amber-500/10">
                    <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">
                      <ShieldCheck size={14} /> AI-Safety Reasoning
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {job.ai_safe_reason}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6">
                    <span className="text-sm font-bold text-white/50 font-mono">{job.salary_range}</span>
                    <button className="px-8 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors">
                      Manuelle Bewerbung
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCKRAPED JOBS SECTION */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter">Current Opportunities</h2>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-slate-400 text-sm max-w-[240px]">Basierend auf dem Stanford AI Exposure Index 2026.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs?.map((job) => (
              <div key={job.id} className="group flex flex-col p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                <div className="flex justify-between items-start mb-8">
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {job.country_code || 'DE'}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{job.location || 'Local'}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">
                  {job.title}
                </h3>

                <p className="text-slate-600 font-medium italic mb-8 border-l-4 border-teal-500/10 pl-4 py-1">
                  "{job.techie_summary}"
                </p>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter flex items-center gap-2">
                        <Trees size={12} className="text-green-600" /> Nature
                      </span>
                      <span className="text-[10px] font-bold text-slate-900">{job.nature_score}/10</span>
                    </div>
                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${(job.nature_score || 0) * 10}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter flex items-center gap-2">
                        <ShieldCheck size={12} className="text-blue-600" /> AI Safety
                      </span>
                      <span className="text-[10px] font-bold text-slate-900">{job.ai_resistance_score}/10</span>
                    </div>
                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${(job.ai_resistance_score || 0) * 10}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{job.salary_range || 'Auf Anfrage'}</span>
                  <a href={job.redirect_url} target="_blank" className="text-teal-600 hover:text-teal-800 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-20 bg-[#020508] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-black">OC</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-slate-700">© 2026 Offline Careers</div>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-800 italic">Built for humans. Processed on Apple Silicon M4.</div>
        </div>
      </footer>
    </div>
  );
}