import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Hizmetlerimiz',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hizmet Adı',
      description: 'Örn: Buzdolabı Servisi, Çamaşır Makinesi Tamiri',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Sayfa Linki (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kısa Açıklama (Kartta görünecek)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Hizmet Görseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'features',
      title: 'Öne Çıkan Özellikler (Madde madde)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Örn: "Orijinal Yedek Parça", "Yerinde Onarım", "1 Yıl Garanti"',
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    }),
  ],
})