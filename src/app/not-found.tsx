import Link from 'next/link'
import { PhoneCall, ArrowLeft, Wrench } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-slate-100 flex items-center justify-center px-4 py-16 selection:bg-orange-500 selection:text-white">
      <div className="max-w-md w-full text-center bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-500/30">
          404 - Sayfa Bulunamadı
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-4">
          Aradığınız Sayfa Taşınmış veya Silinmiş Olabilir
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
          Cihazınızda acil bir arıza veya bakım ihtiyacı varsa beklemeden ustamızı doğrudan arayabilirsiniz.
        </p>

        <div className="mt-8 space-y-3">
          <a
            href="tel:05521164128"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-black text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition"
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