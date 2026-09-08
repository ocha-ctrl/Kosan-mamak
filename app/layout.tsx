import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kos Kosan Bailang Bu Nori',
  description: 'Informasi kamar kos Bailang Bu Nori',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>
}
