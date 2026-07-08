import { supabase } from '@/lib/supabase'
import Link from 'next/link'
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
      <nav className="relative z-50 flex items-center px-8 py-6 border-b border-white/5 backdrop-blur-md">
        <span className="font-serif text-lg tracking-tight text-white font-medium">Offline Careers</span>
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
        <div className="font-serif text-lg text-white italic mb-6">Offline Careers</div>
        <div className="flex justify-center items-center gap-4 text-[10px] text-slate-600">
          <Link href="/impressum" className="hover:text-slate-400 transition-colors">Impressum</Link>
          <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          {/* Pflicht-Attribution laut Adzuna API ToS: min. 116x23px, "Jobs" + Logo verlinkt auf adzuna.com */}
          <a
            href="https://www.adzuna.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-w-[116px] h-[23px] hover:text-slate-400 transition-colors"
          >
            Jobs by Adzuna
          </a>
        </div>
      </footer>
    </div>
  )
}