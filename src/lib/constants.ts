export interface CaseItemType {
  _id: string
  title: string
  category: string
  description: string
  solution: string
  image: string
  badge: string
}

export interface ServiceItemType {
  _id: string
  title: string
  description: string
  features: string[]
}

export const DEFAULT_CASES: CaseItemType[] = [
  {
    _id: 'b1',
    title: 'Buzdolabı Soğutmama Arızası & Doğru Teşhis',
    category: 'Buzdolabı Onarımı',
    description: 'Cihaz soğutmuyor şikayetiyle gidilen adreste, daha önce motor arızalı denilerek yüksek maliyet çıkarılmış olan cihaz incelendi.',
    solution: 'Yapılan detaylı testlerde motorun sağlam olduğu, sensörde oksitlenme ve kablo kopukluğu tespit edildi. Orijinal sensör değişimi ve kablo revizyonuyla cihaz ilk günkü soğutma performansına döndürüldü.',
    image: '/galeri/b1.jpeg',
    badge: 'Gereksiz Motor Masrafından Kurtarıldı'
  },
  {
    _id: 'k1',
    title: 'Kurutma Makinesi Orijinal Motor Değişimi',
    category: 'Kurutma Makinesi Servisi',
    description: 'Tamburu dönmeyen ve yüksek sürtünme sesi çıkaran kurutma makinesinin arıza tespiti yerinde yapıldı.',
    solution: 'Fabrika standartlarında %100 orijinal yedek motor montajı yapıldı, hava kanalları liflerden arındırıldı ve 6 ay resmi garanti ile teslim edildi.',
    image: '/galeri/k1.jpeg',
    badge: 'Orijinal Motor & 6 Ay Garanti'
  },
  {
    _id: 'o1',
    title: 'Vitroseramik Cam Ocak Patlaması & Orijinal Cam Değişimi',
    category: 'Ankastre & Ocak Servisi',
    description: 'Aşırı yüklenme ve darbe kaynaklı camı patlayan ankastre cam ocağın yenileme çalışması.',
    solution: 'Güvenlik kontrolleri sağlandıktan sonra fabrika çıkışlı orijinal darbeye ve yüksek ısıya dayanıklı temperli cam montajı tamamlandı.',
    image: '/galeri/o1.jpeg',
    badge: 'Orijinal Cam Değişimi'
  }
]

export const DEFAULT_SERVICES: ServiceItemType[] = [
  {
    _id: 's1',
    title: 'Buzdolabı Servisi',
    description: 'Soğutmama, motor arızası, gaz kaçağı ve buzlanma problemlerine yerinde garantili çözüm.',
    features: ['Gaz Kaçağı Tespiti', 'Motor & Kompresör Değişimi', 'Sensör & Termostat Tamiri']
  },
  {
    _id: 's2',
    title: 'Çamaşır Makinesi Tamiri',
    description: 'Su akıtma, sıkmama, gürültülü çalışma ve kazan dönmeme arızalarına orijinal yedek parça garantisi.',
    features: ['Kazan Rulman Değişimi', 'Pompa & Kilit Onarımı', 'Elektronik Kart Revizyonu']
  },
  {
    _id: 's3',
    title: 'Bulaşık Makinesi Servisi',
    description: 'İyi yıkamama, su boşaltmama ve kart arızaları aynı gün servis desteği ile giderilir.',
    features: ['Fıskiye & Motor Bakımı', 'Ventil & Ventil Hortumu Değişimi', 'Tahliye Pompası Onarımı']
  },
  {
    _id: 's4',
    title: 'Kurutma Makinesi & Fırın',
    description: 'Kurutmayan cihazlar, rezistans arızaları ve cam patlamalarında fabrika standartlarında onarım.',
    features: ['Orijinal Rezistans', 'Filtre & Kanal Temizliği', 'Isı Termiği Değişimi']
  }
]