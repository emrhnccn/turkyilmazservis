import React from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import WhatsappWidget from '@/components/WhatsappWidget'
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  CalendarCheck, 
  Navigation,
  Headphones,
  Award
} from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'İletişim & Darıca Atölye Konumu | Türkyılmaz Servis',
  description: 'Darıca Fevziçakmak Mahallesi atölye adresimiz, Google Haritalar yol tarifi ve 7/24 kesintisiz teknik servis hattımız: 0552 116 41 28.',
  alternates: {
    canonical: '/iletisim',
  },
}

async function getSettings() {
  try {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
    return settings || {
      phone: '0552 116 41 28',
      siteName: 'Türkyılmaz Beyaz Eşya Servisi',
      address: 'Fevziçakmak Mah. Doktor Zeki Acar Cad., Şebnem Sk. No:11, Darıca/Kocaeli',
      serviceAreas: ['Gebze', 'Darıca', 'Çayırova', 'Dilovası', 'Körfez', 'İzmit', 'Gölcük', 'Derince', 'Kartepe']
    }
  } catch {
    return {
      phone: '0552 116 41 28',
      siteName: 'Türkyılmaz Beyaz Eşya Servisi',
      address: 'Fevziçakmak Mah. Doktor Zeki Acar Cad., Şebnem Sk. No:11, Darıca/Kocaeli',
      serviceAreas: ['Gebze', 'Darıca', 'Çayırova', 'Dilovası', 'Körfez', 'İzmit', 'Gölcük', 'Derince', 'Kartepe']
    }
  }
}

export default async function ContactPage() {
  const settings = await getSettings()
  const phone = settings?.phone || '0552 116 41 28'
  const cleanPhone = phone.replace(/\s+/g, '').replace('+', '')
  const shopAddress = settings?.address || 'Fevziçakmak Mah. Doktor Zeki Acar Cad., Şebnem Sk. No:11, Darıca/Kocaeli'
  const serviceAreas = settings?.serviceAreas || ['Gebze', 'Darıca', 'Çayırova', 'Dilovası', 'Körfez', 'İzmit', 'Gölcük']

  const encodedAddress = encodeURIComponent(shopAddress)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

  return (
    <main className="relative min-h-screen bg-zinc-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-10 selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* Kenar Parıltıları */}
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
            Hemen Ulaşın
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            İletişim & Dükkan Konumumuz
          </h1>
          <p className="text-zinc-300 mt-3 text-sm sm:text-base">
            Darıca atölyemize uğrayabilir veya tüm Kocaeli genelinde kapınıza mobil teknik servis çağırabilirsiniz.
          </p>
        </div>

        {/* Ana Izgara */}
        <div className="grid xl:grid-cols-12 gap-8 items-start">
          
          {/* Sol Kolon */}
          <div className="xl:col-span-5 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-red-500" />
                Hızlı WhatsApp Randevu Formu
              </h2>
              <WhatsappWidget phone={phone} isStatic={true} />
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-red-600/10 rounded-full blur-2xl group-hover:bg-red-600/20 transition-all" />
              <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-red-500" />
                Acil Servis Çağrısı
              </h3>
              <p className="text-zinc-400 text-xs mb-4">Beklemeden ustamızla doğrudan görüşün:</p>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-black text-base w-full py-3.5 rounded-2xl shadow-lg shadow-red-600/25 transition hover:scale-[1.01]"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{phone}</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-xs text-zinc-200 font-semibold">Resmi 6 Ay Garanti</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl flex items-center gap-3">
                <Award className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="text-xs text-zinc-200 font-semibold">%100 Orijinal Parça</span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className="xl:col-span-7 space-y-6">
            <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 shadow-2xl relative">
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-black border border-zinc-800">
                <iframe
                  title="Türkyılmaz Teknik Servis Darıca Dükkan Konumu"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atölye / Dükkan Adresi</h4>
                    <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                      {shopAddress}
                    </p>
                  </div>
                </div>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-red-600 hover:text-white text-zinc-200 border border-zinc-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Yol Tarifi Al</span>
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Hizmet Saatleri</h4>
                <p className="text-xs text-zinc-300 mt-1">Pazartesi - Cumartesi: 08:30 - 20:30</p>
                <p className="text-xs text-zinc-400">Pazar: Acil Nöbetçi Servis</p>
              </div>

              <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-rose-600/10 text-rose-500 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Parça Garantisi</h4>
                <p className="text-xs text-zinc-300 mt-1">Tüm orijinal parça değişimlerinde 6 ay resmi garanti belgesi verilir.</p>
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
              <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-red-500" />
                Gezici Araçla Hizmet Verdiğimiz İlçeler
              </h4>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-xl"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    {area}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  )
}