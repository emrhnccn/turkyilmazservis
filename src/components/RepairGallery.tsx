'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Wrench, CheckCircle2, ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/client'
import { DEFAULT_CASES } from '@/lib/constants'

export default function RepairGallery({ items = [] }: { items?: any[] }) {
  // Eğer panelde kayıt varsa en başa sabit 3'lü yerine onları veya ikisinin harmanını koyar
  const displayItems = DEFAULT_CASES

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
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Sahadan Gerçek Örnekler
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Örnek Onarım Hikayelerimiz
        </h2>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          Müşterilerimize gereksiz masraf çıkarmadan, doğru teşhis ve orijinal yedek parçalarla yerinde kalıcı çözümler üretiyoruz.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {displayItems.map((item: any) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
              <Image
                src={getImageUrl(item.image)}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                {item.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {item.badge}
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-700">Şikayet/Teşhis:</strong> {item.description}
                </p>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-emerald-800">Uygulanan Çözüm:</strong> {item.solution}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-medium text-slate-600">
                  <Wrench className="w-3.5 h-3.5 text-blue-600" /> Yerinde Onarım
                </span>
                <span className="text-emerald-600 font-bold">6 Ay Garantili</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ayrı Sayfaya Yönlendiren Buton */}
      <div className="mt-12 text-center">
        <Link
          href="/islerimiz"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg text-sm"
        >
          <span>Panelden Eklenen Tüm Sahadan İşleri İncele</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}