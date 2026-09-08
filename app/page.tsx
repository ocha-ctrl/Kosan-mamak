import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#2f332d]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight">Kos Bu Nori</Link>
        <Link href="/login" className="rounded-full border border-[#d8d5ca] bg-white/70 px-4 py-2 text-sm font-medium transition hover:bg-white">Owner</Link>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-[0.16em] text-[#7d806f]">BAILANG · MANADO</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-7xl">Tempat tinggal sederhana, nyaman, dan terasa seperti rumah.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#66695f] md:text-lg">Cari kamar kos di Bu Nori dengan informasi harga, fasilitas, dan ketersediaan yang jelas sebelum kamu datang.</p>
          <Link href="/kamar" className="mt-8 inline-flex rounded-full bg-[#3f473b] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#30372d]">Lihat kamar</Link>
        </div>
      </section>

      <section className="border-y border-[#e5e2d8] bg-[#fbfaf6]">
        <div className="mx-auto grid max-w-6xl gap-0 px-6 md:grid-cols-3 md:px-10">
          <div className="border-b border-[#e5e2d8] py-8 md:border-b-0 md:border-r md:pr-10"><p className="text-sm font-semibold">Nyaman untuk tinggal</p><p className="mt-2 text-sm leading-6 text-[#777970]">Lingkungan yang tenang untuk beristirahat dan menjalani aktivitas sehari-hari.</p></div>
          <div className="border-b border-[#e5e2d8] py-8 md:border-b-0 md:border-r md:px-10"><p className="text-sm font-semibold">Informasi transparan</p><p className="mt-2 text-sm leading-6 text-[#777970]">Lihat harga, fasilitas, dan status kamar sebelum menghubungi pemilik.</p></div>
          <div className="py-8 md:pl-10"><p className="text-sm font-semibold">Mudah ditanyakan</p><p className="mt-2 text-sm leading-6 text-[#777970]">Tertarik dengan kamar tertentu? Langsung hubungi Bu Nori melalui WhatsApp.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="flex flex-col gap-6 rounded-[2rem] bg-[#e8e5da] p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div><p className="text-sm font-medium text-[#77796e]">Mencari kamar?</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Lihat kamar yang tersedia.</h2></div>
          <Link href="/kamar" className="inline-flex w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5">Lihat semua kamar →</Link>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl justify-between border-t border-[#e5e2d8] px-6 py-7 text-xs text-[#85877e] md:px-10">
        <span>Kos Bu Nori · Bailang, Manado</span><span>Tempat tinggal yang nyaman.</span>
      </footer>
    </main>
  )
}
