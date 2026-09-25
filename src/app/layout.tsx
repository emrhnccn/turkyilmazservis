import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Font optimizasyonu: render-blocking süresini keser ve LCP'yi öne çeker
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '600', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://turkyilmazservis.vercel.app'),
  title: {
    default: 'Gebze & Darıca Beyaz Eşya Servisi | Arçelik Beko Kombi Tamiri',
    template: '%s | Türkyılmaz Beyaz Eşya Servisi'
  },
  description: 'Gebze, Darıca ve Çayırova geneli Arçelik, Beko, Bosch beyaz eşya tamiri, kombi ve klima bakımı. 6 ay garantili yerinde servis: 0552 116 41 28.',
  keywords: [
    'gebze beyaz eşya servisi',
    'gebze beyaz eşya tamiri',
    'darıca beyaz eşya tamircisi',
    'darıca arçelik servis',
    'gebze arçelik servisi',
    'beko servis darıca',
    'gebze beko servisi',
    'arçelik buzdolabı tamiri',
    'arçelik klima servisi darıca',
    'gebze klima servisi',
    'gebze kombi servisi',
    'çamaşır makinesi kazan değişimi',
    'bulaşık makinesi tamiri darıca'
  ],
  authors: [{ name: 'Türkyılmaz Beyaz Eşya Servisi' }, { name: 'CCN Teknoloji', url: 'https://affan-portfolio-gilt.vercel.app/' }],
  creator: 'CCN Teknoloji',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Türkyılmaz Beyaz Eşya Servisi - Gebze & Darıca',
    description: 'Arçelik, Beko, Bosch ve tüm markalarda aynı gün yerinde arıza tespiti ve 6 ay parça garantisi.',
    url: 'https://turkyilmazservis.vercel.app',
    siteName: 'Türkyılmaz Beyaz Eşya Servisi',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Türkyılmaz Beyaz Eşya Servisi Logo'
      }
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Türkyılmaz Beyaz Eşya Servisi - Gebze & Darıca',
    description: 'Aynı gün yerinde garantili beyaz eşya, klima ve kombi tamir servisi.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ApplianceRepair',
    '@id': 'https://turkyilmazservis.vercel.app/#business',
    name: 'Türkyılmaz Beyaz Eşya Servisi',
    alternateName: 'Türkyılmaz Teknik Servis',
    url: 'https://turkyilmazservis.vercel.app',
    logo: 'https://turkyilmazservis.vercel.app/logo.png',
    image: 'https://turkyilmazservis.vercel.app/logo.png',
    telephone: '+905521164128',
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fevziçakmak Mah. Doktor Zeki Acar Cad., Şebnem Sk. No:11',
      addressLocality: 'Darıca',
      addressRegion: 'Kocaeli',
      postalCode: '41700',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7731,
      longitude: 29.4055
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '08:30',
        closes: '20:30'
      }
    ],
    areaServed: [
      { '@type': 'City', name: 'Gebze' },
      { '@type': 'City', name: 'Darıca' },
      { '@type': 'City', name: 'Çayırova' },
      { '@type': 'City', name: 'Dilovası' },
      { '@type': 'AdministrativeArea', name: 'Kocaeli' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Beyaz Eşya, Kombi ve Klima Tamir Hizmetleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Arçelik Beko Buzdolabı & Çamaşır Makinesi Tamiri'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bulaşık Makinesi Rezistans ve Pompa Onarımı'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Klima Bakımı, Gaz Dolumu ve Tamiri'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kombi Periyodik Bakımı ve Petek Temizliği'
          }
        }
      ]
    }
  }

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}