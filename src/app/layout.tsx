import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://turkyilmazservis.vercel.app'),
  title: {
    default: 'Darıca Beyaz Eşya Tamircisi | Arçelik, Beko, Bosch Teknik Servis',
    template: '%s | Türkyılmaz Beyaz Eşya Servisi'
  },
  description: 'Darıca ve Kocaeli geneli Arçelik, Beko, Altus, Bosch buzdolabı, çamaşır ve bulaşık makinesi tamiri. 6 ay garantili yerinde servis: 0552 116 41 28.',
  keywords: [
    'darıca beyaz eşya tamircisi',
    'darıca arçelik servis',
    'arçelik buzdolabı tamiri',
    'arçelik klima servisi darıca',
    'beko servis darıca',
    'altus servis darıca',
    'grundig servis darıca',
    'gebze beyaz eşya servisi',
    'bulaşık makinesi tamiri darıca',
    'çamaşır makinesi kazan değişimi',
    'türkyılmaz servis'
  ],
  authors: [{ name: 'Türkyılmaz Teknik Servis' }, { name: 'CCN Teknoloji', url: 'https://affan-portfolio-gilt.vercel.app/' }],
  creator: 'CCN Teknoloji',
  openGraph: {
    title: 'Türkyılmaz Beyaz Eşya Servisi - Darıca & Kocaeli',
    description: 'Arçelik, Beko, Altus ve tüm markalarda aynı gün yerinde arıza tespiti ve 6 ay garantili parça değişimi.',
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
  // Google Arama Motoruna Dükkanın Bilgilerini Doğrudan Tanıtan JSON-LD Yapısı
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Türkyılmaz Beyaz Eşya Servisi',
    image: 'https://turkyilmazservis.vercel.app/logo.png',
    '@id': 'https://turkyilmazservis.vercel.app',
    url: 'https://turkyilmazservis.vercel.app',
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
      latitude: 40.7731, // Darıca koordinatları
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
      { '@type': 'AdministrativeArea', name: 'Darıca' },
      { '@type': 'AdministrativeArea', name: 'Gebze' },
      { '@type': 'AdministrativeArea', name: 'Çayırova' },
      { '@type': 'AdministrativeArea', name: 'Dilovası' },
      { '@type': 'AdministrativeArea', name: 'Kocaeli' }
    ],
    makesOffer: [
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
          name: 'Kombi ve Klima Periyodik Bakım Servisi'
        }
      }
    ]
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