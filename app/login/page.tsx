'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email atau password salah. Silakan coba lagi.')
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-6 py-8 text-[#2f332d]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-[#e1ded4] bg-[#fbfaf6] p-7 shadow-sm md:p-9">
          <Link href="/" className="text-sm font-medium text-[#777970] transition hover:text-[#3f433b]">← Kembali ke website</Link>
          <div className="mt-9">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#85877e]">Owner Area</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Login Owner</h1>
            <p className="mt-2 text-sm leading-6 text-[#777970]">Masuk untuk mengelola kamar, harga, status, fasilitas, dan foto Kos Bu Nori.</p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-sm font-semibold">
              Email
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d9d6cc] bg-white px-4 py-3 outline-none transition focus:border-[#858b78] focus:ring-2 focus:ring-[#dfe3d8]" placeholder="Email owner" autoComplete="email" />
            </label>
            <label className="block text-sm font-semibold">
              Password
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d9d6cc] bg-white px-4 py-3 outline-none transition focus:border-[#858b78] focus:ring-2 focus:ring-[#dfe3d8]" placeholder="Password" autoComplete="current-password" />
            </label>
            <div className="-mt-2 text-right">
              <Link href="/forgot-password" className="text-sm font-medium text-[#65705b] transition hover:text-[#3f473b]">Lupa password?</Link>
            </div>
            {error && <p role="alert" className="rounded-xl bg-[#f6e9e6] px-4 py-3 text-sm text-[#9a5146]">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-full bg-[#3f473b] px-5 py-3.5 font-semibold text-white transition hover:bg-[#30372d] disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Memproses...' : 'Masuk ke Dashboard'}</button>
          </form>
        </div>
      </div>
    </main>
  )
}
