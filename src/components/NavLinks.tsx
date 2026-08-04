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
    <nav className="flex flex-col items-start text-lg" aria-label="Main navigation">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/flagship/from-income-to-assets/en"
          className="group relative flex min-h-0 min-w-0 overflow-hidden rounded-xl border border-lime-200/55 bg-emerald-950/55 px-5 py-3 text-left text-white shadow-[0_12px_36px_rgba(5,46,34,0.28)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-lime-100 hover:bg-emerald-950/70 hover:shadow-[0_16px_42px_rgba(5,46,34,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-200"
        >
          <span className="absolute right-4 top-3 text-2xl text-lime-200 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
          <span className="flex min-w-0 flex-col justify-between pr-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-lime-200/90">Flagship project</span>
            <span className="mt-3 font-serif text-lg font-semibold leading-[1.05] tracking-tight text-white sm:text-xl">
              From Income<br />to Assets
            </span>
            <span className="mt-1.5 text-[11px] font-medium leading-tight text-emerald-100/75 group-hover:text-emerald-50">
              Contribute to the research
            </span>
          </span>
        </Link>
        <Link
          href="/public-policy"
          className="group relative flex min-h-0 min-w-0 overflow-hidden rounded-xl border border-orange-200/35 bg-black/35 px-5 py-3 text-left text-white shadow-[0_12px_34px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-orange-200/70 hover:bg-black/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
        >
          <span className="absolute right-4 top-3 text-2xl text-orange-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
          <span className="flex min-w-0 flex-col justify-between pr-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-100/75">Public policy</span>
            <span className="mt-3 font-serif text-lg font-semibold leading-[1.05] tracking-tight text-white sm:text-xl">
              Research &amp;<br />Fieldwork
            </span>
            <span className="mt-1.5 text-[11px] font-medium leading-tight text-zinc-300 group-hover:text-zinc-100">
              Papers, tools &amp; experiments
            </span>
          </span>
        </Link>
        <Link
          href="/sa-partners"
          className="group relative flex min-h-0 min-w-0 overflow-hidden rounded-xl border border-amber-200/45 bg-emerald-950/45 px-5 py-3 text-left text-white shadow-[0_12px_34px_rgba(4,27,17,0.26)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-amber-100/80 hover:bg-emerald-950/65 hover:shadow-[0_16px_40px_rgba(4,27,17,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
        >
          <span className="absolute right-4 top-3 text-2xl text-amber-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
          <span className="flex min-w-0 flex-col justify-between pr-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-100/80">Sa. Partners</span>
            <span className="mt-3 font-serif text-lg font-semibold leading-[1.05] tracking-tight text-white sm:text-xl">
              Market<br />Intelligence
            </span>
            <span className="mt-1.5 text-[11px] font-medium leading-tight text-emerald-100/75 group-hover:text-emerald-50">
              37 qualified research reports
            </span>
          </span>
        </Link>
      </div>
      <div className="mt-[clamp(1.75rem,4vh,3rem)] flex flex-col items-start gap-4">
        <NavLink href="/about">about</NavLink>
        <NavLink href="/writing">writing</NavLink>
        <NavLink href="/reading">reading</NavLink>
        <NavLink href="/guestbook">guestbook</NavLink>
        <NavLink href="/admin/login" className="text-zinc-600 hover:text-zinc-400">admin</NavLink>
      </div>
    </nav>
  )
}
