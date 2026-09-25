import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { DEFAULT_CASES } from '../../lib/constants'
import { Wrench, CheckCircle2, ArrowLeft, PhoneCall } from 'lucide-react'

export const revalidate = 10

async function getCaseStudies() {
  try {
    return await client.fetch(`*[_type == "caseStudy"] | order(order asc, _createdAt desc)`)
  } catch {
    return []
  }
}

export default async function WorksPage() {
  const sanityCases = await getCaseStudies()
  const allCases = [...sanityCases, ...DEFAULT_CASES]

  const getImageUrl = (img: any) => {
    if (!img) return '/galeri/b1.jpeg'
    if (typeof img === 'string') return img
    try {
      return urlFor(img).url()
    } catch {
      return '/galeri/b1.jpeg'
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Üst Navigasyon */}
        <div className="flex items-center justify-between mb-10 pb-5 border-b border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <a
            href="tel:05521164128"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>Servis Çağır: 0552 116 41 28</span>
          </a>
        </div>

        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/50 px-3.5 py-1.5 rounded-full border border-orange-500/30">
            Tüm Sahadan İşlerimiz
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Gerçekleştirdiğimiz Onarımlar & Başarı Hikayeleri
          </h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base">
            Müşterilerimizin karşılaştığı teknik arızalar, yerinde yaptığımız dürüst teşhisler ve 6 ay garantili parça montaj süreçlerimiz.
          </p>
        </div>

        {/* Kartlar Izgarası */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCases.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl hover:border-orange-500/50 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-60 w-full bg-black overflow-hidden">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-orange-400 text-[11px] font-bold px-3 py-1 rounded-full border border-orange-500/30">
                  {item.category || 'Beyaz Eşya Servisi'}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-block bg-orange-950/60 text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-orange-500/20">
                    {item.badge || 'Garantili Onarım'}
                  </div>
                  <h2 className="text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      <strong className="text-zinc-200">Müşteri Şikayeti / Teşhis:</strong> {item.description}
                    </p>
                  )}
                  {item.solution && (
                    <div className="bg-zinc-950/70 p-3.5 rounded-2xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-orange-400">Uygulanan Çözüm:</strong> {item.solution}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1 font-medium text-zinc-300">
                    <Wrench className="w-3.5 h-3.5 text-orange-400" /> Yerinde Onarım
                  </span>
                  <span className="text-orange-400 font-bold">6 Ay Garanti</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}