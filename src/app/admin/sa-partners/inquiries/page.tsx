import { format } from 'date-fns'
import { Mail, MessageSquareText } from 'lucide-react'
import Link from 'next/link'
import { getSaPartnersAdminClient } from '@/lib/sa-partners-server'
import { updateInquiryStatus } from './actions'

type InquiryStatus = 'new' | 'contacted' | 'qualified' | 'closed'
type Inquiry = {
  id: string
  report_code: string
  report_title: string
  contact_name: string
  email: string
  organization: string
  role: string
  message: string
  status: InquiryStatus
  created_at: string
}

const statuses: InquiryStatus[] = ['new', 'contacted', 'qualified', 'closed']

export default async function SaPartnersInquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const requestedStatus = (await searchParams).status
  const activeStatus = statuses.includes(requestedStatus as InquiryStatus) ? requestedStatus as InquiryStatus : 'all'
  let inquiries: Inquiry[] = []
  let configurationError = ''

  try {
    const supabase = getSaPartnersAdminClient()
    let query = supabase.from('sa_partner_inquiries').select('*').order('created_at', { ascending: false }).limit(200)
    if (activeStatus !== 'all') query = query.eq('status', activeStatus)
    const { data, error } = await query
    if (error) throw error
    inquiries = (data || []) as Inquiry[]
  } catch (error) {
    configurationError = error instanceof Error ? error.message : 'Inquiry storage is unavailable.'
  }

  const counts = statuses.reduce<Record<InquiryStatus, number>>((acc, status) => {
    acc[status] = inquiries.filter((inquiry) => inquiry.status === status).length
    return acc
  }, { new: 0, contacted: 0, qualified: 0, closed: 0 })

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Sa. Partners</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Research inquiry inbox</h1>
        <p className="mt-2 text-zinc-300">Review qualified-access requests and keep follow-up status current.</p>
      </div>

      {configurationError && <div className="mb-7 rounded border border-yellow-600/40 bg-yellow-900/30 p-4 text-sm text-yellow-100">Database setup required: {configurationError}</div>}

      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/admin/sa-partners/inquiries" className={`rounded border px-3 py-2 text-sm ${activeStatus === 'all' ? 'border-amber-400 bg-amber-400/15 text-amber-200' : 'border-zinc-700 text-zinc-300'}`}>All</Link>
        {statuses.map((status) => <Link key={status} href={`/admin/sa-partners/inquiries?status=${status}`} className={`rounded border px-3 py-2 text-sm capitalize ${activeStatus === status ? 'border-amber-400 bg-amber-400/15 text-amber-200' : 'border-zinc-700 text-zinc-300'}`}>{status}{activeStatus === 'all' ? ` · ${counts[status]}` : ''}</Link>)}
      </div>

      {inquiries.length ? (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <article key={inquiry.id} className="rounded-lg border border-zinc-800/70 bg-zinc-900/80 p-6 backdrop-blur">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded bg-amber-400/15 px-2 py-1 font-bold text-amber-200">{inquiry.report_code}</span>
                    <span className="text-zinc-400">{format(new Date(inquiry.created_at), 'MMM d, yyyy · HH:mm')}</span>
                    <span className="capitalize text-zinc-400">{inquiry.status}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">{inquiry.report_title}</h2>
                  <p className="mt-2 text-sm text-zinc-300"><strong className="text-white">{inquiry.contact_name}</strong> · {inquiry.role} at {inquiry.organization}</p>
                  <p className="mt-4 whitespace-pre-wrap rounded border border-zinc-800 bg-black/20 p-4 text-sm leading-6 text-zinc-300">{inquiry.message}</p>
                </div>
                <div className="flex min-w-56 flex-col gap-3">
                  <a href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Sa. Partners — ${inquiry.report_code} ${inquiry.report_title}`)}`} className="flex items-center justify-center gap-2 rounded border border-amber-400/50 px-4 py-2 text-sm font-bold text-amber-200 hover:bg-amber-400/10"><Mail size={16} /> Reply by email</a>
                  <form action={updateInquiryStatus} className="flex gap-2">
                    <input type="hidden" name="id" value={inquiry.id} />
                    <select name="status" defaultValue={inquiry.status} className="min-w-0 flex-1 rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200">
                      {statuses.map((status) => <option value={status} key={status}>{status}</option>)}
                    </select>
                    <button className="rounded bg-zinc-700 px-3 py-2 text-sm font-bold text-white hover:bg-zinc-600">Save</button>
                  </form>
                  <span className="break-all text-xs text-zinc-500">{inquiry.email}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-800/70 bg-zinc-900/70 p-12 text-center text-zinc-400"><MessageSquareText className="mx-auto mb-3" /><p>No inquiries in this view.</p></div>
      )}
    </div>
  )
}
