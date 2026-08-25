import Link from 'next/link'
import { ArrowDownRight, ArrowRight, MoveUpRight } from 'lucide-react'
import { BuyButton, FaqStrip, ProductHighlights, ProductVisual, SiteHeader, product } from '@/components/storefront'

export default function HomePage() {
  return <main>
    <SiteHeader />
    <section className="hero container-wide">
      <div className="hero-copy"><p className="eyebrow">New / 2024</p><h1>Small object.<br /><em>Big signal.</em></h1><p className="hero-description">Arc One is a quiet little computer for the things that matter. Focused power, considered materials, and no noise.</p><div className="hero-actions"><BuyButton /><Link href="/product" className="text-link">Explore the details <ArrowRight /></Link></div></div>
      <div className="hero-visual"><ProductVisual /><div className="scroll-cue"><ArrowDownRight /><span>Scroll to explore</span></div></div>
    </section>
    <section className="marquee-band" aria-label="Arc One features"><div>FOCUS / LISTEN / MAKE / REPEAT / FOCUS / LISTEN / MAKE / REPEAT /</div></section>
    <section className="statement container"><div className="statement-number">01</div><div><p className="eyebrow">A better kind of device</p><h2>Technology should<br /><em>feel like nothing.</em></h2><p className="statement-copy">The best tools disappear into your day. Arc One is built around that idea — a capable, tactile computer that leaves room for your attention.</p><Link href="/product" className="text-link">Meet Arc One <MoveUpRight /></Link></div></section>
    <ProductHighlights />
    <section className="product-callout container-wide"><div><p className="eyebrow">The object</p><h2>Carry less.<br /><em>Do more.</em></h2></div><div className="callout-side"><p>A considered computer for considered work. No subscriptions. No distractions. Just the good stuff, tuned.</p><BuyButton>Shop Arc One</BuyButton></div></section>
    <FaqStrip />
    <footer className="site-footer"><Link href="/" className="wordmark"><span className="wordmark-mark">A</span><span>ARC/ONE</span></Link><span>© 2024 Arc One Studio</span><span>Made for the in-between.</span></footer>
  </main>
}

export const metadata = { title: 'Arc One — Small object. Big signal.', description: `Meet ${product.name}, a quiet little computer for the things that matter.` }
