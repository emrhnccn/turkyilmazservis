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
  HelpCircle,
  CalendarClock,
  Radio,
  Building2
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
        address: 'Fevziçakmak Mah. Doktor Zeki Acar Cad., Şebnem Sk. No:11, Darıca/Kocaeli',
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
        address: 'Fevziçakmak Mah. Doktor Zeki Acar Cad., Şebnem Sk. No:11, Darıca/Kocaeli',
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
  const shopAddress = settings?.address || 'Fevziçakmak Mah. Doktor Zeki Acar Cad., Şebnem Sk. No:11, Darıca/Kocaeli'
  
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
      a: 'Arçelik, Beko, Altus, Vestel, Bosch, Siemens, Samsung, LG ve tüm lider markaların buzdolabı, çamaşır, bulaşık, kurutma makineleri ile kombi ve klimalarına garantili teknik servis sağlıyoruz.'
    },
    {
      q: 'Gebze ve Darıca dışındaki ilçelere servisiniz var mı?',
      a: 'Evet. Mobil gezici araçlarımızla Gebze, Darıca, Çayırova ve Dilovası başta olmak üzere Kocaeli geneline aynı gün servis yönlendiriyoruz.'
    },
    {
      q: 'Periyodik bakım yaptırmanın avantajı nedir?',
      a: 'Kombilerde 6 ayda bir, beyaz eşyalarda yılda bir yapılan düzenli kontroller cihazın ömrünü iki katına çıkarır, enerji tasarrufu sağlar ve yüksek maliyetli arızaların önüne geçer.'
    }
  ]

  const brands = [
    'Arçelik', 'Beko', 'Altus', 'Bosch', 'Siemens', 'Vestel', 'Samsung', 'LG', 'Profilo', 'Regal', 'DemirDöküm', 'Baymak'
  ]

  return (
    <main className="relative min-h-screen bg-zinc-950 text-slate-100 selection:bg-orange-500 selection:text-white pb-28 sm:pb-0 overflow-x-hidden tech-grid-bg">
      
      {/* GPU YORMMAYAN HAFİF ARKA PLAN PARILTILARI */}
      <div className="pointer-events-none absolute -left-40 top-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute -right-40 top-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10" />

      {/* 1. CANLI SERVİS & NÖBETÇİ RADAR ŞERİDİ */}
      <div className="bg-zinc-900/90 border-b border-zinc-800 text-xs py-2.5 px-4 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-200 font-medium">
              <strong className="text-white">Canlı Servis Radarı:</strong> Gebze, Darıca & Çayırova Mobil Ekipler Sahada
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-200">
            <span className="flex items-center gap-1 text-orange-400 font-semibold">
              <Clock className="w-3.5 h-3.5" /> Ortalama Varış: 25 - 45 Dk
            </span>
            <span className="hidden md:inline text-zinc-500">•</span>
            <span className="hidden md:inline text-emerald-400 font-medium">Haftanın 7 Günü Kesintisiz Hizmet</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-black border border-zinc-800 group-hover:border-orange-500 transition-colors flex items-center justify-center shadow-lg shadow-orange-500/10">
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
              <span className="text-[10px] text-zinc-300 font-bold tracking-widest uppercase block mt-1">
                Beyaz Eşya Servisi
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/islerimiz" 
              className="hidden sm:inline-flex text-xs font-bold text-zinc-200 hover:text-orange-400 transition px-2.5 py-1.5"
            >
              Yapılan İşler
            </Link>
            <Link 
              href="/periyodik-bakim" 
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-950/50 border border-orange-500/40 hover:bg-orange-500 hover:text-white transition px-3 py-1.5 rounded-xl"
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Periyodik Bakım</span>
            </Link>
            <Link 
              href="/iletisim" 
              className="hidden sm:inline-flex text-xs font-bold text-zinc-200 hover:text-orange-400 transition px-2.5 py-1.5"
            >
              İletişim
            </Link>
            
            <a
              href={`tel:${cleanPhone}`}
              className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 animate-shimmer" />
              <PhoneCall className="w-4 h-4 animate-pulse shrink-0" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO BÖLÜMÜ */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-orange-500/40 text-orange-400 text-xs font-extrabold px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>Gebze & Darıca Bölgesinde Aynı Gün Yerinde Servis</span>
          </div>

          <h1 className="text-[1.85rem] xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none">
            Gebze & Darıca <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Beyaz Eşya, Klima & Kombi Servisi
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-zinc-200 max-w-2xl mx-auto leading-relaxed">
            Arçelik, Beko, Altus, Vestel ve Bosch cihazlarınızda doğru teşhis, orijinal yedek parça ve <strong className="text-orange-400 font-bold underline decoration-orange-500/40 underline-offset-4">6 ay resmi servis garantisi</strong> ile adresinizde tamir.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={`tel:${cleanPhone}`}
              className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/35 transition-all hover:scale-105 active:scale-95 glow-orange-pulse"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 animate-shimmer" />
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span>Hemen Servis Çağır: {phone}</span>
            </a>

            <Link
              href="/periyodik-bakim"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold text-base px-7 py-4 rounded-2xl border border-zinc-800 hover:border-orange-500/60 shadow-lg transition-all hover:scale-105"
            >
              <CalendarClock className="w-5 h-5 text-orange-400" />
              <span>Periyodik Bakım Takvimi</span>
            </Link>
          </div>

          {/* GÜVEN METRİKLERİ */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">Hızlı</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">25-45 Dk</p>
              <p className="text-xs text-zinc-300">Ortalama Adrese Varış</p>
            </div>

            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-bold text-orange-400 bg-orange-950/60 border border-orange-500/30 px-2 py-0.5 rounded-full">Resmi</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">6 Ay Garanti</p>
              <p className="text-xs text-zinc-300">Değişen Parçalara</p>
            </div>

            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <Wrench className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">%100</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">Orijinal Parça</p>
              <p className="text-xs text-zinc-300">Fabrika Garantili Ürün</p>
            </div>

            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-[10px] font-bold text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2 py-0.5 rounded-full">Mobil</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">Yerinde Onarım</p>
              <p className="text-xs text-zinc-300">Evinizde Gözünüz Önünde</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. MARKA ŞERİDİ */}
      <section className="py-4 border-y border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="flex items-center">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <div 
                key={i} 
                className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-bold px-4 py-2 rounded-xl transition cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <span>{brand} Özel Servisi</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HİZMETLERİMİZ */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
            Profesyonel Hizmetlerimiz
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Tamir & Periyodik Bakım Çözümlerimiz
          </h2>
          <p className="text-zinc-200 mt-2 text-sm sm:text-base">
            Gereksiz parça masrafı ödemeden önce ustamıza danışın. Yerinde doğru teşhis, garantili sonuç.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item: any) => (
            <div 
              key={item._id} 
              className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between hover:border-orange-500/50 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold mb-5">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed">{item.description}</p>
                {item.features && (
                  <ul className="mt-4 space-y-2 border-t border-zinc-800 pt-3">
                    {item.features.map((feat: string, fIdx: number) => (
                      <li key={fIdx} className="text-xs text-zinc-200 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <a
                href={`tel:${cleanPhone}`}
                className="mt-6 inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold text-orange-400 bg-orange-950/30 hover:bg-orange-500 hover:text-white border border-orange-500/30 py-3 rounded-xl transition duration-200"
              >
                <span>Hemen Ustaya Danış</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GALERİ */}
      <RepairGallery items={caseStudies} />

      {/* 7. BÖLGESEL SEO BLOĞU */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 text-xs text-zinc-200 space-y-3 leading-relaxed">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Gebze & Darıca Beyaz Eşya Servisi, Kombi & Klima Özel Servis Çözümleri
          </h2>
          <p>
            Türkyılmaz Beyaz Eşya Servisi olarak; <strong>Gebze</strong>, <strong>Darıca</strong>, <strong>Çayırova</strong> ve <strong>Dilovası</strong> başta olmak üzere Kocaeli genelinde başta <strong>Arçelik</strong>, <strong>Beko</strong>, <strong>Altus</strong>, <strong>Vestel</strong>, <strong>Bosch</strong> ve <strong>Siemens</strong> markalarının <em>buzdolabı motor değişimi</em>, <em>çamaşır makinesi kazan rulman onarımı</em>, <em>bulaşık makinesi rezistans ve pompa tamiri</em> ile <em>klima gaz dolumu</em> ve <em>periyodik kombi bakımı</em> alanında yerinde garantili hizmet sağlamaktayız.
          </p>
          <p>
            Darıca Fevziçakmak Mahallesi atölyemizden hareket eden donanımlı gezici servis araçlarımız, adresinize gelerek cihazınızı yerinde test eder ve değişen her orijinal parçaya 6 ay resmi servis garantisi sunar.
          </p>
        </div>
      </section>

      {/* 8. HARİTA BÖLÜMÜ */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 sm:p-10 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
                Mobil Servis Ağı
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                Gebze, Darıca ve Kocaeli'de Kapınıza Kadar Geliyoruz
              </h2>
              <p className="text-zinc-200 mt-3 text-sm leading-relaxed">
                Tam donanımlı mobil araçlarımızla parça bekleme derdi olmadan arızanızı adresinizde gözünüzün önünde çözüyoruz.
              </p>

              <div className="mt-6">
                <p className="text-xs font-bold text-zinc-100 uppercase tracking-wider mb-3">
                  Gezici Ekiplerin Ulaştığı İlçeler:
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-medium px-3 py-1.5 rounded-xl"
                    >
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-orange-950/30 border border-orange-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Adresinize Servis İsteyin</p>
                  <p className="text-[11px] text-orange-300">Arayıp aynı gün servis randevusu alın.</p>
                </div>
                <a
                  href={`tel:${cleanPhone}`}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md"
                >
                  Hemen Ara
                </a>
              </div>
            </div>

            <div className="w-full h-80 sm:h-96 rounded-2xl border border-zinc-800 overflow-hidden bg-black">
              <iframe
                title="Türkyılmaz Teknik Servis Hizmet Bölgesi"
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

      {/* 9. SSS */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-500/30">
            Aklınıza Takılanlar
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-zinc-200 mt-2 text-sm">
            Teknik servis, klima ve kombi bakım süreçleriyle ilgili tüm merak edilenler.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800"
            >
              <h3 className="font-bold text-white text-sm sm:text-base flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-200 mt-3 pl-7 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ACİL ÇAĞRI BANNERI */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden glow-orange-pulse">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Cihazınızda Bir Arıza mı Var?
          </h2>
          <p className="mt-3 text-orange-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Gereksiz parça masrafı ödemeden önce bize danışın. Adresinizde yerinde kontrol edip kalıcı çözümü üretelim.
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

      {/* 11. FOOTER */}
      <footer className="bg-black text-zinc-300 py-14 px-4 border-t border-zinc-900 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-900">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image src="/logo.png" alt="Türkyılmaz Servis" fill className="object-contain p-1" />
              </div>
              <div>
                <p className="font-extrabold text-white text-base">TÜRKYILMAZ BEYAZ EŞYA SERVİSİ</p>
                <p className="text-xs text-orange-400 font-semibold">Gebze & Darıca Bölge Özel Servisi</p>
              </div>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed max-w-md">
              Arçelik, Beko, Altus, Vestel ve Bosch buzdolabı, çamaşır, bulaşık makineleri ile kombi ve klima onarımında 6 ay resmi parça garantili yerinde teknik servis hizmeti.
            </p>
          </div>

          <div>
            <p className="font-bold text-white text-sm uppercase tracking-wider mb-3">Sayfalar</p>
            <ul className="space-y-2 text-zinc-300">
              <li><Link href="/" className="hover:text-orange-400 transition">Ana Sayfa</Link></li>
              <li><Link href="/islerimiz" className="hover:text-orange-400 transition">Yapılan Sahadan İşler</Link></li>
              <li><Link href="/periyodik-bakim" className="hover:text-orange-400 transition">Periyodik Bakım Kaydı</Link></li>
              <li><Link href="/iletisim" className="hover:text-orange-400 transition">İletişim & Dükkan Konumu</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-white text-sm uppercase tracking-wider mb-3">İletişim & Adres</p>
            <div className="space-y-2.5 text-zinc-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{shopAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="text-white font-bold hover:text-orange-400 transition">{phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>08:30 - 20:30 (Pazar Nöbetçi)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-300 text-[11px]">
          <p>© {new Date().getFullYear()} Türkyılmaz Beyaz Eşya Servisi. Tüm hakları saklıdır.</p>
          
          <a
            href="https://affan-portfolio-gilt.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-orange-500/50 px-3.5 py-1.5 rounded-full transition-colors shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:animate-ping" />
            <span className="text-zinc-300 group-hover:text-zinc-100 transition">Tasarım & Yazılım:</span>
            <span className="font-bold text-orange-400 group-hover:text-orange-300 transition">
              CCN Teknoloji
            </span>
          </a>
        </div>
      </footer>

      {/* 12. WHATSAPP & MOBİL STICKY BAR */}
      <WhatsappWidget phone={phone} />

    </main>
  )
}