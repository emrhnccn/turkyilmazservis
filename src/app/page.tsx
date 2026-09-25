import { client } from '@/sanity/lib/client'
import { DEFAULT_SERVICES, DEFAULT_CASES } from '../lib/constants'
import RepairGallery from '@/components/RepairGallery'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
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
  Building2,
  PackageCheck
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

  // Görseldeki 13 markanın tam listesi
  const brands = [
    'Arçelik', 'Beko', 'Samsung', 'Grundig', 'Altus', 'Vestel', 'Regal', 
    'Keysmart', 'Flavel', 'Finlux', 'SEG', 'Kumtel', 'Eminçelik'
  ]

  const faqs = [
    {
      q: 'Arıza tespiti ve servis süreci nasıl işliyor?',
      a: 'Bizi arayıp arıza bildiriminde bulunduğunuzda, gezici servis ekibimiz aynı gün adresinize yönlendirilir. Cihazınız yerinde incelenir, doğrudan arıza teşhis edilir ve onayınızla işlem yapılır.'
    },
    {
      q: 'Yapılan tamir ve değişen parçalar garantili mi?',
      a: 'Evet! Değiştirilen tüm orijinal yedek parçalar ve uzman işçiliğimiz 6 ay süresince resmi Türkyılmaz Servis garantisi altındadır.'
    },
    {
      q: 'Hangi cihaz ve markalara hizmet veriyorsunuz?',
      a: 'Arçelik, Beko, Samsung, Grundig, Altus, Vestel, Regal, Keysmart, Flavel, Finlux, SEG, Kumtel ve Eminçelik başta olmak üzere tüm buzdolabı, çamaşır, bulaşık, fırın, ankastre ocak, kurutma makineleri ile klima ve kombilere servis desteği sağlıyoruz.'
    },
    {
      q: 'Gebze, Darıca ve Çayırova dışındaki ilçelere servisiniz var mı?',
      a: 'Evet. Mobil gezici araçlarımızla Gebze, Darıca, Çayırova ve Dilovası başta olmak üzere Kocaeli geneline aynı gün servis yönlendiriyoruz.'
    },
    {
      q: 'Periyodik bakım yaptırmanın avantajı nedir?',
      a: 'Kombilerde 6 ayda bir, beyaz eşyalarda yılda bir yapılan düzenli kontroller cihazın ömrünü iki katına çıkarır, enerji tasarrufu sağlar ve yüksek maliyetli arızaların önüne geçer.'
    }
  ]

  return (
    <main className="relative min-h-screen bg-zinc-950 text-slate-100 selection:bg-red-600 selection:text-white pb-28 sm:pb-0 overflow-x-hidden tech-grid-bg">
      
      {/* Arka Plan Işıkları */}
      <div className="pointer-events-none absolute -left-40 top-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute -right-40 top-1/4 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl -z-10" />

      {/* 1. CANLI SERVİS RADARI */}
      <div className="bg-zinc-900/90 border-b border-zinc-800 text-xs py-2 px-4 backdrop-blur-md">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-200 font-medium">
              <strong className="text-white">Canlı Servis Radarı:</strong> Gebze, Darıca & Çayırova Ekiplerimiz Sahada
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-300">
            <span className="flex items-center gap-1 text-slate-200 font-semibold">
              <Clock className="w-3.5 h-3.5 text-red-500" /> Ortalama Varış: 25 - 45 Dk
            </span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden md:inline text-emerald-400 font-medium">Haftanın 7 Günü Kesintisiz Hizmet</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER */}
      <Navbar phone={phone} cleanPhone={cleanPhone} />

      {/* 3. HERO BÖLÜMÜ */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-xs font-extrabold px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>Gebze, Darıca & Çayırova Genelinde Aynı Gün Yerinde Servis</span>
          </div>

          <h1 className="text-[1.85rem] xs:text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-white tracking-tight leading-tight sm:leading-none">
            Gebze, Darıca & Çayırova <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-zinc-400">
              Beyaz Eşya, Klima & Kombi Servisi
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Arçelik, Beko, Samsung, Grundig, Altus, Vestel, Regal, Keysmart, Flavel, Finlux, SEG, Kumtel ve Eminçelik cihazlarınızda dürüst arıza tespiti ve <strong className="text-white font-bold underline decoration-red-600 underline-offset-4">6 ay parça garantisi</strong> ile adresinizde tamir çözümleri.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={`tel:${cleanPhone}`}
              className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 animate-shimmer" />
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span>Hemen Servis Çağır: {phone}</span>
            </a>

            <Link
              href="/yedek-parca"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold text-base px-7 py-4 rounded-2xl border border-zinc-700/80 hover:border-zinc-400 shadow-lg transition-all hover:scale-105"
            >
              <PackageCheck className="w-5 h-5 text-red-500" />
              <span>Yedek Parça Kataloğu</span>
            </Link>
          </div>

          {/* GÜVEN METRİKLERİ */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
            <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition">
              <div className="flex items-center justify-between mb-1.5">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">Hızlı</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">25-45 Dk</p>
              <p className="text-xs text-zinc-400">Ortalama Adrese Varış</p>
            </div>

            <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition">
              <div className="flex items-center justify-between mb-1.5">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                <span className="text-[10px] font-bold text-slate-200 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">Resmi Belge</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">6 Ay Garanti</p>
              <p className="text-xs text-zinc-400">Değişen Parçalara</p>
            </div>

            <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition">
              <div className="flex items-center justify-between mb-1.5">
                <Wrench className="w-5 h-5 text-red-500" />
                <span className="text-[10px] font-bold text-slate-200 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">%100</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">Orijinal Parça</p>
              <p className="text-xs text-zinc-400">Fabrika Onaylı Ürün</p>
            </div>

            <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition">
              <div className="flex items-center justify-between mb-1.5">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="text-[10px] font-bold text-slate-300 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">Mobil</span>
              </div>
              <p className="text-lg font-black text-white tracking-tight">Yerinde Onarım</p>
              <p className="text-xs text-zinc-400">Evinizde Gözünüz Önünde</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. TÜM 13 MARKAYI İÇEREN KAYAN MARKA ŞERİDİ */}
      <section className="py-4 border-y border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="flex items-center">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <div 
                key={i} 
                className="inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 text-zinc-200 text-xs font-bold px-4 py-2 rounded-xl transition cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>{brand} Beyaz Eşya Servisi</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HİZMETLERİMİZ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-zinc-300 tracking-wider uppercase bg-zinc-900 px-4 py-1.5 rounded-full border border-zinc-700">
            Hizmetlerimiz
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Tamir & Periyodik Bakım Çözümlerimiz
          </h2>
          <p className="text-zinc-300 mt-2 text-sm sm:text-base">
            Gereksiz parça masrafı ödemeden önce bize danışın. Yerinde doğru teşhis, garantili sonuç.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item: any) => (
            <div 
              key={item._id} 
              className="bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 sm:p-7 flex flex-col justify-between hover:border-zinc-600 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-red-500 flex items-center justify-center font-bold mb-5">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed">{item.description}</p>
                {item.features && (
                  <ul className="mt-4 space-y-2 border-t border-zinc-800/80 pt-3">
                    {item.features.map((feat: string, fIdx: number) => (
                      <li key={fIdx} className="text-xs text-zinc-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <a
                href={`tel:${cleanPhone}`}
                className="mt-6 inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-3 rounded-xl transition duration-200"
              >
                <span>Ustamıza Danış</span>
                <ChevronRight className="w-3.5 h-3.5 text-red-500" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GALERİ */}
      <RepairGallery items={caseStudies} />

      {/* 7. BÖLGESEL SEO BİLGİLENDİRME BLOĞU */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto">
        <div className="bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800 text-xs text-zinc-300 space-y-3 leading-relaxed">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-red-500" />
            Gebze, Darıca & Çayırova Beyaz Eşya Servisi, Kombi & Klima Çözümleri
          </h2>
          <p>
            Türkyılmaz Beyaz Eşya Servisi olarak; <strong>Gebze</strong>, <strong>Darıca</strong>, <strong>Çayırova</strong> ve <strong>Dilovası</strong> başta olmak üzere Kocaeli genelinde <strong>Arçelik</strong>, <strong>Beko</strong>, <strong>Samsung</strong>, <strong>Grundig</strong>, <strong>Altus</strong>, <strong>Vestel</strong>, <strong>Regal</strong>, <strong>Keysmart</strong>, <strong>Flavel</strong>, <strong>Finlux</strong>, <strong>SEG</strong>, <strong>Kumtel</strong> ve <strong>Eminçelik</strong> markalarının buzdolabı motor değişimi, çamaşır makinesi kazan onarımı, bulaşık makinesi rezistans ve pompa tamiri, ankastre set üstü ocak tamiri ile klima gaz dolumu ve kombi bakımı alanında yerinde garantili hizmet sağlamaktayız.
          </p>
          <p>
            Darıca Fevziçakmak Mahallesi atölyemizden hareket eden donanımlı gezici servis araçlarımız, adresinize gelerek cihazınızı yerinde test eder ve değişen her parçaya 6 ay resmi servis garantisi sunar.
          </p>
        </div>
      </section>

      {/* 8. HARİTA BÖLÜMÜ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto">
        <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 sm:p-10 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-zinc-300 tracking-wider uppercase bg-zinc-800 px-4 py-1.5 rounded-full border border-zinc-700">
                Mobil Servis Ağı
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                Gebze, Darıca, Çayırova ve Kocaeli'de Kapınızdayız
              </h2>
              <p className="text-zinc-300 mt-3 text-sm leading-relaxed">
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
                      className="inline-flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-xl"
                    >
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Adresinize Servis Çağırın</p>
                  <p className="text-[11px] text-zinc-400">Arayıp aynı gün servis randevusu oluşturun.</p>
                </div>
                <a
                  href={`tel:${cleanPhone}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md"
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
          <span className="text-xs font-bold text-zinc-300 tracking-wider uppercase bg-zinc-900 px-4 py-1.5 rounded-full border border-zinc-700">
            Aklınıza Takılanlar
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-zinc-300 mt-2 text-sm">
            Beyaz eşya, ankastre, klima ve kombi tamir süreçleriyle ilgili tüm merak edilenler.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/90 p-6 rounded-2xl border border-zinc-800"
            >
              <h3 className="font-bold text-white text-sm sm:text-base flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-3 pl-7 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ACİL ÇAĞRI BANNERI */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Cihazınızda Bir Arıza mı Var?
          </h2>
          <p className="mt-3 text-zinc-300 text-sm sm:text-base max-w-xl mx-auto">
            Gereksiz masraf ödemeden önce bize danışın. Adresinizde yerinde kontrol edip kalıcı çözümü üretelim.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${cleanPhone}`}
              className="relative overflow-hidden inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 animate-shimmer" />
              <PhoneCall className="w-5 h-5 text-white" />
              <span>{phone} Nolu Hattı Ara</span>
            </a>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-black text-zinc-300 py-14 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 text-xs">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-900">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image src="/logo.png" alt="Türkyılmaz Servis" fill className="object-contain p-1" />
              </div>
              <div>
                <p className="font-extrabold text-white text-base">TÜRKYILMAZ BEYAZ EŞYA SERVİSİ</p>
                <p className="text-xs text-zinc-400 font-semibold">Gebze, Darıca & Çayırova Servis Ağı</p>
              </div>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
              Arçelik, Beko, Samsung, Grundig, Altus, Vestel, Regal, Keysmart, Flavel, Finlux, SEG, Kumtel ve Eminçelik cihazlarında 6 ay parça garantili yerinde servis hizmeti.
            </p>
          </div>

          <div>
            <p className="font-bold text-white text-sm uppercase tracking-wider mb-3">Sayfalar</p>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/" className="hover:text-white transition">Ana Sayfa</Link></li>
              <li><Link href="/islerimiz" className="hover:text-white transition">Yapılan Sahadan İşler</Link></li>
              <li><Link href="/yedek-parca" className="hover:text-white transition">Yedek Parça & Ürünler</Link></li>
              <li><Link href="/periyodik-bakim" className="hover:text-white transition">Periyodik Bakım Kaydı</Link></li>
              <li><Link href="/iletisim" className="hover:text-white transition">İletişim & Dükkan Konumu</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-white text-sm uppercase tracking-wider mb-3">İletişim & Adres</p>
            <div className="space-y-2.5 text-zinc-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{shopAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="text-white font-bold hover:text-red-500 transition">{phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>08:30 - 20:30 (Pazar Nöbetçi Ekip)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
          <p>© {new Date().getFullYear()} Türkyılmaz Beyaz Eşya Servisi. Tüm hakları saklıdır.</p>
          
          <a
            href="https://affan-portfolio-gilt.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 px-3.5 py-1.5 rounded-full transition-colors shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:animate-ping" />
            <span className="text-zinc-400 group-hover:text-zinc-200 transition">Tasarım & Yazılım:</span>
            <span className="font-bold text-zinc-200 group-hover:text-white transition">
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