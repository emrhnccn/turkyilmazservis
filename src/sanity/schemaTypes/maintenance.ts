import { defineField, defineType } from 'sanity'

export const maintenanceType = defineType({
  name: 'maintenance',
  title: 'Periyodik Bakım Kayıtları',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Müşteri Ad Soyad',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefon Numarası',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'İlçe / Adres',
      type: 'string',
    }),
    defineField({
      name: 'deviceType',
      title: 'Cihaz Türü',
      type: 'string',
      options: {
        list: [
          { title: 'Kombi (6 Ayda Bir)', value: 'kombi' },
          { title: 'Klima (6 Ayda Bir)', value: 'klima' },
          { title: 'Çamaşır Makinesi (1 Yılda Bir)', value: 'camasir' },
          { title: 'Bulaşık Makinesi (1 Yılda Bir)', value: 'bulasik' },
          { title: 'Buzdolabı (1 Yılda Bir)', value: 'buzdolabi' },
          { title: 'Kurutma Makinesi (1 Yılda Bir)', value: 'kurutma' },
          { title: 'Diğer / Özel Periyot', value: 'diger' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastServiceDate',
      title: 'Son Bakım / Kayıt Tarihi',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nextServiceDate',
      title: 'Sonraki Hatırlatma / Bakım Tarihi',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Takip Durumu',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Beklemede / Zamanı Gelmedi', value: 'pending' },
          { title: '🔔 Hatırlatma Gönderildi', value: 'reminded' },
          { title: '✅ Bakım Yapıldı / Tamamlandı', value: 'completed' },
          { title: '❌ İptal Edildi', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'notes',
      title: 'Usta Notları',
      type: 'text',
      description: 'Örn: Gaz basıldı, filtre temizlendi, müşteri haftasonu aranacak.',
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      device: 'deviceType',
      nextDate: 'nextServiceDate',
      status: 'status',
    },
    prepare({ title, device, nextDate, status }) {
      const statusIcon = status === 'completed' ? '✅' : status === 'reminded' ? '🔔' : '⏳'
      return {
        title: `${statusIcon} ${title} - ${device?.toUpperCase()}`,
        subtitle: `Sonraki Bakım: ${nextDate || 'Belirtilmedi'}`,
      }
    },
  },
})