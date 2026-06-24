import { Link } from 'react-router-dom'
import { ArrowLeft, HardHat } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-ink flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
            <HardHat className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display font-bold text-lg">BÁKRI-BAU</span>
        </div>

        <p className="font-mono text-sm uppercase tracking-[0.25em] text-primary-dark mb-3">404</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
          A keresett oldal nem található
        </h1>
        <p className="text-muted text-[15px] leading-relaxed max-w-md mx-auto mb-10">
          Lehet, hogy elgépelte a címet, vagy a lap már nem létezik. Térjen vissza a főoldalra, és onnan folytassa.
        </p>

        <Link
          to="/"
          className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-primary/30"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a főoldalra
        </Link>
      </div>
    </div>
  )
}
