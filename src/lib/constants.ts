export interface CaseItemType {
  _id: string
  title: string
  category: string
  badge: string
  description: string
  solution: string
  image: string
}

export const DEFAULT_CASES: CaseItemType[] = [
  {
    _id: 'case-1',
    title: 'Çamaşır Makinesi Aşırı Ses & Sarsıntı Arızası',
    category: 'Çamaşır Makinesi Tamiri',
    badge: 'Orijinal Komple Kazan Değişimi',
    description: 'Sıkma modunda helikopter sesi gibi aşırı gürültü ve titreme şikayetiyle gidilen adreste tambur rulmanının kilitlendiği tespit edildi.',
    solution: 'Cihaza fabrika standartlarında %100 orijinal Arçelik komple presli kazan ve amortisör montajı yapıldı, ses tamamen kesildi.',
    image: '/galeri/sesliçalışıyorşikayetiüzerinebaktığımçamaşırmakinesindearçelikorjinalkazandegisimiypaıyorum.jpeg',
  },
  {
    _id: 'case-2',
    title: 'Bulaşık Makinesi Suyu Isıtmama & Temiz Yıkamama',
    category: 'Bulaşık Makinesi Servisi',
    badge: 'Orijinal Rezistans Değişimi',
    description: 'Bulaşıkların soğuk suyla yıkandığı, yağların çözülmediği ve program sonunda kurutma yapmadığı şikayeti incelendi.',
    solution: 'Alt karter sökülerek arızalanan sirkülasyon ısıtıcı tüpü (rezistans) ve sensör grubu orijinal Vestel parça ile değiştirildi.',
    image: '/galeri/bulasik-rezistans.jpeg',
  },
  {
    _id: 'case-3',
    title: 'Kurutma Makinesi Orijinal Tahrik Motoru Değişimi',
    category: 'Kurutma Makinesi Servisi',
    badge: 'Sıfır Motor & Gergi Kayışı',
    description: 'Kurutma makinesinin açıldığında vınlama sesi verip tamburunun dönmemesi ve aşırı ısınması arızası tespit edildi.',
    solution: 'Yetkili servis kutulu orijinal motor ve gergi kasnağı montajı yapılarak cihaz fabrikasyon sessizliğine kavuşturuldu.',
    image: '/galeri/k1motor.jpeg',
  },
  {
    _id: 'case-4',
    title: 'Kurutma Makinesi Su Boşaltmama & Alarm Uyarısı',
    category: 'Kurutma Makinesi Servisi',
    badge: 'Tahliye Pompası Yenileme',
    description: 'Programın ortasında cihazın su haznesi dolu ikazı vermesi ve yoğuşan suyu tanka iletememesi arızası.',
    solution: 'Tekstil tiftikleriyle kilitlenmiş yoğuşma su tahliye pompası söküldü, kanal temizliği yapılıp sıfır pompa takıldı.',
    image: '/galeri/5.jpeg',
  },
  {
    _id: 'case-5',
    title: 'Isı Pompalı Kurutma Makinesi Aşırı Tozlanma & Geç Kurutma',
    category: 'Periyodik Bakım & Temizlik',
    badge: 'Detaylı Kanal & Hijyen Revizyonu',
    description: 'Kurutma süresinin 4-5 saate çıkması ve cihazın alt kısımlarından yanık toz kokusu gelmesi arızası.',
    solution: 'Cihaz gövdesi komple dağıtılarak evap kanalları, tiftik filtreleri ve hava sirkülasyon yolları kimyasal arındırmayla açıldı.',
    image: '/galeri/1.jpeg',
  },
  {
    _id: 'case-6',
    title: 'Kurutma Tambur Sürtme ve Gıcırtı Sesi',
    category: 'Kurutma Makinesi Servisi',
    badge: 'Ön Destek & Rulman Revizyonu',
    description: 'Tambur dönerken sürekli metalik gıcırtı sesi yapması ve çamaşırların kenarlara takılması şikayeti.',
    solution: 'Aşınan ön destek tekerlekleri ve tambur yatak keçeleri değiştirilerek sürtünme sıfırlandı.',
    image: '/galeri/3.jpeg',
  },
  {
    _id: 'case-7',
    title: 'Kurutma Makinesi Komple Mekanik Hat Revizyonu',
    category: 'Kurutma Makinesi Servisi',
    badge: 'Tambur & Kayış Hattı Kontrolü',
    description: 'Yüksek devirde dönen tambur arkasından ritmik sürtünme sesi gelmesi şikayeti.',
    solution: 'Kurutma kazanı indirilip arka yataklama burçları, motor kayış gergi yayları ve hava kanalları sıfırlandı.',
    image: '/galeri/6.jpeg',
  },
  {
    _id: 'case-8',
    title: 'Tahliye & Yoğuşma Boruları Tıkanıklık Giderme',
    category: 'Kurutma Makinesi Servisi',
    badge: 'Hortum & Şamandıra Onarımı',
    description: 'Alt kısımdan dışarıya su sızdırma ve taşma emniyet sviçinin devreye girerek programı kesmesi arızası.',
    solution: 'Kireçlenen ve tiftikten tıkanan drenaj boruları yenilendi, mikro sviç yuvası kontrol edilerek test edildi.',
    image: '/galeri/2.jpeg',
  },
  {
    _id: 'case-9',
    title: 'Buzdolabı Soğutmama Arızası & Doğru Teşhis',
    category: 'Buzdolabı Onarımı',
    badge: 'Gereksiz Motor Masrafından Kurtarıldı',
    description: 'Cihaz soğutmuyor şikayetiyle gidilen adreste başka yerlerce motor arızalı denilerek yüksek maliyet çıkarılan cihaz incelendi.',
    solution: 'Yapılan testlerde motorun sağlam olduğu, sensör kablo soketlerinde oksitlenme olduğu tespit edilip orijinal parça ile onarıldı.',
    image: '/galeri/b1.jpeg',
  },
  {
    _id: 'case-10',
    title: 'Vitroseramik Cam Ocak Patlaması & Orijinal Değişim',
    category: 'Ankastre & Ocak Servisi',
    badge: 'Orijinal Isıya Dayanıklı Cam',
    description: 'Darbe kaynaklı camı patlayan ankastre cam ocağın güvenlik ve gaz sızdırmazlık kontrolleri yapıldı.',
    solution: 'Fabrika çıkışlı temperli yüksek ısıya dayanıklı orijinal cam tablası ve bek contaları yerinde sıfırlandı.',
    image: '/galeri/o1.jpeg',
  }
]

export const DEFAULT_SERVICES = [
  {
    _id: 's-1',
    title: 'Buzdolabı Tamir Servisi',
    description: 'Soğutmama, motor kilitlenmesi, gaz kaçağı ve karlanma problemlerine yerinde 6 ay garantili çözüm.',
    features: ['Gaz Kaçağı & Şarjı', 'Motor (Kompresör) Değişimi', 'Sensör & Termostat Onarımı']
  },
  {
    _id: 's-2',
    title: 'Çamaşır Makinesi Tamiri',
    description: 'Aşırı gürültülü sıkma, su kaçırma ve kazan dönmeme arızalarında orijinal presli kazan değişimi.',
    features: ['Orijinal Kazan & Rulman Değişimi', 'Tahliye Motoru & Kilit Onarımı', 'Amortisör Yenileme']
  },
  {
    _id: 's-3',
    title: 'Bulaşık Makinesi Servisi',
    description: 'Suyu ısıtmama, tableti eritmeme ve kirli yıkama arızalarına aynı gün yerinde müdahale.',
    features: ['Sirkülasyon Isıtıcı (Rezistans)', 'Ventil & Su Giriş Hortumu', 'Yıkama Motoru Revizyonu']
  },
  {
    _id: 's-4',
    title: 'Klima Bakımı & Gaz Dolumu',
    description: 'Arçelik, Beko ve tüm marka klimalarda gaz kaçağı tespiti, R410/R32 gaz şarjı ve antibakteriyel filtre bakımı.',
    features: ['Klima Gaz Dolumu & Basınç Testi', 'İç & Dış Ünite İlaçlı Yıkama', 'Kompresör & Kart Tamiri']
  },
  {
    _id: 's-5',
    title: 'Kombi Bakımı & Petek Temizliği',
    description: 'Peteklerin altının ısınmaması, bar düşmesi ve ateşleme problemlerine profesyonel periyodik bakım desteği.',
    features: ['Makineli İlaçlı Petek Temizliği', 'Genleşme Tankı & Eşanjör Bakımı', 'Sıcak Su NTC Sensör Onarımı']
  },
  {
    _id: 's-6',
    title: 'Kurutma Makinesi & Ankastre',
    description: 'Geç kurutma, filtre tıkanıklığı, motor yanması ve cam ocak patlamalarında fabrika standartlarında onarım.',
    features: ['Sıfır Tahrik Motoru Değişimi', 'Kondenser & Drenaj Pompası', 'Orijinal Isıya Dayanıklı Cam']
  }
  
]
export interface SparePartItemType {
  _id: string
  title: string
  category: string
  compatibleBrands: string
  condition: 'new' | 'refurbished'
  description: string
  image: string
}

export const DEFAULT_PARTS: SparePartItemType[] = [
  {
    _id: 'part-1',
    title: 'Çamaşır Makinesi Orijinal Dış Kapak & Menteşe Grubu',
    category: 'Çamaşır Makinesi Parçaları',
    compatibleBrands: 'Arçelik, Beko, Altus',
    condition: 'new',
    description: 'Kırılan menteşe veya çatlayan cam kapaklar için komple dış çerçeve, emniyet kilit dili ve cam montaj grubu.',
    image: '/galeri/sesliçalışıyorşikayetiüzerinebaktığımçamaşırmakinesindearçelikorjinalkazandegisimiypaıyorum.jpeg',
  },
  {
    _id: 'part-2',
    title: 'Bulaşık Makinesi Akış Tipi Isıtıcı Rezistans',
    category: 'Bulaşık Makinesi Parçaları',
    compatibleBrands: 'Vestel, Profilo, Regal',
    condition: 'new',
    description: 'Suyu ısıtmama hatası veren modeller için orijinal soketli sirkülasyon ısıtıcı tüp.',
    image: '/galeri/bulasik-rezistans.jpg',
  },
  {
    _id: 'part-3',
    title: 'Kurutma Makinesi Orijinal Tahrik Motoru & Gergi',
    category: 'Kurutma Makinesi Parçaları',
    compatibleBrands: 'Arçelik, Beko, Grundig',
    condition: 'new',
    description: 'Tambur dönmeme arızalarında sıfır kutulu motor, kayış kasnağı ve gergi yayı seti.',
    image: '/galeri/k1motor.jpeg',
  },
  {
    _id: 'part-4',
    title: 'Kurutma & Yoğuşma Suyu Tahliye Pompası',
    category: 'Kurutma Makinesi Parçaları',
    compatibleBrands: 'Arçelik, Beko, Altus',
    condition: 'refurbished',
    description: 'Su haznesi dolu ikazı veren cihazlar için test edilmiş, tiftik filtre kanalları revize edilmiş orijinal pompa motoru.',
    image: '/galeri/5.jpeg',
  },
]