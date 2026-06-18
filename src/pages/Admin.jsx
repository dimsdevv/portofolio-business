import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState([])
  const [view, setView] = useState('list') // 'list' | 'form'
  const [editingId, setEditingId] = useState(null)
  
  // Form State
  const [formData, setFormData] = useState({
    number: '', name: '', slug: '', category: '', year: '', 
    description: '', thumbnail: '', tags: '', url: '', 
    content: '', challenge: '', approach: '', impact: '', gallery: '', hoverVideo: '',
    isFeatured: false
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  // Fetch projects on load if logged in
  useEffect(() => {
    if (token) fetchProjects()
  }, [token])

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`)
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('adminToken', data.token)
      } else {
        setError('Password salah.')
      }
    } catch (err) {
      setError('Gagal menghubungi server.')
    }
    setIsLoading(false)
  }

  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('adminToken')
  }

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0]
    if (!file) return
    
    const formDataObj = new FormData()
    formDataObj.append('image', file)

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      })
      const data = await res.json()
      if (data.url) {
        // If it's gallery, append it. If thumbnail, replace it.
        if (field === 'gallery') {
          const current = formData.gallery ? formData.gallery.split(',').map(s=>s.trim()).filter(Boolean) : []
          current.push(data.url)
          setFormData({ ...formData, gallery: current.join(',') })
        } else {
          setFormData({ ...formData, [field]: data.url })
        }
      }
    } catch (err) {
      showToast('Gagal upload gambar', 'error')
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const url = editingId ? `${API_URL}/projects/${editingId}` : `${API_URL}/projects`
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        showToast('Proyek berhasil disimpan!', 'success')
        setView('list')
        fetchProjects()
      } else {
        showToast('Gagal menyimpan data proyek', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan', 'error')
    }
    setIsLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus proyek ini?')) return
    try {
      await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      showToast('Proyek berhasil dihapus', 'success')
      fetchProjects()
    } catch (err) {
      showToast('Gagal menghapus proyek', 'error')
    }
  }

  const openForm = (project = null) => {
    if (project) {
      setEditingId(project.id)
      setFormData(project)
    } else {
      setEditingId(null)
      setFormData({
        number: '', name: '', slug: '', category: '', year: '', 
        description: '', thumbnail: '', tags: '', url: '', 
        content: '', challenge: '', approach: '', impact: '', gallery: '', hoverVideo: '',
        isFeatured: false
      })
    }
    setView('form')
  }

  // LOGIN VIEW
  if (!token) {
    return (
      <main className="bg-[var(--color-ink)] min-h-screen flex items-center justify-center p-6">
        <Helmet><title>Login Admin · origindevv</title></Helmet>
        <div className="w-full max-w-md bg-[var(--color-paper-off)] p-12 rounded-sm border border-[var(--color-border-ink)]">
          <h1 className="font-display text-4xl text-[var(--color-ink)] mb-2 uppercase">Login Admin</h1>
          <p className="font-mono text-[var(--color-fog)] text-xs mb-8 tracking-widest uppercase">Akses Terbatas</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <input 
                type="password" 
                placeholder="Masukkan Password" 
                className="w-full bg-[var(--color-paper)] text-[var(--color-ink)] p-4 outline-none font-mono text-sm border border-[var(--color-border-paper)] focus:border-[var(--color-ink)] transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs mt-2 font-mono">{error}</p>}
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-[var(--color-ink)] text-[var(--color-signal)] py-4 font-semibold hover:bg-[#000] transition-colors"
            >
              {isLoading ? 'MEMPROSES...' : 'MASUK'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  // DASHBOARD VIEW
  return (
    <main className="bg-[var(--color-ink)] min-h-screen pt-32 pb-24 text-[var(--color-paper)] relative">
      <Helmet><title>Admin Dashboard · origindevv</title></Helmet>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-8 left-8 px-6 py-4 rounded-sm flex items-center gap-3 shadow-2xl z-[60] font-mono text-sm uppercase tracking-wide border ${toast.type === 'success' ? 'bg-[var(--color-signal)] text-[var(--color-ink)] border-[var(--color-signal)]' : 'bg-red-500 text-white border-red-500'}`}
          >
            {toast.type === 'success' ? (
              <span className="text-lg">✓</span>
            ) : (
              <span className="text-lg">⚠</span>
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--color-border-ink)] pb-8 mb-12">
          <div>
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight">Dashboard</h1>
            <p className="font-mono text-[var(--color-signal)] text-sm tracking-widest mt-2">SISTEM MANAJEMEN KONTEN</p>
          </div>
          <button onClick={handleLogout} className="font-mono text-[var(--color-fog)] text-sm hover:text-[var(--color-signal)] transition-colors mt-8 md:mt-0">
            [ LOGOUT ]
          </button>
        </header>

        {view === 'list' ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-mono text-lg uppercase tracking-wider">Daftar Proyek</h2>
              <button 
                onClick={() => openForm()}
                className="bg-[var(--color-signal)] text-[var(--color-ink)] px-6 py-2 font-semibold hover:opacity-80 transition-opacity"
              >
                + TAMBAH PROYEK
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p.id} className="border border-[var(--color-border-ink)] p-6 group hover:bg-[var(--color-paper-off)] hover:text-[var(--color-ink)] transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-[var(--color-signal)] text-xs">{p.number}</span>
                    <div className="flex gap-3 font-mono text-xs">
                      <button onClick={() => openForm(p)} className="text-[var(--color-fog)] group-hover:text-[var(--color-ink)] hover:underline">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Hapus</button>
                    </div>
                  </div>
                  <h3 className="font-display text-3xl uppercase">{p.name}</h3>
                  <p className="font-sans text-[var(--color-fog)] group-hover:text-[var(--color-ink-subtle)] text-sm mt-2">{p.category} · {p.year}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setView('list')} className="font-mono text-[var(--color-fog)] text-sm hover:text-[var(--color-signal)] transition-colors mb-8">
              ← Kembali ke Daftar
            </button>
            
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Nomor (01, 02)</label>
                  <input type="text" required value={formData.number} onChange={e=>setFormData({...formData, number: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Nama Proyek</label>
                  <input type="text" required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Slug (URL)</label>
                  <input type="text" required value={formData.slug} onChange={e=>setFormData({...formData, slug: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Kategori</label>
                  <input type="text" required value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Tahun</label>
                  <input type="text" required value={formData.year} onChange={e=>setFormData({...formData, year: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Tautan URL Asli (contoh: https://berikopi.com)</label>
                  <input type="text" value={formData.url || ''} onChange={e=>setFormData({...formData, url: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" placeholder="Kosongkan atau ketik # jika tidak ada" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Tags (Pisahkan koma)</label>
                  <input type="text" required value={formData.tags} onChange={e=>setFormData({...formData, tags: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-3 border border-[var(--color-border-ink)] p-4">
                <input 
                  type="checkbox" 
                  id="isFeatured"
                  checked={formData.isFeatured || false} 
                  onChange={e=>setFormData({...formData, isFeatured: e.target.checked})} 
                  className="w-5 h-5 accent-[var(--color-signal)]"
                />
                <label htmlFor="isFeatured" className="font-mono text-sm uppercase text-[var(--color-paper)] cursor-pointer">
                  Tampilkan di Beranda (Karya Terpilih)
                </label>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Deskripsi Pendek</label>
                <textarea required rows="2" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none"></textarea>
              </div>

              <div className="border border-[var(--color-border-ink)] p-6">
                <h3 className="font-display text-2xl uppercase mb-6 text-[var(--color-signal)]">Gambar Proyek</h3>
                
                <div className="mb-6">
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Thumbnail Utama (URL atau Upload)</label>
                  <div className="flex gap-4 items-center">
                    <input type="text" value={formData.thumbnail} onChange={e=>setFormData({...formData, thumbnail: e.target.value})} className="flex-1 bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                    <input type="file" onChange={(e) => handleImageUpload(e, 'thumbnail')} className="text-sm font-mono" />
                  </div>
                  {formData.thumbnail && <img src={formData.thumbnail} alt="thumb" className="h-20 object-cover mt-4" />}
                </div>

                <div className="mb-6">
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Hover Video/GIF (URL atau Upload .mp4/.webm/.gif)</label>
                  <div className="flex gap-4 items-center">
                    <input type="text" value={formData.hoverVideo || ''} onChange={e=>setFormData({...formData, hoverVideo: e.target.value})} className="flex-1 bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                    <input type="file" onChange={(e) => handleImageUpload(e, 'hoverVideo')} className="text-sm font-mono" />
                  </div>
                  {formData.hoverVideo && (
                    formData.hoverVideo.match(/\.(mp4|webm)$/i) ? 
                      <video src={formData.hoverVideo} autoPlay loop muted playsInline className="h-20 object-cover mt-4" /> :
                      <img src={formData.hoverVideo} alt="hover media" className="h-20 object-cover mt-4" />
                  )}
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Galeri Tambahan (Upload akan otomatis ditambah koma)</label>
                  <div className="flex gap-4 items-center">
                    <input type="text" value={formData.gallery} onChange={e=>setFormData({...formData, gallery: e.target.value})} className="flex-1 bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none" />
                    <input type="file" onChange={(e) => handleImageUpload(e, 'gallery')} className="text-sm font-mono" />
                  </div>
                </div>
              </div>

              <div className="border border-[var(--color-border-ink)] p-6 space-y-6">
                <h3 className="font-display text-2xl uppercase text-[var(--color-signal)]">Detail Studi Kasus</h3>
                
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Ringkasan Umum (Gunakan Enter 2x untuk paragraf baru)</label>
                  <textarea required rows="4" value={formData.content} onChange={e=>setFormData({...formData, content: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none"></textarea>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Tantangan</label>
                  <textarea rows="3" value={formData.challenge || ''} onChange={e=>setFormData({...formData, challenge: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none"></textarea>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Pendekatan Kami</label>
                  <textarea rows="3" value={formData.approach || ''} onChange={e=>setFormData({...formData, approach: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none"></textarea>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-[var(--color-fog)] mb-2">Dampak & Hasil</label>
                  <textarea rows="3" value={formData.impact || ''} onChange={e=>setFormData({...formData, impact: e.target.value})} className="w-full bg-transparent border border-[var(--color-border-ink)] p-3 text-[var(--color-paper)] focus:border-[var(--color-signal)] outline-none"></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[var(--color-signal)] text-[var(--color-ink)] py-4 font-semibold hover:opacity-80 transition-opacity"
              >
                {isLoading ? 'MENYIMPAN...' : 'SIMPAN PROYEK'}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
