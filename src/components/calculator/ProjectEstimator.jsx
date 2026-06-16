import { useState, useEffect } from 'react'

const websiteTypes = [
  { id: 'landing', label: 'Landing Page', price: 999000 },
  { id: 'portfolio', label: 'Portfolio', price: 1499000 },
  { id: 'company', label: 'Company Profile', price: 1999000 },
  { id: 'ecommerce', label: 'E-Commerce', price: 4999000 },
]

const addonsList = [
  { id: 'rush', label: 'Rush Order (Pengerjaan 3x Lebih Cepat)', price: 1500000 },
  { id: 'seo', label: 'Copywriting & SEO Lanjutan', price: 800000 },
  { id: 'payment', label: 'Integrasi Payment Gateway', price: 1500000 },
  { id: 'lang', label: 'Multi-bahasa (ID/EN)', price: 1200000 },
]

export default function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState(websiteTypes[1])
  const [addons, setAddons] = useState([])
  const [total, setTotal] = useState(selectedType.price)
  const [animatedTotal, setAnimatedTotal] = useState(selectedType.price)

  const toggleAddon = (addon) => {
    if (addons.find(a => a.id === addon.id)) {
      setAddons(addons.filter(a => a.id !== addon.id))
    } else {
      setAddons([...addons, addon])
    }
  }

  useEffect(() => {
    const newTotal = selectedType.price + addons.reduce((sum, a) => sum + a.price, 0)
    setTotal(newTotal)
  }, [selectedType, addons])

  // Simple animation for the price counter
  useEffect(() => {
    let startTimestamp = null;
    const duration = 500; // ms
    const initialTotal = animatedTotal;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const current = Math.floor(initialTotal + (total - initialTotal) * progress);
      setAnimatedTotal(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setAnimatedTotal(total);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [total]);

  const formatIDR = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
  }

  const generateWA = () => {
    const addonNames = addons.length > 0 ? addons.map(a => a.label).join(', ') : 'Tidak ada'
    const text = `Halo origindevv, saya tertarik membangun ${selectedType.label}. 
Add-ons: ${addonNames}. 
Estimasi Budget: ${formatIDR(total)}. 
Bisa kita jadwalkan konsultasi?`
    return `https://wa.me/6289654297309?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="bg-[var(--color-ink)] border border-[var(--color-border-ink)] p-8 md:p-12 font-sans text-[var(--color-paper)]">
      <div className="mb-10 text-center">
        <h2 className="font-display text-4xl uppercase mb-4">Kalkulator Estimasi</h2>
        <p className="text-[var(--color-fog)]">Simulasikan struktur biaya berdasarkan skala dan kompleksitas ambisi digital Anda.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Side: Selections */}
        <div className="space-y-10">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-signal)] mb-4">01. Tipe Ekosistem Digital</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {websiteTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className={`text-left p-4 border transition-colors ${
                    selectedType.id === type.id 
                      ? 'border-[var(--color-signal)] bg-[var(--color-paper-off)] text-[var(--color-ink)]' 
                      : 'border-[var(--color-border-ink)] hover:border-[var(--color-paper)] text-[var(--color-fog)]'
                  }`}
                >
                  <div className="font-bold">{type.label}</div>
                  <div className="text-xs opacity-70 mt-1 font-mono">{formatIDR(type.price)}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-signal)] mb-4">02. Modul Tambahan (Opsional)</h3>
            <div className="flex flex-col gap-3">
              {addonsList.map(addon => {
                const isSelected = addons.find(a => a.id === addon.id)
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`flex justify-between items-center text-left p-4 border transition-colors ${
                      isSelected 
                        ? 'border-[var(--color-signal)] bg-[var(--color-paper-off)] text-[var(--color-ink)]' 
                        : 'border-[var(--color-border-ink)] hover:border-[var(--color-paper)] text-[var(--color-fog)]'
                    }`}
                  >
                    <div className="font-bold text-sm md:text-base">{addon.label}</div>
                    <div className="text-xs opacity-70 font-mono text-right whitespace-nowrap ml-4">
                      + {formatIDR(addon.price)}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Total */}
        <div className="flex flex-col justify-center items-center p-8 bg-[var(--color-paper-off)] text-[var(--color-ink)] text-center border border-[var(--color-border-ink)]">
          <div className="font-mono text-sm tracking-widest uppercase mb-6 text-[var(--color-ink-subtle)]">Estimasi Investasi Total</div>
          <div className="font-display text-5xl md:text-6xl text-[var(--color-signal)] mb-8 tracking-tight">
            {formatIDR(animatedTotal)}
          </div>
          <div className="space-y-2 mb-8 w-full font-mono text-xs text-left opacity-80 border-t border-[var(--color-border-ink)] pt-6">
            <div className="flex justify-between">
              <span>{selectedType.label}</span>
              <span>{formatIDR(selectedType.price)}</span>
            </div>
            {addons.map(a => (
              <div key={a.id} className="flex justify-between">
                <span>{a.label}</span>
                <span>{formatIDR(a.price)}</span>
              </div>
            ))}
          </div>
          <a 
            href={generateWA()}
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full py-4 bg-[var(--color-ink)] text-[var(--color-paper)] hover:text-[var(--color-signal)] font-bold uppercase tracking-wider transition-colors border border-[var(--color-ink)]"
          >
            Kunci Estimasi Ini
          </a>
        </div>
      </div>
    </div>
  )
}
