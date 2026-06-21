const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Menghapus paket layanan lama...')
  await prisma.service.deleteMany()

  console.log('Memasukkan paket layanan baru...')
  const services = [
    {
      name: 'Paket Starter',
      price: 'Rp 800.000 – Rp 1.500.000',
      description: 'Cocok untuk: Bisnis yang baru mulai, promosi produk/jasa tunggal\n\nYang didapat klien:\n- 1 halaman responsif (Hero, Layanan, Kontak)\n- Form / tombol WhatsApp\n- Domain & hosting setup (jika klien sudah punya)\n- Revisi 2x',
      guarantee: 'Landing Page 1 Halaman',
      order: 1
    },
    {
      name: 'Paket Bisnis',
      price: 'Rp 2.000.000 – Rp 4.000.000',
      description: 'Cocok untuk: UMKM, toko, salon, klinik, bisnis lokal yang butuh presence lebih lengkap\n\nYang didapat klien:\n- 3–5 halaman (Home, Tentang, Layanan, Portofolio, Kontak)\n- Mobile responsive\n- Integrasi WhatsApp & Google Maps\n- Domain & hosting 1 tahun (opsional, bisa add-on)\n- Revisi 3x',
      guarantee: 'Company Profile 3–5 Halaman',
      order: 2
    },
    {
      name: 'Paket Premium',
      price: 'Rp 5.000.000 – Rp 10.000.000',
      description: 'Cocok untuk: Bisnis yang butuh fitur lebih — booking, katalog produk, blog, admin panel\n\nYang didapat klien:\n- Desain custom sesuai brand\n- Sampai dengan 10 halaman\n- CMS / Admin Panel\n- Integrasi Payment Gateway (opsional)\n- SEO Basic\n- Revisi 5x',
      guarantee: 'Website Custom / Fungsional',
      order: 3
    }
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service
    })
  }

  console.log('Seeding paket layanan berhasil!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
