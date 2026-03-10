'use client'

const AVATARS = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=2',
  'https://i.pravatar.cc/40?img=3',
  'https://i.pravatar.cc/40?img=4',
]

const RATING = 4.6
const MAX_STARS = 5

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: MAX_STARS }, (_, i) => {
        const filled = i < Math.floor(rating)
        const partial = !filled && i < rating
        return (
          <svg
            key={i}
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {partial && (
              <defs>
                <linearGradient id={`partial-${i}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset={`${(rating % 1) * 100}%`} stopColor="currentColor" />
                  <stop offset={`${(rating % 1) * 100}%`} stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={filled ? 'currentColor' : partial ? `url(#partial-${i})` : 'none'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-warning"
            />
          </svg>
        )
      })}
    </div>
  )
}

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

export function RatingAgents() {
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
      </div>
      <div className="flex flex-col gap-0.5">
        <StarRating rating={RATING} />
        <p className="text-xs text-muted-foreground">{RATING}/5</p>
      </div>
    </div>
  )
}
