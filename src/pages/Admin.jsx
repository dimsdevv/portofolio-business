import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
  const [password, setPassword] = useState('')
  
  // Data States
  const [projects, setProjects] = useState([])
  const [inquiries, setInquiries] = useState([])
  
  // View States
  const [activeTab, setActiveTab] = useState('projects') // 'projects' | 'inquiries'
  const [view, setView] = useState('list') // 'list' | 'form' (hanya untuk projects)
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
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, name: '' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  // Fetch data on load if logged in
  useEffect(() => {
    if (token) {
      fetchProjects()
      fetchInquiries()
    }
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

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${API_URL}/inquiries`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setInquiries(data)
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

  const handleDelete = async () => {
    if (!deleteConfirm.id) return
    setIsLoading(true)
    try {
      await fetch(`${API_URL}/projects/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      showToast('Proyek berhasil dihapus', 'success')
      setDeleteConfirm({ show: false, id: null, name: '' })
      fetchProjects()
    } catch (err) {
      showToast('Gagal menghapus proyek', 'error')
    }
    setIsLoading(false)
  }

  const promptDelete = (id, name) => {
    setDeleteConfirm({ show: true, id, name })
  }

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, id: null, name: '' })
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

  // Inquiry Handlers
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      })
      fetchInquiries()
      showToast('Status pesan diperbarui', 'success')
    } catch (err) {
      showToast('Gagal update status', 'error')
    }
  }

  const handleDeleteInquiry = async (id) => {
    if(!window.confirm('Hapus pesan ini secara permanen?')) return
    try {
      await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchInquiries()
      showToast('Pesan dihapus', 'success')
    } catch (err) {
      showToast('Gagal menghapus pesan', 'error')
    }
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
    <div className="bg-[var(--color-ink)] min-h-screen flex text-[var(--color-paper)] font-sans">
      <Helmet><title>Admin Dashboard · origindevv</title></Helmet>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-sm flex items-center gap-3 shadow-2xl z-[60] font-mono text-sm uppercase tracking-wide border ${toast.type === 'success' ? 'bg-[var(--color-signal)] text-[var(--color-ink)] border-[var(--color-signal)]' : 'bg-red-500 text-white border-red-500'}`}
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.show && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={cancelDelete}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[var(--color-ink)] border border-red-500/50 p-8 w-full max-w-md shadow-2xl z-10"
            >
              <h3 className="font-display text-3xl uppercase text-red-500 mb-2">Hapus Proyek?</h3>
              <p className="font-sans text-[var(--color-fog)] mb-8">
                Apakah Anda yakin ingin menghapus proyek <span className="text-[var(--color-paper)] font-mono">[{deleteConfirm.name}]</span> secara permanen? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-4 font-mono text-sm uppercase">
                <button 
                  onClick={cancelDelete}
                  className="flex-1 py-3 border border-[var(--color-border-ink)] hover:bg-[var(--color-paper-off)] transition-colors text-[var(--color-fog)] hover:text-[var(--color-paper)]"
                >
                  Batal
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold"
                >
                  {isLoading ? 'Menghapus...' : 'Ya, Hapus'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Sidebar Layout */}
      <aside className="w-64 border-r border-[var(--color-border-ink)] h-screen sticky top-0 flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-[var(--color-border-ink)]">
          <h1 className="font-display text-3xl uppercase tracking-tight">Admin</h1>
          <p className="font-mono text-[var(--color-signal)] text-[10px] tracking-widest mt-1">origindevv</p>
        </div>
        <nav className="flex-1 p-6 flex flex-col gap-2 font-mono text-sm uppercase">
          <button 
            onClick={() => { setActiveTab('projects'); setView('list'); }} 
            className={`text-left px-4 py-3 transition-colors ${activeTab === 'projects' ? 'bg-[var(--color-paper-off)] text-[var(--color-ink)]' : 'text-[var(--color-fog)] hover:text-[var(--color-signal)]'}`}
          >
            Daftar Proyek
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')} 
            className={`text-left px-4 py-3 transition-colors flex justify-between items-center ${activeTab === 'inquiries' ? 'bg-[var(--color-paper-off)] text-[var(--color-ink)]' : 'text-[var(--color-fog)] hover:text-[var(--color-signal)]'}`}
          >
            <span>Pesan Klien</span>
            {inquiries.filter(i => i.status === 'Baru').length > 0 && (
              <span className="bg-[var(--color-signal)] text-[var(--color-ink)] text-[10px] px-2 py-0.5 rounded-full font-bold">
                {inquiries.filter(i => i.status === 'Baru').length}
              </span>
            )}
          </button>
        </nav>
        <div className="p-6 border-t border-[var(--color-border-ink)]">
          <button onClick={handleLogout} className="w-full font-mono text-left px-4 py-3 text-[var(--color-fog)] hover:text-red-500 transition-colors uppercase text-sm">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Mobile Header (Shown only on small screens) */}
        <div className="lg:hidden p-6 border-b border-[var(--color-border-ink)] flex justify-between items-center bg-[var(--color-ink)] sticky top-0 z-50">
          <div>
            <h1 className="font-display text-xl uppercase tracking-tight">Admin</h1>
          </div>
          <div className="flex gap-4 font-mono text-xs uppercase">
            <button onClick={() => { setActiveTab('projects'); setView('list'); }} className={activeTab === 'projects' ? 'text-[var(--color-signal)]' : 'text-[var(--color-fog)]'}>Proyek</button>
            <button onClick={() => setActiveTab('inquiries')} className={activeTab === 'inquiries' ? 'text-[var(--color-signal)]' : 'text-[var(--color-fog)]'}>
              Pesan {inquiries.filter(i=>i.status==='Baru').length > 0 && `(${inquiries.filter(i=>i.status==='Baru').length})`}
            </button>
            <button onClick={handleLogout} className="text-red-500 ml-4">Logout</button>
          </div>
        </div>

        <div className="p-6 lg:p-12">
          {activeTab === 'projects' && (
            <div>
              <header className="mb-12">
                <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight">Dashboard Proyek</h1>
                <p className="font-mono text-[var(--color-signal)] text-sm tracking-widest mt-2">SISTEM MANAJEMEN KONTEN</p>
              </header>

              {view === 'list' ? (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="font-mono text-lg uppercase tracking-wider">Daftar Proyek</h2>
                    <button 
                      onClick={() => openForm()}
                      className="bg-[var(--color-signal)] text-[var(--color-ink)] px-6 py-2 font-semibold hover:opacity-80 transition-opacity font-mono text-sm"
                    >
                      + TAMBAH PROYEK
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {projects.map(p => (
                      <div key={p.id} className="border border-[var(--color-border-ink)] p-6 group hover:bg-[var(--color-paper-off)] hover:text-[var(--color-ink)] transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <span className="font-mono text-[var(--color-signal)] text-xs">{p.number}</span>
                          <div className="flex gap-4 font-mono text-xs uppercase">
                            <button onClick={() => openForm(p)} className="text-[var(--color-fog)] group-hover:text-[var(--color-ink)] hover:underline">Edit</button>
                            <button onClick={() => promptDelete(p.id, p.name)} className="text-red-500 hover:underline">Hapus</button>
                          </div>
                        </div>
                        <h3 className="font-display text-3xl uppercase">{p.name}</h3>
                        <p className="font-sans text-[var(--color-fog)] group-hover:text-[var(--color-ink-subtle)] text-sm mt-2">{p.category} · {p.year}</p>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <div className="col-span-full border border-[var(--color-border-ink)] p-12 text-center text-[var(--color-fog)] font-mono text-sm uppercase">
                        Belum ada proyek
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl">
                  <button onClick={() => setView('list')} className="font-mono text-[var(--color-fog)] text-sm hover:text-[var(--color-signal)] transition-colors mb-8 uppercase tracking-wider">
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
                      className="w-full bg-[var(--color-signal)] text-[var(--color-ink)] py-4 font-semibold hover:opacity-80 transition-opacity font-mono tracking-wider uppercase text-sm"
                    >
                      {isLoading ? 'MENYIMPAN...' : 'SIMPAN PROYEK'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div>
              <header className="mb-12">
                <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight">Pesan Klien</h1>
                <p className="font-mono text-[var(--color-signal)] text-sm tracking-widest mt-2">MANAJEMEN INQUIRY & PROSPEK</p>
              </header>

              <div className="flex flex-col gap-6">
                {inquiries.length === 0 ? (
                   <div className="border border-[var(--color-border-ink)] p-12 text-center text-[var(--color-fog)] font-mono text-sm uppercase">
                   Belum ada pesan dari klien
                 </div>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq.id} className="border border-[var(--color-border-ink)] p-6 bg-[var(--color-ink)] relative overflow-hidden">
                      {inq.status === 'Baru' && (
                        <div className="absolute top-0 right-0 w-2 h-full bg-[var(--color-signal)]"></div>
                      )}
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-display text-3xl uppercase">{inq.name}</h3>
                            <span className={`font-mono text-[10px] px-2 py-1 uppercase tracking-wider ${inq.status === 'Baru' ? 'bg-[var(--color-signal)] text-[var(--color-ink)]' : inq.status === 'Selesai' ? 'border border-[var(--color-fog)] text-[var(--color-fog)]' : 'bg-blue-500 text-white'}`}>
                              {inq.status}
                            </span>
                          </div>
                          <div className="font-mono text-sm text-[var(--color-fog)] mb-6 grid grid-cols-1 md:grid-cols-2 gap-y-2">
                            <p>✉ {inq.email}</p>
                            <p>🏷 {inq.service || 'Belum dipilih'}</p>
                            <p>💰 {inq.budget || 'Belum diisi'}</p>
                            <p>📅 {new Date(inq.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          </div>
                          
                          <div className="bg-[var(--color-paper-off)]/5 p-4 border-l-2 border-[var(--color-border-ink)]">
                            <p className="font-sans text-[var(--color-paper)] whitespace-pre-wrap leading-relaxed">
                              {inq.message}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-row md:flex-col justify-end gap-3 font-mono text-xs uppercase min-w-[140px]">
                          <select 
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="bg-transparent border border-[var(--color-border-ink)] p-2 text-[var(--color-paper)] outline-none cursor-pointer hover:border-[var(--color-signal)] transition-colors"
                          >
                            <option value="Baru" className="bg-[var(--color-ink)]">Status: Baru</option>
                            <option value="Dalam Diskusi" className="bg-[var(--color-ink)]">Status: Dalam Diskusi</option>
                            <option value="Selesai" className="bg-[var(--color-ink)]">Status: Selesai</option>
                          </select>
                          
                          <a 
                            href={`mailto:${inq.email}?subject=Balasan%20dari%20origindevv&body=Halo%20${inq.name},`}
                            className="text-center py-2 border border-[var(--color-border-ink)] hover:bg-[var(--color-paper-off)] transition-colors"
                          >
                            Balas Email
                          </a>
                          
                          <button 
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="text-center py-2 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
