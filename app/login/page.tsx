'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter(); const supabase = createClient(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
  async function submit(e: FormEvent){e.preventDefault();setLoading(true);setError('');const {error}=await supabase.auth.signInWithPassword({email,password});if(error){setError('Email atau password salah.');setLoading(false);return}router.push('/admin');router.refresh()}
  return <main className="min-h-screen flex items-center justify-center px-6"><div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm"><a href="/" className="text-sm opacity-60">← Kembali</a><h1 className="mt-8 text-3xl font-bold">Login Owner</h1><p className="mt-2 opacity-60">Masuk untuk mengelola data kamar Kos Bu Nori.</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-semibold">Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" placeholder="Email owner"/></label><label className="block text-sm font-semibold">Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" placeholder="Password"/></label>{error&&<p className="text-sm text-red-600">{error}</p>}<button disabled={loading} className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white disabled:opacity-50">{loading?'Memproses...':'Masuk'}</button></form></div></main>
}
