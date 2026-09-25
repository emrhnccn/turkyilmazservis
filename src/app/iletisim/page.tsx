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
  Navigation
} from 'lucide-react'

export const revalidate = 60

async function getSettings() {
  try {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
    return settings || {
      phone: '0552 116 41 28',
      siteName: 'Türkyılmaz Teknik Servis',
      address: 'Fevziçakmak Mah. Doktor Zeki Acar Cad., Şebnem Sk. No:11, Darıca/Kocaeli',
      serviceAreas: ['Gebze', 'Darıca', 'Çayırova', 'Dilovası', 'Körfez', 'İzmit', 'Gölcük', 'Derince', 'Kartepe']
    }
  } catch {
    return {
      phone: '0552 116 41 28',
      siteName: 'Türkyılmaz Teknik Servis',
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

  // Google Haritalar Yol Tarifi ve Doğrudan Konum Linki
  const encodedAddress = encodeURIComponent(shopAddress)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Üst Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>{phone}</span>
          </a>
        </div>

        {/* Sayfa Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Hemen Ulaşın
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
            İletişim & Dükkan Konumumuz
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Darıca atölyemize uğrayabilir veya tüm Kocaeli genelinde kapınıza mobil teknik servis çağırabilirsiniz.
          </p>
        </div>

        {/* Ana Izgara */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sol Kolon: Sabit WhatsApp Formu & Hızlı Arama */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                Hızlı WhatsApp Randevu Formu
              </h2>
              {/* Sayfada sabit açık duran şablon kartı */}
              <WhatsappWidget phone={phone} isStatic={true} />
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-lg">
              <h3 className="font-bold text-lg mb-1">Acil Servis Çağrısı</h3>
              <p className="text-blue-100 text-xs mb-4">Beklemeden ustamızla doğrudan görüşün:</p>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-black text-base w-full py-3.5 rounded-2xl shadow transition"
              >
                <PhoneCall className="w-5 h-5 text-blue-600" />
                <span>{phone}</span>
              </a>
            </div>
          </div>

          {/* Sağ Kolon: Tam Dükkan Konum Haritası & Açık Adres */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* DÜKKAN KONUM HARİTASI */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
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

              {/* Dükkan Açık Adresi ve Yol Tarifi Butonu */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Atölye / Dükkan Adresi</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {shopAddress}
                    </p>
                  </div>
                </div>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Yol Tarifi Al</span>
                </a>
              </div>
            </div>

            {/* Çalışma Saatleri & Garanti Kartları */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Hizmet Saatleri</h4>
                <p className="text-xs text-slate-500 mt-1">Pazartesi - Cumartesi: 08:30 - 20:30</p>
                <p className="text-xs text-slate-500">Pazar: Acil Nöbetçi Servis</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Parça Garantisi</h4>
                <p className="text-xs text-slate-500 mt-1">Tüm orijinal parça değişimlerinde 6 ay resmi garanti belgesi verilir.</p>
              </div>
            </div>

            {/* Mobil Hizmet Verilen İlçeler */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                Gezici Araçla Hizmet Verdiğimiz İlçeler
              </h4>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-xl"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
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