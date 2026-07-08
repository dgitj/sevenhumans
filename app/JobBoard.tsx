'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { MapPin, ExternalLink, Search, Sparkles } from 'lucide-react'
import Image from 'next/image'

const SEARCH_DEBOUNCE_MS = 300
const RESULTS_LIMIT = 30

// Keine Bild-Spalte in der DB (statische Assets) - Zuordnung über den Titel.
const UNICORN_IMAGES: Record<string, string> = {
  'Lighthouse Keeper': '/images/lighthouse.jpg',
  'Wilderness Ranger': '/images/ranger.jpg',
  'Deckhand on a Tall Ship': '/images/ship.jpg',
}

export default function JobBoard({ initialJobs, unicornJobs }: { initialJobs: any[]; unicornJobs: any[] }) {
  const [query, setQuery] = useState('')
  const [jobs, setJobs] = useState(initialJobs)
  const [loading, setLoading] = useState(false)

  const runSearch = useCallback(async (term: string) => {
    if (!term) {
      setJobs(initialJobs)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_processed', true)
      .eq('is_unicorn', false)
      .eq('city', 'San Francisco')
      .or(`title.ilike.%${term}%,company.ilike.%${term}%,description.ilike.%${term}%`)
      .order('created_at', { ascending: false })
      .limit(RESULTS_LIMIT)

    setJobs(data ?? [])
    setLoading(false)
  }, [initialJobs])

  useEffect(() => {
    const timeout = setTimeout(() => runSearch(query.trim()), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [query, runSearch])

  return (
    <>
      <div className="relative z-10 pb-12 px-8 max-w-5xl mx-auto">
        <form
          onSubmit={(e) => { e.preventDefault(); runSearch(query.trim()) }}
          className="flex gap-3 max-w-3xl"
        >
          <div className="relative group flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-500 transition-colors" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-teal-500/50 transition-all backdrop-blur-sm"
            />
          </div>
          <button
            type="submit"
            className="px-8 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 font-semibold text-sm hover:bg-teal-500/20 transition-all"
          >
            Search
          </button>
        </form>
      </div>

      <main className="relative z-10 px-8 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Featured/Adventure jobs - irrelevant to an active search, so hide them then */}
          {!query.trim() && unicornJobs.map((job) => (
            <div key={job.id} className="group relative bg-slate-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-500 shadow-2xl flex flex-col h-[500px]">
              <Image src={UNICORN_IMAGES[job.title] ?? '/images/lighthouse.jpg'} alt={job.title} fill className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent" />

              <div className="relative mt-auto p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">Adventure Opportunity</span>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">{job.title}</h3>
                <p className="text-sm text-slate-300 italic line-clamp-2">"{job.highlight_reason}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                   <a href={job.source_url} target="_blank" className="text-xs font-bold text-white underline">Learn more</a>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="col-span-full text-center text-sm font-mono text-slate-500 py-12">Searching…</div>
          )}

          {!loading && query.trim() && jobs.length === 0 && (
            <div className="col-span-full text-center text-sm font-mono text-slate-500 py-12">No jobs found for "{query}".</div>
          )}

          {/* Regular Jobs */}
          {!loading && jobs.map((job) => (
            <div key={job.id} className="group bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.06] transition-all duration-500 flex flex-col">
              <div className="flex justify-between items-start mb-12 gap-3">
                <span className="text-[10px] font-mono text-slate-500 border border-white/10 px-3 py-1 rounded-full truncate">
                  {job.location || job.city || 'INTL'}
                </span>
                <MapPin size={14} className="text-slate-600 shrink-0" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors leading-tight">
                {job.title}
              </h3>

              <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                {job.description}
              </p>

              <div className="mt-auto space-y-6">
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-xs font-mono text-slate-500">{job.category?.replace(/\s*Jobs$/i, '') || 'Trade & Construction'}</span>
                  <a href={job.source_url} target="_blank" className="text-white hover:text-teal-400 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
