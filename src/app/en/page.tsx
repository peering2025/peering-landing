import { enMetadata } from '@/lib/metadata'
import { getSoftwareApplicationSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/JsonLd'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { PainPointsSection } from '@/components/sections/PainPointsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'

export const metadata = enMetadata

export default function EnglishPage() {
  return (
    <>
      <JsonLd data={getSoftwareApplicationSchema('en')} />

      <Navigation locale="en" />

      <main>
        <HeroSection locale="en" />
        <PainPointsSection locale="en" />
        <FeaturesSection locale="en" />
        <ContactSection locale="en" />
        <PricingSection locale="en" />
        <FAQSection locale="en" />
        <CTASection locale="en" />
      </main>

      <Footer locale="en" />
    </>
  )
}
