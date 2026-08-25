'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Minus, Plus, ShieldCheck, Sparkles, Truck, X } from 'lucide-react'

export const product = {
  name: 'Arc One',
  eyebrow: 'The everyday compute companion',
  description: 'A pocket-sized workstation designed for focused work, deep listening, and everything in between.',
  price: 349,
  colors: [
    { name: 'Carbon', value: '#202523', swatch: 'bg-foreground' },
    { name: 'Fog', value: '#d9ddd8', swatch: 'bg-muted-foreground/40' },
    { name: 'Signal', value: '#c8f24a', swatch: 'bg-lime' },
  ],
}

export function ProductVisual({ compact = false, color = product.colors[0].value }: { compact?: boolean; color?: string }) {
  return (
    <div className={`product-stage ${compact ? 'product-stage-compact' : ''}`} aria-label="Arc One handheld device product view" role="img">
      <div className="product-grid" aria-hidden="true" />
      <div className="device-shadow" aria-hidden="true" />
      <div className="device" style={{ '--device-color': color } as React.CSSProperties}>
        <div className="device-screen"><span>ARC</span><small>01</small></div>
        <div className="device-speaker" />
        <div className="device-port" />
        <div className="device-button" />
      </div>
      <div className="device-caption"><span>ARC / ONE</span><span>01—24</span></div>
    </div>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Arc One home"><span className="wordmark-mark">A</span><span>ARC/ONE</span></Link>
      <nav className={`site-nav ${open ? 'site-nav-open' : ''}`} aria-label="Main navigation">
        <Link href="/product" onClick={() => setOpen(false)}>Product</Link>
        <a href="/#story" onClick={() => setOpen(false)}>Why Arc</a>
        <a href="/#support" onClick={() => setOpen(false)}>Support</a>
      </nav>
      <div className="header-actions">
        <Link href="/checkout" className="header-cart">Cart <span>01</span></Link>
        <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <span className="menu-lines" />}</button>
      </div>
    </header>
  )
}

export function BuyButton({ children = 'Buy Arc One', href = '/checkout' }: { children?: React.ReactNode; href?: string }) {
  return <Link href={href} className="button button-primary">{children}<ArrowRight data-icon="inline-end" /></Link>
}

export function ProductHighlights() {
  const items = [
    { icon: Sparkles, title: 'Quietly powerful', text: 'A custom silicon core that keeps up without showing off.' },
    { icon: ShieldCheck, title: 'Built to last', text: 'Recycled aluminum, repairable internals, zero planned obsolescence.' },
    { icon: Truck, title: 'Ships worldwide', text: 'Free carbon-neutral delivery, with tracking from our door to yours.' },
  ]
  return <section className="highlights" id="story">{items.map(({ icon: Icon, title, text }) => <article key={title} className="highlight"><Icon /><h3>{title}</h3><p>{text}</p></article>)}</section>
}

export function ProductConfigurator() {
  const [color, setColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const checkoutHref = `/checkout?color=${encodeURIComponent(color.name)}&quantity=${quantity}`
  return <div className="configurator">
    <div className="configurator-visual"><ProductVisual color={color.value} /></div>
    <div className="configurator-copy">
      <p className="eyebrow">{product.eyebrow}</p>
      <h1>{product.name}<sup>™</sup></h1>
      <p className="product-description">{product.description}</p>
      <div className="price-row"><span className="product-price">${product.price}</span><span className="price-note">One-time purchase<br />Free shipping included</span></div>
      <div className="option-group"><div className="option-label"><span>Color</span><strong>{color.name}</strong></div><div className="color-options">{product.colors.map((option) => <button key={option.name} className={`color-option ${color.name === option.name ? 'selected' : ''}`} style={{ backgroundColor: option.value }} aria-label={`Select ${option.name}`} aria-pressed={color.name === option.name} onClick={() => setColor(option)} />)}</div></div>
      <div className="option-group"><div className="option-label"><span>Quantity</span><strong>{quantity}</strong></div><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button><span>{quantity.toString().padStart(2, '0')}</span><button aria-label="Increase quantity" onClick={() => setQuantity(Math.min(5, quantity + 1))}><Plus /></button></div></div>
      <BuyButton href={checkoutHref}>Buy Now</BuyButton>
      <p className="secure-note"><Check /> Secure checkout placeholder — Stripe integration ready</p>
    </div>
  </div>
}

export function OrderSummary() {
  const searchParams = useSearchParams()
  const color = searchParams.get('color') || 'Carbon'
  const quantity = Math.min(5, Math.max(1, Number.parseInt(searchParams.get('quantity') || '1', 10) || 1))
  const total = product.price * quantity
  const colorValue = product.colors.find((item) => item.name === color)?.value || product.colors[0].value
  return <aside className="order-summary"><div className="summary-product"><ProductVisual compact color={colorValue} /><div><span className="summary-eyebrow">Your order</span><h2>{product.name}</h2><p>{color} / Qty {quantity}</p></div></div><div className="summary-lines"><div><span>Arc One × {quantity}</span><strong>${total}</strong></div><div><span>Shipping</span><strong>Free</strong></div><div className="summary-total"><span>Total</span><strong>${total}</strong></div></div><div className="summary-footnote"><Check /> Includes 2-year limited warranty</div></aside>
}

export function CheckoutForm() {
  const [submitted, setSubmitted] = useState(false)
  const searchParams = useSearchParams()
  const color = searchParams.get('color') || 'Carbon'
  const quantity = Math.min(5, Math.max(1, Number.parseInt(searchParams.get('quantity') || '1', 10) || 1))
  const total = useMemo(() => product.price * quantity, [quantity])
  if (submitted) return <div className="success-panel"><div className="success-icon"><Check /></div><p className="eyebrow">Order received</p><h1>You&apos;re in the Arc.</h1><p>This is a placeholder checkout. No payment was processed, but your order for {quantity} {color} Arc One unit{quantity > 1 ? 's' : ''} is ready for Stripe.</p><Link href="/" className="button button-dark">Back to home <ArrowRight data-icon="inline-end" /></Link></div>
  return <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
    <div className="checkout-section"><div className="section-heading"><span>01</span><h2>Contact</h2></div><div className="field-grid"><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Phone <span>(optional)</span><input type="tel" placeholder="+1 555 000 0000" /></label></div></div>
    <div className="checkout-section"><div className="section-heading"><span>02</span><h2>Delivery</h2></div><div className="field-grid"><label className="full-field">Full name<input required placeholder="Your full name" /></label><label className="full-field">Address<input required placeholder="Street address" /></label><label>City<input required placeholder="City" /></label><label>Postal code<input required placeholder="10001" /></label><label className="full-field">Country<select defaultValue="US"><option value="US">United States</option><option value="CA">Canada</option><option value="GB">United Kingdom</option></select></label></div></div>
    <div className="checkout-section payment-section"><div className="section-heading"><span>03</span><h2>Payment</h2></div><div className="stripe-placeholder"><div className="stripe-logo">stripe</div><p>Stripe payment fields will appear here.</p><small>Placeholder only — no card details are collected.</small></div></div>
    <button className="button button-primary checkout-submit" type="submit">Place order · ${total}<ArrowRight data-icon="inline-end" /></button>
  </form>
}

export function FaqStrip() { return <section className="faq-strip" id="support"><div><p className="eyebrow">Good to know</p><h2>Designed for the long run.</h2></div><div className="faq-list"><details><summary>What is included? <ChevronDown /></summary><p>Arc One, a USB-C cable, a soft carry sleeve, and a two-year limited warranty.</p></details><details><summary>When will it ship? <ChevronDown /></summary><p>Orders ship within 2–3 business days from our studio in Portland.</p></details><details><summary>Can I return it? <ChevronDown /></summary><p>Yes. You have 30 days to decide if Arc One is right for you.</p></details></div></section> }
