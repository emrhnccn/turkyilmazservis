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
  Wrench,
  Headphones,
  Award
} from 'lucide-react'

export const revalidate = 60

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
    <main className="relative min-h-screen bg-zinc-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-10 selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* --- ARKA PLAN KENAR IŞIKLARI & EFEKTLERİ (BOŞLUKLARI DOLDURAN ALANLAR) --- */}
      {/* Sol kenar turuncu gölge süzülmesi */}
      <div className="pointer-events-none absolute -left-48 top-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[120px] -z-10" />
      {/* Sağ kenar amber gölge süzülmesi */}
      <div className="pointer-events-none absolute -right-48 top-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-[130px] -z-10" />
      {/* Üst merkez parlama */}
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/10 rounded-full blur-[140px] -z-10" />

      {/* Arka plan teknik nokta/ızgara deseni */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ff8c00 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Üst Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800/80 backdrop-blur-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-orange-400 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>{phone}</span>
          </a>
        </div>

        {/* Sayfa Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30 shadow-xs">
            Hemen Ulaşın
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            İletişim & Dükkan Konumumuz
          </h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base">
            Darıca atölyemize uğrayabilir veya tüm Kocaeli genelinde kapınıza mobil teknik servis çağırabilirsiniz.
          </p>
        </div>

        {/* Ana Izgara ve Yan Destek Blokları */}
        <div className="grid xl:grid-cols-12 gap-8 items-start">
          
          {/* Sol Kolon: Sabit WhatsApp Formu & Hızlı Arama */}
          <div className="xl:col-span-5 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-orange-400" />
                Hızlı WhatsApp Randevu Formu
              </h2>
              <WhatsappWidget phone={phone} isStatic={true} />
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all" />
              <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-orange-400" />
                Acil Servis Çağrısı
              </h3>
              <p className="text-zinc-400 text-xs mb-4">Beklemeden ustamızla doğrudan görüşün:</p>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-black text-base w-full py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition hover:scale-[1.01]"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{phone}</span>
              </a>
            </div>

            {/* Sol Kenarı Zenginleştiren Güvenilirlik Şeridi */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-3.5 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0" />
                <span className="text-xs text-zinc-300 font-semibold">Resmi 6 Ay Garanti</span>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-3.5 rounded-2xl flex items-center gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs text-zinc-300 font-semibold">%100 Orijinal Parça</span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Harita & Açık Adres & Bilgiler */}
          <div className="xl:col-span-7 space-y-6">
            
            {/* Dükkan Konum Haritası */}
            <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 shadow-2xl relative">
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-black border border-zinc-800">
                <iframe
                  title="Türkyılmaz Teknik Servis Darıca Dükkan Konumu"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.1) brightness(0.95)' }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>

              {/* Dükkan Açık Adresi ve Yol Tarifi */}
              <div className="mt-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atölye / Dükkan Adresi</h4>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {shopAddress}
                    </p>
                  </div>
                </div>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-orange-500 hover:text-white text-zinc-200 border border-zinc-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Yol Tarifi Al</span>
                </a>
              </div>
            </div>

            {/* Çalışma Saatleri & Garanti Kartları */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Hizmet Saatleri</h4>
                <p className="text-xs text-zinc-400 mt-1">Pazartesi - Cumartesi: 08:30 - 20:30</p>
                <p className="text-xs text-zinc-400">Pazar: Acil Nöbetçi Servis</p>
              </div>

              <div className="bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Parça Garantisi</h4>
                <p className="text-xs text-zinc-400 mt-1">Tüm orijinal parça değişimlerinde 6 ay resmi garanti belgesi verilir.</p>
              </div>
            </div>

            {/* Servis İlçeleri */}
            <div className="bg-zinc-900/90 p-6 rounded-2xl border border-zinc-800 shadow-sm">
              <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-orange-400" />
                Gezici Araçla Hizmet Verdiğimiz İlçeler
              </h4>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-xl"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
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