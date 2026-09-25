import { defineField, defineType } from 'sanity'

export const sparePartType = defineType({
  name: 'sparePart',
  title: 'Yedek Parça & Ürün Kataloğu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Ürün / Parça Adı',
      type: 'string',
      description: 'Örn: Arçelik Uyumlu Komple Çamaşır Makinesi Cam Kapağı',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Çamaşır Makinesi Parçaları', value: 'camasir' },
          { title: 'Bulaşık Makinesi Parçaları', value: 'bulasik' },
          { title: 'Buzdolabı Parçaları', value: 'buzdolabi' },
          { title: 'Kurutma Makinesi Parçaları', value: 'kurutma' },
          { title: 'Klima & Kombi Ekipmanları', value: 'klima-kombi' },
          { title: 'Diğer / Aksesuar', value: 'diger' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'compatibleBrands',
      title: 'Uyumlu Markalar',
      type: 'string',
      description: 'Örn: Arçelik, Beko, Altus, Grundig',
    }),
    defineField({
      name: 'condition',
      title: 'Ürün Durumu',
      type: 'string',
      options: {
        list: [
          { title: 'Sıfır Orijinal Parça', value: 'new' },
          { title: 'Test Edilmiş Orijinal Çıkma / Revizyonlu', value: 'refurbished' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'description',
      title: 'Parça Açıklaması / Detaylar',
      type: 'text',
      description: 'Uyumlu model kodları veya teknik özellikleri belirtin.',
    }),
    defineField({
      name: 'image',
      title: 'Ürün Görseli',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
    },
    prepare({ title, category, media }) {
      return {
        title: title,
        subtitle: `Kategori: ${category || 'Genel'}`,
        media,
      }
    },
  },
})