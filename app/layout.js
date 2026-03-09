
import { Inter } from 'next/font/google'
import './globals.css'
import { Josefin_Sans } from 'next/font/google'

const josefin = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: 'Logistics App',
  description: 'Comprehensive logistics management system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className}`}>{children}</body>
    </html>
  )
}