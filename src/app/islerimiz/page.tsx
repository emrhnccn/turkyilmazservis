import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { DEFAULT_CASES } from '@/lib/constants'
import { Wrench, CheckCircle2, ArrowLeft, PhoneCall } from 'lucide-react'

export const revalidate = 10 // Panelden yeni iş eklenince 10 saniye içinde sayfaya yansısın

async function getCaseStudies() {
  try {
    return await client.fetch(`*[_type == "caseStudy"] | order(order asc, _createdAt desc)`)
  } catch {
    return []
  }
}

export default async function WorksPage() {
  const sanityCases = await getCaseStudies()
  // Paneldeki kayıtlar + varsayılan kayıtlar birleşsin, böylece sayfa asla boş kalmaz
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
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Üst Navigasyon */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <a
            href="tel:05330000000" // İletişim numarası
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition"
          >
            <PhoneCall className="w-4 h-4" /> Servis Çağır
          </a>
        </div>

        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Tüm Sahadan İşlerimiz
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
            Gerçekleştirdiğimiz Onarımlar & Başarı Hikayeleri
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Müşterilerimizin karşılaştığı teknik sorunlar, yerinde yaptığımız doğru teşhisler ve garantili orijinal parça değişim süreçlerimiz.
          </p>
        </div>

        {/* Kartlar Izgarası */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCases.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-60 w-full bg-slate-100">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {item.category || 'Beyaz Eşya Servisi'}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {item.badge || 'Garantili Onarım'}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <strong className="text-slate-700">Müşteri Şikayeti / Teşhis:</strong> {item.description}
                    </p>
                  )}
                  {item.solution && (
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-emerald-800">Uygulanan Çözüm:</strong> {item.solution}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <Wrench className="w-3.5 h-3.5 text-blue-600" /> Orijinal Parça
                  </span>
                  <span className="text-emerald-600 font-bold">6 Ay Garanti</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}