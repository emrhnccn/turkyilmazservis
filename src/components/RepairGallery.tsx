'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Wrench, CheckCircle2, ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/client'
import { DEFAULT_CASES, CaseItemType } from '../lib/constants'

export default function RepairGallery({ items = [] }: { items?: any[] }) {
  const displayItems = DEFAULT_CASES.slice(0, 6)

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
    <section className="py-12 sm:py-18 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="text-xs font-bold text-red-500 tracking-wider uppercase bg-red-950/60 px-4 py-1.5 rounded-full border border-red-600/30">
          Sahadan Gerçek Örnekler
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
          Örnek Onarım Hikayelerimiz
        </h2>
        <p className="text-zinc-300 mt-2 text-xs sm:text-base">
          Müşterilerimize gereksiz masraf çıkarmadan, doğru teşhis ve orijinal parçalarla yerinde kalıcı çözümler üretiyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayItems.map((item: CaseItemType) => (
          <div
            key={item._id}
            className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl hover:border-red-600/50 transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-56 sm:h-60 w-full bg-black overflow-hidden">
              <Image
                src={getImageUrl(item.image)}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-red-500 text-[11px] font-bold px-3 py-1 rounded-full border border-red-600/30">
                {item.category}
              </div>
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="inline-block bg-red-950/60 text-red-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-red-600/20">
                  {item.badge}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-zinc-100">Şikayet/Teşhis:</strong> {item.description}
                </p>
                <div className="bg-zinc-950/70 p-3 sm:p-3.5 rounded-2xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-red-500">Uygulanan Çözüm:</strong> {item.solution}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1 font-medium text-zinc-200">
                  <Wrench className="w-3.5 h-3.5 text-red-500" /> Yerinde Onarım
                </span>
                <span className="text-red-500 font-bold">6 Ay Garanti</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 sm:mt-14 text-center">
        <Link
          href="/islerimiz"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-red-600/25 hover:scale-105 active:scale-95 text-sm"
        >
          <span>Tüm Sahadan İşleri İncele (10+ Onarım)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}