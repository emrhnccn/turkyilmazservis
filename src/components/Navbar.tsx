import React from 'react'
import Link from 'next/link'
import { Phone, ShieldCheck, Clock } from 'lucide-react'

interface NavbarProps {
  title?: string
  phone?: string
  workingHours?: string
}

export default function Navbar({
  title = "Türkyılmaz Teknik Servis",
  phone = "0555 000 00 00",
  workingHours = "7/24 Acil Servis"
}: NavbarProps) {
  const cleanPhone = phone.replace(/\s+/g, '')

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* Üst İnce Bilgi Barı */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 6 Ay İşçilik & Parça Garantisi
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {workingHours}
            </span>
          </div>
          <span className="text-slate-400">Gezici Teknik Servis Ekipleri</span>
        </div>
      </div>

      {/* Ana Menü */}
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block animate-pulse"></span>
            {title}
          </span>
          <span className="text-xs text-blue-600 font-medium tracking-wide">BEYAZ EŞYA ÖZEL TEKNİK SERVİSİ</span>
        </Link>

        {/* Masaüstü Telefon Butonu */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-right">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Hızlı Servis Hattı</div>
            <a href={`tel:${cleanPhone}`} className="text-lg font-black text-blue-600 hover:text-blue-700 transition">
              {phone}
            </a>
          </div>
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition hover:shadow-md"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Servis Çağır</span>
          </a>
        </div>
      </div>
    </header>
  )
}