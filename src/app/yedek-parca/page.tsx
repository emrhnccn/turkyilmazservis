import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { DEFAULT_PARTS, SparePartItemType } from '@/lib/constants'
import WhatsappWidget from '@/components/WhatsappWidget'
import { 
  ArrowLeft, 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  Tag, 
  CheckCircle2, 
  Wrench,
  Search
} from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Yedek Parça & Teknik Servis Ürünleri | Türkyılmaz Servis',
  description: 'Arçelik, Beko, Altus, Vestel uyumlu çamaşır kapağı, rezistans, kurutma motoru ve orijinal yedek parçalar. Fiyat ve stok bilgisi için WhatsApp hattımız.',
  alternates: {
    canonical: '/yedek-parca',
  },
}

async function getSpareParts() {
  try {
    const data = await client.fetch(`*[_type == "sparePart"] | order(order asc, _createdAt desc)`)
    return data || []
  } catch {
    return []
  }
}

export default async function SparePartsPage() {
  const sanityParts = await getSpareParts()
  const allParts = sanityParts.length > 0 ? [...sanityParts, ...DEFAULT_PARTS] : DEFAULT_PARTS

  const phone = '0552 116 41 28'
  const cleanPhone = phone.replace(/\s+/g, '').replace('+', '')
  const waPhone = cleanPhone.startsWith('0') ? `90${cleanPhone.slice(1)}` : cleanPhone

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
    <main className="relative min-h-screen bg-zinc-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-10 selection:bg-red-600 selection:text-white pb-28 sm:pb-12 overflow-hidden tech-grid-bg">
      
      {/* Kırmızı Parıltılar */}
      <div className="pointer-events-none absolute -left-48 top-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute -right-48 top-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Üst Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-red-500 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>{phone}</span>
          </a>
        </div>

        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-500 tracking-wider uppercase bg-red-950/60 px-4 py-1.5 rounded-full border border-red-600/30">
            Yedek Parça & Ekipman Kataloğu
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Teknik Servis Parçaları & Ekipmanlar
          </h1>
          <p className="text-zinc-300 mt-3 text-sm sm:text-base leading-relaxed">
            Aradığınız parçanın görselini ve detayını inceleyin; cihaz modelinizle uyumluluğunu doğrulamak ve güncel fiyat/stok öğrenmek için tek tıkla ustamıza danışın.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-2xl text-xs text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>Tüm parçalar atölyemizde test edilmiş olup montaj desteği verilmektedir.</span>
          </div>
        </div>

        {/* Ürün Kartları Izgarası */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allParts.map((item: any, idx: number) => {
            const waText = encodeURIComponent(`Merhaba, web sitenizdeki "${item.title}" parçası hakkında fiyat ve stok bilgisi almak istiyorum.`)
            const waLink = `https://wa.me/${waPhone}?text=${waText}`

            return (
              <div
                key={item._id || idx}
                className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Ürün Görseli */}
                  <div className="relative h-56 w-full bg-black overflow-hidden">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md text-red-500 text-[10px] font-extrabold px-3 py-1 rounded-full border border-red-600/30">
                      {item.condition === 'refurbished' ? 'Revizyonlu / Çıkma' : 'Sıfır Parça'}
                    </div>
                  </div>

                  {/* Ürün Bilgileri */}
                  <div className="p-5 space-y-3">
                    {item.compatibleBrands && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400">
                        <Tag className="w-3 h-3 text-red-500 shrink-0" />
                        <span>Uyum: {item.compatibleBrands}</span>
                      </div>
                    )}

                    <h2 className="text-base font-bold text-white leading-snug line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Alt Kısım: WhatsApp Fiyat Sor Butonu */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-zinc-800">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-red-600/20 active:scale-95 transition cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Fiyat & Stok Sor</span>
                    </a>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* CCN Teknoloji İmzası */}
        <div className="mt-16 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} Türkyılmaz Beyaz Eşya Servisi</p>
          <a
            href="https://affan-portfolio-gilt.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600/50 px-3.5 py-1.5 rounded-full transition-colors shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:animate-ping" />
            <span className="text-zinc-300 group-hover:text-zinc-100 transition">Tasarım & Yazılım:</span>
            <span className="font-bold text-red-500 group-hover:text-red-400 transition">CCN Teknoloji</span>
          </a>
        </div>

      </div>

      <WhatsappWidget phone={phone} />
    </main>
  )
}