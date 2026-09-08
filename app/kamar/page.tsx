import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { Room } from '@/types/database'

export default async function KamarPage() {
  const supabase = createClient()
  const { data: rooms } = await supabase.from('rooms').select('*').order('room_number')
  const list = (rooms ?? []) as Room[]

  return (
    <main className="min-h-screen px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100">← Kembali ke Home</Link>
        <div className="mt-8 flex items-end justify-between gap-4">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Bailang • Manado</p><h1 className="mt-2 text-4xl font-bold">Kamar Kos</h1><p className="mt-2 opacity-65">Pilih kamar yang sesuai dengan kebutuhanmu.</p></div>
        </div>

        {list.length === 0 ? <div className="mt-10 rounded-3xl border bg-white p-8">Belum ada data kamar.</div> :
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map(room => (
              <Link key={room.id} href={`/kamar/${room.id}`} className="group overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[4/3] bg-black/5 overflow-hidden">{room.image_url ? <img src={room.image_url} alt={`Kamar ${room.room_number}`} className="h-full w-full object-cover transition group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-5xl">🏠</div>}</div>
                <div className="p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold">Kamar {room.room_number}</h2><span className={`rounded-full px-3 py-1 text-xs font-semibold ${room.availability === 'Tersedia' ? 'bg-green-100 text-green-700' : 'bg-black/10 text-black/60'}`}>{room.availability}</span></div><p className="mt-3 font-semibold">Rp {Number(room.price).toLocaleString('id-ID')} / bulan</p><p className="mt-2 line-clamp-2 text-sm opacity-60">{room.description}</p></div>
              </Link>
            ))}
          </div>}
      </div>
    </main>
  )
}
