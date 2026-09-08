'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError('Email reset belum dapat dikirim. Silakan coba lagi.')
    } else {
      setMessage('Email reset password sudah dikirim. Cek inbox atau folder Spam/Junk.')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-6 py-8 text-[#2f332d]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-[#e1ded4] bg-[#fbfaf6] p-7 shadow-sm md:p-9">
          <Link href="/login" className="text-sm font-medium text-[#777970] transition hover:text-[#3f433b]">← Kembali ke login</Link>
          <div className="mt-9">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#85877e]">Owner Area</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Reset password</h1>
            <p className="mt-2 text-sm leading-6 text-[#777970]">Masukkan email owner. Kami akan mengirimkan link untuk membuat password baru.</p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-sm font-semibold">
              Email owner
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d9d6cc] bg-white px-4 py-3 outline-none transition focus:border-[#858b78] focus:ring-2 focus:ring-[#dfe3d8]" placeholder="Email owner" autoComplete="email" />
            </label>
            {error && <p role="alert" className="rounded-xl bg-[#f6e9e6] px-4 py-3 text-sm text-[#9a5146]">{error}</p>}
            {message && <p role="status" className="rounded-xl bg-[#edf2e8] px-4 py-3 text-sm leading-6 text-[#526047]">{message}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-full bg-[#3f473b] px-5 py-3.5 font-semibold text-white transition hover:bg-[#30372d] disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Mengirim...' : 'Kirim link reset'}</button>
          </form>
        </div>
      </div>
    </main>
  )
}
