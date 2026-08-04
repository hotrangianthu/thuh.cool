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
      <Link
        href="/public-policy"
        className="group mb-1 flex max-w-xs items-center gap-4 rounded-lg border border-orange-200/25 bg-black/25 px-4 py-3 text-left text-white backdrop-blur-sm transition hover:border-orange-200/60 hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
      >
        <span className="text-2xl" aria-hidden="true">↗</span>
        <span className="flex flex-col">
          <span className="font-semibold tracking-wide">public policy</span>
          <span className="text-xs font-normal text-zinc-400 group-hover:text-zinc-300">
            research, fieldwork &amp; policy tools
          </span>
        </span>
      </Link>
      <NavLink href="/about">about</NavLink>
      <NavLink href="/writing">writing</NavLink>
      <NavLink href="/reading">reading</NavLink>
      <NavLink href="/guestbook">guestbook</NavLink>
      <NavLink href="/admin/login" className="text-zinc-600 hover:text-zinc-400">admin</NavLink>
    </nav>
  )
}
