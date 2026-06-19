import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: ''
  });
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen && services.length === 0) {
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/services`)
        .then(res => res.json())
        .then(data => setServices(data))
        .catch(err => console.error('Error fetching services:', err));
    }
  }, [isOpen, services.length]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Gagal mengirim pesan');
      
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', email: '', service: '', budget: '', message: '' });
      }, 3000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Terjadi kesalahan');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm cursor-pointer"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-[var(--color-paper)] border border-[var(--color-ink)] pointer-events-auto max-h-[90vh] overflow-y-auto text-[var(--color-ink)]"
            >
              <div className="p-8 md:p-12 relative">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 text-2xl hover:opacity-60 transition-opacity"
                  aria-label="Tutup modal"
                >
                  ×
                </button>
                
                {status === 'success' ? (
                  <div className="text-center py-16">
                    <h3 className="font-display text-4xl mb-4">Pesan Terkirim!</h3>
                    <p className="font-sans text-lg opacity-70">
                      Terima kasih atas ketertarikan Anda. Kami akan menghubungi Anda dalam 24 jam.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-3xl md:text-4xl mb-8">Mulai Diskusi Project</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-mono text-xs uppercase tracking-wider opacity-70">Nama Anda *</label>
                          <input 
                            required
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-[var(--color-ink)]/30 focus:border-[var(--color-ink)] outline-none py-2 px-0 transition-colors rounded-none placeholder:opacity-30"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-mono text-xs uppercase tracking-wider opacity-70">Email Anda *</label>
                          <input 
                            required
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-[var(--color-ink)]/30 focus:border-[var(--color-ink)] outline-none py-2 px-0 transition-colors rounded-none placeholder:opacity-30"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 relative">
                          <label className="font-mono text-xs uppercase tracking-wider opacity-70">Layanan *</label>
                          <select 
                            required
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-[var(--color-ink)]/30 focus:border-[var(--color-ink)] outline-none py-2 px-0 transition-colors rounded-none cursor-pointer appearance-none"
                          >
                            <option value="" disabled>Pilih Layanan</option>
                            {services.length > 0 ? (
                              services.map(svc => (
                                <option key={svc.id} value={svc.name}>{svc.name}</option>
                              ))
                            ) : (
                              <>
                                <option value="Web Development">Web Development</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="E-Commerce">E-Commerce</option>
                              </>
                            )}
                            <option value="Lainnya">Lainnya</option>
                          </select>
                          <div className="absolute right-0 top-[28px] pointer-events-none opacity-50 text-xs">▼</div>
                        </div>
                        <div className="space-y-2 relative">
                          <label className="font-mono text-xs uppercase tracking-wider opacity-70">Estimasi Budget *</label>
                          <select 
                            required
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-[var(--color-ink)]/30 focus:border-[var(--color-ink)] outline-none py-2 px-0 transition-colors rounded-none cursor-pointer appearance-none"
                          >
                            <option value="" disabled>Pilih Budget</option>
                            <option value="< 5 Juta">&lt; 5 Juta IDR</option>
                            <option value="5 - 15 Juta">5 - 15 Juta IDR</option>
                            <option value="15 - 30 Juta">15 - 30 Juta IDR</option>
                            <option value="> 30 Juta">&gt; 30 Juta IDR</option>
                          </select>
                          <div className="absolute right-0 top-[28px] pointer-events-none opacity-50 text-xs">▼</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-xs uppercase tracking-wider opacity-70">Pesan / Deskripsi Proyek *</label>
                        <textarea 
                          required
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          className="w-full bg-transparent border-b border-[var(--color-ink)]/30 focus:border-[var(--color-ink)] outline-none py-2 px-0 transition-colors rounded-none resize-none placeholder:opacity-30"
                          placeholder="Ceritakan tentang project Anda, tujuan, dan timeline yang diharapkan..."
                        ></textarea>
                      </div>

                      {status === 'error' && (
                        <div className="text-red-500 font-mono text-xs">{errorMessage}</div>
                      )}

                      <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-4 font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-8"
                      >
                        {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
