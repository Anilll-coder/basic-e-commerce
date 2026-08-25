import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FaqStrip, ProductConfigurator, SiteHeader } from '@/components/storefront'

export const metadata = { title: 'Arc One — Product', description: 'Explore the details of Arc One.' }

export default function ProductPage() {
  return <main><SiteHeader /><div className="product-page container-wide"><Link href="/" className="back-link"><ArrowLeft /> Back to home</Link><ProductConfigurator /></div><FaqStrip /></main>
}
