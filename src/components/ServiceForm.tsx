'use client'

import React, { useState } from 'react'
import { Send, Wrench, Sparkles } from 'lucide-react'

interface ServiceFormProps {
  whatsapp?: string
  districts?: string[]
}

export default function ServiceForm({ 
  whatsapp = "905521164128", 
  districts = ['Darıca', 'Gebze', 'Çayırova', 'Dilovası'] 
}: ServiceFormProps) {
  const [tab, setTab] = useState<'ariza' | 'bakim'>('ariza')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    brand: '',
    device: 'Çamaşır Makinesi',
    maintenanceDevice: 'Kombi Yıllık Bakımı',
    district: districts[0] || 'Darıca',
    address: '',
    fault: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanNumber = whatsapp.replace(/\s+/g, '')

    let message = ''
    if (tab === 'ariza') {
      message = `🛠️ *YENİ ARIZA SERVİS KAYDI*%0A` +
        `-----------------------------%0A` +
        `👤 *Müşteri:* ${encodeURIComponent(formData.name)}%0A` +
        `📞 *Telefon:* ${encodeURIComponent(formData.phone)}%0A` +
        `🏷️ *Cihaz Markası:* ${encodeURIComponent(formData.brand || 'Belirtilmedi')}%0A` +
        `⚙️ *Cihaz Türü:* ${encodeURIComponent(formData.device)}%0A` +
        `📍 *Bölge:* ${encodeURIComponent(formData.district)}%0A` +
        `🏠 *Açık Adres:* ${encodeURIComponent(formData.address || 'Belirtilmedi')}%0A` +
        `📝 *Arıza Şikayeti:* ${encodeURIComponent(formData.fault || 'Belirtilmedi')}`
    } else {
      message = `✨ *YILLIK PERİYODİK BAKIM TALEBİ*%0A` +
        `-----------------------------%0A` +
        `👤 *Müşteri:* ${encodeURIComponent(formData.name)}%0A` +
        `📞 *Telefon:* ${encodeURIComponent(formData.phone)}%0A` +
        `🏷️ *Cihaz Markası:* ${encodeURIComponent(formData.brand || 'Belirtilmedi')}%0A` +
        `❄️ *Bakım Yapılacak Cihaz:* ${encodeURIComponent(formData.maintenanceDevice)}%0A` +
        `📍 *Bölge:* ${encodeURIComponent(formData.district)}%0A` +
        `🏠 *Açık Adres:* ${encodeURIComponent(formData.address || 'Belirtilmedi')}%0A` +
        `📝 *Ek Not:* ${encodeURIComponent(formData.fault || 'Yıllık rutin bakım randevusu talep edildi.')}`
    }

    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl shadow-slate-900/10 text-slate-800">
      
      {/* Sekmeler */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-5">
        <button
          type="button"
          onClick={() => { setTab('ariza'); setFormData({ ...formData, fault: '' }) }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            tab === 'ariza'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Arıza Onarım</span>
        </button>

        <button
          type="button"
          onClick={() => { setTab('bakim'); setFormData({ ...formData, fault: '' }) }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            tab === 'bakim'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Yıllık Bakım</span>
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-black text-slate-900">
          {tab === 'ariza' ? 'Arıza Servis Kaydı Aç' : 'Periyodik Bakım Randevusu Al'}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {tab === 'ariza' 
            ? '6 ay garantili parça & işçilik ile adreste onarım.' 
            : 'Kombi, klima ve kurutma makinelerinizin performansını artırın.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        
        {/* İsim & Telefon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Adınız Soyadınız *</label>
            <input
              required
              type="text"
              placeholder="Örn: Mehmet Türkyılmaz"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/70"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Telefon Numaranız *</label>
            <input
              required
              type="tel"
              placeholder="05XX XXX XX XX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/70"
            />
          </div>
        </div>

        {/* Marka & Cihaz */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Cihaz Markası *</label>
            <input
              required
              type="text"
              placeholder="Örn: Bosch, Arçelik, Beko"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/70"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              {tab === 'ariza' ? 'Arızalı Cihaz' : 'Bakım Cihazı'}
            </label>
            {tab === 'ariza' ? (
              <select
                value={formData.device}
                onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/70"
              >
                <option value="Çamaşır Makinesi">Çamaşır Makinesi</option>
                <option value="Buzdolabı">Buzdolabı</option>
                <option value="Bulaşık Makinesi">Bulaşık Makinesi</option>
                <option value="Kurutma Makinesi">Kurutma Makinesi</option>
                <option value="Kombi">Kombi</option>
                <option value="Klima">Klima</option>
                <option value="Fırın / Ocak">Fırın / Ocak</option>
                <option value="Diğer">Diğer</option>
              </select>
            ) : (
              <select
                value={formData.maintenanceDevice}
                onChange={(e) => setFormData({ ...formData, maintenanceDevice: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-slate-50/70 font-medium"
              >
                <option value="Kombi Yıllık Bakımı">Kombi Yıllık Bakımı</option>
                <option value="Klima Bakımı & Gaz Dolumu">Klima Bakımı & Gaz Dolumu</option>
                <option value="Kurutma Makinesi Detaylı Bakımı">Kurutma Makinesi Detaylı Temizlik/Bakım</option>
                <option value="Buzdolabı & Diğer Cihaz Bakımı">Buzdolabı / Diğer Cihaz Bakımı</option>
              </select>
            )}
          </div>
        </div>

        {/* Panelden Dinamik Gelen Bölge Seçimi & Açık Adres */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Bölge</label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/70"
            >
              {districts && districts.length > 0 ? (
                districts.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))
              ) : (
                <option value="Darıca">Darıca</option>
              )}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Açık Adres (Mahalle / Sokak) *</label>
            <input
              required
              type="text"
              placeholder="Örn: Fevzi Çakmak Mah. Şebnem Sk."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/70"
            />
          </div>
        </div>

        {/* Şikayet / Açıklama */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            {tab === 'ariza' ? 'Arıza Şikayeti *' : 'Bakım Randevusu / Not'}
          </label>
          <textarea
            required={tab === 'ariza'}
            rows={2}
            placeholder={
              tab === 'ariza'
                ? "Örn: Cihaz su boşaltmıyor, sesli çalışıyor, altından su kaçırıyor..."
                : "Örn: Hafta sonu öğleden sonra gelinmesini rica ediyorum."
            }
            value={formData.fault}
            onChange={(e) => setFormData({ ...formData, fault: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/70 resize-none"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition active:scale-98 ${
            tab === 'ariza'
              ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{tab === 'ariza' ? 'Arıza Servis Kaydını Gönder' : 'Bakım Randevusunu İlet'}</span>
        </button>

      </form>
    </div>
  )
}