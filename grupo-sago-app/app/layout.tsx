import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GRUPO SAGO - Valuación de Vehículos',
  description: 'Obtén una oferta instantánea por tu vehículo usado',
  manifest: '/manifest.json',
  themeColor: '#0066CC',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GRUPO SAGO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
