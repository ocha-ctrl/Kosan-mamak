import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { Room } from '@/types/database'

export default async function KamarPage() {
  const supabase = createClient()
  const { data: rooms } = await supabase.from('rooms').select('*').order('room_number')
  const list = (rooms ?? []) as Room[]
  const available = list.filter((room) => room.availability === 'Tersedia').length

  return (
    <main className="min-h-screen px-5 py-8 md:px-12 md:py-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-black hover:text-white">
          ← Kembali ke Home
        </Link>

        <section className="mt-8 rounded-[2rem] border border-black/5 bg-white p-7 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Bailang • Manado</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Kamar Kos</h1>
              <p className="mt-3 max-w-2xl leading-7 opacity-65">Lihat pilihan kamar, harga, fasilitas, dan ketersediaan sebelum menghubungi Bu Nori.</p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-5 py-4 md:min-w-40">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-55">Ketersediaan</p>
              <p className="mt-1 text-2xl font-bold">{available} <span className="text-sm font-medium opacity-55">dari {list.length}</span></p>
            </div>
          </div>
        </section>

        {list.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-black/5 bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">🏠</div>
            <p className="mt-4 font-semibold">Belum ada data kamar.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((room) => (
              <Link key={room.id} href={`/kamar/${room.id}`} className="group overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f3eee9]">
                  {room.image_url ? (
                    <img src={room.image_url} alt={`Kamar ${room.room_number}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center opacity-55">
                      <span className="text-5xl">🏠</span>
                      <span className="mt-2 text-sm font-medium">Foto kamar belum tersedia</span>
                    </div>
                  )}
                  <span className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur ${room.availability === 'Tersedia' ? 'bg-green-100/95 text-green-700' : 'bg-white/90 text-black/60'}`}>
                    {room.availability}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-45">Kamar</p>
                      <h2 className="mt-1 text-xl font-bold">{room.room_number}</h2>
                    </div>
                    <span className="text-lg font-bold text-amber-700">Rp {Number(room.price).toLocaleString('id-ID')}</span>
                  </div>
                  <p className="mt-1 text-right text-xs opacity-45">/ bulan</p>
                  <p className="mt-4 line-clamp-2 text-sm leading-6 opacity-65">{room.description}</p>
                  {room.facilities && (
                    <div className="mt-4 border-t border-black/5 pt-4">
                      <p className="line-clamp-1 text-xs font-medium opacity-55">✨ {room.facilities}</p>
                    </div>
                  )}
                  <div className="mt-5 text-sm font-bold text-amber-700 transition group-hover:translate-x-1">Lihat detail →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
