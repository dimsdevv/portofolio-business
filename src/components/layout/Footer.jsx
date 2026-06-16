export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink-muted)] pt-[60px] pb-[40px] border-t border-[var(--color-border-ink)]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Column 1 */}
          <div>
            <a href="#" className="font-display font-semibold text-xl text-[var(--color-paper)] tracking-tight block mb-8">
              origindevv<span className="text-[var(--color-signal)]">·</span>
            </a>
            <div className="font-mono text-[var(--color-fog)] text-sm leading-relaxed">
              <p>Kota Cirebon</p>
              <p>2025</p>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="font-mono text-[var(--color-fog)] uppercase text-xs tracking-widest mb-6">Layanan</h4>
            <ul className="flex flex-col gap-3 font-sans text-[var(--color-fog)]">
              <li><a href="#" className="hover:text-[var(--color-paper)] transition-colors">Company Profile</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)] transition-colors">Landing Page</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)] transition-colors">E-Commerce</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)] transition-colors">Portfolio</a></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="font-mono text-[var(--color-fog)] uppercase text-xs tracking-widest mb-6">Referensi</h4>
            <ul className="flex flex-col gap-3 font-sans text-[var(--color-fog)]">
              <li><a href="#" className="hover:text-[var(--color-paper)] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)] transition-colors">Studi Kasus</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)] transition-colors">Panduan Harga</a></li>
              <li><a href="#" className="hover:text-[var(--color-paper)] transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="font-mono text-[var(--color-fog)] uppercase text-xs tracking-widest mb-6">Hubungi Kami</h4>
            <ul className="flex flex-col gap-3 font-sans text-[var(--color-fog)]">
              <li><a href="https://wa.me/6289654297309" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-paper)] transition-colors">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/origindevv_?igsh=dm1zbmtoMGdmb2t4" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-paper)] transition-colors">Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/dimassholihulhadi?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-paper)] transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/dimsdevv" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-paper)] transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border-ink)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-sans text-[var(--color-fog)] text-sm">
            © 2025 origindevv. Hak cipta dilindungi.
          </p>
          <p className="font-mono text-[var(--color-fog)] text-sm">
            Dibuat dengan makna.
          </p>
        </div>
      </div>
    </footer>
  )
}
