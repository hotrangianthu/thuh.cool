export default function GuestbookSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-lg"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="h-4 w-24 bg-zinc-800 rounded" />
            <div className="h-3 w-16 bg-zinc-800 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-zinc-800 rounded" />
            <div className="h-3 w-3/4 bg-zinc-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

