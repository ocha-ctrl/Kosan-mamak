import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { Room } from '@/types/database'

export default async function KamarPage() {
  const supabase = createClient()
  const { data: rooms } = await supabase.from('rooms').select('*').order('room_number')
  const list = (rooms ?? []) as Room[]
  const available = list.filter((room) => room.availability === 'Tersedia').length

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#2f332d]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight">Kos Bu Nori</Link>
        <Link href="/login" className="rounded-full border border-[#d8d5ca] bg-white/70 px-4 py-2 text-sm font-medium transition hover:bg-white">Owner</Link>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-12 md:px-10 md:pb-16 md:pt-20">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.16em] text-[#7d806f]">BAILANG · MANADO</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] md:text-6xl">Pilihan kamar</h1>
            <p className="mt-5 text-base leading-7 text-[#66695f] md:text-lg">Lihat kamar yang tersedia, harga, dan fasilitasnya. Pilih yang sesuai, lalu tanyakan langsung kepada Bu Nori.</p>
          </div>
          <div className="shrink-0 rounded-2xl border border-[#dedbd0] bg-white/60 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#85877e]">Saat ini</p>
            <p className="mt-1 text-xl font-semibold">{available} kamar tersedia</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        {list.length === 0 ? (
          <div className="rounded-[1.75rem] border border-[#e1ded4] bg-[#fbfaf6] px-6 py-16 text-center">
            <div className="text-4xl opacity-60">⌂</div>
            <p className="mt-4 font-semibold">Belum ada kamar yang ditampilkan.</p>
            <p className="mt-2 text-sm text-[#777970]">Silakan cek kembali beberapa saat lagi.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((room) => (
              <Link key={room.id} href={`/kamar/${room.id}`} className="group overflow-hidden rounded-[1.5rem] border border-[#e2dfd5] bg-[#fbfaf6] transition duration-200 hover:-translate-y-1 hover:border-[#cfcbbf] hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe8de]">
                  {room.image_url ? (
                    <img src={room.image_url} alt={`Kamar ${room.room_number}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center text-[#8a8c82]">
                      <span className="text-4xl">⌂</span>
                      <span className="mt-2 text-xs">Foto kamar belum tersedia</span>
                    </div>
                  )}
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium ${room.availability === 'Tersedia' ? 'bg-[#edf2e8] text-[#526047]' : 'bg-white/90 text-[#73756e]'}`}>
                    {room.availability}
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-[#85877e]">Kamar</p>
                      <h2 className="mt-1 text-xl font-semibold">{room.room_number}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">Rp {Number(room.price).toLocaleString('id-ID')}</p>
                      <p className="mt-0.5 text-xs text-[#85877e]">per bulan</p>
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-2 text-sm leading-6 text-[#6f7269]">{room.description || 'Kamar kos yang nyaman untuk kebutuhan tinggal sehari-hari.'}</p>

                  {room.facilities && (
                    <p className="mt-4 line-clamp-1 border-t border-[#e5e2d8] pt-4 text-xs text-[#777970]">{room.facilities}</p>
                  )}

                  <div className="mt-5 text-sm font-semibold text-[#59614f] transition group-hover:translate-x-1">Lihat detail →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-[#e5e2d8]">
        <div className="mx-auto flex max-w-6xl justify-between px-6 py-7 text-xs text-[#85877e] md:px-10">
          <span>Kos Bu Nori · Bailang, Manado</span><Link href="/" className="hover:text-[#555950]">Kembali ke home</Link>
        </div>
      </footer>
    </main>
  )
}
