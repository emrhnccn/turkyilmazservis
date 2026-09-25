import { client } from '@/sanity/lib/client'
import { DEFAULT_SERVICES, DEFAULT_CASES } from '../lib/constants'
import RepairGallery from '@/components/RepairGallery'
import Link from 'next/link'
import WhatsappWidget from '@/components/WhatsappWidget'
import { 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  ChevronRight,
  MessageCircle,
  HelpCircle
} from 'lucide-react'

export const revalidate = 60

async function getData() {
  try {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
    const sanityServices = await client.fetch(`*[_type == "service"] | order(order asc)`)
    const caseStudies = await client.fetch(`*[_type == "caseStudy"] | order(order asc)`)

    const activeServices = sanityServices && sanityServices.length > 0 ? sanityServices : DEFAULT_SERVICES

    return { 
      settings: settings || {
        phone: '0552 116 41 28',
        siteName: 'Türkyılmaz Teknik Servis',
        serviceAreas: ['Gebze', 'Darıca', 'Çayırova', 'Dilovası', 'Körfez', 'İzmit', 'Gölcük', 'Derince', 'Kartepe']
      }, 
      services: activeServices, 
      caseStudies 
    }
  } catch (error) {
    return { 
      settings: {
        phone: '0552 116 41 28',
        siteName: 'Türkyılmaz Teknik Servis',
        serviceAreas: ['Gebze', 'Darıca', 'Çayırova', 'Dilovası', 'Körfez', 'İzmit', 'Gölcük', 'Derince', 'Kartepe']
      }, 
      services: DEFAULT_SERVICES, 
      caseStudies: DEFAULT_CASES 
    }
  }
}

export default async function Home() {
  const { settings, services, caseStudies } = await getData()
  const phone = settings?.phone || '0552 116 41 28'
  const cleanPhone = phone.replace(/\s+/g, '').replace('+', '')
  
  const waPhone = cleanPhone.startsWith('0') 
    ? `90${cleanPhone.slice(1)}` 
    : cleanPhone.startsWith('90') 
    ? cleanPhone 
    : `90${cleanPhone}`

  const serviceAreas = settings?.serviceAreas && settings.serviceAreas.length > 0 
    ? settings.serviceAreas 
    : ['Gebze', 'Darıca', 'Çayırova', 'Dilovası', 'Körfez', 'İzmit', 'Gölcük', 'Derince', 'Kartepe']

  const faqs = [
    {
      q: 'Arıza tespiti ve servis süreci nasıl işliyor?',
      a: 'Bizi arayıp arıza kaydı oluşturduğunuzda, uygunluk durumuna göre aynı gün içinde adresinize geliyoruz. Cihazınızı yerinde inceleyip arıza tespitini yapıyor ve onayınızı aldıktan sonra orijinal parça değişimiyle işlemi tamamlıyoruz.'
    },
    {
      q: 'Yapılan tamir ve değişen parçalar garantili mi?',
      a: 'Evet! Servisimiz kapsamında değiştirilen tüm orijinal yedek parçalar ve yapılan işçilik 6 ay süreyle resmi servis garantimiz altındadır.'
    },
    {
      q: 'Hangi marka beyaz eşyalara bakıyorsunuz?',
      a: 'Bosch, Siemens, Profilo, Arçelik, Beko, Vestel, Samsung, LG, Altus ve Whirlpool başta olmak üzere tüm lider markaların buzdolabı, çamaşır, bulaşık ve kurutma makinelerine teknik servis sağlıyoruz.'
    },
    {
      q: 'Cihazı atölyeye mi götürüyorsunuz, evde mi yapıyorsunuz?',
      a: 'Arızaların %90’dan fazlası donanımlı servis aracımız ve yedek parça stoğumuz sayesinde doğrudan adresinizde, gözünüzün önünde çözülmektedir. Sadece kapsamlı kazan veya atölye testi gerektiren durumlarda teslim fişiyle atölyeye alınır.'
    }
  ]

  const brands = [
    'Bosch', 'Siemens', 'Profilo', 'Arçelik', 'Beko', 'Vestel', 'Samsung', 'LG', 'Altus', 'Regal'
  ]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-20 sm:pb-0">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              T
            </div>
            <div>
              <span className="font-black text-slate-900 tracking-tight text-lg block leading-none">
                TÜRKYILMAZ
              </span>
              <span className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">
                Teknik Servis
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/islerimiz" 
              className="hidden sm:inline-flex text-xs font-bold text-slate-600 hover:text-blue-600 transition px-3 py-2"
            >
              Yapılan İşler
            </Link>
            <Link 
              href="/iletisim" 
              className="hidden sm:inline-flex text-xs font-bold text-slate-600 hover:text-blue-600 transition px-3 py-2"
            >
              İletişim
            </Link>
            <a
              href={`https://wa.me/${waPhone}?text=Merhaba,%20teknik%20servis%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold px-3 py-2.5 rounded-xl transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO / MANŞET ALANI */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 border border-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Tüm Kocaeli Genelinde Aynı Gün Yerinde Servis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
            Beyaz Eşya & Ankastre <br className="hidden sm:block" />
            <span className="text-blue-600">Garantili Teknik Servisi</span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Buzdolabı, çamaşır, bulaşık ve kurutma makinelerinizde doğru arıza teşhisi, orijinal yedek parça ve <strong>6 ay parça garantisi</strong> ile yanınızdayız.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Hemen Servis Çağır: {phone}</span>
            </a>
            <a
              href={`https://wa.me/${waPhone}?text=Merhaba,%20teknik%20servis%20talebinde%20bulunmak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-6 py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp'tan Yaz</span>
            </a>
          </div>

          {/* Rozetler */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Aynı Gün Servis</p>
                <p className="text-[11px] text-slate-500">Hızlı randevu</p>
              </div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">6 Ay Garanti</p>
                <p className="text-[11px] text-slate-500">Değişen parçaya</p>
              </div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <Wrench className="w-6 h-6 text-indigo-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Orijinal Parça</p>
                <p className="text-[11px] text-slate-500">%100 uyumlu</p>
              </div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <MapPin className="w-6 h-6 text-rose-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Yerinde Tamir</p>
                <p className="text-[11px] text-slate-500">Evinizde onarım</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MARKA LOGOLARI ŞERİDİ */}
      <section className="py-6 border-y border-slate-200/70 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-4">
            Tamir & Bakım Hizmeti Verdiğimiz Başlıca Markalar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {brands.map((brand, i) => (
              <span 
                key={i} 
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-1.5 rounded-lg"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HİZMETLERİMİZ */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Hizmetlerimiz
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Tamir & Bakım Çözümlerimiz
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Yerinde arıza tespiti ve onayınız doğrultusunda 6 ay garantili parça değişimi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item: any) => (
            <div 
              key={item._id} 
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{item.description}</p>
                {item.features && (
                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                    {item.features.map((feat: string, fIdx: number) => (
                      <li key={fIdx} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <a
                href={`tel:${cleanPhone}`}
                className="mt-6 inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-xl transition"
              >
                <span>Hemen Danış</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SAHADAN GERÇEK ÖRNEKLER / GALERİ */}
      <RepairGallery items={caseStudies} />

      {/* 6. SERVİS BÖLGELERİ & TÜM KOCAELİ HARİTASI */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                Hizmet Bölgelerimiz
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
                Tüm Kocaeli Genelinde Kapınıza Kadar Geliyoruz
              </h2>
              <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                Kocaeli’nin tüm ilçelerine tam donanımlı mobil servis araçlarımızla ulaşıyor; arızanızı yerinde tespit edip garantili olarak çözüme kavuşturuyoruz.
              </p>

              <div className="mt-6">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Aktif Servis Sağlanan İlçeler:
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl"
                    >
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-blue-900">Bölgenize Servis İsteyin</p>
                  <p className="text-[11px] text-blue-700">Hemen arayıp randevu saatini öğrenin.</p>
                </div>
                <a
                  href={`tel:${cleanPhone}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  Bizi Arayın
                </a>
              </div>
            </div>

            {/* TÜM KOCAELİ'Yİ GÖSTEREN GENİŞ AÇILI HARİTA */}
            <div className="w-full h-80 sm:h-96 rounded-2xl border border-slate-200 shadow-inner bg-slate-100 overflow-hidden">
              <iframe
                title="Türkyılmaz Teknik Servis Tüm Kocaeli Hizmet Bölgesi"
                src="https://maps.google.com/maps?q=Kocaeli,%20T%C3%BCrkiye&t=&z=10&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. SSS */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
            Merak Edilenler
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Teknik servis süreciyle ilgili aklınıza takılan soruların yanıtları.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
            >
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 pl-7 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ACİL ÇAĞRI BANNERI */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Cihazınızda Arıza mı Var?
          </h2>
          <p className="mt-3 text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
            Gereksiz parça masrafı ödemeden önce ustamıza danışın. Adresinizde kontrol edip doğru teşhisi koyalım.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>{phone} Nolu Hattı Ara</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Türkyılmaz Teknik Servis. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition">Ana Sayfa</Link>
            <Link href="/islerimiz" className="hover:text-white transition">Yapılan İşler</Link>
            <Link href="/iletisim" className="hover:text-white transition">İletişim</Link>
            <Link href="/studio" className="hover:text-white transition text-slate-500">Yönetim Paneli</Link>
          </div>
        </div>
      </footer>

      {/* 10. SAĞ ALTA SABİTLENMİŞ WHATSAPP WIDGETI */}
      <WhatsappWidget phone={phone} />

    </main>
  )
}