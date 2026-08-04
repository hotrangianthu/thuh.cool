'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'
import { verifyAdmin } from '@/lib/admin-auth'
import { getSaPartnersAdminClient } from '@/lib/sa-partners-server'

const statuses = new Set(['new', 'contacted', 'qualified', 'closed'])

export async function updateInquiryStatus(formData: FormData) {
  const id = formData.get('id')
  const status = formData.get('status')
  if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id) || typeof status !== 'string' || !statuses.has(status)) {
    throw new Error('Invalid inquiry update')
  }

  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user || !(await verifyAdmin(user.id))) throw new Error('Unauthorized')

  const supabase = getSaPartnersAdminClient()
  const { error } = await supabase.from('sa_partner_inquiries').update({ status }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/sa-partners/inquiries')
}
