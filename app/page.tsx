import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="font-bold text-xl">Kos Bu Nori</div>
        <Link href="/login" className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition">Login Owner</Link>
      </nav>

      <section className="px-6 py-20 md:px-12 md:py-32 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Bailang • Manado</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-bold tracking-tight">Kos nyaman untuk tinggal dan merasa di rumah.</h1>
          <p className="mt-6 text-lg md:text-xl opacity-70 max-w-2xl">Temukan kamar kos di Bailang Bu Nori dengan informasi harga, fasilitas, dan ketersediaan yang selalu diperbarui.</p>
          <Link href="/kamar" className="inline-flex items-center justify-center mt-8 rounded-full bg-amber-300 text-black border-2 border-amber-400 px-7 py-3 font-bold shadow-md hover:bg-amber-400 hover:border-amber-500 transition">Lihat Kamar</Link>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-black/5"><div className="text-2xl">🏠</div><h2 className="font-bold mt-4">Kamar nyaman</h2><p className="mt-2 text-sm opacity-65">Pilihan kamar untuk kebutuhan tinggal kamu.</p></div>
          <div className="bg-white rounded-3xl p-6 border border-black/5"><div className="text-2xl">✨</div><h2 className="font-bold mt-4">Informasi jelas</h2><p className="mt-2 text-sm opacity-65">Harga, fasilitas, dan status kamar tersedia secara transparan.</p></div>
          <div className="bg-white rounded-3xl p-6 border border-black/5"><div className="text-2xl">📱</div><h2 className="font-bold mt-4">Mudah dihubungi</h2><p className="mt-2 text-sm opacity-65">Hubungi Bu Nori untuk menanyakan kamar yang kamu inginkan.</p></div>
        </div>
      </section>
    </main>
  )
}
