import { client } from '@/sanity/lib/client'
import { DEFAULT_SERVICES, DEFAULT_CASES, ServiceItemType } from '@/lib/constants'
import RepairGallery from '@/components/RepairGallery'
// Diğer mevcut bileşen importların (Header, Hero, ServiceCard, vb.) aynen kalsın

export const revalidate = 60

async function getData() {
  try {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
    const sanityServices = await client.fetch(`*[_type == "service"] | order(order asc)`)
    const caseStudies = await client.fetch(`*[_type == "caseStudy"] | order(order asc)`)

    const activeServices = sanityServices && sanityServices.length > 0 ? sanityServices : DEFAULT_SERVICES

    return { settings, services: activeServices, caseStudies }
  } catch (error) {
    return { settings: null, services: DEFAULT_SERVICES, caseStudies: DEFAULT_CASES }
  }
}

export default async function Home() {
  const { settings, services, caseStudies } = await getData()

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Mevcut bileşenlerin (Hero, vb.) */}

      {/* Hizmetler listesi döngüsü: */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item: ServiceItemType | any) => (
            <div key={item._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{item.description}</p>
              {item.features && (
                <ul className="mt-4 space-y-1">
                  {item.features.map((feat: string, fIdx: number) => (
                    <li key={fIdx} className="text-xs text-slate-500">• {feat}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sahadan Gerçek Örnekler & Başarı Hikayeleri */}
      <RepairGallery items={caseStudies} />

      {/* Diğer bileşenlerin (Harita, SSS, Footer vb.) */}
    </main>
  )
}