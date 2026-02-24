import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={className ?? 'text-zinc-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded'}
    >
      {children}
    </Link>
  )
}

export default function NavLinks() {
  return (
    <nav className="flex flex-col items-start gap-4 text-lg" aria-label="Main navigation">
      <NavLink href="/about">about</NavLink>
      <NavLink href="/writing">writing</NavLink>
      <NavLink href="/reading">reading</NavLink>
      <NavLink href="/guestbook">guestbook</NavLink>
      <NavLink href="/admin/login" className="text-zinc-600 hover:text-zinc-400">admin</NavLink>
    </nav>
  )
}

