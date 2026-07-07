import { NextRequest, NextResponse } from 'next/server'
import { syncGlobalJobs } from '@/lib/syncJobs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await syncGlobalJobs()
    return NextResponse.json(result)
  } catch (err) {
    console.error('❌ Sync-Route fehlgeschlagen:', err)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
