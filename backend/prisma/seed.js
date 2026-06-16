const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.project.createMany({
    data: [
      {
        number: "01",
        name: "Batik Nusantara",
        slug: "batik-nusantara",
        category: "E-Commerce",
        year: "2024",
        description: "Platform e-commerce kerajinan batik dengan pengalaman belanja yang imersif.",
        thumbnail: "/images/projects/batik-nusantara.jpg",
        tags: "Next.js,Tailwind,Stripe",
        url: "/project/batik-nusantara",
        content: "Proyek Batik Nusantara adalah transformasi digital bagi brand fashion heritage. Kami merancang arsitektur sistem e-commerce dari nol, memastikan waktu muat yang sangat cepat dan alur checkout yang tanpa hambatan.",
        challenge: "Batik Nusantara kesulitan melakukan transisi dari penjualan offline tradisional ke online. Platform lama mereka sangat lambat, sulit dinavigasi di mobile, dan sering mengalami error saat checkout.",
        approach: "Kami membangun ulang semuanya menggunakan Next.js untuk Server-Side Rendering guna menjamin SEO maksimal. Antarmuka didesain secara brutalist-lite dengan fokus pada gambar batik beresolusi tinggi. Checkout diintegrasikan langsung dengan Stripe API.",
        impact: "Peningkatan 250% dalam konversi penjualan bulan pertama, dan rata-rata waktu tunggu halaman berkurang dari 4.5 detik menjadi kurang dari 0.8 detik.",
        gallery: "/images/projects/batik-nusantara.jpg,/images/projects/akar-studio.jpg"
      },
      {
        number: "02",
        name: "Akar Studio",
        slug: "akar-studio",
        category: "Portfolio",
        year: "2024",
        description: "Website portfolio studio arsitektur dengan galeri proyek yang memukau.",
        thumbnail: "/images/projects/akar-studio.jpg",
        tags: "React,GSAP,Sanity CMS",
        url: "/project/akar-studio",
        content: "Akar Studio membutuhkan representasi digital yang sama kuatnya dengan bangunan fisik yang mereka rancang. Integrasi Sanity CMS memungkinkan tim mereka memperbarui karya tanpa menyentuh kode.",
        challenge: "Sebagai studio arsitektur, mereka butuh portfolio yang terasa hidup dan emosional, tidak sekadar kotak-kotak kaku seperti template portofolio pada umumnya.",
        approach: "Penggunaan GSAP secara ekstensif untuk transisi antar halaman (page transitions) dan scroll-triggered animations. Layout sengaja dibuat asimetris untuk mematahkan kesan kaku.",
        impact: "Website memenangkan penghargaan Honorable Mention di Awwwards dan berhasil menarik klien internasional pertama mereka.",
        gallery: "/images/projects/akar-studio.jpg,/images/projects/rimbun-hijau.jpg"
      },
      {
        number: "03",
        name: "Rimbun Hijau",
        slug: "rimbun-hijau",
        category: "Company Profile",
        year: "2025",
        description: "Website perusahaan lanskap dengan storytelling visual yang kuat.",
        thumbnail: "/images/projects/rimbun-hijau.jpg",
        tags: "Next.js,Framer Motion",
        url: "/project/rimbun-hijau",
        content: "Sebagai perusahaan lanskap premium, Rimbun Hijau ingin memamerkan dedikasi mereka pada lingkungan hijau. Website ini difokuskan pada foto beresolusi tinggi dengan scroll-triggered animations menggunakan Framer Motion. Skema warna yang dipakai diambil langsung dari elemen alam."
      },
      {
        number: "04",
        name: "Karunia Catering",
        slug: "karunia-catering",
        category: "Landing Page",
        year: "2025",
        description: "Landing page katering premium dengan form pemesanan terintegrasi.",
        thumbnail: "/images/projects/karunia.jpg",
        tags: "React,EmailJS",
        url: "/project/karunia-catering",
        content: "Karunia Catering beralih dari pemesanan manual via chat ke otomatisasi pendaftaran. Landing page ini dirancang untuk menyajikan menu dengan cara yang menggugah selera sekaligus menangkap lead potensial menggunakan EmailJS. Tingkat konversi pemesanan mereka meningkat 300% setelah peluncuran."
      }
    ]
  })
  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
