import { createClient } from '@/lib/supabase-server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // We rely on middleware for access control. If user is null, we render content
  // without the admin sidebar (e.g. login page).
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex">
        {user && <AdminSidebar />}
        <main className={user ? 'flex-1 ml-64 p-8' : 'flex-1 p-8'}>
          {children}
        </main>
      </div>
    </div>
  )
}

