'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { Room } from '@/types/database'

export default function AdminPage() {
  const supabase = createClient()
  const router = useRouter()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/login'); return }

      const { data: profile } = await supabase
        .from('admin_profiles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle()

      if (profile?.role !== 'owner') {
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }

      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('room_number')

      if (error) setError(error.message)
      else setRooms((data ?? []) as Room[])
      setLoading(false)
    })()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.replace('/login')
    router.refresh()
  }

  const available = rooms.filter(r => r.availability === 'Tersedia').length
  const occupied = rooms.filter(r => r.availability === 'Terisi').length

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-6 py-8 text-[#2f332d] md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-[#dedbd1] pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-medium text-[#77796e] hover:text-[#2f332d]">← Lihat website</Link>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#7d806f]">Owner Area</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Dashboard Kos Bu Nori</h1>
            <p className="mt-2 text-sm text-[#777970]">Kelola informasi kamar dari satu tempat.</p>
          </div>
          <button onClick={logout} className="w-fit rounded-full border border-[#d4d1c7] bg-white/70 px-5 py-2.5 text-sm font-semibold transition hover:bg-white">Keluar</button>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-[#dfdcd2] bg-white p-6">
            <p className="text-sm text-[#777970]">Total kamar</p>
            <p className="mt-2 text-3xl font-semibold">{rooms.length}</p>
          </div>
          <div className="rounded-[1.75rem] border border-[#dfdcd2] bg-white p-6">
            <p className="text-sm text-[#777970]">Tersedia</p>
            <p className="mt-2 text-3xl font-semibold">{available}</p>
          </div>
          <div className="rounded-[1.75rem] border border-[#dfdcd2] bg-white p-6">
            <p className="text-sm text-[#777970]">Terisi</p>
            <p className="mt-2 text-3xl font-semibold">{occupied}</p>
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7d806f]">Properti</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Daftar kamar</h2>
          </div>
          <Link href="/admin/kamar" className="inline-flex w-fit rounded-full bg-[#3f473b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#30372d]">Kelola semua kamar →</Link>
        </section>

        {loading ? (
          <div className="mt-5 rounded-[1.75rem] border border-[#dfdcd2] bg-white p-8 text-sm text-[#777970]">Memuat data kamar...</div>
        ) : error ? (
          <div className="mt-5 rounded-[1.75rem] border border-red-200 bg-red-50 p-6 text-sm text-red-700">Gagal memuat data: {error}</div>
        ) : (
          <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-[#dfdcd2] bg-white">
            <div className="divide-y divide-[#ece9df]">
              {rooms.map(r => (
                <div key={r.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">Kamar {r.room_number}</p>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${r.availability === 'Tersedia' ? 'bg-[#edf2e9] text-[#50604b]' : 'bg-[#f3e9e6] text-[#895b51]'}`}>{r.availability}</span>
                    </div>
                    <p className="mt-1 text-sm text-[#777970]">Rp {Number(r.price).toLocaleString('id-ID')} / bulan</p>
                  </div>
                  <Link href={`/admin/kamar/${r.id}`} className="w-fit rounded-full border border-[#d4d1c7] px-4 py-2 text-sm font-semibold transition hover:bg-[#f7f5ef]">Edit kamar</Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
