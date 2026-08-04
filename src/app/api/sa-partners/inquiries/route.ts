import { NextRequest, NextResponse } from 'next/server'
import { ApiErrors } from '@/lib/api-errors'
import { checkRateLimit } from '@/lib/rate-limit'
import { getSaPartnersReport } from '@/data/sa-partners'
import { cleanBoundedText, getSaPartnersAdminClient, isValidEmail } from '@/lib/sa-partners-server'

export async function POST(request: NextRequest) {
  const rate = checkRateLimit(request, 3, 60_000)
  if (!rate.allowed) return ApiErrors.rateLimited('Please wait before submitting another inquiry.', rate.resetAt)

  try {
    const body = await request.json()
    if (body.website) return NextResponse.json({ success: true }, { status: 201 })

    const report = typeof body.reportSlug === 'string' ? getSaPartnersReport(body.reportSlug) : undefined
    const name = cleanBoundedText(body.name, 100)
    const organization = cleanBoundedText(body.organization, 160)
    const role = cleanBoundedText(body.role, 120)
    const message = cleanBoundedText(body.message, 2000, 20)
    const email = isValidEmail(body.email) ? body.email.trim().toLowerCase() : null

    if (!report || !name || !email || !organization || !role || !message) {
      return ApiErrors.badRequest('Please complete every field with valid information.')
    }

    const supabase = getSaPartnersAdminClient()
    const { error } = await supabase.from('sa_partner_inquiries').insert({
      report_slug: report.slug,
      report_code: report.code,
      report_title: report.title,
      contact_name: name,
      email,
      organization,
      role,
      message,
    })
    if (error) throw error

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Sa. Partners inquiry failed:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'The inquiry inbox is temporarily unavailable. Please email thulaneinc@gmail.com directly.' },
      { status: 503 }
    )
  }
}
