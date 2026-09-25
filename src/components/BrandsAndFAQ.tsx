'use client'

import React, { useState } from 'react'
import { ChevronDown, ShieldCheck } from 'lucide-react'

const brands = [
  'Arçelik', 'Beko', 'Bosch', 'Siemens', 'Profilo', 
  'Vestel', 'Samsung', 'LG', 'Altus', 'Regal', 
  'Demirdöküm', 'Vaillant', 'E.C.A', 'Baymak'
]

const faqs = [
  {
    q: 'Tamir edilen cihazlara ve parçalara garanti veriyor musunuz?',
    a: 'Evet. Yapılan tüm işçilik ve kullanılan orijinal yedek parçalar Türkyılmaz Beyaz Eşya Servisi güvencesiyle 6 ay boyunca garantilidir.'
  },
  {
    q: 'Aynı gün servis hizmetiniz var mı?',
    a: 'Darıca, Gebze, Çayırova ve Dilovası bölgelerinde gezici servis ekiplerimiz bulunmaktadır. Kaydınızı oluşturduktan sonra aynı gün adresinize gelinmektedir.'
  },
  {
    q: 'Arıza tespiti nasıl yapılıyor?',
    a: 'Teknisyenimiz adresinize gelerek cihazın arızasını tespit eder. Masraf ve onarım süreci hakkında size bilgi verir. Onaylamanız durumunda yerinde tamir işlemine başlanır.'
  },
  {
    q: 'Kombi ve klima bakımlarını ne sıklıkla yaptırmalıyım?',
    a: 'Kombilerin yılda 1 kez kış öncesinde, klimaların ise yılda en az 1 kez yaz sezonu başında ilaçlı ve antibakteriyel olarak bakımdan geçmesi tavsiye edilir.'
  }
]

export default function BrandsAndFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto space-y-16">
      {/* Markalar */}
      <div className="text-center">
        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
          Geniş Servis Ağı
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Tamir & Bakım Yaptığımız Markalar</h2>
        <p className="text-slate-500 text-sm mt-1">Özel servis statüsünde tüm markalara orijinal yedek parça desteği sunuyoruz.</p>
        
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          {brands.map((b, i) => (
            <div 
              key={i} 
              className="bg-white px-5 py-3 rounded-2xl border border-slate-200 font-bold text-slate-700 text-sm shadow-sm hover:border-blue-500 hover:text-blue-600 transition"
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* SSS Accordion */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-slate-900">Sıkça Sorulan Sorular</h3>
          <p className="text-slate-500 text-sm mt-1">Servis süreci, garanti koşulları ve randevular hakkında merak edilenler.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}