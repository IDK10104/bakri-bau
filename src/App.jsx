import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Clock,
  HardHat,
  Hammer,
  Ruler,
  Layers,
  Thermometer,
  Construction,
  Menu,
  X,
  Upload,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* 3D hero centerpiece — code-split so WebGL never blocks first paint */
const House3D = lazy(() => import('./House3D'))

/* ----------------------------------------------------------------
   Content
---------------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Főoldal', href: '#home' },
  { label: 'Szolgáltatások', href: '#services' },
  { label: 'Miért mi', href: '#approach' },
  { label: 'Folyamat', href: '#process' },
  { label: 'Kapcsolat', href: '#contact' },
]

const SERVICES_FULL = [
  { icon: HardHat, title: 'Újépítés', text: 'Kulcsrakész családi házak építése alapozástól a tetőig, az Ön igényei és büdzséje alapján tervezve.' },
  { icon: Hammer, title: 'Felújítás', text: 'Teljes körű lakás- és házfelújítás: válaszfalak, padlózat, gépészet, festés — mindent egy kézből.' },
  { icon: Ruler, title: 'Bővítés', text: 'Tetőtér-beépítés, emeletráépítés és családi házak bővítése igény szerint, statikai tervekkel.' },
  { icon: Layers, title: 'Tetőfedés', text: 'Tetőszerkezet építése és cseréje korszerű fedési megoldásokkal, megfelelő szigeteléssel.' },
  { icon: Thermometer, title: 'Hőszigetelés & homlokzat', text: 'Homlokzati hőszigetelés és felújítás, amely csökkenti a fűtési költségeket és megújítja a ház megjelenését.' },
  { icon: Construction, title: 'Alapozás & szerkezetépítés', text: 'Síkalapozás, szigetelt alaplemez és teherhordó szerkezetek kivitelezése a tervektől az átadásig.' },
]

const STATS = [
  { target: 9, suffix: '+', label: 'év tapasztalat' },
  { target: 40, suffix: '+', label: 'átadott projekt' },
  { target: 100, suffix: '%', label: 'garanciavállalás' },
  { static: '2017', label: 'alapítás éve' },
]

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Felmérés & tervezés',
    tagline: 'Mi mérünk fel elsőként.',
    text: 'Helyszíni bejárás, igények pontos felmérése és átlátható, fix árú árajánlat — rejtett költségek nélkül, mielőtt elkezdjük a munkát.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    alt: 'Tervrajz és felmérés a munkaterületen',
  },
  {
    num: '02',
    title: 'Kivitelezés',
    tagline: 'Mi épitünk szilárdan.',
    text: 'Szakképzett csapatunk minőségi anyagokkal, ütemterv szerint dolgozik. Folyamatos kapcsolattartás, hogy mindig tudja, hol áll a projekt.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Aktív építkezés állványzattal',
  },
  {
    num: '03',
    title: 'Átadás & garancia',
    tagline: 'Mi maradunk utána is.',
    text: 'Tételes átadás, teljes dokumentációval és garanciavállalással. Az átadás nálunk nem a végpont, hanem egy hosszú távú kapcsolat kezdete.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Elkészült modern családi ház',
  },
]

const REASONS = [
  { Icon: ShieldCheck, title: 'Biztosított kivitelezés', text: 'Minden projektünket felelősségbiztosítással és szakszerű dokumentációval végezzük, az elejétől a végéig.' },
  { Icon: Award, title: '9+ év tapasztalat', text: '2017 óta szolgáljuk megrendelőinket Paks és a Dél-Dunántúl térségében — megbízhatóan, helyben.' },
  { Icon: Clock, title: 'Pontos határidők', text: 'Részletes ütemtervvel és folyamatos kapcsolattartással dolgozunk — egy határidő nálunk egy ígéret.' },
]

/* ----------------------------------------------------------------
   Navbar — full-width industrial bar with yellow top rule
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuToggleRef = useRef(null)
  const menuCloseRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const wasOpenRef = useRef(false)
  useEffect(() => {
    if (open) {
      menuCloseRef.current?.focus()
      wasOpenRef.current = true
      const onKeyDown = (e) => { if (e.key === 'Escape') setOpen(false) }
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    }
    if (wasOpenRef.current) {
      menuToggleRef.current?.focus()
      wasOpenRef.current = false
    }
  }, [open])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-accent" />
      <nav
        aria-label="Főnavigáció"
        className={`fixed top-1 left-0 right-0 z-50 transition-colors duration-300 border-b ${
          scrolled ? 'bg-surface/95 backdrop-blur border-divider' : 'bg-gradient-to-b from-deep via-deep/85 to-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <span className="flex h-9 w-9 items-center justify-center bg-ink">
              <HardHat className="h-5 w-5 text-accent" strokeWidth={2.4} />
            </span>
            <span className={`font-display font-extrabold tracking-tight text-lg uppercase ${scrolled ? 'text-ink' : 'text-white'} transition-colors`}>
              BÁKRI-BAU
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  scrolled ? 'text-ink/60 hover:text-ink' : 'text-white/80 hover:text-accent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-flex magnetic-btn items-center gap-2 bg-ink text-white px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] font-semibold border-b-2 border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Árajánlat
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>

          <button
            ref={menuToggleRef}
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Menü megnyitása"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[60] transition-all duration-300 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-deep/95 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={`absolute top-0 left-0 right-0 bg-deep border-b-4 border-accent px-6 pt-7 pb-12 transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-extrabold text-xl text-white uppercase">BÁKRI-BAU</span>
            <button
              ref={menuCloseRef}
              onClick={() => setOpen(false)}
              className="p-2.5 bg-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Menü bezárása"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 font-display text-3xl font-bold text-white uppercase py-3.5 border-b border-white/10"
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-accent text-ink px-6 py-4 font-mono text-sm uppercase tracking-widest font-bold w-full"
          >
            Kérjen árajánlatot
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero — split: dark statement panel + framed photo
---------------------------------------------------------------- */
const PHASES = ['Alapozás', 'Falazás', 'Nyílászárók', 'Tetőfedés', 'Kész']

function Hero() {
  const heroRef = useRef(null)
  const wrapRef = useRef(null)
  const progressRef = useRef(0)
  const [use3D, setUse3D] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  )
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideMq = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      setReduced(reducedMq.matches)
      setUse3D(wideMq.matches) // 3D only on wide screens (keeps phones fast)
    }
    update()
    reducedMq.addEventListener?.('change', update)
    wideMq.addEventListener?.('change', update)
    return () => {
      reducedMq.removeEventListener?.('change', update)
      wideMq.removeEventListener?.('change', update)
    }
  }, [])

  // scroll-driven build on desktop (user-controlled, so fine even with reduce-motion)
  const scrolly = use3D

  useEffect(() => {
    if (reduced && !scrolly) { progressRef.current = 1; setPhase(4) }
  }, [reduced, scrolly])

  // scrub house build progress to scroll position
  useEffect(() => {
    if (!scrolly || !wrapRef.current) return
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        progressRef.current = p
        const idx = p < 0.18 ? 0 : p < 0.4 ? 1 : p < 0.64 ? 2 : p < 0.88 ? 3 : 4
        setPhase((prev) => (prev === idx ? prev : idx))
      },
    })
    ScrollTrigger.refresh()
    return () => st.kill()
  }, [scrolly])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.2 })
    }, heroRef)
    return () => ctx.revert()
  }, [use3D])

  const statement = (
    <div className="relative">
      <p className="hero-reveal flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6">
        <span className="h-2 w-2 bg-accent shrink-0" />
        Épitőipari Kft · Paks · 2017 óta
      </p>
      <h1 className="hero-reveal font-display font-black text-white uppercase tracking-tighter leading-[0.95] text-[clamp(2rem,min(6.4vw,8.4vh),4.75rem)]">
        Erős alapok,
        <span className="block text-accent">tartós eredmény.</span>
      </h1>
      <p className="hero-reveal mt-5 sm:mt-6 max-w-md text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed [@media(max-height:680px)]:hidden">
        A BÁKRI-BAU Kft 2017 óta épít új otthonokat, újít fel régi házakat és bővít családi ingatlanokat
        Paks és a Dél-Dunántúl térségében — precíz kivitelezéssel, határidőre.
      </p>
      <div className="hero-reveal mt-7 sm:mt-9 flex flex-wrap gap-3">
        <a href="#contact" className="magnetic-btn group inline-flex items-center gap-2 bg-accent text-ink font-mono text-xs uppercase tracking-[0.15em] font-bold px-6 py-4">
          Kérjen árajánlatot
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a href="tel:+36301234567" className="magnetic-btn inline-flex items-center gap-2 border border-white/25 text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold px-6 py-4 hover:border-accent hover:text-accent transition-colors">
          <Phone className="h-4 w-4" />
          +36 30 123 4567
        </a>
      </div>

      {scrolly && (
        <div className="mt-7 sm:mt-10 max-w-md">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Görgessen — épül a ház</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent tabular-nums">{String(phase + 1).padStart(2, '0')} / 05</span>
          </div>
          <div className="flex gap-1.5">
            {PHASES.map((ph, i) => (
              <div key={ph} className="flex-1">
                <div className={`h-1 ${i <= phase ? 'bg-accent' : 'bg-white/15'} transition-colors duration-300`} />
                <span className={`mt-2 block font-mono text-[9px] uppercase tracking-wider ${i === phase ? 'text-white' : 'text-white/30'} transition-colors`}>{ph}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const houseFull = (
    <div className="absolute inset-0 bg-deep">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Modell betöltése…</div>}>
        <House3D progressRef={progressRef} reducedMotion={reduced} />
      </Suspense>
    </div>
  )

  const scrims = (
    <>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-deep via-deep/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-deep to-transparent" />
    </>
  )

  const cornerTag = (
    <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 bg-ink/80 backdrop-blur px-3 py-2 pointer-events-none">
      <span className="h-1.5 w-1.5 bg-accent" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">Paks · Dél-Dunántúl</span>
    </div>
  )

  if (scrolly) {
    return (
      <section id="home" ref={heroRef} className="relative bg-deep">
        <div ref={wrapRef} className="relative h-[300vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            {houseFull}
            {scrims}
            <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center pt-24 pb-12 pointer-events-none">
              <div className="max-w-xl pointer-events-auto">{statement}</div>
            </div>
            {cornerTag}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 pointer-events-none">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Görgessen</span>
              <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
            </div>
          </div>
        </div>
        <StatStrip />
      </section>
    )
  }

  // mobile fallback — full-bleed photo with overlaid text
  return (
    <section id="home" ref={heroRef} className="relative bg-deep">
      <div className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Hagyományos európai stílusú családi ház kívülről"
          className="hero-photo absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        {scrims}
        <div className="relative min-h-[100dvh] max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center pt-28 pb-20">
          {statement}
        </div>
        {cornerTag}
      </div>
      <StatStrip />
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(prefersReduced ? target : 0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (prefersReduced) { setCount(target); return }
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const progress = Math.min((now - startTime) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, prefersReduced])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Stat strip — horizontal divided band
---------------------------------------------------------------- */
function StatStrip() {
  return (
    <div className="relative bg-ink border-t-4 border-accent">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 border-x border-white/10">
        {STATS.map((s, i) => (
          <div key={i} className={`px-6 py-8 sm:py-10 ${i >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''}`}>
            <div className="flex items-start gap-1 leading-none">
              <span className="font-display font-black text-5xl sm:text-6xl text-white tabular-nums tracking-tight">
                {s.static ? s.static : <CountUp target={s.target} duration={1600 + i * 200} />}
              </span>
              {s.suffix && <span className="font-display font-bold text-2xl text-accent mt-1">{s.suffix}</span>}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-3">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Section heading helper
---------------------------------------------------------------- */
function SectionHead({ eyebrow, title, accent, intro, dark }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
      <div className="max-w-3xl">
        <p className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] mb-5 ${dark ? 'text-accent' : 'text-muted'}`}>
          <span className="h-2 w-2 bg-accent" />
          {eyebrow}
        </p>
        <h2 className={`font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.95] ${dark ? 'text-white' : 'text-ink'}`}>
          {title} {accent && <span className="text-accent">{accent}</span>}
        </h2>
      </div>
      {intro && <p className={`text-base leading-relaxed max-w-sm ${dark ? 'text-white/60' : 'text-muted'}`}>{intro}</p>}
    </div>
  )
}

/* ----------------------------------------------------------------
   Services — industrial spec-sheet rows (01–06)
---------------------------------------------------------------- */
function Services() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-row', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={ref} aria-label="Szolgáltatásaink" className="relative py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="Szolgáltatások"
          title="Teljes kivitelezés,"
          accent="egy kézből."
          intro="Új építéstől a felújításig — minden munkafázist saját szakembereinkkel végzünk Paks és a Dél-Dunántúl térségében."
        />

        <div className="border-t border-ink/15">
          {SERVICES_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <article
                key={i}
                className="svc-row group relative grid grid-cols-12 items-center gap-4 sm:gap-6 py-7 sm:py-9 border-b border-ink/15 hover:bg-surface transition-colors duration-300"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                <div className="col-span-2 sm:col-span-1 pl-3 sm:pl-5">
                  <span className="font-display font-black text-3xl sm:text-4xl text-ink/15 group-hover:text-accent transition-colors tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-center">
                  <span className="flex h-12 w-12 items-center justify-center border border-ink/20 group-hover:border-accent group-hover:bg-ink transition-colors duration-300">
                    <Icon className="h-5 w-5 text-ink group-hover:text-accent transition-colors" strokeWidth={1.8} />
                  </span>
                </div>
                <h3 className="col-span-8 sm:col-span-3 font-display font-bold text-xl sm:text-2xl text-ink uppercase tracking-tight leading-tight">
                  {svc.title}
                </h3>
                <p className="col-span-12 sm:col-span-6 pl-3 sm:pl-0 text-muted text-[15px] leading-relaxed">
                  {svc.text}
                </p>
                <div className="hidden sm:flex col-span-1 justify-end pr-3">
                  <ArrowUpRight className="h-6 w-6 text-ink/20 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.6} />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Approach / Why us — statement + reasons + CTA
---------------------------------------------------------------- */
function Approach() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="approach" ref={ref} aria-label="Miért válasszon minket" className="relative py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHead
          dark
          eyebrow="Miért válasszon minket"
          title="Több, mint"
          accent="egy árajánlat."
          intro="Nem marketing — ez az, amit minden projektnél nyújtunk. Helyben, megbízhatóan, dokumentáltan."
        />

        <div className="grid md:grid-cols-3 border-t border-white/15">
          {REASONS.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`group relative p-8 sm:p-10 border-b border-white/15 md:border-b-0 ${i > 0 ? 'md:border-l border-white/15' : ''} transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="flex h-12 w-12 items-center justify-center border border-white/20 group-hover:bg-accent group-hover:border-accent transition-colors">
                  <Icon className="h-5 w-5 text-accent group-hover:text-ink transition-colors" strokeWidth={1.8} />
                </span>
                <span className="font-mono text-[11px] text-white/30 uppercase tracking-widest">0{i + 1}</span>
              </div>
              <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white mb-3">{title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/15 pt-10">
          <p className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white max-w-xl leading-tight">
            Kezdjük el az Ön projektjét.
          </p>
          <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-accent text-ink font-mono text-xs uppercase tracking-[0.15em] font-bold px-7 py-4 shrink-0">
            Kérjen árajánlatot
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Process — vertical timeline rail
---------------------------------------------------------------- */
function Process() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.proc-step', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        y: 36, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.18,
      })
      gsap.from('.proc-rail-fill', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 70%', scrub: 1 },
        scaleY: 0, transformOrigin: 'top', ease: 'none',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={ref} aria-label="Munkafolyamatunk" className="relative py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHead eyebrow="Így dolgozunk" title="Három lépés." accent="Semmi meglepetés." intro="Átlátható folyamat a felméréstől a kulcsátadásig — végig az Ön kontrolljával." />

        <div className="relative">
          {/* rail */}
          <div className="absolute left-[26px] sm:left-[34px] top-2 bottom-2 w-px bg-ink/15">
            <div className="proc-rail-fill absolute inset-0 w-px bg-accent" />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="proc-step relative grid lg:grid-cols-12 gap-6 lg:gap-10 pl-16 sm:pl-24">
                {/* marker */}
                <div className="absolute left-0 top-0 flex h-[52px] w-[52px] sm:h-[68px] sm:w-[68px] items-center justify-center bg-ink">
                  <span className="font-display font-black text-lg sm:text-2xl text-accent tabular-nums">{step.num}</span>
                </div>

                <div className="lg:col-span-7 lg:pt-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40 mb-3">{step.num} / Lépés</p>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight leading-[1.02]">{step.title}</h3>
                  <p className="font-display font-semibold text-accent-dark text-lg sm:text-xl mt-2">{step.tagline}</p>
                  <p className="text-muted text-base leading-relaxed mt-5 max-w-lg">{step.text}</p>
                </div>

                <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto overflow-hidden border border-ink/15 bg-deep">
                  <img src={step.image} alt={step.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                    {step.num} / BÁKRI-BAU
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact — dark band, info + form
---------------------------------------------------------------- */
function Field({ id, label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider px-4 py-3.5 text-ink placeholder-muted/60 focus:border-ink focus:ring-2 focus:ring-accent/50 outline-none transition font-body"
      />
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const dropRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }
  const handleFiles = (newFiles) => setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))

  return (
    <section id="contact" aria-label="Kapcsolat és árajánlatkérés" className="relative py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-ink text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent mb-5">
            <span className="h-2 w-2 bg-accent" /> Kapcsolat
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.95]">
            Mesélje el az
            <span className="block text-accent">elképzelését.</span>
          </h2>
          <p className="text-white/60 text-lg mt-6 leading-relaxed max-w-md">
            Töltse ki az űrlapot, és hamarosan felvesszük Önnel a kapcsolatot, hogy megbeszéljük a részleteket.
          </p>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            <a href="tel:+36301234567" className="flex items-center gap-4 py-4 group">
              <span className="h-11 w-11 flex items-center justify-center border border-white/20 group-hover:bg-accent group-hover:border-accent transition-colors">
                <Phone className="h-5 w-5 text-accent group-hover:text-ink transition-colors" />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40">Hívjon közvetlenül</span>
                <span className="font-display font-semibold text-white text-lg">+36 30 123 4567</span>
              </span>
            </a>
            <a href="mailto:info@bakribau.hu" className="flex items-center gap-4 py-4 group">
              <span className="h-11 w-11 flex items-center justify-center border border-white/20 group-hover:bg-accent group-hover:border-accent transition-colors">
                <Mail className="h-5 w-5 text-accent group-hover:text-ink transition-colors" />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40">Írjon nekünk</span>
                <span className="font-display font-semibold text-white text-lg">info@bakribau.hu</span>
              </span>
            </a>
            <div className="flex items-center gap-4 py-4">
              <span className="h-11 w-11 flex items-center justify-center border border-white/20">
                <MapPin className="h-5 w-5 text-accent" />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40">Székhely</span>
                <span className="font-display font-semibold text-white text-lg">7030 Paks, Petőfi utca 48.</span>
              </span>
            </div>
          </div>

          <div className="mt-8 p-5 border-l-2 border-accent bg-white/5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">Adatbiztonság</p>
            <p className="text-sm text-white/60 leading-relaxed">
              Adatait bizalmasan kezeljük, és csak az Ön megkeresésével kapcsolatban vesszük fel a kapcsolatot.
              Harmadik féllel nem osztjuk meg, marketing célra nem használjuk.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} aria-live="polite" className="bg-surface text-ink border-t-4 border-accent p-7 sm:p-10">
            {status !== 'sent' ? (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="contact-name" label="Név" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field id="contact-email" label="E-mail cím" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <Field id="contact-phone" label="Telefonszám" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  <Field id="contact-zip" label="Irányítószám" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} />
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">Üzenete *</label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Írja le röviden a projektjét vagy igényét..."
                    className="w-full bg-background border border-divider px-4 py-3.5 text-ink placeholder-muted/60 focus:border-ink focus:ring-2 focus:ring-accent/50 outline-none transition resize-none font-body"
                  />
                </div>

                <div
                  ref={dropRef}
                  onDragOver={(e) => { e.preventDefault(); dropRef.current?.classList.add('!border-ink', '!bg-accent/5') }}
                  onDragLeave={() => dropRef.current?.classList.remove('!border-ink', '!bg-accent/5')}
                  onDrop={(e) => { e.preventDefault(); dropRef.current?.classList.remove('!border-ink', '!bg-accent/5'); handleFiles(e.dataTransfer.files) }}
                  className="mt-5 border-2 border-dashed border-divider p-6 text-center hover:border-ink/50 transition-colors cursor-pointer"
                >
                  <input type="file" multiple id="file-up" className="hidden" onChange={(e) => handleFiles(e.target.files)} accept="image/*" />
                  <label htmlFor="file-up" className="cursor-pointer block">
                    <Upload className="h-6 w-6 mx-auto text-ink mb-2" />
                    <p className="font-display font-semibold text-ink text-sm uppercase tracking-tight">Csatoljon fotókat a projektről</p>
                    <p className="text-xs text-muted mt-1">Kattintson vagy húzza ide a fájlokat (max. 5 kép)</p>
                    {files.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {files.map((f, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 bg-ink text-accent text-xs px-3 py-1.5 font-mono">
                            <CheckCircle2 className="h-3 w-3" />
                            {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </label>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-muted">A *-gal jelölt mezők kitöltése kötelező. Hamarosan válaszolunk.</p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="magnetic-btn inline-flex items-center gap-2 bg-ink text-white font-mono text-xs uppercase tracking-[0.15em] font-bold px-7 py-4 border-b-2 border-accent disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Küldés...' : 'Üzenet küldése'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="h-16 w-16 mx-auto bg-accent flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-ink" />
                </div>
                <h3 className="font-display font-bold text-2xl text-ink uppercase tracking-tight mb-3">Köszönjük megkeresését</h3>
                <p className="text-muted max-w-md mx-auto">Hamarosan felvesszük Önnel a kapcsolatot, hogy megbeszéljük az elképzeléseit.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white">
      <div className="border-t-4 border-accent">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10">
          <div className="border-b border-white/10 pb-12 mb-12">
            <p className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.9] tracking-tighter" aria-hidden="true">
              Erős alapok.
              <span className="text-accent block">Tartós eredmény.</span>
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
              <p className="text-white/50 max-w-md">BÁKRI-BAU Kft — épitőipari kivitelezés Paks és a Dél-Dunántúl térségében, 2017 óta.</p>
              <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-accent text-ink font-mono text-xs uppercase tracking-[0.15em] font-bold px-7 py-4 self-start sm:self-auto">
                Kérjen árajánlatot
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-9 w-9 bg-ink flex items-center justify-center">
                  <HardHat className="h-5 w-5 text-accent" strokeWidth={2.4} />
                </span>
                <span className="font-display font-extrabold text-lg uppercase">BÁKRI-BAU</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Épitőipari kivitelező vállalkozás 2017 óta — újépítés, felújítás, bővítés és tetőfedés Paks térségében.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-6">Adószám: 25886142-2-17</p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">Szolgáltatások</p>
              <ul className="space-y-2.5">
                {SERVICES_FULL.slice(0, 4).map((s, i) => (
                  <li key={i}><a href="#services" className="text-white/60 hover:text-accent transition text-sm">{s.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">Vállalkozás</p>
              <ul className="space-y-2.5">
                <li><a href="#approach" className="text-white/60 hover:text-accent transition text-sm">Miért mi</a></li>
                <li><a href="#process" className="text-white/60 hover:text-accent transition text-sm">Folyamat</a></li>
                <li><a href="#contact" className="text-white/60 hover:text-accent transition text-sm">Kapcsolat</a></li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">Kapcsolat</p>
              <ul className="space-y-2.5">
                <li><a href="tel:+36301234567" className="text-white/60 hover:text-accent transition text-sm">+36 30 123 4567</a></li>
                <li><a href="mailto:info@bakribau.hu" className="text-white/60 hover:text-accent transition text-sm">info@bakribau.hu</a></li>
                <li className="text-white/60 text-sm">7030 Paks, Petőfi utca 48.</li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 bg-accent animate-ping" />
                <span className="relative h-2 w-2 bg-accent" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Üzemel · Elérhető új megrendelésekre</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
              <Link to="/privacy" className="hover:text-accent transition">Adatkezelési tájékoztató</Link>
              <Link to="/terms" className="hover:text-accent transition">Általános feltételek</Link>
              <span>© 2026 BÁKRI-BAU Kft</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-ink focus:px-4 focus:py-2">
        Ugrás a tartalomhoz
      </a>
      <div className="noise-overlay" />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Approach />
        <Process />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
