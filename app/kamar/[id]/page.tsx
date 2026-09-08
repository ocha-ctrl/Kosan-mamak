import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Room } from '@/types/database'

export default async function RoomDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createClient()
  const { data } = await supabase.from('rooms').select('*').eq('id', Number(id)).single()
  if (!data) notFound()

  const room = data as Room
  const facilities = room.facilities?.split(',').map((x) => x.trim()).filter(Boolean) ?? []
  const whatsappUrl = `https://wa.me/62895703240609?text=${encodeURIComponent(`Halo Bu Nori, saya tertarik dengan Kamar ${room.room_number}. Apakah masih tersedia?`)}`
  const isAvailable = room.availability === 'Tersedia'

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#2f332d]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight">Kos Bu Nori</Link>
        <Link href="/login" className="rounded-full border border-[#d8d5ca] bg-white/70 px-4 py-2 text-sm font-medium transition hover:bg-white">Owner</Link>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:px-10 md:pt-12">
        <Link href="/kamar" className="inline-flex items-center gap-2 text-sm font-medium text-[#777970] transition hover:text-[#3f433b]">← Kembali ke daftar kamar</Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12 lg:items-start">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#e1ded4] bg-[#ebe8de] shadow-sm aspect-[4/3] lg:sticky lg:top-6">
            {room.image_url ? (
              <img src={room.image_url} alt={`Kamar ${room.room_number}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-[#8a8c82]">
                <span className="text-6xl">⌂</span>
                <span className="mt-3 text-sm">Foto kamar belum tersedia</span>
                <span className="mt-1 text-xs">Foto dapat ditambahkan oleh owner</span>
              </div>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-[#e1ded4] bg-[#fbfaf6] p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#85877e]">Bailang · Manado</p>
              <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${isAvailable ? 'bg-[#edf2e8] text-[#526047]' : 'bg-[#ecebe6] text-[#73756e]'}`}>{room.availability}</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">Kamar {room.room_number}</h1>
            <p className="mt-5 text-2xl font-semibold">Rp {Number(room.price).toLocaleString('id-ID')} <span className="text-sm font-normal text-[#85877e]">/ bulan</span></p>

            <div className="mt-8 border-t border-[#e5e2d8] pt-7">
              <h2 className="text-sm font-semibold">Tentang kamar</h2>
              <p className="mt-3 text-sm leading-7 text-[#6f7269]">{room.description || 'Kamar kos yang nyaman untuk kebutuhan tinggal sehari-hari.'}</p>
            </div>

            {facilities.length > 0 && (
              <div className="mt-7 border-t border-[#e5e2d8] pt-7">
                <h2 className="text-sm font-semibold">Fasilitas</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {facilities.map((facility) => <span key={facility} className="rounded-full border border-[#dedbd0] bg-white px-3 py-2 text-sm text-[#62655d]">{facility}</span>)}
                </div>
              </div>
            )}

            <div className="mt-8 rounded-2xl bg-[#f0eee6] p-4 text-sm leading-6 text-[#686b62]">
              Tertarik dengan kamar ini? Hubungi Bu Nori untuk menanyakan ketersediaan dan informasi lebih lanjut.
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-full bg-[#3f4937] px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#323a2d]">Tanya kamar ini via WhatsApp</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e5e2d8]">
        <div className="mx-auto flex max-w-6xl justify-between gap-4 px-6 py-7 text-xs text-[#85877e] md:px-10">
          <span>Kos Bu Nori · Bailang, Manado</span>
          <Link href="/" className="hover:text-[#555950]">Kembali ke home</Link>
        </div>
      </footer>
    </main>
  )
}
