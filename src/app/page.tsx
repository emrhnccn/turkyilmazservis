import { client } from '@/sanity/lib/client'
import { DEFAULT_SERVICES, DEFAULT_CASES } from '../lib/constants'
import RepairGallery from '@/components/RepairGallery'
import Link from 'next/link'
import Image from 'next/image'
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
  HelpCircle,
  CalendarClock
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
        siteName: 'Türkyılmaz Beyaz Eşya Servisi',
        serviceAreas: ['Gebze', 'Darıca', 'Çayırova', 'Dilovası', 'Körfez', 'İzmit', 'Gölcük', 'Derince', 'Kartepe']
      }, 
      services: activeServices, 
      caseStudies 
    }
  } catch (error) {
    return { 
      settings: {
        phone: '0552 116 41 28',
        siteName: 'Türkyılmaz Beyaz Eşya Servisi',
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
      a: 'Bizi arayıp arıza kaydı oluşturduğunuzda, en yakın mobil servis ekibimiz aynı gün adresinize yönlendirilir. Cihazınız yerinde test edilir, gereksiz parça masrafı çıkarılmadan doğrudan arıza teşhis edilir ve onayınızla işlem yapılır.'
    },
    {
      q: 'Yapılan tamir ve değişen parçalar garantili mi?',
      a: 'Evet! Değiştirilen tüm orijinal yedek parçalar ve uzman işçiliğimiz 6 ay süresince resmi Türkyılmaz Servis garantisi altındadır.'
    },
    {
      q: 'Hangi cihaz ve markalara hizmet veriyorsunuz?',
      a: 'Bosch, Siemens, Profilo, Arçelik, Beko, Vestel, Samsung, LG ve tüm lider markaların buzdolabı, çamaşır, bulaşık makineleri ile kombi ve klimalarına garantili teknik servis sağlıyoruz.'
    },
    {
      q: 'Periyodik bakım yaptırmanın avantajı nedir?',
      a: 'Kombilerde 6 ayda bir, beyaz eşyalarda yılda bir yapılan düzenli kontroller cihazın ömrünü iki katına çıkarır, enerji tasarrufu sağlar ve yüksek maliyetli arızaların önüne geçer.'
    }
  ]

  const brands = [
    'Bosch', 'Siemens', 'Profilo', 'Arçelik', 'Beko', 'Vestel', 'Samsung', 'LG', 'Altus', 'Regal', 'DemirDöküm', 'Baymak'
  ]

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-100 selection:bg-orange-500 selection:text-white pb-20 sm:pb-0">
      
      {/* 1. HEADER / NAVBAR (Siyah & Turuncu Vurgulu) */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black border border-zinc-800 group-hover:border-orange-500 transition-colors flex items-center justify-center shadow-lg shadow-orange-500/10">
              <Image 
                src="/logo.png" 
                alt="Türkyılmaz Beyaz Eşya Servisi Logo" 
                fill 
                className="object-contain p-1" 
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1 leading-none">
                <span className="font-black text-white tracking-wider text-lg">TÜRK</span>
                <span className="font-black text-orange-500 tracking-wider text-lg">YILMAZ</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-semibold tracking-widest uppercase block mt-0.5">
                Beyaz Eşya Servisi
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/islerimiz" 
              className="hidden sm:inline-flex text-xs font-semibold text-zinc-300 hover:text-orange-400 transition px-2.5 py-1.5"
            >
              Yapılan İşler
            </Link>
            <Link 
              href="/periyodik-bakim" 
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 bg-orange-950/40 border border-orange-500/30 hover:bg-orange-500 hover:text-white transition px-3 py-1.5 rounded-xl"
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Periyodik Bakım</span>
            </Link>
            <Link 
              href="/iletisim" 
              className="hidden sm:inline-flex text-xs font-semibold text-zinc-300 hover:text-orange-400 transition px-2.5 py-1.5"
            >
              İletişim
            </Link>
            
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO / MANŞET BÖLÜMÜ */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(249,115,22,0.18),rgba(255,255,255,0))]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-orange-500/30 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-md">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>Kocaeli Genelinde Yerinde Hızlı Teknik Servis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Garantili Beyaz Eşya & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              Kombi Bakım Servisi
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Doğru arıza tespiti, orijinal yedek parça ve <strong className="text-zinc-200">6 ay parça garantisi</strong> ile cihazlarınızı güvenle ilk günkü performansına kavuşturuyoruz.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={`tel:${cleanPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/30 transition-all hover:scale-105"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Hemen Servis Çağır: {phone}</span>
            </a>
            <Link
              href="/periyodik-bakim"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold text-base px-6 py-4 rounded-2xl border border-zinc-800 hover:border-orange-500/50 shadow-sm transition"
            >
              <CalendarClock className="w-5 h-5 text-orange-400" />
              <span>Periyodik Bakım Takvimi</span>
            </Link>
          </div>

          {/* 4'lü Avantaj Rozetleri (Siyah Kart / Turuncu İkon) */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 shadow-sm">
              <Clock className="w-6 h-6 text-orange-400 mb-2" />
              <p className="text-xs font-bold text-white">Aynı Gün Servis</p>
              <p className="text-[11px] text-zinc-400">Hızlı adres tespiti</p>
            </div>
            <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-orange-400 mb-2" />
              <p className="text-xs font-bold text-white">6 Ay Garanti</p>
              <p className="text-[11px] text-zinc-400">Değişen parçalara</p>
            </div>
            <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 shadow-sm">
              <Wrench className="w-6 h-6 text-orange-400 mb-2" />
              <p className="text-xs font-bold text-white">Orijinal Parça</p>
              <p className="text-[11px] text-zinc-400">%100 fabrika uyumu</p>
            </div>
            <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 shadow-sm">
              <MapPin className="w-6 h-6 text-orange-400 mb-2" />
              <p className="text-xs font-bold text-white">Yerinde Tamir</p>
              <p className="text-[11px] text-zinc-400">Gözünüzün önünde</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MARKA LOGOLARI / İSİMLERİ ŞERİDİ */}
      <section className="py-5 border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-[11px] uppercase tracking-wider font-bold text-zinc-400 mb-3">
            Hizmet Verdiğimiz Başlıca Beyaz Eşya & Kombi Markaları
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {brands.map((brand, i) => (
              <span 
                key={i} 
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold px-3 py-1.5 rounded-lg hover:border-orange-500/40 transition"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HİZMETLERİMİZ BÖLÜMÜ */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/50 px-3.5 py-1.5 rounded-full border border-orange-500/30">
            Profesyonel Çözümler
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Tamir & Periyodik Bakım Hizmetlerimiz
          </h2>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            Gereksiz parça masrafı çıkarmadan, yerinde tespit ve 6 ay garantili parça montajı.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item: any) => (
            <div 
              key={item._id} 
              className="bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold mb-5">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">{item.description}</p>
                {item.features && (
                  <ul className="mt-4 space-y-2 border-t border-zinc-800 pt-3">
                    {item.features.map((feat: string, fIdx: number) => (
                      <li key={fIdx} className="text-xs text-zinc-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <a
                href={`tel:${cleanPhone}`}
                className="mt-6 inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold text-orange-400 bg-orange-950/30 hover:bg-orange-500 hover:text-white border border-orange-500/20 py-2.5 rounded-xl transition duration-200"
              >
                <span>Ustamıza Danış</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SAHADAN GERÇEK ÖRNEKLER (GALERİ) */}
      <RepairGallery items={caseStudies} />

      {/* 6. SERVİS BÖLGELERİ & KOCAELİ HARİTASI */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/50 px-3.5 py-1.5 rounded-full border border-orange-500/30">
                Mobil Servis Ağı
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                Tüm Kocaeli'de Kapınıza Kadar Geliyoruz
              </h2>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Darıca merkez atölyemizden hareket eden gezici servis araçlarımızla Kocaeli'nin tüm ilçelerine aynı gün ulaşıyoruz.
              </p>

              <div className="mt-6">
                <p className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3">
                  Hızlı Hizmet Verilen İlçeler:
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-xl"
                    >
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-orange-950/30 border border-orange-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Bölgenize Servis Randevusu</p>
                  <p className="text-[11px] text-orange-300/80">Arayıp aynı gün servis saatini öğrenin.</p>
                </div>
                <a
                  href={`tel:${cleanPhone}`}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md"
                >
                  Hemen Ara
                </a>
              </div>
            </div>

            {/* KOCAELİ HARİTASI */}
            <div className="w-full h-80 sm:h-96 rounded-2xl border border-zinc-800 overflow-hidden bg-black">
              <iframe
                title="Türkyılmaz Teknik Servis Tüm Kocaeli Hizmet Bölgesi"
                src="https://maps.google.com/maps?q=Kocaeli,%20T%C3%BCrkiye&t=&z=10&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.1) brightness(0.95)' }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. SIKÇA SORULAN SORULAR */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/50 px-3.5 py-1.5 rounded-full border border-orange-500/30">
            Aklınıza Takılanlar
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Teknik servis ve bakım süreçleriyle ilgili tüm merak edilenler.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/80 p-6 rounded-2xl border border-zinc-800"
            >
              <h3 className="font-bold text-white text-sm sm:text-base flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-3 pl-7 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ACİL ÇAĞRI BANNERI */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Cihazınızda Bir Problem mi Var?
          </h2>
          <p className="mt-3 text-orange-100 text-sm sm:text-base max-w-xl mx-auto">
            Gereksiz masraf ödemeden önce bize danışın. Adresinizde yerinde kontrol edip kalıcı çözümü üretelim.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 bg-black hover:bg-zinc-900 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 border border-white/10"
            >
              <PhoneCall className="w-4 h-4 text-orange-400" />
              <span>{phone} Nolu Hattı Ara</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. FOOTER (Siyah & Turuncu) */}
      <footer className="bg-black text-zinc-400 py-12 px-4 border-t border-zinc-900 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
              <Image src="/logo.png" alt="Türkyılmaz Servis" fill className="object-contain p-1" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">TÜRKYILMAZ BEYAZ EŞYA SERVİSİ</p>
              <p className="text-[11px] text-zinc-400">Kocaeli Geneli Garantili Teknik Servis & Periyodik Bakım</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-zinc-400">
            <Link href="/" className="hover:text-orange-400 transition">Ana Sayfa</Link>
            <Link href="/islerimiz" className="hover:text-orange-400 transition">Yapılan İşler</Link>
            <Link href="/periyodik-bakim" className="hover:text-orange-400 transition">Periyodik Bakım</Link>
            <Link href="/iletisim" className="hover:text-orange-400 transition">İletişim</Link>
            <Link href="/studio" className="hover:text-orange-400 transition text-zinc-400">Yönetim Paneli</Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-zinc-900 text-center text-zinc-400 text-[11px]">
          © {new Date().getFullYear()} Türkyılmaz Beyaz Eşya Servisi. Tüm hakları saklıdır.
        </div>
      </footer>

      {/* 10. SAĞ ALTA SABİTLENMİŞ WHATSAPP ŞABLON KARTI */}
      <WhatsappWidget phone={phone} />

    </main>
  )
}