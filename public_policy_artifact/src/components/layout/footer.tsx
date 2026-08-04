export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Ho Tran Gian Thu &mdash; Policy Research Portfolio
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          Research Portfolio &bull; {year}
        </div>
      </div>
    </footer>
  )
}
