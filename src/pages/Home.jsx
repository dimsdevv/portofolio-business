import HeroSection from '../components/sections/HeroSection'
import MarqueeSection from '../components/sections/MarqueeSection'
import WorkSection from '../components/sections/WorkSection'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessSection from '../components/sections/ProcessSection'
import AboutSection from '../components/sections/AboutSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import FAQSection from '../components/sections/FAQSection'
import CTASection from '../components/sections/CTASection'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>origindevv · Website yang menghasilkan profit.</title>
        <meta name="description" content="origindevv merancang pengalaman digital untuk brand yang menolak tampil biasa saja. Cepat, tangguh, dan didesain untuk menghasilkan penjualan." />
        <meta property="og:title" content="origindevv · Website yang menghasilkan profit." />
        <meta property="og:description" content="Cepat, tangguh, dan didesain untuk menghasilkan penjualan." />
      </Helmet>
      <HeroSection />
      <MarqueeSection />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
