import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site ve İletişim Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site / Firma Başlığı',
      type: 'string',
      initialValue: 'Türkyılmaz Beyaz Eşya Servisi',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon Numarası (Aramalar İçin)',
      type: 'string',
      initialValue: '0552 116 41 28',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Numarası',
      type: 'string',
      initialValue: '905521164128',
    }),
    defineField({
      name: 'districts',
      title: 'Hizmet Verilen Bölgeler (İlçeler)',
      description: 'Formdaki ilçe seçiminde ve sitede listelenecek bölgeler. İstediğiniz gibi ekleyip silebilirsiniz.',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Darıca', 'Gebze', 'Çayırova', 'Dilovası'],
    }),
    defineField({
      name: 'address',
      title: 'Adres / Servis Merkezi',
      type: 'text',
      rows: 2,
      initialValue: 'Fevzicakmak mahallesi doktor zeki acar caddesi, Şebnem Sk. no11, 41700 Darıca/Kocaeli',
    }),
    defineField({
      name: 'workingHours',
      title: 'Çalışma Saatleri',
      type: 'string',
      initialValue: 'Açık · Kapanış saati: 21:30',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Ana Sayfa Manşet Başlığı',
      type: 'string',
      initialValue: 'Darıca & Gebze Beyaz Eşya Özel Teknik Servisi',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Ana Sayfa Manşet Açıklaması',
      type: 'text',
      rows: 2,
      initialValue: 'Tüm marka beyaz eşyalarınızda arıza onarımı ve Kombi, Klima ve Kurutma Makinesi Periyodik Yıllık Bakım Hizmeti. Orijinal parça kullanımı ve yapılan her işleme 6 ay servis garantisi.',
    }),
  ],
})