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
  const facilities = room.facilities?.split(',').map(x => x.trim()).filter(Boolean) ?? []
  const whatsappUrl = `https://wa.me/62895703240609?text=${encodeURIComponent(`Halo Bu Nori, saya tertarik dengan Kamar ${room.room_number}. Apakah masih tersedia?`)}`
  return <main className="min-h-screen px-6 py-10 md:px-12"><div className="mx-auto max-w-5xl"><Link href="/kamar" className="text-sm opacity-60">← Kembali ke daftar kamar</Link><div className="mt-8 grid gap-8 md:grid-cols-2"><div className="overflow-hidden rounded-3xl bg-black/5 aspect-[4/3]">{room.image_url ? <img src={room.image_url} alt={`Kamar ${room.room_number}`} className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-7xl">🏠</div>}</div><div><div className="flex items-center justify-between"><h1 className="text-4xl font-bold">Kamar {room.room_number}</h1><span className={`rounded-full px-3 py-1 text-sm font-semibold ${room.availability === 'Tersedia' ? 'bg-green-100 text-green-700' : 'bg-black/10'}`}>{room.availability}</span></div><p className="mt-5 text-2xl font-bold">Rp {Number(room.price).toLocaleString('id-ID')} <span className="text-sm font-normal opacity-60">/ bulan</span></p><p className="mt-6 leading-7 opacity-70">{room.description}</p>{facilities.length > 0 && <><h2 className="mt-8 font-bold">Fasilitas</h2><div className="mt-3 flex flex-wrap gap-2">{facilities.map(f => <span key={f} className="rounded-full bg-white border px-3 py-2 text-sm">{f}</span>)}</div></>}<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-black px-6 py-3 font-semibold text-white">Tanya kamar ini</a></div></div></div></main>
}
