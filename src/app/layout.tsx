import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Türkyılmaz Beyaz Eşya Servisi | Darıca & Gebze Özel Teknik Servis',
  description: 'Darıca, Gebze, Çayırova ve Dilovası beyaz eşya özel teknik servisi. Çamaşır makinesi, buzdolabı, kombi ve klima onarımında 6 ay garantili parça değişimi.',
  keywords: [
    'darıca beyaz eşya servisi',
    'gebze beyaz eşya tamiri',
    'çayırova çamaşır makinesi servisi',
    'buzdolabı tamiri darıca',
    'kombi bakımı gebze',
    'klima gaz dolumu'
  ],
  authors: [{ name: 'Türkyılmaz Servis' }],
  openGraph: {
    title: 'Türkyılmaz Beyaz Eşya Servisi - 0552 116 41 28',
    description: 'Aynı gün adrese servis, orijinal parça ve 6 ay işçilik garantisi.',
    locale: 'tr_TR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Google LocalBusiness Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Türkyılmaz Beyaz Eşya Servisi',
    'image': 'https://turkyilmazservis.com/logo.png',
    'telephone': '0552 116 41 28',
    'priceRange': '₺₺',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Fevzicakmak mahallesi doktor zeki acar caddesi, Şebnem Sk. no11',
      'addressLocality': 'Darıca',
      'addressRegion': 'Kocaeli',
      'postalCode': '41700',
      'addressCountry': 'TR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 40.7709848,
      'longitude': 29.3942203
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      'opens': '08:30',
      'closes': '21:30'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5.0',
      'reviewCount': '18'
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}