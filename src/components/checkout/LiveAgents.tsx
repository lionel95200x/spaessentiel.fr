'use client'

const AVATARS = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=2',
  'https://i.pravatar.cc/40?img=3',
  'https://i.pravatar.cc/40?img=4',
]

export function LiveAgents() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {AVATARS.map((src, i) => (
          <div
            key={i}
            className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden"
            style={{ marginLeft: i === 0 ? 0 : -10, zIndex: i }}
          >
            <img src={src} alt="conseiller" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="relative -ml-1 flex items-end pb-0.5" style={{ zIndex: 4 }}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Conseillers en ligne</p>
    </div>
  )
}
