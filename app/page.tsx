import { supabase } from '@/lib/supabase'
import JobBoard from './JobBoard'

export const revalidate = 0;

export default async function OfflineCareers() {
  const [{ data: jobs }, { data: unicornJobs }] = await Promise.all([
    supabase
      .from('jobs')
      .select('*')
      .eq('is_processed', true)
      .eq('is_unicorn', false)
      .eq('city', 'San Francisco')
      .order('created_at', { ascending: false })
      .limit(30),
    supabase
      .from('jobs')
      .select('*')
      .eq('is_unicorn', true)
      .eq('is_published', true)
  ]);

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

      {/* Hero */}
      <header className="relative z-10 pt-24 pb-12 px-8 max-w-5xl mx-auto">
        <h1 className="font-serif text-6xl md:text-5xl text-white tracking-tighter leading-none">
          Stable jobs in an <br />
          <span className="text-slate-500 italic">accelerating world.</span>
        </h1>
      </header>

      <JobBoard initialJobs={jobs ?? []} unicornJobs={unicornJobs ?? []} />

      <footer className="relative z-10 px-8 py-20 border-t border-white/5 text-center">
        <div className="font-serif text-lg text-white mb-4 italic">Offline Careers</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.5em] text-slate-600">Built for the next era of human work.</div>
      </footer>
    </div>
  )
}