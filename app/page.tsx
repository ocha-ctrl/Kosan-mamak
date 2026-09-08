import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between border-b border-black/5 bg-white/80 px-6 py-5 backdrop-blur md:px-12">
        <Link href="/" className="text-xl font-bold">Kos Bu Nori</Link>
        <Link href="/login" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-black hover:text-white">Login Owner</Link>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Bailang • Manado</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">Kos nyaman untuk tinggal dan merasa di rumah.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-70 md:text-xl">Temukan kamar kos di Bailang Bu Nori dengan informasi harga, fasilitas, dan ketersediaan yang selalu diperbarui.</p>
          <Link href="/kamar" className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-amber-500 bg-amber-300 px-7 py-3 font-bold text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-xl">Lihat Kamar →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"><div className="text-2xl">🏠</div><h2 className="mt-4 font-bold">Kamar nyaman</h2><p className="mt-2 text-sm leading-6 opacity-65">Pilihan kamar untuk kebutuhan tinggal kamu.</p></div>
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"><div className="text-2xl">✨</div><h2 className="mt-4 font-bold">Informasi jelas</h2><p className="mt-2 text-sm leading-6 opacity-65">Harga, fasilitas, dan status kamar tersedia secara transparan.</p></div>
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"><div className="text-2xl">📱</div><h2 className="mt-4 font-bold">Mudah dihubungi</h2><p className="mt-2 text-sm leading-6 opacity-65">Hubungi Bu Nori untuk menanyakan kamar yang kamu inginkan.</p></div>
        </div>
      </section>
    </main>
  )
}
