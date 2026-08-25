import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { CheckoutForm, OrderSummary, SiteHeader } from '@/components/storefront'

export const metadata = { title: 'Checkout — Arc One', description: 'Complete your Arc One order.' }

export default function CheckoutPage() {
  return <main><SiteHeader /><div className="checkout-page container-wide"><Link href="/product" className="back-link"><ArrowLeft /> Back to product</Link><div className="checkout-header"><div><p className="eyebrow">Almost there</p><h1>Make it yours.</h1></div><div className="checkout-secure"><LockKeyhole /> Secure checkout</div></div><Suspense fallback={<div className="checkout-layout"><div className="checkout-form" /><div className="order-summary" /></div>}><div className="checkout-layout"><CheckoutForm /><OrderSummary /></div></Suspense></div></main>
}
