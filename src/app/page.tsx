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
  CalendarClock,
  Sparkles,
  Zap,
  Flame,
  Award,
  Radio
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
    <main className="relative min-h-screen bg-zinc-950 text-slate-100 selection:bg-orange-500 selection:text-white pb-20 sm:pb-0 overflow-x-hidden tech-grid-bg">
      
      {/* --- ARKA PLAN RADIAL PARILTI AURALARI --- */}
      <div className="pointer-events-none absolute -left-40 top-0 w-[550px] h-[550px] bg-orange-600/15 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="pointer-events-none absolute -right-40 top-1/4 w-[550px] h-[550px] bg-amber-500/15 rounded-full blur-[150px] -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[160px] -z-10" />

      {/* 1. EN ÜSTTE CANLI SERVİS & NÖBETÇİ RADAR BİLGİ ŞERİDİ */}
      <div className="bg-zinc-900/90 border-b border-zinc-800 text-xs py-2 px-4 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-300 font-medium">
              <strong className="text-white">Canlı Servis Radarı:</strong> Kocaeli ve Çevre İlçelerde Gezici Mobil Ekipler Sahada
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1 text-orange-400 font-semibold">
              <Clock className="w-3 h-3" /> Ortalama Varış: 25 - 45 Dk
            </span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden md:inline text-emerald-400 font-medium">Haftanın 7 Günü Kesintisiz Hizmet</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER / NAVBAR (Neon Işıltılı ve Cam Efektli) */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-black border border-zinc-800 group-hover:border-orange-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-orange-500/10 group-hover:shadow-orange-500/30">
              <Image 
                src="/logo.png" 
                alt="Türkyılmaz Beyaz Eşya Servisi Logo" 
                fill 
                className="object-contain p-1 group-hover:scale-105 transition-transform" 
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1 leading-none">
                <span className="font-black text-white tracking-wider text-lg">TÜRK</span>
                <span className="font-black text-orange-500 tracking-wider text-lg">YILMAZ</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase block mt-1">
                Beyaz Eşya Servisi
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/islerimiz" 
              className="hidden sm:inline-flex text-xs font-bold text-zinc-300 hover:text-orange-400 transition px-2.5 py-1.5"
            >
              Yapılan İşler
            </Link>
            <Link 
              href="/periyodik-bakim" 
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-950/50 border border-orange-500/40 hover:bg-orange-500 hover:text-white transition px-3 py-1.5 rounded-xl shadow-xs"
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Periyodik Bakım</span>
            </Link>
            <Link 
              href="/iletisim" 
              className="hidden sm:inline-flex text-xs font-bold text-zinc-300 hover:text-orange-400 transition px-2.5 py-1.5"
            >
              İletişim
            </Link>
            
            {/* Şık Işıltılı Arama Butonu */}
            <a
              href={`tel:${cleanPhone}`}
              className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 animate-shimmer" />
              <PhoneCall className="w-4 h-4 animate-pulse shrink-0" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO / MANŞET BÖLÜMÜ (Işıltılı & WOW Efektli) */}
      <section className="relative overflow-hidden pt-14 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Canlı Durum Rozeti */}
          <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-orange-500/40 text-orange-400 text-xs font-extrabold px-4 py-1.5 rounded-full mb-6 shadow-md hover:border-orange-400 transition-colors">
            <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>Kocaeli Genelinde Aynı Gün Garantili Yerinde Servis</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none">
            Garantili Beyaz Eşya & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 drop-shadow-sm">
              Kombi Teknik Servisi
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Doğru arıza tespiti, orijinal yedek parça ve <strong className="text-orange-400 font-bold underline decoration-orange-500/40 underline-offset-4">6 ay resmi servis garantisi</strong> ile cihazlarınızı adresinizde aynı gün çalışır duruma getiriyoruz.
          </p>

          {/* Aksiyon Butonları (Işık Geçişli & Glow) */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Yanıp Sönen & Işıltılı Ana Arama Butonu */}
            <a
              href={`tel:${cleanPhone}`}
              className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/35 transition-all hover:scale-105 active:scale-95 glow-orange-pulse"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/25 transform -skew-x-12 animate-shimmer" />
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span>Hemen Servis Çağır: {phone}</span>
            </a>

            {/* Periyodik Bakım Butonu */}
            <Link
              href="/periyodik-bakim"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 hover:text-white font-bold text-base px-7 py-4 rounded-2xl border border-zinc-800 hover:border-orange-500/60 shadow-lg transition-all hover:scale-105"
            >
              <CalendarClock className="w-5 h-5 text-orange-400" />
              <span>Periyodik Bakım Takvimi</span>
            </Link>
          </div>

          {/* CANLI GÜVEN & SAYI METRİKLERİ (WOW ETKİSİ) */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-3xl mx-auto text-left">
            <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800/90 shadow-sm hover:border-orange-500/40 transition">
              <div className="flex items-center justify-between mb-1.5">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">Hızlı</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">25-45 Dk</p>
              <p className="text-xs text-zinc-400">Ortalama Adrese Ulaşım</p>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800/90 shadow-sm hover:border-orange-500/40 transition">
              <div className="flex items-center justify-between mb-1.5">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-bold text-orange-400 bg-orange-950/60 border border-orange-500/30 px-2 py-0.5 rounded-full">Resmi</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">6 Ay Garanti</p>
              <p className="text-xs text-zinc-400">Değişen Tüm Parçalara</p>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800/90 shadow-sm hover:border-orange-500/40 transition">
              <div className="flex items-center justify-between mb-1.5">
                <Wrench className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">%100</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">Orijinal Parça</p>
              <p className="text-xs text-zinc-400">Barkodlu Fabrika Ürünü</p>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800/90 shadow-sm hover:border-orange-500/40 transition">
              <div className="flex items-center justify-between mb-1.5">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-bold text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2 py-0.5 rounded-full">Mobil</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">Yerinde Onarım</p>
              <p className="text-xs text-zinc-400">Evinizde Gözünüz Önünde</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. MARKA LOGOLARI - OTOMATİK AKAN MARQUEE ŞERİDİ (ÇOK HAREKETLİ) */}
      <section className="py-4 border-y border-zinc-800/80 bg-zinc-950/90 overflow-hidden">
        <div className="flex items-center">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <div 
                key={i} 
                className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-zinc-300 text-xs font-bold px-4 py-2 rounded-xl transition cursor-default shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <span>{brand} Özel Servisi</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HİZMETLERİMİZ BÖLÜMÜ */}
      <section className="py-18 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
            Profesyonel Hizmetlerimiz
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Tamir & Periyodik Bakım Çözümlerimiz
          </h2>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">
            Gereksiz parça masrafı ödemeden önce ustamıza danışın. Yerinde doğru tespit, garantili sonuç.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item: any) => (
            <div 
              key={item._id} 
              className="group bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/15 transition-all" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold mb-5 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">{item.description}</p>
                {item.features && (
                  <ul className="mt-4 space-y-2 border-t border-zinc-800/80 pt-3">
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
                className="mt-6 inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold text-orange-400 bg-orange-950/30 hover:bg-orange-500 hover:text-white border border-orange-500/30 py-3 rounded-xl transition duration-200 shadow-xs"
              >
                <span>Hemen Ustaya Danış</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SAHADAN GERÇEK ÖRNEKLER (GALERİ) */}
      <RepairGallery items={caseStudies} />

      {/* 7. SERVİS BÖLGELERİ & TÜM KOCAELİ HARİTASI */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
                Mobil Servis Ağı
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                Tüm Kocaeli Genelinde Kapınıza Kadar Geliyoruz
              </h2>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Darıca merkez atölyemizden hareket eden tam donanımlı servis araçlarımızla Kocaeli'nin tüm ilçelerine aynı gün ulaşıyoruz.
              </p>

              <div className="mt-6">
                <p className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-orange-400" />
                  Hızlı Ulaşılan İlçeler:
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-xl hover:border-orange-500/40 transition"
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
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md"
                >
                  Hemen Ara
                </a>
              </div>
            </div>

            {/* HARİTA */}
            <div className="w-full h-80 sm:h-96 rounded-2xl border border-zinc-800 overflow-hidden bg-black shadow-inner">
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

      {/* 8. SSS */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
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
              className="bg-zinc-900/80 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition"
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

      {/* SEO ODAKLI BÖLGESEL BİLGİLENDİRME BLOĞU */}
      <section className="py-12 px-4 max-w-5xl mx-auto border-t border-zinc-900">
        <div className="bg-zinc-900/50 p-6 sm:p-8 rounded-3xl border border-zinc-800 text-xs text-zinc-400 space-y-4 leading-relaxed">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
            Darıca Beyaz Eşya Tamircisi & Kocaeli Bölge Özel Servisi
          </h2>
          <p>
            Türkyılmaz Teknik Servis olarak; <strong>Darıca</strong>, <strong>Gebze</strong>, <strong>Çayırova</strong> ve tüm Kocaeli ilçelerinde başta <strong>Arçelik</strong>, <strong>Beko</strong>, <strong>Altus</strong>, <strong>Grundig</strong>, <strong>Bosch</strong> ve <strong>Siemens</strong> olmak üzere lider markaların <em>buzdolabı motor tamiri</em>, <em>çamaşır makinesi kazan rulman değişimi</em>, <em>bulaşık makinesi rezistans ve pompa onarımı</em> ile <em>klima / kombi periyodik bakımı</em> alanında garantili hizmet sunmaktayız.
          </p>
          <p>
            Darıca Fevziçakmak Mahallesi merkezli atölyemizden hareket eden mobil ekiplerimiz; Arçelik yetkili servis ve Beko yetkili servis standartlarında, orijinal yedek parça kullanarak adresinizde işlem yapmaktadır. Değiştirilen her parçaya 6 ay servis garantisi verilmektedir.
          </p>
        </div>
      </section>

      {/* 9. ACİL ÇAĞRI BANNERI (YANGIN TURUNCUSU PARILTI) */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden glow-orange-pulse">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Cihazınızda Bir Problem mi Var?
          </h2>
          <p className="mt-3 text-orange-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Gereksiz masraf ödemeden önce bize danışın. Adresinizde yerinde kontrol edip kalıcı çözümü üretelim.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${cleanPhone}`}
              className="relative overflow-hidden inline-flex items-center gap-2.5 bg-black hover:bg-zinc-900 text-white font-black px-8 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 border border-white/10"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 animate-shimmer" />
              <PhoneCall className="w-5 h-5 text-orange-400" />
              <span>{phone} Nolu Hattı Ara</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. FOOTER & CCN TEKNOLOJİ İMZASI */}
      <footer className="bg-black text-zinc-400 py-12 px-4 border-t border-zinc-900 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
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

        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
          <p>© {new Date().getFullYear()} Türkyılmaz Beyaz Eşya Servisi. Tüm hakları saklıdır.</p>
          
          <a
            href="https://affan-portfolio-gilt.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-orange-500/50 px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:animate-ping" />
            <span className="text-zinc-400 group-hover:text-zinc-200 transition">Tasarım & Yazılım:</span>
            <span className="font-bold text-orange-400 group-hover:text-orange-300 transition">
              CCN Teknoloji
            </span>
          </a>
        </div>
      </footer>

      {/* 11. SAĞ ALTA SABİTLENMİŞ AÇILIR WHATSAPP KARTI */}
      <WhatsappWidget phone={phone} />

    </main>
  )
}