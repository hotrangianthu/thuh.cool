'use client'

export default function PrintButton({ label }: { label: string }) {
  return <button type="button" className="flagship-btn primary outreach-print" onClick={() => window.print()}>{label}</button>
}

