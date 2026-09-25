import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Sahadan İşler & Başarı Hikayeleri',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'İş / Başlık',
      description: 'Örn: Buzdolabı Soğutmama Arızası & Doğru Teşhis',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori / Cihaz',
      description: 'Örn: Buzdolabı Onarımı, Kurutma Makinesi vb.',
      type: 'string',
      initialValue: 'Beyaz Eşya Onarımı',
    }),
    defineField({
      name: 'badge',
      title: 'Öne Çıkan Rozet',
      description: 'Örn: Orijinal Motor Değişimi, Gereksiz Masraftan Kurtarıldı',
      type: 'string',
      initialValue: '6 Ay Garantili Onarım',
    }),
    defineField({
      name: 'description',
      title: 'Müşteri Şikayeti / İlk Teşhis',
      description: 'Cihazda görülen problem veya müşterinin şikayeti',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'solution',
      title: 'Uygulanan Çözüm',
      description: 'Yapılan tamir veya orijinal parça değişimi',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Fotoğraf',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Görüntülenme Sırası',
      type: 'number',
      initialValue: 1,
    }),
  ],
})