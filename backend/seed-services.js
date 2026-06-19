const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const services = [
  {
    order: 1,
    name: "Website Company Profile",
    description: "Desain dan pengembangan website representasi bisnis dengan arsitektur informasi yang jelas dan performa tinggi.",
    price: "Mulai dari Rp 1.999.000",
    guarantee: "Garansi Google PageSpeed 90+ & Bebas Bug 1 Bulan Penuh."
  },
  {
    order: 2,
    name: "Landing Page & Sales Page",
    description: "Halaman konversi tinggi dengan fokus pada copywriting, visual appeal, dan call-to-action yang efektif.",
    price: "Mulai dari Rp 999.000",
    guarantee: "Garansi Load di Bawah 3 Detik & Revisi Desain 14 Hari."
  },
  {
    order: 3,
    name: "E-Commerce Website",
    description: "Toko online dengan pengalaman belanja tanpa hambatan, manajemen inventaris, dan integrasi payment gateway lokal.",
    price: "Mulai dari Rp 4.999.000",
    guarantee: "Garansi Keamanan Transaksi, PageSpeed 90+, & Dukungan Prioritas 3 Bulan."
  },
  {
    order: 4,
    name: "Website Portfolio",
    description: "Showcase karya dengan desain editorial dan interaksi memukau yang menonjolkan kualitas profesional Anda.",
    price: "Mulai dari Rp 1.499.000",
    guarantee: "Garansi 100% Desain Kustom (Non-Template) & Dukungan Teknis 30 Hari."
  },
  {
    order: 5,
    name: "Maintenance & Support",
    description: "Pemeliharaan rutin, pembaruan konten, optimasi kecepatan, dan dukungan teknis proaktif.",
    price: "Mulai dari Rp 250.000/bulan",
    guarantee: "SLA Uptime 99.9% & Resolusi Masalah Kritis < 24 Jam."
  }
]

async function main() {
  console.log('Start seeding services...')
  
  // Clear existing to avoid duplicates if run multiple times (optional, but safe for initial seed)
  await prisma.service.deleteMany()
  
  for (const svc of services) {
    const s = await prisma.service.create({
      data: svc
    })
    console.log(`Created service with id: ${s.id}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
