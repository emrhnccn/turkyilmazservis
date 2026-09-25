import Link from 'next/link'
import { PhoneCall, ArrowLeft, Wrench } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-slate-100 flex items-center justify-center px-4 py-16 selection:bg-red-600 selection:text-white">
      <div className="max-w-md w-full text-center bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-500 flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-600/30">
          404 - Sayfa Bulunamadı
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-4">
          Aradığınız Sayfa Taşınmış veya Silinmiş Olabilir
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed">
          Cihazınızda acil bir arıza veya bakım ihtiyacı varsa beklemeden ustamızı doğrudan arayabilirsiniz.
        </p>

        <div className="mt-8 space-y-3">
          <a
            href="tel:05521164128"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-sm py-3.5 rounded-xl shadow-lg shadow-red-600/25 hover:scale-[1.02] active:scale-95 transition"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>Hemen Servis Çağır: 0552 116 41 28</span>
          </a>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs py-3 rounded-xl transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </main>
  )
}