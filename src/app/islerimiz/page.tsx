import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { DEFAULT_CASES } from '../../lib/constants'
import { Wrench, CheckCircle2, ArrowLeft, PhoneCall } from 'lucide-react'

export const revalidate = 10
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yapılan Tamir ve Bakım İşleri | Gerçek Sahadan Örnekler',
  description: 'Darıca ve Gebze genelinde gerçekleştirdiğimiz garantili çamaşır makinesi kazan değişimi, bulaşık rezistans ve kurutma makinesi tamir hikayeleri.',
  alternates: {
    canonical: '/islerimiz',
  },
}

async function getCaseStudies() {
  try {
    const data = await client.fetch(`*[_type == "caseStudy"] | order(order asc, _createdAt desc)`)
    // Panelden kazara eklenen "denem" veya test kayıtlarını filtrele
    return data.filter((item: any) => {
      const t = (item.title || '').toLowerCase()
      return !t.includes('denem') && !t.includes('test')
    })
  } catch {
    return []
  }
}

export default async function WorksPage() {
  const sanityCases = await getCaseStudies()
  
  // Sanity'den gelen gerçek işler ile hazır 10 profesyonel işi birleştir
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
    <main className="relative min-h-screen bg-zinc-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-10 selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Kenar Işıkları & Ambiyans Efektleri (Boşlukları dolduran modern gölgeler) */}
      <div className="pointer-events-none absolute -left-48 top-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[130px] -z-10" />
      <div className="pointer-events-none absolute -right-48 top-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-[130px] -z-10" />
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/10 rounded-full blur-[140px] -z-10" />

      {/* Arka plan nokta deseni */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ff8c00 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        
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
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
            Tüm Sahadan İşlerimiz ({allCases.length} Başarı Hikayesi)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Gerçekleştirdiğimiz Onarımlar & Başarı Hikayeleri
          </h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base">
            Müşterilerimizin karşılaştığı teknik arızalar, yerinde yaptığımız dürüst teşhisler ve 6 ay garantili parça montaj süreçlerimiz.
          </p>
        </div>

        {/* Kartlar Izgarası (En az 10 iş listelenir) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCases.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl hover:border-orange-500/50 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 w-full bg-black overflow-hidden">
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
                      <strong className="text-zinc-200">Şikayet / Teşhis:</strong> {item.description}
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

        {/* CCN Teknoloji İmzası */}
        <div className="mt-16 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} Türkyılmaz Beyaz Eşya Servisi</p>
          <a
            href="https://affan-portfolio-gilt.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-orange-500/50 px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:animate-ping" />
            <span className="text-zinc-400 group-hover:text-zinc-200 transition">Tasarım & Yazılım:</span>
            <span className="font-bold text-orange-400 group-hover:text-orange-300 transition">CCN Teknoloji</span>
          </a>
        </div>

      </div>
    </main>
  )
}