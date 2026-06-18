const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newProject = await prisma.project.create({
    data: {
      number: "05",
      name: "Beri Kopi",
      slug: "beri-kopi",
      category: "Landing Page",
      year: "2024",
      description: "Landing page premium bergaya dark-mode dengan fitur interaktif untuk brand kopi.",
      thumbnail: "/images/projects/berikopi.png",
      tags: "React,TailwindCSS,Framer Motion",
      url: "/project/beri-kopi",
      content: "Beri Kopi membutuhkan landing page yang tidak hanya sekadar informatif, melainkan juga memberikan pengalaman visual tingkat tinggi yang interaktif. Kami mengembangkan website dengan elemen Dark Mode, Infinite Marquee, Coffee Matchmaker, dan Bento Grid Social Wall untuk membangun interaksi pengguna yang dinamis dan modern.",
      challenge: "Tantangan utamanya adalah bagaimana menampilkan produk kopi lokal agar terasa setara dengan brand internasional premium, sambil mempertahankan kecepatan akses karena tingginya penggunaan aset visual berkualitas tinggi dan animasi.",
      approach: "Kami menggunakan pendekatan desain Dark Mode yang memadukan kesan elegan dengan tipografi modern. Framer Motion digunakan secara ekstensif untuk menganimasikan Bento Grid dan Infinite Marquee agar konten terasa hidup dan tidak membosankan tanpa mengorbankan performa website.",
      impact: "Menghasilkan peningkatan yang signifikan pada interaksi halaman dan tingkat scroll hingga bawah layar. Pengguna menghabiskan waktu rata-rata 2x lipat lebih lama untuk berinteraksi dengan fitur Coffee Matchmaker.",
      gallery: "/images/projects/berikopi.png"
    }
  });

  console.log("Created project:", newProject.name);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
