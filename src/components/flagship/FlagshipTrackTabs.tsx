import Link from 'next/link'
import { caseStudyCopy, caseStudyRoutes } from '@/data/flagship-case-study'
import { flagshipRoutes, type FlagshipLocale } from '@/data/flagship'

export default function FlagshipTrackTabs({
  locale,
  active,
}: {
  locale: FlagshipLocale
  active: 'nationwide' | 'women-led'
}) {
  const t = caseStudyCopy[locale]

  return (
    <nav className="flagship-track-tabs" aria-label={locale === 'vi' ? 'Các nhánh dự án' : 'Project tracks'}>
      <div className="flagship-shell flagship-track-tabs-inner">
        <Link
          href={flagshipRoutes[locale]}
          className={active === 'nationwide' ? 'active' : undefined}
          aria-current={active === 'nationwide' ? 'page' : undefined}
        >
          {t.nationwideLabel}
        </Link>
        <Link
          href={caseStudyRoutes[locale]}
          className={active === 'women-led' ? 'active' : undefined}
          aria-current={active === 'women-led' ? 'page' : undefined}
        >
          {t.navLabel}
        </Link>
      </div>
    </nav>
  )
}
