'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Wrench, CheckCircle2, ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/client'
import { DEFAULT_CASES, CaseItemType } from '../lib/constants'

export default function RepairGallery({ items = [] }: { items?: any[] }) {
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
        <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/50 px-3.5 py-1.5 rounded-full border border-orange-500/30">
          Sahadan Gerçek Örnekler
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
          Örnek Onarım Hikayelerimiz
        </h2>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
          Müşterilerimize gereksiz masraf çıkarmadan, doğru teşhis ve orijinal parçalarla yerinde kalıcı çözümler üretiyoruz.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {displayItems.map((item: CaseItemType) => (
          <div
            key={item._id}
            className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-lg hover:border-orange-500/50 transition-all duration-300 flex flex-col group"
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
                {item.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="inline-block bg-orange-950/60 text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-orange-500/20">
                  {item.badge}
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-200">Şikayet/Teşhis:</strong> {item.description}
                </p>
                <div className="bg-zinc-950/70 p-3.5 rounded-2xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-orange-400">Uygulanan Çözüm:</strong> {item.solution}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1 font-medium text-zinc-300">
                  <Wrench className="w-3.5 h-3.5 text-orange-400" /> Yerinde Onarım
                </span>
                <span className="text-orange-400 font-bold">6 Ay Garantili</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/islerimiz"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-105 text-sm"
        >
          <span>Tüm Sahadan İşleri İncele</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}