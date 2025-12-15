import { createClient } from '@/lib/supabase-server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import Image from 'next/image'

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
    <div className="relative min-h-screen text-zinc-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover scale-105 animate-slow-pan"
          style={{ objectPosition: 'center' }}
        />
      </div>
      {/* Gradient Overlay for Readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />
      
      <div className="relative z-20 flex">
        {user && <AdminSidebar />}
        <main className={user ? 'flex-1 ml-64 p-8' : 'flex-1 p-8'}>
          {children}
        </main>
      </div>
    </div>
  )
}

