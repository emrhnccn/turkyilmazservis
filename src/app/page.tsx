import { client, urlFor } from '@/sanity/lib/client'
import Navbar from '@/components/Navbar'
import FloatingCTA from '@/components/FloatingCTA'
import ServiceForm from '@/components/ServiceForm'
import BrandsAndFAQ from '@/components/BrandsAndFAQ'
import { Phone, CheckCircle2, Wrench, ShieldCheck, Zap, MapPin, Star, Clock, Sparkles, Wind, Flame, RefreshCw } from 'lucide-react'
import Image from 'next/image'
export const revalidate = 60 // Her 60 saniyede bir veya istek geldikçe veriyi günceller

async function getData() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
  const services = await client.fetch(`*[_type == "service"] | order(order asc)`)
  return { settings, services }
}

export default async function Home() {
  const { settings, services } = await getData()

  const phone = settings?.phone || "0552 116 41 28"
  const whatsapp = settings?.whatsapp || "905521164128"
  const cleanPhone = phone.replace(/\s+/g, '')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 md:pb-0">
      <Navbar
        title={settings?.title || "Türkyılmaz Beyaz Eşya Servisi"}
        phone={phone}
        workingHours={settings?.workingHours || "08:30 - 21:30"}
      />

      {/* Hero Alanı */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-12 sm:py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Değerlendirmesi Rozeti */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>Google 5.0 (18 Yorum) Müşteri Memnuniyeti</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {settings?.heroTitle || "Darıca & Gebze Beyaz Eşya Özel Teknik Servisi"}
            </h1>

            {/* Yıllık Bakım Vurgusu & Açıklama */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Tüm marka beyaz eşyalarınızda arıza onarımı ve <strong className="text-emerald-400 font-semibold">Kombi, Klima ve Kurutma Makinesi Periyodik Yıllık Bakım Hizmeti</strong>. Orijinal parça kullanımı ve yapılan her işleme 6 ay servis garantisi.
            </p>

            {/* Hızlı Butonlar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition text-base"
              >
                <Phone className="w-5 h-5 fill-white" />
                <span>{phone} (Hemen Ara)</span>
              </a>
              <a
                href={`https://wa.me/${whatsapp}?text=Merhaba,%20teknik%20servis%20talebinde%20bulunmak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/30 transition text-base"
              >
                <span>WhatsApp İle Ulaş</span>
              </a>
            </div>

            {/* Müşterinin Belirttiği Güven Maddeleri */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">6 Ay İşlem Garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>%100 Orijinal Yedek Parça</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Aynı Gün Adreste Servis</span>
              </div>
            </div>
          </div>

          {/* İki Sekmeli Talep Formu (Arıza & Yıllık Bakım) */}
          <div className="lg:col-span-5">
            <ServiceForm whatsapp={whatsapp} districts={settings?.districts} />
          </div>

        </div>
      </section>

      {/* Bölge Şeridi */}
      <section className="bg-blue-600 text-white py-3.5 px-4 shadow-inner">
  <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
    <div className="flex items-center gap-2">
      <MapPin className="w-4 h-4 shrink-0" />
      <span>Gezici Servis Bölgelerimiz:</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {(settings?.districts && settings.districts.length > 0 
        ? settings.districts 
        : ['Darıca', 'Gebze', 'Çayırova', 'Dilovası']
      ).map((district: string, i: number) => (
        <span key={i} className="bg-blue-700/80 px-3 py-1 rounded-lg">
          {district}
        </span>
      ))}
    </div>
  </div>
</section>

      {/* ÖZEL BÖLÜM: Yıllık Periyodik Bakım Vitrini */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-emerald-500/20 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Enerji Tasarrufu & Uzun Ömür
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Kombi, Klima ve Kurutma Makinesi Periyodik Yıllık Bakım Hizmeti
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Düzenli bakım cihazınızın ömrünü uzatır, faturalarınızı düşürür ve beklenmedik arızaların önüne geçer. Randevunuzu hemen oluşturun.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Kombi Yıllık Bakımı</h3>
              <p className="text-xs text-slate-300 mt-1">Brülör temizliği, genleşme tankı basınç kontrolü, filtre temizliği ve gaz kaçak testi.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Klima Bakımı & Gaz</h3>
              <p className="text-xs text-slate-300 mt-1">İç & dış ünite antibakteriyel temizliği, drenaj hattı kontrolü ve R410/R32 gaz ölçümü.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Kurutma Makinesi Bakımı</h3>
              <p className="text-xs text-slate-300 mt-1">Kondenser ve derin hava kanalı lif temizliği, pompa kontrolü ve kurutma verimi artırma.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sanity'den Gelen Hizmetlerimiz (Çamaşır, Bulaşık, Buzdolabı vb.) */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Onarım ve Tamir Hizmetlerimiz</h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Yerinde arıza tespiti ve onayınız doğrultusunda <strong>6 ay garantili orijinal parça</strong> değişimi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services && services.length > 0 ? (
            services.map((item: any) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
              >
                {item.image && (
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {item.shortDescription}
                    </p>
                    {item.features && item.features.length > 0 && (
                      <ul className="space-y-1.5 mb-6">
                        {item.features.map((feat: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <a
                    href={`tel:${cleanPhone}`}
                    className="w-full text-center bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-semibold py-2.5 px-4 rounded-xl text-sm transition"
                  >
                    Servis Çağır
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
              <p className="text-slate-600 mb-2">Panelden henüz servis kalemi eklenmedi.</p>
              <p className="text-xs text-slate-400">
                <a href="/studio" className="text-blue-600 underline font-medium">/studio</a> adresine giderek hizmetlerinizi ekleyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Markalar & Sıkça Sorulan Sorular */}
      <BrandsAndFAQ />

      {/* Harita ve Adres */}
      <section className="bg-slate-100 py-16 px-4 border-t border-slate-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Atölye & Merkez
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Bize Ulaşın & Adresimiz</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Darıca atölyemizde kapsamlı arıza testleri ve orijinal yedek parça temini yapılmaktadır. Dilerseniz servis merkezimizi ziyaret edebilir ya da gezici ekibimizi çağırabilirsiniz.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>{settings?.address || "Fevzi Çakmak Mah. Dr. Zeki Acar Cad. Şebnem Sk. No:11, 41700 Darıca/Kocaeli"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                <span>{settings?.workingHours || "Açık · Kapanış saati: 21:30"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="font-bold text-blue-600 hover:underline">{phone}</a>
              </div>
            </div>
          </div>

          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-300 shadow-md">
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.3116991220086!2d29.40630584006989!3d40.777161117835185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadf1fb422fadf%3A0xbb18667a2959b9f0!2zVMO8cmt5xLFsbWF6IGJleWF6IGXFn3lhIHNlcnZpc2k!5e0!3m2!1str!2str!4v1790322950954!5m2!1str!2str"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen={false}
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
  title="Türkyılmaz Beyaz Eşya Servisi Konumu"
></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-white text-base">{settings?.title || "Türkyılmaz Beyaz Eşya Servisi"}</p>
            <p className="mt-1 text-slate-400">Darıca, Gebze, Çayırova ve Dilovası bölgelerinde faaliyet gösteren Özel Teknik Servistir.</p>
          </div>
          <p>© {new Date().getFullYear()} Türkyılmaz Servis. Tüm hakları saklıdır.</p>
        </div>
      </footer>

      {/* Mobilde Altta Sabit Kalan Hemen Ara & WhatsApp Barı */}
      <FloatingCTA phone={phone} whatsapp={whatsapp} />
    </div>
  )
}