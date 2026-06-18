import HeroSection from '../components/sections/HeroSection'
import MarqueeSection from '../components/sections/MarqueeSection'
import WorkSection from '../components/sections/WorkSection'
import TechStackSection from '../components/sections/TechStackSection'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessSection from '../components/sections/ProcessSection'
import ServiceAreaSection from '../components/sections/ServiceAreaSection'
import AboutSection from '../components/sections/AboutSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import FAQSection from '../components/sections/FAQSection'
import CTASection from '../components/sections/CTASection'
import SEO from '../components/SEO'

export default function Home() {
  return (
    <main>
      <SEO 
        title="Website yang menghasilkan profit" 
        description="origindevv merancang pengalaman digital untuk brand yang menolak tampil biasa saja. Cepat, tangguh, dan didesain untuk menghasilkan penjualan." 
        url="https://portofolio-busines.netlify.app"
      />
      <HeroSection />
      <MarqueeSection />
      <WorkSection />
      <TechStackSection />
      <ServicesSection />
      <ProcessSection />
      <ServiceAreaSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
