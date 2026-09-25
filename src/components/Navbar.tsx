'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PhoneCall, Menu, X, CalendarClock, Wrench, MapPin, PackageCheck } from 'lucide-react'

interface NavbarProps {
  phone: string
  cleanPhone: string
}

export default function Navbar({ phone, cleanPhone }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/islerimiz', label: 'Yapılan İşler' },
    { href: '/yedek-parca', label: 'Yedek Parça & Ürünler' },
    { href: '/periyodik-bakim', label: 'Periyodik Bakım' },
    { href: '/iletisim', label: 'İletişim & Konum' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Logo & Marka */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-black border border-zinc-700/80 group-hover:border-zinc-400 transition-colors flex items-center justify-center shadow-lg shadow-black/40">
            <Image 
              src="/logo.png" 
              alt="Türkyılmaz Beyaz Eşya Servisi Logo" 
              fill 
              className="object-contain p-1" 
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-zinc-400 tracking-wider text-xl">
                TÜRK
              </span>
              <span className="font-black text-red-600 tracking-wider text-xl">
                YILMAZ
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase block mt-1">
              Beyaz Eşya Servisi
            </span>
          </div>
        </Link>

        {/* Masaüstü Menü Bağlantıları */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 px-3.5 py-2 rounded-xl transition duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Masaüstü Sağ Çağrı Butonu & Mobil Menü Butonu */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${cleanPhone}`}
            className="hidden sm:inline-flex relative overflow-hidden items-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 animate-shimmer" />
            <PhoneCall className="w-4 h-4 animate-pulse shrink-0" />
            <span>{phone}</span>
          </a>

          {/* Mobilde Açılır Menü Butonu (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menüyü Aç/Kapat"
            className="lg:hidden w-11 h-11 bg-zinc-900 border border-zinc-700/80 text-zinc-200 rounded-xl flex items-center justify-center hover:bg-zinc-800 hover:text-white transition cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5 text-red-500" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobil Açılır Menü Çekmecesi */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-sm font-bold text-zinc-200 hover:bg-zinc-900 hover:text-white border border-transparent hover:border-zinc-800 transition"
              >
                <span>{link.label}</span>
                <span className="text-xs text-zinc-500">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-900 space-y-2">
            <a
              href={`tel:${cleanPhone}`}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-sm py-3.5 rounded-xl shadow-lg"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Hemen Servis Çağır: {phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}