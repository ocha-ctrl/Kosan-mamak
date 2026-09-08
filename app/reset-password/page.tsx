'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)))

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' && session) setReady(true)
    })

    return () => listener.subscription.unsubscribe()
  }, [supabase])

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 8) {
      setError('Password baru minimal 8 karakter.')
      return
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak sama.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError('Password belum berhasil diubah. Silakan buka kembali link reset dari email.')
      setLoading(false)
      return
    }

    setMessage('Password berhasil diubah. Mengarahkan ke dashboard...')
    setTimeout(() => router.push('/admin'), 1000)
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-6 py-8 text-[#2f332d]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-[#e1ded4] bg-[#fbfaf6] p-7 shadow-sm md:p-9">
          <Link href="/login" className="text-sm font-medium text-[#777970] transition hover:text-[#3f433b]">← Kembali ke login</Link>
          <div className="mt-9">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#85877e]">Owner Area</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Buat password baru</h1>
            <p className="mt-2 text-sm leading-6 text-[#777970]">Gunakan password baru minimal 8 karakter.</p>
          </div>

          {!ready ? (
            <div className="mt-8 rounded-2xl bg-[#f0eee6] p-4 text-sm leading-6 text-[#686b62]">Link reset belum aktif. Silakan buka link reset password terbaru yang dikirim ke email owner.</div>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold">
                Password baru
                <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d9d6cc] bg-white px-4 py-3 outline-none transition focus:border-[#858b78] focus:ring-2 focus:ring-[#dfe3d8]" placeholder="Minimal 8 karakter" autoComplete="new-password" />
              </label>
              <label className="block text-sm font-semibold">
                Ulangi password
                <input type="password" required minLength={8} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d9d6cc] bg-white px-4 py-3 outline-none transition focus:border-[#858b78] focus:ring-2 focus:ring-[#dfe3d8]" placeholder="Ulangi password baru" autoComplete="new-password" />
              </label>
              {error && <p role="alert" className="rounded-xl bg-[#f6e9e6] px-4 py-3 text-sm text-[#9a5146]">{error}</p>}
              {message && <p role="status" className="rounded-xl bg-[#edf2e8] px-4 py-3 text-sm text-[#526047]">{message}</p>}
              <button type="submit" disabled={loading} className="w-full rounded-full bg-[#3f473b] px-5 py-3.5 font-semibold text-white transition hover:bg-[#30372d] disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Menyimpan...' : 'Simpan password baru'}</button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
